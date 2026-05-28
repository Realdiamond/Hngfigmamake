import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  CheckCircle2,
  ChevronLeft,
  Clock,
  Shield,
  ShieldCheck,
  Lock,
  Globe,
  Activity,
  Settings,
  ScanLine,
  RefreshCw,
  Search,
  FileText,
  AlertTriangle,
} from "lucide-react";

const domainMap: Record<string, string> = {
  "realdiamonddigital-studio": "realdiamonddigital.studio",
  "api-example-com": "api.example.com",
  "app-example-com": "app.example.com",
};

const timelineEvents = [
  {
    id: 1,
    icon: ScanLine,
    title: "Scan Completed",
    detail: "All 47 endpoints checked. No new vulnerabilities detected.",
    time: "2 hours ago",
    color: "text-green-600",
    bg: "bg-green-100",
    dot: "bg-green-500",
  },
  {
    id: 2,
    icon: Lock,
    title: "SSL Certificate Checked",
    detail: "Certificate valid. Expires in 45 days.",
    time: "2 hours ago",
    color: "text-blue-600",
    bg: "bg-blue-100",
    dot: "bg-blue-500",
  },
  {
    id: 3,
    icon: Settings,
    title: "Settings Updated",
    detail: "Scan frequency changed from Daily to Hourly.",
    time: "Yesterday",
    color: "text-purple-600",
    bg: "bg-purple-100",
    dot: "bg-purple-500",
  },
  {
    id: 4,
    icon: RefreshCw,
    title: "Scan Completed",
    detail: "2 medium vulnerabilities identified.",
    time: "2 days ago",
    color: "text-amber-600",
    bg: "bg-amber-100",
    dot: "bg-amber-500",
  },
  {
    id: 5,
    icon: Activity,
    title: "Domain Added",
    detail: "Domain verified and monitoring activated.",
    time: "May 20, 2026",
    color: "text-slate-600",
    bg: "bg-slate-100",
    dot: "bg-slate-400",
  },
];

const scanSteps = [
  {
    title: "Discover & Analyze",
    description: "We discover your domain, subdomains, and public-facing assets.",
    icon: Search,
  },
  {
    title: "Check Security Configuration",
    description: "We will analyze your SSL/TLS, headers, DNS, and other security configurations.",
    icon: ShieldCheck,
  },
  {
    title: "Deliver Clear Report",
    description: "You'll get a clear report with explanations and actionable recommendations.",
    icon: FileText,
  },
  {
    title: "Identify Risks",
    description: "Our AI engine identifies misconfigurations and ranks them by severity.",
    icon: AlertTriangle,
  },
];

const SSL_THRESHOLDS = ["30 Days", "14 Days", "7 Days", "3 Days"];

function CircularProgress({ value, max = 100 }: { value: number; max?: number }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;
  const color = value >= 85 ? "#16a34a" : value >= 70 ? "#d97706" : "#dc2626";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="110" height="110" className="-rotate-90">
        <circle
          cx="55"
          cy="55"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="10"
        />
        <circle
          cx="55"
          cy="55"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className="text-2xl font-bold"
          style={{ color, fontFamily: "Geist, sans-serif" }}
        >
          {value}
        </span>
        <span className="text-xs text-slate-400" style={{ fontFamily: "Inter, sans-serif" }}>
          /{max}
        </span>
      </div>
    </div>
  );
}

