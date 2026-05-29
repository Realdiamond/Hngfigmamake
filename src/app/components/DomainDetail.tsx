import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  CheckCircle2,
  ChevronLeft,
  Clock,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Activity,
  Settings,
  ScanLine,
  RefreshCw,
  Globe,
  X,
  Zap,
  Search,
  AlertTriangle,
  Info,
  Wifi,
  Bell,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type AlertType = "SslExpiry" | "SecurityFinding" | "DnsChange" | string;
type AlertSeverity = "Info" | "Low" | "Medium" | "High" | "Critical";
type ScanType = "quick" | "deep";

interface MonitoringAlert {
  alertId: string;
  type: AlertType;
  severity: AlertSeverity;
  subject: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const domainMap: Record<string, string> = {
  "realdiamonddigital-studio": "realdiamonddigital.studio",
  "api-example-com": "api.example.com",
  "app-example-com": "app.example.com",
};

const ownership = {
  tokenExpiringSoon: true,
};

const recentAlerts: MonitoringAlert[] = [
  {
    alertId: "a1",
    type: "SslExpiry",
    severity: "High",
    subject: "SSL certificate expiring in 45 days — renewal recommended.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    alertId: "a2",
    type: "SecurityFinding",
    severity: "Medium",
    subject: "Outdated TLS 1.0 protocol detected on port 443.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    alertId: "a3",
    type: "DnsChange",
    severity: "Info",
    subject: "DNS A-record updated — new IP 104.21.77.42 resolved.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    alertId: "a4",
    type: "SecurityFinding",
    severity: "Low",
    subject: "Missing X-Content-Type-Options header on 3 endpoints.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    alertId: "a5",
    type: "SecurityFinding",
    severity: "Critical",
    subject: "Open redirect vulnerability found at /redirect?url= endpoint.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

const timelineEvents = [
  {
    id: 1,
    icon: ScanLine,
    title: "Scan Completed",
    detail: "All 47 endpoints checked. No new vulnerabilities detected.",
    time: "2 hours ago",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    id: 2,
    icon: Lock,
    title: "SSL Certificate Checked",
    detail: "Certificate valid. Expires in 45 days.",
    time: "2 hours ago",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    id: 3,
    icon: Settings,
    title: "Settings Updated",
    detail: "Scan frequency changed from Daily to Hourly.",
    time: "Yesterday",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    id: 4,
    icon: RefreshCw,
    title: "Scan Completed",
    detail: "2 medium vulnerabilities identified.",
    time: "2 days ago",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    id: 5,
    icon: Activity,
    title: "Domain Added",
    detail: "Domain verified and monitoring activated.",
    time: "May 20, 2026",
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
];

const SSL_THRESHOLDS = ["30 Days", "14 Days", "7 Days", "3 Days"];

// ---------------------------------------------------------------------------
// Severity config — maps to brand design tokens
// ---------------------------------------------------------------------------
const severityConfig: Record<
  AlertSeverity,
  { label: string; pill: string; text: string; dot: string }
> = {
  Info:     { label: "Info",     pill: "bg-[#eaf3ff]", text: "text-[#2f80ed]", dot: "bg-[#2f80ed]" },
  Low:      { label: "Low",      pill: "bg-[#e8fff3]", text: "text-[#1dbf73]", dot: "bg-[#1dbf73]" },
  Medium:   { label: "Medium",   pill: "bg-[#fcf0e8]", text: "text-[#dd6414]", dot: "bg-[#dd6414]" },
  High:     { label: "High",     pill: "bg-[#fff1e7]", text: "text-[#f97316]", dot: "bg-[#f97316]" },
  Critical: { label: "Critical", pill: "bg-[#ffe8ef]", text: "text-[#ff3366]", dot: "bg-[#ff3366]" },
};

const alertTypeConfig: Record<string, { icon: React.ElementType; label: string }> = {
  SslExpiry:       { icon: Lock,        label: "SSL Expiry" },
  SecurityFinding: { icon: ShieldAlert, label: "Security Finding" },
  DnsChange:       { icon: Wifi,        label: "DNS Change" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function CircularProgress({ value, max = 100 }: { value: number; max?: number }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;
  const color = value >= 85 ? "#16a34a" : value >= 70 ? "#d97706" : "#dc2626";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="110" height="110" className="-rotate-90">
        <circle cx="55" cy="55" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10" />
        <circle
          cx="55" cy="55" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color, fontFamily: "Geist, sans-serif" }}>{value}</span>
        <span className="text-xs text-slate-400" style={{ fontFamily: "Inter, sans-serif" }}>/{max}</span>
      </div>
    </div>
  );
}

// Feature A: Token Expiry Warning Banner
function TokenExpiryBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="flex items-start justify-between gap-4 rounded-xl border px-5 py-4"
      style={{
        backgroundColor: "#fcf0e8",
        borderColor: "#f5c9a0",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg"
          style={{ backgroundColor: "#fde3c8" }}
        >
          <AlertTriangle className="h-4 w-4" style={{ color: "#dd6414" }} />
        </div>
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "#dd6414", fontFamily: "Geist, sans-serif" }}
          >
            Ownership Token Expiring Soon
          </p>
          <p
            className="text-xs mt-0.5 leading-snug"
            style={{ color: "#b04f0f", fontFamily: "Inter, sans-serif" }}
          >
            Your domain verification token is close to expiry. Renew it now to maintain continuous
            monitoring coverage and avoid interruptions.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors"
          style={{
            backgroundColor: "#dd6414",
            borderColor: "#dd6414",
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
          }}
          onClick={() => {}}
        >
          Renew Token
        </button>
        <button
          onClick={onDismiss}
          className="p-1.5 rounded-lg transition-colors hover:bg-orange-200"
          style={{ color: "#dd6414" }}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Feature B: Recent Security Alerts Feed
function RecentAlertsCard({ alerts }: { alerts: MonitoringAlert[] }) {
  return (
    <Card className="bg-white border border-[#E5E7EB] rounded-xl shadow-none p-6">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-slate-400" />
          <h3
            className="font-semibold text-slate-900"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Recent Security Alerts
          </h3>
          {alerts.length > 0 && (
            <span
              className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: "#072E28" }}
            >
              {alerts.length}
            </span>
          )}
        </div>
        <button
          className="text-xs font-medium transition-colors"
          style={{ color: "#072E28", fontFamily: "Inter, sans-serif" }}
        >
          View All Alerts →
        </button>
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-2">
          <ShieldCheck className="h-8 w-8 text-slate-300" />
          <p className="text-sm text-slate-400" style={{ fontFamily: "Inter, sans-serif" }}>
            No recent alerts — all clear.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[#F3F4F6]">
          {alerts.map((alert) => {
            const sev = severityConfig[alert.severity as AlertSeverity] ?? severityConfig.Info;
            const typeInfo = alertTypeConfig[alert.type] ?? { icon: Info, label: alert.type };
            const TypeIcon = typeInfo.icon;

            return (
              <div
                key={alert.alertId}
                className="flex items-start gap-4 py-3.5 group cursor-pointer"
              >
                {/* Severity dot + type icon */}
                <div className="flex-shrink-0 relative mt-0.5">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center ${sev.pill}`}
                  >
                    <TypeIcon className={`h-4 w-4 ${sev.text}`} />
                  </div>
                  {/* Severity dot — bottom-right of icon */}
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${sev.dot}`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium text-slate-800 leading-snug group-hover:text-slate-900 transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {alert.subject}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400" style={{ fontFamily: "Inter, sans-serif" }}>
                      {typeInfo.label}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-400" style={{ fontFamily: "Inter, sans-serif" }}>
                      {formatRelativeTime(alert.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Severity pill */}
                <div className="flex-shrink-0 mt-0.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${sev.pill} ${sev.text}`}
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {sev.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

// Run New Scan Modal
function RunScanModal({
  domainName,
  onClose,
  onStart,
}: {
  domainName: string;
  onClose: () => void;
  onStart: () => void;
}) {
  const [scanType, setScanType] = useState<ScanType>("quick");
  const [authorized, setAuthorized] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>
              Run Security Scan
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Initiate a manual on-demand scan for this domain.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-4 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Target Domain */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-slate-700">Target Domain</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={domainName}
                readOnly
                disabled
                className="w-full pl-9 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-slate-500 bg-[#F9F9F9] cursor-not-allowed select-none"
              />
            </div>
          </div>

          {/* Scan Type */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Scan Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {(["quick", "deep"] as ScanType[]).map((type) => {
                const active = scanType === type;
                const Icon = type === "quick" ? Zap : Search;
                const title = type === "quick" ? "Quick Scan" : "Deep Scan";
                const desc =
                  type === "quick"
                    ? "Checks for critical vulnerabilities, takes ~2 mins."
                    : "Comprehensive analysis of all endpoints, takes ~10 mins.";
                return (
                  <button
                    key={type}
                    onClick={() => setScanType(type)}
                    className={`relative flex flex-col gap-2 p-4 rounded-xl border-2 text-left transition-all ${
                      active
                        ? "border-[#072E28] bg-[#072E28]/5"
                        : "border-[#E5E7EB] bg-white hover:border-slate-300"
                    }`}
                  >
                    {active && (
                      <div className="absolute top-3 right-3 h-4 w-4 rounded-full bg-[#072E28] flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      </div>
                    )}
                    <div className={`p-2 rounded-lg w-fit ${active ? "bg-[#072E28]/10" : "bg-slate-100"}`}>
                      <Icon className={`h-4 w-4 ${active ? "text-[#072E28]" : "text-slate-500"}`} />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${active ? "text-[#072E28]" : "text-slate-800"}`}
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        {title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">{desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Authorization */}
          <div className="flex items-start gap-3 p-3.5 bg-[#F9F9F9] border border-[#E5E7EB] rounded-lg">
            <Checkbox
              id="authorization"
              checked={authorized}
              onCheckedChange={(v) => setAuthorized(!!v)}
              className="mt-0.5 data-[state=checked]:bg-[#072E28] data-[state=checked]:border-[#072E28]"
            />
            <Label htmlFor="authorization" className="text-sm text-slate-700 leading-snug cursor-pointer">
              I confirm I have authorization to scan this domain.
            </Label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-[#E5E7EB]">
          <Button variant="outline" onClick={onClose} className="border-[#E5E7EB] text-slate-700 hover:bg-slate-50">
            Cancel
          </Button>
          <Button onClick={onStart} className="text-white px-5" style={{ backgroundColor: "#072E28" }}>
            <ScanLine className="h-4 w-4 mr-2" />
            Start Scan
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export function DomainDetail() {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const domainName = domainMap[domainId ?? ""] ?? `${domainId}.com`;

  const [monitoringActive, setMonitoringActive] = useState(true);
  const [scanFrequency, setScanFrequency] = useState("Hourly");
  const [selectedThresholds, setSelectedThresholds] = useState<string[]>(["30 Days", "14 Days", "7 Days"]);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [tokenBannerDismissed, setTokenBannerDismissed] = useState(false);

  const toggleThreshold = (t: string) =>
    setSelectedThresholds((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const handleStartScan = () => {
    setShowScanModal(false);
    navigate(`/scan-progress/${domainId}`);
  };

  return (
    <div className="p-8 space-y-6" style={{ backgroundColor: "#F9F9F9", minHeight: "100%" }}>
      {/* Run Scan Modal */}
      {showScanModal && (
        <RunScanModal
          domainName={domainName}
          onClose={() => setShowScanModal(false)}
          onStart={handleStartScan}
        />
      )}

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
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Geist, sans-serif" }}>
            {domainName}
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowScanModal(true)}
            className="text-white flex items-center gap-2 px-4"
            style={{ backgroundColor: "#072E28" }}
          >
            <ScanLine className="h-4 w-4" />
            Run New Scan
          </Button>

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

      {/* Feature A: Token Expiry Warning Banner */}
      {ownership.tokenExpiringSoon && !tokenBannerDismissed && (
        <TokenExpiryBanner onDismiss={() => setTokenBannerDismissed(true)} />
      )}

      {/* Status Banner */}
      <div className="flex items-center gap-6 bg-white border border-[#E5E7EB] rounded-xl px-6 py-4 shadow-none">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-700" style={{ fontFamily: "Inter, sans-serif" }}>Live</span>
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

      {/* Row 1: Security Posture — 3 columns */}
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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Risk Level: Safe
            </span>
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
              { label: "Critical", count: 0, color: "bg-[#ff3366]", text: "text-[#ff3366]" },
              { label: "High",     count: 0, color: "bg-[#f97316]", text: "text-[#f97316]" },
              { label: "Medium",   count: 2, color: "bg-[#dd6414]", text: "text-[#dd6414]" },
              { label: "Low",      count: 5, color: "bg-[#1dbf73]", text: "text-[#1dbf73]" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-16">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-slate-600" style={{ fontFamily: "Inter, sans-serif" }}>{item.label}</span>
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
                <p className="font-bold text-green-700 text-lg" style={{ fontFamily: "Geist, sans-serif" }}>Valid</p>
                <p className="text-xs text-slate-500" style={{ fontFamily: "Inter, sans-serif" }}>Certificate active</p>
              </div>
            </div>
            <div className="bg-[#F9F9F9] border border-[#E5E7EB] rounded-lg px-4 py-3">
              <p className="text-xs text-slate-500 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Expiry</p>
              <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>
                Expires in 45 days
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2: Activity Timeline + Monitoring Settings — 2 columns */}
      <div className="grid grid-cols-2 gap-5">
        {/* Recent Activity Timeline */}
        <Card className="bg-white border border-[#E5E7EB] rounded-xl shadow-none p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-4 w-4 text-slate-400" />
            <h3 className="font-semibold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>
              Recent Activity
            </h3>
          </div>
          <div className="relative">
            <div className="absolute left-[17px] top-4 bottom-4 w-px bg-[#E5E7EB]" />
            <div className="space-y-6">
              {timelineEvents.map((event) => {
                const Icon = event.icon;
                return (
                  <div key={event.id} className="flex gap-4 relative">
                    <div className={`flex-shrink-0 h-9 w-9 rounded-full ${event.bg} flex items-center justify-center z-10`}>
                      <Icon className={`h-4 w-4 ${event.color}`} />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>{event.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{event.detail}</p>
                      <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>{event.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Monitoring Settings */}
        <Card className="bg-white border border-[#E5E7EB] rounded-xl shadow-none p-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="h-4 w-4 text-slate-400" />
            <h3 className="font-semibold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>
              Automated Monitoring Settings
            </h3>
          </div>

          <div className="space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Scan Frequency</Label>
              <select
                value={scanFrequency}
                onChange={(e) => setScanFrequency(e.target.value)}
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#072E28]/30 focus:border-[#072E28] transition-colors appearance-none cursor-pointer"
              >
                <option>Hourly</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>

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
                    <Label htmlFor="email-alerts" className="text-sm font-medium text-slate-900 cursor-pointer">Email Alerts</Label>
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
                    <Label htmlFor="slack-alerts" className="text-sm font-medium text-slate-900 cursor-pointer">Slack Alerts</Label>
                    <p className="text-xs text-slate-400">Send notifications to your Slack workspace</p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full text-white mt-2" style={{ backgroundColor: "#072E28" }}>
              Save Settings
            </Button>
          </div>
        </Card>
      </div>

      {/* Row 3: Feature B — Recent Security Alerts (full width) */}
      <RecentAlertsCard alerts={recentAlerts} />
    </div>
  );
}
