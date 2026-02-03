// Phishing detection engine using pattern matching and threat database
export interface DetectionResponse {
  isPhishing: boolean;
  risk_score: number;
  indicators: string[];
  recommendation: string;
  details: string;
}

const PHISHING_PATTERNS = {
  // URL patterns
  suspicious_domains: [
    'bit.ly', 'tinyurl', 'short.url', 'goo.gl',
    'paypa1', 'amaz0n', 'micr0soft', 'apple-id', 'verify-account'
  ],
  suspicious_protocols: ['http://', 'ftp://', 'file://'],
  
  // Email patterns
  urgency_keywords: ['verify', 'confirm', 'urgent', 'immediate', 'action required', 'expire', 'suspend', 'lock', 'blocked', 'unusual activity'],
  credential_requests: ['username', 'password', 'ssn', 'credit card', 'account number', 'verify identity', 'confirm account'],
  malicious_attachments: ['.exe', '.zip', '.scr', '.bat', '.cmd', '.com', '.pif', '.vbs'],
  
  // Common phishing indicators
  spoofing_indicators: ['From:', 'Reply-To:', '=?', 'Bcc:', 'suspicious sender'],
  encoding_tricks: ['%40', '&#', 'punycode', 'homograph']
};

export function detectPhishingURL(url: string): DetectionResponse {
  const indicators: string[] = [];
  let riskScore = 0;

  try {
    const urlObj = new URL(url);
    
    // Check for suspicious domains
    for (const domain of PHISHING_PATTERNS.suspicious_domains) {
      if (urlObj.hostname.toLowerCase().includes(domain)) {
        indicators.push(`Suspicious domain detected: ${domain}`);
        riskScore += 25;
      }
    }

    // Check for suspicious protocols
    if (PHISHING_PATTERNS.suspicious_protocols.includes(urlObj.protocol)) {
      indicators.push(`Non-standard protocol detected: ${urlObj.protocol}`);
      riskScore += 20;
    }

    // Check for IP address instead of domain
    if (/^\d+\.\d+\.\d+\.\d+/.test(urlObj.hostname)) {
      indicators.push('URL uses IP address instead of domain name');
      riskScore += 30;
    }

    // Check for suspicious query parameters
    if (urlObj.searchParams.has('login') || urlObj.searchParams.has('verify') || urlObj.searchParams.has('confirm')) {
      indicators.push('URL contains credential-harvesting parameters');
      riskScore += 25;
    }

    // Check URL length (excessive length is often used for obfuscation)
    if (url.length > 150) {
      indicators.push('Unusually long URL (potential obfuscation)');
      riskScore += 15;
    }

    // Check for homograph attacks (lookalike characters)
    if (/[а-яА-ЯёЁ]|[^\x00-\x7F]/.test(urlObj.hostname)) {
      indicators.push('URL contains non-ASCII characters (homograph attack)');
      riskScore += 35;
    }

    // Check for suspicious TLDs
    if (urlObj.hostname.match(/\.(tk|ml|ga|cf)$/i)) {
      indicators.push('Suspicious top-level domain detected');
      riskScore += 20;
    }

  } catch (e) {
    indicators.push('Invalid URL format');
    riskScore += 10;
  }

  const isPhishing = riskScore >= 40;
  
  return {
    isPhishing,
    risk_score: Math.min(100, riskScore),
    indicators,
    recommendation: isPhishing 
      ? '⚠️ HIGH RISK: Do not click this link. This URL shows characteristics of phishing attacks.'
      : '✅ LOW RISK: This URL appears safe, but always verify the sender.',
    details: isPhishing 
      ? `This URL scored ${Math.min(100, riskScore)}/100 risk level. Multiple phishing indicators detected.`
      : `This URL scored ${Math.min(100, riskScore)}/100 risk level. No major indicators detected.`
  };
}

