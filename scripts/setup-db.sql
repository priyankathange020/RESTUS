-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Detection results table
CREATE TABLE IF NOT EXISTS detection_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  detection_type TEXT NOT NULL, -- 'url', 'email', 'file'
  input_content TEXT NOT NULL,
  risk_level TEXT NOT NULL, -- 'safe', 'suspicious', 'dangerous'
  risk_score DECIMAL(5,2) NOT NULL, -- 0-100
  indicators JSONB,
  report_content JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Reported phishing table
CREATE TABLE IF NOT EXISTS reported_phishing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  detection_result_id UUID REFERENCES detection_results(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  report_type TEXT NOT NULL, -- 'url', 'email', 'other'
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'confirmed'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE detection_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE reported_phishing ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view their own detection results" ON detection_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own detection results" ON detection_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own reports" ON reported_phishing
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reports" ON reported_phishing
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Phishing patterns database
CREATE TABLE IF NOT EXISTS phishing_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_type TEXT NOT NULL, -- 'url_pattern', 'email_pattern', 'keyword'
  pattern_value TEXT NOT NULL,
  severity TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert common phishing patterns from the data
INSERT INTO phishing_patterns (pattern_type, pattern_value, severity, description) VALUES
('keyword', 'urgent', 'medium', 'Creates sense of urgency'),
('keyword', 'verify account', 'high', 'Common phishing tactic'),
('keyword', 'confirm password', 'high', 'Credential theft attempt'),
('keyword', 'update payment', 'high', 'Financial credential targeting'),
('keyword', 'click here', 'medium', 'Suspicious link'),
('keyword', 'act now', 'medium', 'Urgency creation'),
('url_pattern', 'bit.ly', 'medium', 'URL shortener abuse'),
('url_pattern', 'tinyurl', 'medium', 'URL shortener abuse'),
('email_pattern', 'no-reply@', 'low', 'Common legitimate pattern'),
('email_pattern', '@noreply', 'low', 'Common legitimate pattern');
