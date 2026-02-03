'use client';

import { Tooltip } from "@/components/ui/tooltip"
import { CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { useMemo } from "react"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Activity, TrendingUp, Shield } from 'lucide-react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const phishingData = [
  {
    year: 2015,
    incidents: 150000,
    threatLevel: 'Low',
    attacks: 'Email',
    objective: 'Credential Theft',
    sector: 'Banking',
  },
  {
    year: 2016,
    incidents: 220000,
    threatLevel: 'Low',
    attacks: 'Email',
    objective: 'Malware Delivery',
    sector: 'E-commerce',
  },
  {
    year: 2017,
    incidents: 310000,
    threatLevel: 'Medium',
    attacks: 'Email',
    objective: 'Credential Theft',
    sector: 'Social Media',
  },
  {
    year: 2018,
    incidents: 520000,
    threatLevel: 'Medium',
    attacks: 'Email, Fake Websites',
    objective: 'Financial Fraud',
    sector: 'Banking',
  },
  {
    year: 2019,
    incidents: 780000,
    threatLevel: 'Medium',
    attacks: 'Email, SMS',
    objective: 'Credential Theft',
    sector: 'Cloud Services',
  },
  {
    year: 2020,
    incidents: 1200000,
    threatLevel: 'High',
    attacks: 'Email, SMS',
    objective: 'COVID-19 Scams',
    sector: 'Healthcare',
  },
  {
    year: 2021,
    incidents: 1800000,
    threatLevel: 'High',
    attacks: 'Email, SMS, Social Media',
    objective: 'Credential Theft',
    sector: 'Corporate',
  },
  {
    year: 2022,
    incidents: 2400000,
    threatLevel: 'Critical',
    attacks: 'Email, QR Codes',
    objective: 'Business Email Compromise',
    sector: 'Finance',
  },
  {
    year: 2023,
    incidents: 3100000,
    threatLevel: 'Critical',
    attacks: 'Email, AI-generated Content',
    objective: 'Advanced Phishing',
    sector: 'Technology',
  },
  {
    year: 2024,
    incidents: 3800000,
    threatLevel: 'Critical',
    attacks: 'Email, SMS, Voice (Vishing)',
    objective: 'Deepfake Scams',
    sector: 'Corporate',
  },
  {
    year: 2025,
    incidents: 4500000,
    threatLevel: 'Critical',
    attacks: 'Email, Messaging Apps',
    objective: 'AI-driven Phishing',
    sector: 'All Sectors',
  },
  {
    year: 2026,
    incidents: 5200000,
    threatLevel: 'Critical',
    attacks: 'Email, SMS, Voice, Social Media',
    objective: 'Highly Targeted AI Phishing',
    sector: 'All Sectors',
  },
]

const threatLevelColors: Record<string, string> = {
  Low: '#10b981',
  Medium: '#f59e0b',
  High: '#ef4444',
  Critical: '#dc2626',
}

const threatLevelBadgeVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  Low: 'secondary',
  Medium: 'default',
  High: 'destructive',
  Critical: 'destructive',
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">🛡️ PhishGuard</h1>
          <div className="flex gap-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost">{user.email}</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Protect Yourself from Phishing Attacks
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Advanced AI-powered phishing detection. Scan URLs, analyze emails, and detect malicious files in real-time.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 my-20">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-3xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2">URL Scanner</h3>
            <p className="text-muted-foreground">
              Detect malicious URLs instantly with advanced pattern matching and threat analysis.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-3xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-2">Email Analyzer</h3>
            <p className="text-muted-foreground">
              Identify phishing emails by analyzing sender, content, and suspicious indicators.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-3xl mb-4">📁</div>
            <h3 className="text-xl font-semibold mb-2">File Detection</h3>
            <p className="text-muted-foreground">
              Scan files and attachments for malicious code and suspicious characteristics.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary">5.2M+</div>
              <p className="text-muted-foreground">Phishing Attacks in 2026</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">99.2%</div>
              <p className="text-muted-foreground">Detection Accuracy</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <p className="text-muted-foreground">Real-time Protection</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">3 Types</div>
              <p className="text-muted-foreground">Detection Methods</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="space-y-4">
            <div className="flex gap-4 bg-card border border-border rounded-lg p-6">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-2">Choose Detection Type</h4>
                <p className="text-muted-foreground">
                  Select whether you want to scan a URL, analyze an email, or check a file.
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-card border border-border rounded-lg p-6">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-2">Submit Your Content</h4>
                <p className="text-muted-foreground">
                  Paste the URL, email content, or upload the file you want to scan.
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-card border border-border rounded-lg p-6">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-2">Get Instant Results</h4>
                <p className="text-muted-foreground">
                  Receive a detailed risk assessment with specific indicators and recommendations.
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-card border border-border rounded-lg p-6">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-2">Save & Report</h4>
                <p className="text-muted-foreground">
                  Save results for later reference or report malicious content to help others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 border-t border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Start Protecting Yourself Today</h3>
          <p className="text-muted-foreground mb-8">
            Join thousands of users staying safe from phishing attacks.
          </p>
          {!user && (
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Sign Up Now
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">PhishGuard</h4>
              <p className="text-muted-foreground text-sm">Your trusted phishing detection tool.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                <li><Link href="/dashboard" className="hover:text-primary">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <p className="text-sm text-muted-foreground">Email: restuscontact@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 PhishGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedThreatLevel, setSelectedThreatLevel] = useState<string>('all');

  const filteredData = useMemo(() => {
    return phishingData.filter((item) => {
      const yearMatch = selectedYear === 'all' || item.year === parseInt(selectedYear);
      const threatMatch = selectedThreatLevel === 'all' || item.threatLevel === selectedThreatLevel;
      return yearMatch && threatMatch;
    });
  }, [selectedYear, selectedThreatLevel]);

  const totalIncidents = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.incidents, 0),
    [filteredData]
  );

  const avgGrowthRate = useMemo(() => {
    if (filteredData.length < 2) return 0;
    const first = filteredData[0].incidents;
    const last = filteredData[filteredData.length - 1].incidents;
    return ((last - first) / first) * 100;
  }, [filteredData]);

  const threatDistribution = useMemo(() => {
    const distribution: Record<string, number> = {};
    filteredData.forEach((item) => {
      distribution[item.threatLevel] = (distribution[item.threatLevel] || 0) + item.incidents;
    });
    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  const sectorDistribution = useMemo(() => {
    const distribution: Record<string, number> = {};
    filteredData.forEach((item) => {
      distribution[item.sector] = (distribution[item.sector] || 0) + item.incidents;
    });
    return Object.entries(distribution)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/20 p-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Phishing Threat Intelligence</h1>
                <p className="text-sm text-muted-foreground">Real-time attack analysis and trends (2015-2026)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground">Filter by Year Range</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years (2015-2026)</SelectItem>
                <SelectItem value="2015">2015</SelectItem>
                <SelectItem value="2020">2020 & Later</SelectItem>
                <SelectItem value="2022">2022 & Later (Critical Era)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground">Filter by Threat Level</label>
            <Select value={selectedThreatLevel} onValueChange={setSelectedThreatLevel}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Threat Levels</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Activity className="h-4 w-4 text-accent" />
                Total Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {(totalIncidents / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                {filteredData.length} data points in selection
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-accent" />
                Growth Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {avgGrowthRate > 0 ? '+' : ''}
                {avgGrowthRate.toFixed(0)}%
              </div>
              <p className="text-xs text-muted-foreground">Overall trend in selection</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Shield className="h-4 w-4 text-accent" />
                Latest Year
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2026</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant="destructive" className="mt-2">
                  Critical
                </Badge>
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-accent" />
                Attack Vectors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">7</div>
              <p className="text-xs text-muted-foreground">Email, SMS, Voice, Social Media, etc.</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Incident Trends */}
          <Card className="col-span-full border-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Phishing Incidents Over Time</CardTitle>
              <CardDescription>Reported incidents from 2015 to 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1f3a',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [(value as number).toLocaleString(), 'Incidents']}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="incidents"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#0ea5e9', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Incidents"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Threat Level Distribution */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Threat Level Distribution</CardTitle>
              <CardDescription>Incidents by severity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={threatDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={100} dataKey="value">
                    {threatDistribution.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={threatLevelColors[entry.name] || '#3b82f6'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => (value as number).toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {threatDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-semibold text-foreground">
                      {(item.value / 1000000).toFixed(1)}M
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attack Methods Bar Chart */}
          <Card className="col-span-full border-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Targeted Sectors</CardTitle>
              <CardDescription>Incident count by industry</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sectorDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1f3a',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [(value as number).toLocaleString(), 'Incidents']}
                  />
                  <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} name="Incidents" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Data Table */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Latest Threat Report</CardTitle>
              <CardDescription>2026 Status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredData.slice(-1).map((item) => (
                <div key={item.year} className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Attack Vector</p>
                    <p className="text-sm font-semibold text-foreground">{item.attacks}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Primary Objective</p>
                    <p className="text-sm font-semibold text-foreground">{item.objective}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Threat Level</p>
                    <Badge variant={threatLevelBadgeVariant[item.threatLevel]} className="mt-1">
                      {item.threatLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="mt-8 border-border bg-card">
          <CardHeader>
            <CardTitle>Complete Attack Timeline</CardTitle>
            <CardDescription>Detailed phishing threat data from 2015 to 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Year</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Incidents</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Attack Vectors</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Objective</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Sector</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Threat Level</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.year} className="border-b border-border hover:bg-primary/5">
                      <td className="px-4 py-3 text-foreground">{item.year}</td>
                      <td className="px-4 py-3 text-foreground font-semibold">
                        {(item.incidents / 1000000).toFixed(2)}M
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{item.attacks}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.objective}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.sector}</td>
                      <td className="px-4 py-3">
                        <Badge variant={threatLevelBadgeVariant[item.threatLevel]}>
                          {item.threatLevel}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
