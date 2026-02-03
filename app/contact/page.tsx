'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In a real application, this would send an email
    // For now, we'll just simulate the submission
    try {
      // Simulate sending email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Get in touch with our team. We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form and we'll get back to you soon</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full h-32 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                {submitted && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                    <p className="text-sm text-green-500">✅ Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Email */}
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">📧</span> Email
                </h3>
                <p className="text-muted-foreground mb-2">Send us an email anytime:</p>
                <a
                  href="mailto:restuscontact@gmail.com"
                  className="text-primary hover:underline font-semibold text-lg"
                >
                  restuscontact@gmail.com
                </a>
                <p className="text-sm text-muted-foreground mt-3">
                  We respond to all emails within 24 hours.
                </p>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">💬</span> Support
                </h3>
                <p className="text-muted-foreground mb-4">
                  Have questions about our service? Check out our FAQ or reach out to our support team.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM (UTC)
                  </p>
                  <p className="text-sm">
                    <strong>Response Time:</strong> Usually within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Follow Us */}
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">🌐</span> Connect With Us
                </h3>
                <p className="text-muted-foreground mb-4">
                  Stay updated with the latest security news and tips.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Blog
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">How long does it take to scan a URL?</h4>
              <p className="text-muted-foreground text-sm">
                Most scans complete in less than 1 second. Complex file scans may take up to 10 seconds.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Is my data kept private?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! All your scan data is encrypted and stored securely. We never share your information with third
                parties.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Can I export my scan history?</h4>
              <p className="text-muted-foreground text-sm">
                Absolutely! You can export your entire scan history as a CSV file for record-keeping or compliance
                purposes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What should I do if I find a phishing site?</h4>
              <p className="text-muted-foreground text-sm">
                Report it through our platform, and we'll add it to our threat database. You can also report it to
                relevant authorities.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Is PhishGuard free?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! PhishGuard offers a free tier with unlimited scans. Premium features are available for enterprise
                users.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">How often is the threat database updated?</h4>
              <p className="text-muted-foreground text-sm">
                Our threat database is updated in real-time as new phishing threats are discovered and reported by our
                community and security researchers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
