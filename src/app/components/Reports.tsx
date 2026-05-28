import { useState } from "react";
import { Link } from "react-router";
import {
  Download,
  FileText,
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
} from "lucide-react";

interface Domain {
  id: string;
  name: string;
  securityScore: number;
  monitoringStatus: "active" | "paused" | "failed";
  sslStatus: "valid" | "expiring" | "expired";
  sslDaysRemaining: number;
  totalFindings: number;
  criticalFindings: number;
  lastScanned: string;
  trend: "up" | "down" | "stable";
}

export function Reports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [domains] = useState<Domain[]>([
    {
      id: "1",
      name: "example.com",
      securityScore: 92,
      monitoringStatus: "active",
      sslStatus: "valid",
      sslDaysRemaining: 45,
      totalFindings: 3,
      criticalFindings: 0,
      lastScanned: "2 hours ago",
      trend: "up",
    },
    {
      id: "2",
      name: "test-site.com",
      securityScore: 68,
      monitoringStatus: "active",
      sslStatus: "expiring",
      sslDaysRemaining: 12,
      totalFindings: 8,
      criticalFindings: 2,
      lastScanned: "5 hours ago",
      trend: "down",
    },
    {
      id: "3",
      name: "myapp.io",
      securityScore: 85,
      monitoringStatus: "active",
      sslStatus: "valid",
      sslDaysRemaining: 78,
      totalFindings: 5,
      criticalFindings: 1,
      lastScanned: "1 hour ago",
      trend: "stable",
    },
  ]);

  const filteredDomains = domains.filter((domain) =>
    domain.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getSSLStatusColor = (status: string) => {
    if (status === "valid") return "bg-green-100 text-green-700";
    if (status === "expiring") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getMonitoringStatusColor = (status: string) => {
    if (status === "active") return "bg-blue-100 text-blue-700";
    if (status === "paused") return "bg-gray-100 text-gray-700";
    return "bg-red-100 text-red-700";
  };

  const exportReports = () => {
    alert("Export functionality - would download PDF/CSV reports");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Security Reports</h1>
          <p className="mt-2 text-gray-600">
            Overview of all scanned domains and monitoring reports
          </p>
        </div>
        <button
          onClick={exportReports}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export All Reports
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Domains</p>
              <p className="mt-1 text-2xl font-semibold">{domains.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Security Score</p>
              <p className="mt-1 text-2xl font-semibold">
                {Math.round(
                  domains.reduce((sum, d) => sum + d.securityScore, 0) / domains.length
                )}
              </p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Findings</p>
              <p className="mt-1 text-2xl font-semibold">
                {domains.reduce((sum, d) => sum + d.totalFindings, 0)}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Issues</p>
              <p className="mt-1 text-2xl font-semibold">
                {domains.reduce((sum, d) => sum + d.criticalFindings, 0)}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium mb-2">AI Executive Summary</h3>
        <p className="text-sm text-gray-700">
          Overall security posture is good with an average score of 82/100. Two domains
          require immediate attention: test-site.com has 2 critical findings and an
          expiring SSL certificate (12 days remaining). Recommend prioritizing SSL
          renewal and addressing critical vulnerabilities in the next 48 hours.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search domains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Security Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  SSL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Findings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Scanned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDomains.map((domain) => (
                <tr key={domain.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium">{domain.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                          domain.securityScore
                        )}`}
                      >
                        {domain.securityScore}
                      </span>
                      {domain.trend === "up" && (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      )}
                      {domain.trend === "down" && (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getMonitoringStatusColor(
                        domain.monitoringStatus
                      )}`}
                    >
                      {domain.monitoringStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getSSLStatusColor(
                          domain.sslStatus
                        )}`}
                      >
                        {domain.sslStatus}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {domain.sslDaysRemaining} days left
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm">{domain.totalFindings} total</div>
                      {domain.criticalFindings > 0 && (
                        <div className="text-xs text-red-600">
                          {domain.criticalFindings} critical
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{domain.lastScanned}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/reports/${domain.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Report
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
