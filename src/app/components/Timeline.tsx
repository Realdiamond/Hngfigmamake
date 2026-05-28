import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  Globe,
  Shield,
  Activity,
  AlertTriangle,
  RefreshCw,
  Search,
  Calendar
} from "lucide-react";
import { Input } from "./ui/input";

const timelineEvents = [
  {
    id: 1,
    type: "scan",
    status: "success",
    title: "Security Scan Completed",
    domain: "example.com",
    details: "Full security scan completed successfully. No new vulnerabilities detected.",
    timestamp: "2024-05-26T10:45:00",
    duration: "2m 34s",
    findings: 0,
  },
  {
    id: 2,
    type: "ssl",
    status: "warning",
    title: "SSL Status Changed",
    domain: "app.example.com",
    details: "SSL certificate status changed from 'Valid' to 'Expiring Soon' (15 days remaining).",
    timestamp: "2024-05-26T09:30:00",
    duration: "1s",
  },
  {
    id: 3,
    type: "dns",
    status: "success",
    title: "DNS Verification Check",
    domain: "api.example.com",
    details: "DNS records verified successfully. TSS ownership confirmed.",
    timestamp: "2024-05-26T08:00:00",
    duration: "5s",
  },
  {
    id: 4,
    type: "scan",
    status: "failed",
    title: "Monitoring Scan Failed",
    domain: "staging.example.com",
    details: "Connection timeout while attempting to scan staging.example.com",
    timestamp: "2024-05-26T07:15:00",
    duration: "30s",
    error: "Connection refused: timeout after 30 seconds",
  },
  {
    id: 5,
    type: "risk",
    status: "warning",
    title: "Risk Level Changed",
    domain: "example.com",
    details: "Overall risk increased from Medium to High due to new CVE-2024-1234",
    timestamp: "2024-05-25T18:00:00",
    riskChange: "Medium → High",
  },
  {
    id: 6,
    type: "scan",
    status: "success",
    title: "Security Scan Completed",
    domain: "blog.example.com",
    details: "Scheduled security scan completed. 2 medium-severity issues found.",
    timestamp: "2024-05-25T16:00:00",
    duration: "3m 12s",
    findings: 2,
  },
  {
    id: 7,
    type: "ssl",
    status: "success",
    title: "SSL Certificate Renewed",
    domain: "shop.example.com",
    details: "SSL certificate successfully renewed. Valid for 365 days.",
    timestamp: "2024-05-25T14:30:00",
    duration: "45s",
  },
  {
    id: 8,
    type: "dns",
    status: "failed",
    title: "TSS Verification Failed",
    domain: "dev.example.com",
    details: "Unable to verify domain ownership. TSS record not found.",
    timestamp: "2024-05-25T12:00:00",
    duration: "10s",
    error: "TSS record not found in DNS",
  },
  {
    id: 9,
    type: "scan",
    status: "success",
    title: "Security Scan Completed",
    domain: "api.example.com",
    details: "Automated security scan completed. Security score improved by 5 points.",
    timestamp: "2024-05-25T10:00:00",
    duration: "2m 45s",
    findings: 1,
  },
  {
    id: 10,
    type: "risk",
    status: "success",
    title: "Risk Assessment Updated",
    domain: "example.com",
    details: "Monthly risk assessment completed. Overall security posture improved.",
    timestamp: "2024-05-25T08:00:00",
  },
];

export function Timeline() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "scan":
        return Shield;
      case "ssl":
        return Lock;
      case "dns":
        return Globe;
      case "risk":
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "warning":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return CheckCircle2;
      case "warning":
        return AlertTriangle;
      case "failed":
        return XCircle;
      default:
        return Clock;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Monitoring Timeline</h1>
          <p className="text-slate-500 mt-1">Complete history of monitoring events and activities</p>
        </div>
        <Button>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Successful</p>
              <p className="text-2xl font-bold text-green-900 mt-1">6</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium">Warnings</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">2</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-amber-600" />
          </div>
        </Card>
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Failed</p>
              <p className="text-2xl font-bold text-red-900 mt-1">2</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Events</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">10</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search timeline events..." className="pl-10" />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-slate-200 rounded-md text-sm">
              <option>All Types</option>
              <option>Security Scans</option>
              <option>SSL Events</option>
              <option>DNS Checks</option>
              <option>Risk Changes</option>
            </select>
            <select className="px-3 py-2 border border-slate-200 rounded-md text-sm">
              <option>All Status</option>
              <option>Success</option>
              <option>Warning</option>
              <option>Failed</option>
            </select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="scans">Scans</TabsTrigger>
          <TabsTrigger value="ssl">SSL</TabsTrigger>
          <TabsTrigger value="dns">DNS</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

            {/* Timeline Events */}
            <div className="space-y-6">
              {timelineEvents.map((event, index) => {
                const EventIcon = getEventIcon(event.type);
                const StatusIcon = getStatusIcon(event.status);

                return (
                  <div key={event.id} className="relative pl-16">
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-5 top-6 w-6 h-6 rounded-full border-4 border-white ${
                        event.status === "success"
                          ? "bg-green-500"
                          : event.status === "warning"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      } z-10`}
                    />

                    <Card className="p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${getStatusColor(event.status)}`}>
                          <EventIcon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-slate-900">{event.title}</h3>
                                <Badge
                                  variant="outline"
                                  className={event.status === "success" ? "border-green-200 text-green-700" : event.status === "warning" ? "border-amber-200 text-amber-700" : "border-red-200 text-red-700"}
                                >
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {event.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {event.type}
                                </Badge>
                                <span className="text-sm text-slate-600">{event.domain}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-900">
                                {formatTimestamp(event.timestamp)}
                              </div>
                              <div className="text-xs text-slate-500">
                                {getRelativeTime(event.timestamp)}
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-slate-700 mb-3">{event.details}</p>

                          <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                            {event.duration && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Duration: {event.duration}</span>
                              </div>
                            )}
                            {event.findings !== undefined && (
                              <div className="flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Findings: {event.findings}</span>
                              </div>
                            )}
                            {event.riskChange && (
                              <div className="flex items-center gap-1">
                                <Activity className="h-3 w-3" />
                                <span>Risk: {event.riskChange}</span>
                              </div>
                            )}
                          </div>

                          {event.error && (
                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-xs font-medium text-red-900">Error Details:</p>
                              <p className="text-xs text-red-700 mt-1">{event.error}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline">Load More Events</Button>
          </div>
        </TabsContent>

        <TabsContent value="scans" className="mt-6">
          <p className="text-sm text-slate-500 p-4">Filter for security scan events</p>
        </TabsContent>

        <TabsContent value="ssl" className="mt-6">
          <p className="text-sm text-slate-500 p-4">Filter for SSL-related events</p>
        </TabsContent>

        <TabsContent value="dns" className="mt-6">
          <p className="text-sm text-slate-500 p-4">Filter for DNS verification events</p>
        </TabsContent>

        <TabsContent value="risk" className="mt-6">
          <p className="text-sm text-slate-500 p-4">Filter for risk assessment events</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
