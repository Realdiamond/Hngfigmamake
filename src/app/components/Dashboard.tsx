import { Switch } from "./ui/switch";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  MessageSquare,
  Globe,
  Lock,
  Calendar,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const securityTrendData = [
  { date: "Mon", score: 85 },
  { date: "Tue", score: 87 },
  { date: "Wed", score: 83 },
  { date: "Thu", score: 89 },
  { date: "Fri", score: 92 },
  { date: "Sat", score: 90 },
  { date: "Sun", score: 92 },
];

const riskData = [
  { name: "Critical", value: 2, color: "#ef4444" },
  { name: "High", value: 5, color: "#f97316" },
  { name: "Medium", value: 12, color: "#eab308" },
  { name: "Low", value: 8, color: "#22c55e" },
];

const domains = [
  { name: "example.com", status: "active", score: 92, ssl: "Valid" },
  { name: "api.example.com", status: "active", score: 88, ssl: "Valid" },
  { name: "app.example.com", status: "warning", score: 75, ssl: "Expiring Soon" },
  { name: "staging.example.com", status: "active", score: 90, ssl: "Valid" },
];

const recentAlerts = [
  { type: "SSL", message: "SSL certificate expiring in 15 days", domain: "app.example.com", time: "2 hours ago", severity: "warning" },
  { type: "Security", message: "New vulnerability detected", domain: "example.com", time: "5 hours ago", severity: "high" },
  { type: "DNS", message: "DNS configuration changed", domain: "api.example.com", time: "1 day ago", severity: "info" },
];

const timelineEvents = [
  { event: "Security scan completed", time: "10 minutes ago", status: "success" },
  { event: "SSL certificate checked", time: "1 hour ago", status: "success" },
  { event: "Domain verification failed", time: "3 hours ago", status: "error" },
  { event: "Risk assessment updated", time: "6 hours ago", status: "success" },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Monitoring Dashboard</h1>
          <p className="text-slate-500 mt-1">Real-time security monitoring for your domains</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">Monitoring</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Monitoring Status */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Shield className="h-12 w-12 text-blue-600" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Monitoring Active</h2>
              <p className="text-sm text-slate-600">All systems operational</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Last Scan</div>
            <div className="font-semibold text-slate-900">2 minutes ago</div>
            <div className="text-xs text-slate-500 mt-1">Next scan in 28 minutes</div>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600">Security Score</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">92</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+5 from last week</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Issues</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">27</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="destructive" className="text-xs">2 Critical</Badge>
                <Badge variant="default" className="text-xs bg-orange-500">5 High</Badge>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600">SSL Certificates</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">4</h3>
              <div className="flex items-center gap-1 mt-2 text-amber-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">1 expiring soon</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Lock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600">Monitored Domains</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">4</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">All verified</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Trend */}
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Security Score Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={securityTrendData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[0, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Risk Distribution */}
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Risk Severity Breakdown</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* SSL Certificates & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SSL Certificates */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">SSL Certificates</h3>
            <Badge variant="outline">4 Total</Badge>
          </div>
          <div className="space-y-3">
            {domains.map((domain) => (
              <div key={domain.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className={`h-5 w-5 ${domain.ssl === "Valid" ? "text-green-600" : "text-amber-600"}`} />
                  <div>
                    <div className="font-medium text-slate-900">{domain.name}</div>
                    <div className="text-xs text-slate-500">
                      {domain.ssl === "Valid" ? "Valid for 180 days" : "Expires in 15 days"}
                    </div>
                  </div>
                </div>
                <Badge variant={domain.ssl === "Valid" ? "default" : "destructive"} className={domain.ssl === "Valid" ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                  {domain.ssl}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Recent Alerts</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                  alert.severity === "high" ? "text-red-600" :
                  alert.severity === "warning" ? "text-amber-600" :
                  "text-blue-600"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{alert.type}</Badge>
                    <span className="text-xs text-slate-500">{alert.time}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 mt-1">{alert.message}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{alert.domain}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Timeline & AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monitoring Timeline */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Recent Activity</h3>
            <Activity className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`h-2 w-2 mt-2 rounded-full ${
                  event.status === "success" ? "bg-green-500" : "bg-red-500"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{event.event}</p>
                  <p className="text-xs text-slate-500">{event.time}</p>
                </div>
                {event.status === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* AI Assistant */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900">AI Security Assistant</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <p className="text-sm text-slate-700">
                Based on recent scans, I recommend prioritizing the SSL certificate renewal for
                <span className="font-medium"> app.example.com</span>. It expires in 15 days.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <p className="text-sm text-slate-700">
                Your overall security posture has improved by <span className="font-medium text-green-600">5%</span> this week.
                Great job addressing the medium-priority vulnerabilities!
              </p>
            </div>
            <Button className="w-full" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask AI Assistant
            </Button>
          </div>
        </Card>
      </div>

      {/* Monitored Domains */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Monitored Domains</h3>
          <Button size="sm">Add Domain</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {domains.map((domain) => (
            <div key={domain.name} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <Globe className="h-5 w-5 text-slate-600" />
                <Badge variant={domain.status === "active" ? "default" : "destructive"} className={domain.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                  {domain.status}
                </Badge>
              </div>
              <h4 className="font-medium text-slate-900 mb-1">{domain.name}</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Score: {domain.score}</span>
                <span className="text-slate-500">{domain.ssl}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Changes Detected */}
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Changes Since Last Scan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">Resolved</span>
            </div>
            <p className="text-2xl font-bold text-green-900">3</p>
            <p className="text-sm text-green-700">Issues fixed</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-amber-900">New</span>
            </div>
            <p className="text-2xl font-bold text-amber-900">1</p>
            <p className="text-sm text-amber-700">New issue detected</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">Updated</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">2</p>
            <p className="text-sm text-blue-700">DNS records changed</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
