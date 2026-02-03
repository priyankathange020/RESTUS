'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">🛡️ PhishGuard</Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About PhishGuard</h1>
          <p className="text-xl text-muted-foreground">
            Protecting the internet from phishing attacks, one scan at a time.
          </p>
        </div>

        {/* Mission */}
        <Card className="border-border bg-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              At PhishGuard, we believe that cybersecurity should be accessible to everyone. Our mission is to
              empower individuals and organizations with the tools to detect and prevent phishing attacks before
              they cause damage.
            </p>
            <p>
              With over 5.2 million phishing attacks reported in 2026 alone, the need for advanced detection tools
              has never been greater. We combine cutting-edge pattern matching, threat intelligence, and machine
              learning to provide real-time protection against evolving threats.
            </p>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card className="border-border bg-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We envision a world where phishing attacks are neutralized before they reach users. By providing
              comprehensive detection capabilities and educational resources, we aim to create a safer digital
              environment for everyone.
            </p>
            <p>
              PhishGuard is committed to continuous innovation, adapting to new attack vectors, and staying ahead
              of emerging threats.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Why Choose PhishGuard?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <p className="text-3xl mb-4">🚀</p>
                <h3 className="font-semibold mb-2">Advanced Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Multi-layered detection using pattern matching, threat databases, and behavioral analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <p className="text-3xl mb-4">🔒</p>
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and never shared with third parties. We prioritize your privacy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <p className="text-3xl mb-4">⚡</p>
                <h3 className="font-semibold mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get real-time scanning results with detailed risk assessments and recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <p className="text-3xl mb-4">📱</p>
                <h3 className="font-semibold mb-2">Multi-Type Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Scan URLs, analyze emails, and check files all from one platform.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <p className="text-3xl mb-4">📊</p>
                <h3 className="font-semibold mb-2">Detailed History</h3>
                <p className="text-sm text-muted-foreground">
                  Keep track of all your scans and export reports for compliance purposes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <p className="text-3xl mb-4">🤝</p>
                <h3 className="font-semibold mb-2">Community Reporting</h3>
                <p className="text-sm text-muted-foreground">
                  Report malicious content to help protect the entire community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology */}
        <Card className="border-border bg-card mb-8">
          <CardHeader>
            <CardTitle>Our Technology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Pattern Matching Engine</h4>
              <p>
                Our proprietary pattern matching system analyzes URLs, emails, and files against thousands of known
                phishing indicators and attack signatures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Threat Database</h4>
              <p>
                We maintain an extensive database of known phishing campaigns, malicious domains, and threat actors,
                constantly updated with new intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Risk Scoring Algorithm</h4>
              <p>
                Our AI-powered risk scoring system evaluates multiple factors to provide an accurate, actionable risk
                assessment for each scan.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="border-border bg-card mb-8">
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>Dedicated cybersecurity professionals</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              PhishGuard is built by a team of cybersecurity experts, data scientists, and software engineers
              passionate about protecting users from online threats. With over 50 years of combined experience in
              cybersecurity and fraud prevention, we bring industry-leading expertise to every solution we build.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Join Us in Fighting Phishing</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start protecting yourself and your organization from phishing attacks today.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
