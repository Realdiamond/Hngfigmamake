import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Search,
  Lock,
  Globe,
  Shield,
  AlertCircle
} from "lucide-react";
import { Input } from "./ui/input";

const alerts = [
  {
    id: 1,
    type: "SSL Expiry",
    severity: "critical",
    title: "SSL Certificate Expiring in 7 Days",
    domain: "app.example.com",
    message: "SSL certificate for app.example.com will expire on June 2, 2026",
    timestamp: "2024-05-26T10:30:00",
    isRead: false,
    icon: Lock
  },
  {
    id: 2,
    type: "SSL Expiry",
    severity: "warning",
    title: "SSL Certificate Expiring in 15 Days",
    domain: "staging.example.com",
    message: "SSL certificate for staging.example.com will expire on June 10, 2026",
    timestamp: "2024-05-26T09:15:00",
    isRead: false,
    icon: Lock
  },
  {
    id: 3,
    type: "Monitoring Failed",
    severity: "high",
    title: "Domain Monitoring Failed",
    domain: "api.example.com",
    message: "Failed to complete security scan for api.example.com. Connection timeout.",
    timestamp: "2024-05-26T08:00:00",
    isRead: true,
    icon: XCircle
  },
  {
    id: 4,
    type: "Domain Verification",
    severity: "high",
    title: "TSS Verification Failed",
    domain: "dev.example.com",
    message: "Unable to verify domain ownership for dev.example.com. TSS record not found.",
    timestamp: "2024-05-25T16:45:00",
    isRead: true,
    icon: Globe
  },
  {
    id: 5,
    type: "Risk Escalation",
    severity: "critical",
    title: "Security Risk Escalated to Critical",
    domain: "example.com",
    message: "CVE-2024-1234 vulnerability detected. Immediate action required.",
    timestamp: "2024-05-25T14:20:00",
    isRead: false,
    icon: Shield
  },
  {
    id: 6,
    type: "SSL Expiry",
    severity: "medium",
    title: "SSL Certificate Expiring in 30 Days",
    domain: "blog.example.com",
    message: "SSL certificate for blog.example.com will expire on June 25, 2026",
    timestamp: "2024-05-25T10:00:00",
    isRead: true,
    icon: Lock
  },
  {
    id: 7,
    type: "Monitoring Success",
    severity: "low",
    title: "Security Scan Completed",
    domain: "example.com",
    message: "Successfully completed security scan. No new issues detected.",
    timestamp: "2024-05-25T08:30:00",
    isRead: true,
    icon: CheckCircle2
  },
  {
    id: 8,
    type: "Risk Escalation",
    severity: "high",
    title: "New High-Severity Vulnerability",
    domain: "api.example.com",
    message: "High-severity vulnerability detected in API endpoint authentication.",
    timestamp: "2024-05-24T18:00:00",
    isRead: true,
    icon: AlertCircle
  },
];

export function Alerts() {
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterRead, setFilterRead] = useState<string>("all");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-100 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-100 border-orange-200";
      case "warning":
        return "text-amber-600 bg-amber-100 border-amber-200";
      case "medium":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "low":
        return "text-blue-600 bg-blue-100 border-blue-200";
      default:
        return "text-slate-600 bg-slate-100 border-slate-200";
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 hover:bg-red-500";
      case "high":
        return "bg-orange-500 hover:bg-orange-500";
      case "warning":
        return "bg-amber-500 hover:bg-amber-500";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-500";
      case "low":
        return "bg-blue-500 hover:bg-blue-500";
      default:
        return "bg-slate-500 hover:bg-slate-500";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filterSeverity !== "all" && alert.severity !== filterSeverity) return false;
    if (filterRead === "unread" && alert.isRead) return false;
    if (filterRead === "read" && !alert.isRead) return false;
    return true;
  });

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Alerts & Notifications</h1>
          <p className="text-slate-500 mt-1">
            {unreadCount} unread alert{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <Button>
          <Bell className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Critical</p>
              <p className="text-2xl font-bold text-red-900 mt-1">2</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">High</p>
              <p className="text-2xl font-bold text-orange-900 mt-1">3</p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium">Medium</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">1</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-amber-600" />
          </div>
        </Card>
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Info</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">2</p>
            </div>
            <Bell className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search alerts..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="px-3 py-2 border border-slate-200 rounded-md text-sm"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="warning">Warning</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              className="px-3 py-2 border border-slate-200 rounded-md text-sm"
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
            >
              <option value="all">All Alerts</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="ssl">SSL Alerts</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="domain">Domain</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {filteredAlerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <Card
                key={alert.id}
                className={`p-5 ${!alert.isRead ? "border-l-4 border-l-blue-500" : ""} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getSeverityColor(alert.severity)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900">{alert.title}</h3>
                          {!alert.isRead && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {alert.type}
                          </Badge>
                          <Badge className={`text-xs ${getSeverityBadgeColor(alert.severity)}`}>
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-slate-500">{alert.domain}</span>
                        </div>
                        <p className="text-sm text-slate-700">{alert.message}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimestamp(alert.timestamp)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                        {!alert.isRead && (
                          <Button variant="outline" size="sm">
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="ssl" className="space-y-3 mt-4">
          {filteredAlerts
            .filter((alert) => alert.type === "SSL Expiry")
            .map((alert) => {
              const Icon = alert.icon;
              return (
                <Card
                  key={alert.id}
                  className={`p-5 ${!alert.isRead ? "border-l-4 border-l-blue-500" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getSeverityColor(alert.severity)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{alert.title}</h3>
                      <p className="text-sm text-slate-700 mb-2">{alert.message}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
        </TabsContent>

        <TabsContent value="monitoring" className="mt-4">
          <p className="text-sm text-slate-500 p-4">
            Filter for monitoring-related alerts
          </p>
        </TabsContent>

        <TabsContent value="domain" className="mt-4">
          <p className="text-sm text-slate-500 p-4">
            Filter for domain-related alerts
          </p>
        </TabsContent>

        <TabsContent value="risk" className="mt-4">
          <p className="text-sm text-slate-500 p-4">
            Filter for risk escalation alerts
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
