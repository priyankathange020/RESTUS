'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [scanType, setScanType] = useState<'url' | 'email' | 'file'>('url');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        loadHistory(user.id);
      }
    };

    getUser();
  }, [router]);

  const loadHistory = async (userId: string) => {
    const { data, error } = await supabase
      .from('detection_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setHistory(data);
    }
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: scanType,
          input,
          userId: user?.id,
        }),
      });

      const data = await response.json();
      if (data.result) {
        setResult(data.result);
        if (user?.id) {
          loadHistory(user.id);
        }
      }
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">🛡️ PhishGuard</Link>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Link href="/history">
              <Button variant="outline" size="sm">History</Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="sm">Profile</Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scanner */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Phishing Detector</CardTitle>
                <CardDescription>Choose a detection method and submit your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Type Selection */}
                <div className="grid grid-cols-3 gap-4">
                  {(['url', 'email', 'file'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => { setScanType(type); setResult(null); setInput(''); }}
                      className={`p-4 rounded-lg border-2 transition ${
                        scanType === type
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {type === 'url' && '🔗'}
                        {type === 'email' && '📧'}
                        {type === 'file' && '📁'}
                      </div>
                      <p className="text-sm font-semibold capitalize">{type}</p>
                    </button>
                  ))}
                </div>

                {/* Input Form */}
                <form onSubmit={handleScan} className="space-y-4">
                  {scanType === 'url' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Enter URL</label>
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  )}

                  {scanType === 'email' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Paste Email Content</label>
                      <textarea
                        placeholder="Paste the full email content here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full h-32 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}

                  {scanType === 'file' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">File Name & Content</label>
                      <Input
                        type="text"
                        placeholder="filename.txt"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        disabled={loading}
                        className="mb-2"
                      />
                      <textarea
                        placeholder="Paste file content here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full h-32 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={loading || !input}
                  >
                    {loading ? 'Scanning...' : 'Scan Now'}
                  </Button>
                </form>

                {/* Results */}
                {result && (
                  <div className={`p-6 rounded-lg border-2 ${
                    result.isPhishing
                      ? 'bg-destructive/10 border-destructive'
                      : 'bg-green-500/10 border-green-500'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-semibold mb-2">
                          {result.isPhishing ? '⚠️ HIGH RISK' : '✅ LOW RISK'}
                        </p>
                        <p className="font-semibold">{result.recommendation}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold">{result.risk_score}</p>
                        <p className="text-xs text-muted-foreground">/100 Risk</p>
                      </div>
                    </div>

                    {result.indicators.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Detected Indicators:</p>
                        <ul className="space-y-1 text-sm">
                          {result.indicators.map((indicator: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-lg leading-none mt-0.5">•</span>
                              <span>{indicator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground">{result.details}</p>

                    <Button
                      className="mt-4 bg-primary hover:bg-primary/90 w-full"
                      onClick={() => {
                        // Report functionality
                        alert('Report feature coming soon!');
                      }}
                    >
                      Report This Content
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent History */}
          <div>
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Scans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No scans yet</p>
                ) : (
                  history.map((scan) => (
                    <div
                      key={scan.id}
                      className="p-3 bg-background rounded-lg border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="capitalize">{scan.type}</Badge>
                        <span className={`text-xs font-semibold ${
                          scan.result.isPhishing
                            ? 'text-destructive'
                            : 'text-green-500'
                        }`}>
                          {scan.result.isPhishing ? 'HIGH RISK' : 'SAFE'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{scan.input}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(scan.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
