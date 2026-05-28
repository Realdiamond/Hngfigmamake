import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Download,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Lock,
  Clock,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

export function DomainReport() {
  const { domainId } = useParams();

  const domain = {
    name: domainId === "1" ? "example.com" : domainId === "2" ? "test-site.com" : "myapp.io",
    securityScore: domainId === "1" ? 92 : domainId === "2" ? 68 : 85,
    ipAddress: "192.168.1.100",
    nameservers: ["ns1.example.com", "ns2.example.com"],
    sslIssuer: "Let's Encrypt",
    sslValidFrom: "Jan 15, 2026",
    sslValidUntil: "Apr 15, 2026",
    sslDaysRemaining: domainId === "1" ? 45 : domainId === "2" ? 12 : 78,
    lastScanned: "2 hours ago",
    scanDuration: "23s",
  };

  const findings = [
    {
      id: 1,
      severity: "critical",
      title: "Outdated SSL/TLS Protocol",
      description: "Server supports TLS 1.0 which is deprecated",
      recommendation: "Disable TLS 1.0 and TLS 1.1, enable only TLS 1.2 and 1.3",
      category: "SSL/TLS",
    },
    {
      id: 2,
      severity: "high",
      title: "Missing Security Headers",
      description: "Content-Security-Policy header not found",
      recommendation: "Implement CSP header to prevent XSS attacks",
      category: "Headers",
    },
    {
      id: 3,
      severity: "medium",
      title: "Weak Cipher Suites",
      description: "Server accepts weak cipher suites",
      recommendation: "Configure server to use only strong cipher suites",
      category: "SSL/TLS",
    },
    {
      id: 4,
      severity: "low",
      title: "Server Information Disclosure",
      description: "Server header reveals version information",
      recommendation: "Configure server to hide version information",
      category: "Headers",
    },
  ];

  const severityCounts = {
    critical: findings.filter((f) => f.severity === "critical").length,
    high: findings.filter((f) => f.severity === "high").length,
    medium: findings.filter((f) => f.severity === "medium").length,
    low: findings.filter((f) => f.severity === "low").length,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/reports"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1>{domain.name}</h1>
          <p className="mt-1 text-gray-600">Detailed security report</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className={`w-8 h-8 ${getScoreColor(domain.securityScore)}`} />
            <div>
              <p className="text-sm text-gray-600">Security Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(domain.securityScore)}`}>
                {domain.securityScore}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">SSL Certificate</p>
              <p className="text-lg font-semibold">
                {domain.sslDaysRemaining} days remaining
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Total Findings</p>
              <p className="text-3xl font-bold">{findings.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5" />
          Domain Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">IP Address</p>
            <p className="font-medium">{domain.ipAddress}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Name Servers</p>
            <p className="font-medium">{domain.nameservers.join(", ")}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5" />
          SSL Certificate Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Issuer</p>
            <p className="font-medium">{domain.sslIssuer}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Valid From</p>
            <p className="font-medium">{domain.sslValidFrom}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Valid Until</p>
            <p className="font-medium">{domain.sslValidUntil}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4">Severity Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-gray-600">Critical</p>
            <p className="text-2xl font-bold text-red-600">{severityCounts.critical}</p>
          </div>
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-gray-600">High</p>
            <p className="text-2xl font-bold text-orange-600">{severityCounts.high}</p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-600">Medium</p>
            <p className="text-2xl font-bold text-yellow-600">{severityCounts.medium}</p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600">Low</p>
            <p className="text-2xl font-bold text-blue-600">{severityCounts.low}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          AI Security Analysis
        </h3>
        <p className="text-sm text-gray-700 mb-3">
          This domain shows good overall security with a score of {domain.securityScore}/100.
          {severityCounts.critical > 0 &&
            " However, there are critical issues that require immediate attention."}
          {severityCounts.high > 0 && " High-priority vulnerabilities should be addressed soon."}
        </p>
        <div className="space-y-2">
          <p className="text-sm font-medium">Recommended Actions:</p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• Upgrade SSL/TLS configuration to support only modern protocols</li>
            <li>• Implement missing security headers</li>
            <li>• Review and strengthen cipher suite configuration</li>
            <li>• Plan SSL certificate renewal for {domain.sslValidUntil}</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b">
          <h2>Security Findings</h2>
        </div>
        <div className="divide-y">
          {findings.map((finding) => (
            <div key={finding.id} className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle
                  className={`w-6 h-6 flex-shrink-0 ${
                    finding.severity === "critical"
                      ? "text-red-600"
                      : finding.severity === "high"
                      ? "text-orange-600"
                      : finding.severity === "medium"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3>{finding.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium uppercase ${getSeverityColor(
                        finding.severity
                      )}`}
                    >
                      {finding.severity}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {finding.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{finding.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Recommendation:
                    </p>
                    <p className="text-sm text-gray-600">{finding.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" />
          Monitoring History
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Scan completed successfully</p>
              <p className="text-xs text-gray-600">{domain.lastScanned}</p>
            </div>
            <span className="text-xs text-gray-500">{domain.scanDuration}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">SSL certificate verified</p>
              <p className="text-xs text-gray-600">8 hours ago</p>
            </div>
            <span className="text-xs text-gray-500">2s</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">DNS verification failed</p>
              <p className="text-xs text-gray-600">1 day ago</p>
            </div>
            <span className="text-xs text-gray-500">5s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