export function DomainDetail() {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const domainName = domainMap[domainId ?? ""] ?? `${domainId}.com`;

  const [monitoringActive, setMonitoringActive] = useState(true);
  const [scanFrequency, setScanFrequency] = useState("Hourly");
  const [selectedThresholds, setSelectedThresholds] = useState<string[]>([
    "30 Days",
    "14 Days",
    "7 Days",
  ]);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [notifyOnComplete, setNotifyOnComplete] = useState(true);

  const toggleThreshold = (t: string) => {
    setSelectedThresholds((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  return (
    <div className="p-8 space-y-6" style={{ backgroundColor: "#F9F9F9", minHeight: "100%" }}>
      {/* Back navigation */}
      <button
        onClick={() => navigate("/domains")}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-sm"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Domains
      </button>

      {/* Domain Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            {domainName}
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-white shadow-sm" style={{ backgroundColor: "#072E28" }}>
                Run New Scan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 max-h-[85vh] overflow-y-auto">
              <div className="bg-[#072E28] px-6 py-6 sm:px-8 sm:py-7">
                <DialogTitle
                  className="text-2xl sm:text-3xl font-semibold text-white"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Scan Your Website
                </DialogTitle>
                <DialogDescription
                  className="text-sm text-emerald-100 mt-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Run a safe, non-intrusive security scan to find misconfigurations and potential
                  risks.
                </DialogDescription>
              </div>

              <div className="space-y-8 bg-white px-6 py-6 sm:px-8 sm:py-8">
                <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
                  <div className="space-y-4" style={{ fontFamily: "Inter, sans-serif" }}>
                    <div className="space-y-2">
                      <Label htmlFor="scan-domain" className="text-sm font-semibold text-slate-700">
                        Target Domain
                      </Label>
                      <div className="relative">
                        <Globe className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          id="scan-domain"
                          readOnly
                          aria-readonly="true"
                          value={domainName}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-9 py-3 text-sm text-slate-700 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <Checkbox
                        id="notify-scan"
                        checked={notifyOnComplete}
                        onCheckedChange={(value) => setNotifyOnComplete(!!value)}
                        className="mt-1 data-[state=checked]:bg-[#072E28] data-[state=checked]:border-[#072E28]"
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor="notify-scan"
                          className="text-sm font-semibold text-slate-900 cursor-pointer"
                        >
                          Email Notification
                        </Label>
                        <p className="text-xs text-slate-500">
                          Notify me when the scan is complete.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex h-full flex-col justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                    <div className="flex items-center gap-2 text-emerald-900">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                        <Shield className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold">Security Notice</span>
                    </div>
                    <p className="text-xs text-emerald-900/90">
                      We only access publicly available data. No intrusive testing is performed.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3
                    className="text-base font-semibold text-slate-900"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    What will happen next?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scanSteps.map((step) => {
                      const Icon = step.icon;
                      return (
                        <div
                          key={step.title}
                          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                            <Icon className="h-4 w-4 text-slate-700" />
                          </div>
                          <div>
                            <p
                              className="text-sm font-semibold text-slate-900"
                              style={{ fontFamily: "Geist, sans-serif" }}
                            >
                              {step.title}
                            </p>
                            <p
                              className="text-xs text-slate-500 mt-1"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button className="text-white shadow-sm" style={{ backgroundColor: "#072E28" }}>
                    Start Scan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Active Monitoring Toggle */}
          <div className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl px-5 py-3 shadow-none">
            <div>
              <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>
                Active Monitoring
              </p>
              <p className="text-xs text-slate-500" style={{ fontFamily: "Inter, sans-serif" }}>
                {monitoringActive ? "Scanning in progress" : "Monitoring paused"}
              </p>
            </div>
            <Switch
              checked={monitoringActive}
              onCheckedChange={setMonitoringActive}
              className="data-[state=checked]:bg-[#072E28]"
            />
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="flex items-center gap-6 bg-white border border-[#E5E7EB] rounded-xl px-6 py-4 shadow-none">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-700" style={{ fontFamily: "Inter, sans-serif" }}>
            Live
          </span>
        </div>
        <div className="h-5 w-px bg-[#E5E7EB]" />
        <div className="flex items-center gap-2 text-sm text-slate-600" style={{ fontFamily: "Inter, sans-serif" }}>
          <Clock className="h-4 w-4 text-slate-400" />
          <span>Next Scan: <span className="font-semibold text-slate-900">In 59m</span></span>
        </div>
        <div className="h-5 w-px bg-[#E5E7EB]" />
        <div className="flex items-center gap-2 text-sm text-slate-600" style={{ fontFamily: "Inter, sans-serif" }}>
          <Activity className="h-4 w-4 text-slate-400" />
          <span>Last Monitored: <span className="font-semibold text-slate-900">2 hours ago</span></span>
        </div>
      </div>

      {/* Security Posture Row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Security Score */}
        <Card className="bg-white border border-[#E5E7EB] rounded-xl shadow-none p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-slate-400" />
            <h3 className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "Geist, sans-serif" }}>
              Security Score
            </h3>
          </div>
          <div className="flex flex-col items-center gap-3">
            <CircularProgress value={85} />
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Risk Level: Safe
              </span>
            </div>
          </div>
        </Card>

        {/* Vulnerability Breakdown */}
        <Card className="bg-white border border-[#E5E7EB] rounded-xl shadow-none p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-slate-400" />
            <h3 className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "Geist, sans-serif" }}>
              Vulnerability Breakdown
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { label: "Critical", count: 0, color: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
              { label: "High", count: 0, color: "bg-orange-500", text: "text-orange-700", bg: "bg-orange-50" },
              { label: "Medium", count: 2, color: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50" },
              { label: "Low", count: 5, color: "bg-green-400", text: "text-green-700", bg: "bg-green-50" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-16">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-slate-600" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item.label}
                  </span>
                </div>
                <div className="flex-1 bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: item.count === 0 ? "0%" : item.count <= 2 ? "25%" : "50%" }}
                  />
                </div>
                <span
                  className={`text-xs font-semibold w-4 text-right ${item.count === 0 ? "text-slate-400" : item.text}`}
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* SSL Status */}
        <Card className="bg-white border border-[#E5E7EB] rounded-xl shadow-none p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-4 w-4 text-slate-400" />
            <h3 className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "Geist, sans-serif" }}>
              SSL Status
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-green-700 text-lg" style={{ fontFamily: "Geist, sans-serif" }}>
                  Valid
                </p>
                <p className="text-xs text-slate-500" style={{ fontFamily: "Inter, sans-serif" }}>
                  Certificate active
                </p>
              </div>
            </div>
            <div className="bg-[#F9F9F9] border border-[#E5E7EB] rounded-lg px-4 py-3">
              <p className="text-xs text-slate-500 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                Expiry
              </p>
              <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>
                Expires in 45 days
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Split: Timeline + Settings */}
      <div className="grid grid-cols-2 gap-5">
        {/* Left: Activity Timeline */}
        <Card className="bg-white border border-[#E5E7EB] rounded-xl shadow-none p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-4 w-4 text-slate-400" />
            <h3 className="font-semibold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>
              Recent Activity
            </h3>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[17px] top-4 bottom-4 w-px bg-[#E5E7EB]" />

            <div className="space-y-6">
              {timelineEvents.map((event, idx) => {
                const Icon = event.icon;
                return (
                  <div key={event.id} className="flex gap-4 relative">
                    <div className={`flex-shrink-0 h-9 w-9 rounded-full ${event.bg} flex items-center justify-center z-10`}>
                      <Icon className={`h-4 w-4 ${event.color}`} />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>
                        {event.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>
                        {event.detail}
                      </p>
                      <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                        {event.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Right: Monitoring Settings */}
        <Card className="bg-white border border-[#E5E7EB] rounded-xl shadow-none p-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="h-4 w-4 text-slate-400" />
            <h3 className="font-semibold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>
              Automated Monitoring Settings
            </h3>
          </div>

          <div className="space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
            {/* Scan Frequency */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Scan Frequency</Label>
              <select
                value={scanFrequency}
                onChange={(e) => setScanFrequency(e.target.value)}
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#072E28]/30 focus:border-[#072E28] transition-colors appearance-none cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <option>Hourly</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>

            {/* SSL Alert Thresholds */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">SSL Alert Thresholds</Label>
              <p className="text-xs text-slate-400">Alert me when SSL expires within:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {SSL_THRESHOLDS.map((t) => {
                  const active = selectedThresholds.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleThreshold(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        active
                          ? "bg-[#072E28] text-white border-[#072E28]"
                          : "bg-white text-slate-600 border-[#E5E7EB] hover:border-slate-400"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notification Channels */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Notification Channels</Label>
              <div className="space-y-3 mt-1">
                <div className="flex items-center gap-3 p-3 bg-[#F9F9F9] border border-[#E5E7EB] rounded-lg">
                  <Checkbox
                    id="email-alerts"
                    checked={emailAlerts}
                    onCheckedChange={(v) => setEmailAlerts(!!v)}
                    className="data-[state=checked]:bg-[#072E28] data-[state=checked]:border-[#072E28]"
                  />
                  <div>
                    <Label htmlFor="email-alerts" className="text-sm font-medium text-slate-900 cursor-pointer">
                      Email Alerts
                    </Label>
                    <p className="text-xs text-slate-400">Receive scan results to your inbox</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#F9F9F9] border border-[#E5E7EB] rounded-lg">
                  <Checkbox
                    id="slack-alerts"
                    checked={slackAlerts}
                    onCheckedChange={(v) => setSlackAlerts(!!v)}
                    className="data-[state=checked]:bg-[#072E28] data-[state=checked]:border-[#072E28]"
                  />
                  <div>
                    <Label htmlFor="slack-alerts" className="text-sm font-medium text-slate-900 cursor-pointer">
                      Slack Alerts
                    </Label>
                    <p className="text-xs text-slate-400">Send notifications to your Slack workspace</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <Button
              className="w-full text-white mt-2"
              style={{ backgroundColor: "#072E28" }}
            >
              Save Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