export function detectPhishingEmail(emailContent: string): DetectionResponse {
  const indicators: string[] = [];
  let riskScore = 0;
  const content = emailContent.toLowerCase();

  // Check for urgency keywords
  for (const keyword of PHISHING_PATTERNS.urgency_keywords) {
    if (content.includes(keyword)) {
      indicators.push(`Urgency language detected: "${keyword}"`);
      riskScore += 10;
    }
  }

  // Check for credential requests
  for (const request of PHISHING_PATTERNS.credential_requests) {
    if (content.includes(request)) {
      indicators.push(`Credential request detected: "${request}"`);
      riskScore += 20;
    }
  }

  // Check for suspicious sender patterns
  if (content.includes('dear customer') || content.includes('dear user') || content.includes('dear friend')) {
    indicators.push('Generic greeting (impersonal addressing)');
    riskScore += 15;
  }

  // Check for poor grammar/spelling (common in phishing)
  const grammaticalErrors = (emailContent.match(/\s{2,}|[A-Z]{2,}\s[a-z]/g) || []).length;
  if (grammaticalErrors > 3) {
    indicators.push('Multiple spelling or grammar errors detected');
    riskScore += 15;
  }

  // Check for suspicious links mention
  if (content.includes('click here') || content.includes('verify account') || content.includes('confirm identity')) {
    indicators.push('Suspicious call-to-action detected');
    riskScore += 20;
  }

  // Check for monetary/financial threats
  if (content.includes('payment failed') || content.includes('billing problem') || content.includes('update payment')) {
    indicators.push('Financial threat mentioned');
    riskScore += 25;
  }

  // Check for time pressure
  if (content.includes('24 hour') || content.includes('48 hour') || content.includes('expires') || content.includes('act now')) {
    indicators.push('Time pressure detected');
    riskScore += 15;
  }

  const isPhishing = riskScore >= 45;

  return {
    isPhishing,
    risk_score: Math.min(100, riskScore),
    indicators,
    recommendation: isPhishing
      ? '⚠️ HIGH RISK: This email shows multiple phishing characteristics. Do not click links or provide personal information.'
      : '✅ LOW RISK: This email appears legitimate, but always verify sender addresses.',
    details: isPhishing
      ? `This email scored ${Math.min(100, riskScore)}/100 risk level. Multiple phishing indicators found.`
      : `This email scored ${Math.min(100, riskScore)}/100 risk level. No major indicators detected.`
  };
}

export function detectPhishingFile(fileName: string, fileContent: string): DetectionResponse {
  const indicators: string[] = [];
  let riskScore = 0;

  // Check for suspicious file extensions
  for (const ext of PHISHING_PATTERNS.malicious_attachments) {
    if (fileName.toLowerCase().endsWith(ext)) {
      indicators.push(`Malicious file type detected: ${ext}`);
      riskScore += 40;
    }
  }

  // Check for double extensions (e.g., document.pdf.exe)
  if (fileName.match(/\.\w+\.\w+$/)) {
    indicators.push('Suspicious double file extension detected');
    riskScore += 35;
  }

  // Check file content for suspicious patterns
  const content = fileContent.toLowerCase();
  if (content.includes('powershell') || content.includes('cmd.exe') || content.includes('registry')) {
    indicators.push('Potential script/malware code detected');
    riskScore += 40;
  }

  if (content.includes('<script>') || content.includes('onclick') || content.includes('eval(')) {
    indicators.push('Malicious JavaScript detected');
    riskScore += 35;
  }

  // Check for obfuscation techniques
  if (content.match(/[%#&]{3,}/)) {
    indicators.push('Potential code obfuscation detected');
    riskScore += 25;
  }

  const isPhishing = riskScore >= 40;

  return {
    isPhishing,
    risk_score: Math.min(100, riskScore),
    indicators,
    recommendation: isPhishing
      ? '⚠️ HIGH RISK: This file is likely malicious. Do not open or execute it.'
      : '✅ LOW RISK: This file appears safe, but always scan files before opening.',
    details: isPhishing
      ? `This file scored ${Math.min(100, riskScore)}/100 risk level. Malicious characteristics detected.`
      : `This file scored ${Math.min(100, riskScore)}/100 risk level. No major red flags detected.`
  };
}
