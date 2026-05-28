import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Globe,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Layers,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const domainsData = [
  {
    id: "realdiamonddigital-studio",
    name: "realdiamonddigital.studio",
    status: "verified",
    score: 91,
    lastScanned: "2 hours ago",
    dateAdded: "May 28, 2026",
  },
  {
    id: "api-example-com",
    name: "api.example.com",
    status: "verified",
    score: 85,
    lastScanned: "3 hours ago",
    dateAdded: "May 20, 2026",
  },
  {
    id: "app-example-com",
    name: "app.example.com",
    status: "verified",
    score: 72,
    lastScanned: "5 hours ago",
    dateAdded: "May 15, 2026",
  },
  {
    id: "staging-example-com",
    name: "staging.example.com",
    status: "pending",
    score: null,
    lastScanned: "—",
    dateAdded: "May 28, 2026",
  },
  {
    id: "beta-example-com",
    name: "beta.example.com",
    status: "pending",
    score: null,
    lastScanned: "—",
    dateAdded: "May 27, 2026",
  },
];

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <span className="text-slate-400">—</span>;
  const color =
    score >= 85 ? "text-green-600" : score >= 70 ? "text-amber-600" : "text-red-600";
  return <span className={`font-semibold ${color}`}>{score}/100</span>;
}

export function DomainsList() {
  const navigate = useNavigate();
  const [domains] = useState(domainsData);

  const total = domains.length;
  const verified = domains.filter((d) => d.status === "verified").length;
  const pending = domains.filter((d) => d.status === "pending").length;

  return (
    <div className="p-8 space-y-6" style={{ backgroundColor: "#F9F9F9", minHeight: "100%" }}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Domains
          </h1>
          <p className="text-slate-500 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            Manage and monitor your verified domains
          </p>
        </div>
        <Button
          className="flex items-center gap-2 text-white shadow-sm"
          style={{ backgroundColor: "#072E28" }}
        >
          <Plus className="h-4 w-4" />
          Add New Domain
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-5 bg-white border border-[#E5E7EB] rounded-xl shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Layers className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>
                Total Domains
              </p>
              <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "Geist, sans-serif" }}>
                {total}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-[#E5E7EB] rounded-xl shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>
                Verified
              </p>
              <p className="text-2xl font-bold text-green-700" style={{ fontFamily: "Geist, sans-serif" }}>
                {verified}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-[#E5E7EB] rounded-xl shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>
                Pending Verification
              </p>
              <p className="text-2xl font-bold text-amber-600" style={{ fontFamily: "Geist, sans-serif" }}>
                {pending}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="bg-white border border-[#E5E7EB] rounded-xl shadow-none overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E7EB]">
          <h2
            className="font-semibold text-slate-900"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            All Domains
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontFamily: "Inter, sans-serif" }}>
            <thead>
              <tr className="bg-[#F9F9F9] border-b border-[#E5E7EB]">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Domain Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Security Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Last Scanned
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Date Added
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {domains.map((domain) => (
                <tr
                  key={domain.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <button
                      className="flex items-center gap-2 text-left group"
                      onClick={() =>
                        domain.status === "verified" &&
                        navigate(`/domains/${domain.id}`)
                      }
                    >
                      <Globe className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      <span
                        className={`text-sm font-medium ${
                          domain.status === "verified"
                            ? "text-slate-900 group-hover:text-[#072E28] underline-offset-2 group-hover:underline cursor-pointer"
                            : "text-slate-600 cursor-default"
                        }`}
                      >
                        {domain.name}
                      </span>
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    {domain.status === "verified" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                        <Clock className="h-3.5 w-3.5" />
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <ScoreBadge score={domain.score} />
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">{domain.lastScanned}</td>

                  <td className="px-6 py-4 text-sm text-slate-500">{domain.dateAdded}</td>

                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        {domain.status === "verified" && (
                          <DropdownMenuItem
                            onClick={() => navigate(`/domains/${domain.id}`)}
                          >
                            View Details
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>Edit Domain</DropdownMenuItem>
                        <DropdownMenuItem>Run Scan</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Remove Domain
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
