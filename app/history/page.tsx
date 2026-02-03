'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function History() {
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
    const { data } = await supabase
      .from('detection_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (data) {
      setHistory(data);
    }
    setLoading(false);
  };

  const handleExport = () => {
    const csv = [
      ['Type', 'Input', 'Risk Score', 'Is Phishing', 'Date'].join(','),
      ...history.map(h =>
        [
          h.type,
          h.input.substring(0, 50),
          h.result.risk_score,
          h.result.isPhishing ? 'YES' : 'NO',
          new Date(h.created_at).toLocaleString()
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phishing_history_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('detection_results')
      .delete()
      .eq('id', id);

    if (!error) {
      setHistory(history.filter(h => h.id !== id));
    }
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
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="sm">Profile</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Scan History</h1>
          <p className="text-muted-foreground">View and manage all your previous scans</p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <Card className="border-border bg-card mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Scans ({history.length})</CardTitle>
                  <CardDescription>Complete detection history</CardDescription>
                </div>
                <Button
                  onClick={handleExport}
                  disabled={history.length === 0}
                  className="bg-primary hover:bg-primary/90"
                >
                  📥 Export as CSV
                </Button>
              </CardHeader>
            </Card>

            {history.length === 0 ? (
              <Card className="border-border bg-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No scan history yet</p>
                  <Link href="/dashboard">
                    <Button className="bg-primary hover:bg-primary/90">Start Scanning</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {history.map((scan) => (
                  <div
                    key={scan.id}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">
                            {scan.type === 'url' && '🔗'}
                            {scan.type === 'email' && '📧'}
                            {scan.type === 'file' && '📁'}
                          </span>
                          <div>
                            <p className="font-semibold capitalize">{scan.type} Scan</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(scan.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 break-all">
                          {scan.input}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge
                            variant={scan.result.isPhishing ? 'destructive' : 'secondary'}
                          >
                            {scan.result.isPhishing ? '⚠️ HIGH RISK' : '✅ SAFE'}
                          </Badge>
                          <Badge variant="outline">
                            Risk: {scan.result.risk_score}/100
                          </Badge>
                        </div>

                        {scan.result.indicators.length > 0 && (
                          <div className="text-sm">
                            <p className="font-semibold mb-2">Detected: {scan.result.indicators.length} indicators</p>
                            <ul className="space-y-1">
                              {scan.result.indicators.slice(0, 3).map((ind: string, idx: number) => (
                                <li key={idx} className="text-muted-foreground">• {ind}</li>
                              ))}
                              {scan.result.indicators.length > 3 && (
                                <li className="text-muted-foreground">• +{scan.result.indicators.length - 3} more</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(scan.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
