"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import { employeeHistory, parseDuration } from "../../_components/employeeHistory";

const statusStyle: Record<string, string> = {
  valid:   "bg-teal-50 text-teal-700 ring-teal-100",
  late:    "bg-amber-50 text-amber-700 ring-amber-100",
  absent:  "bg-[#f5f5f5] text-[#737373] ring-[#e5e5e5]",
};
const statusLabel: Record<string, string> = {
  valid: "On Time", late: "Late", absent: "Absent",
};

function HistoryContent() {
  const params = useSearchParams();
  const router = useRouter();

  const email  = params.get("email")  ?? "";
  const name   = params.get("name")   ?? "Employee";
  const role   = params.get("role")   ?? "";
  const branch = params.get("branch") ?? "";

  const allLogs = employeeHistory[email] ?? [];

  const [statusFilter, setStatusFilter] = useState("All");
  const [from, setFrom]   = useState("");
  const [to, setTo]       = useState("");

  const filtered = useMemo(() => {
    return allLogs.filter((l) => {
      const matchStatus = statusFilter === "All" || l.status === statusFilter;
      const matchFrom   = !from || l.date >= from;
      const matchTo     = !to   || l.date <= to;
      return matchStatus && matchFrom && matchTo;
    });
  }, [allLogs, statusFilter, from, to]);

  const total   = filtered.length;
  const present = filtered.filter((l) => l.status !== "absent").length;
  const late    = filtered.filter((l) => l.status === "late").length;

  const absent  = filtered.filter((l) => l.status === "absent").length;
  const rate    = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-[#e5e5e5] text-[#737373] hover:text-[#002244] hover:border-[#002244] transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#002244]/10 flex items-center justify-center shrink-0">
              <span className="text-[#002244] font-bold text-base">{name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-[#002244] font-bold text-xl leading-tight">{name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                {role && <span className="text-[#737373] text-xs">{role}</span>}
                {role && branch && <span className="text-[#e5e5e5] text-xs">·</span>}
                {branch && (
                  <span className="inline-flex items-center gap-1 text-[#737373] text-xs">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {branch}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-[#737373] text-sm font-medium hover:border-[#002244] hover:text-[#002244] transition-all self-start sm:self-auto">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Days Logged", value: total,   color: "text-[#002244]",  bg: "",              ring: "" },
          { label: "Present",     value: present, color: "text-teal-600",   bg: "bg-teal-50",    ring: "ring-teal-200"  },
          { label: "Late",        value: late,    color: "text-amber-600",  bg: "bg-amber-50",   ring: "ring-amber-200" },
          { label: "Absent",      value: absent,  color: "text-[#737373]",  bg: "bg-[#f5f5f5]", ring: "ring-[#d4d4d4]" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-4">
            <p className="text-[#737373] text-xs font-medium">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Attendance rate bar */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] px-5 py-4 flex items-center gap-4">
        <div className="shrink-0">
          <p className="text-[#737373] text-xs font-medium">Attendance Rate</p>
          <p className="text-[#002244] text-2xl font-bold">{rate}%</p>
        </div>
        <div className="flex-1 h-3 bg-[#f5f5f5] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${rate}%`,
              background: rate >= 90 ? "#0d9488" : rate >= 70 ? "#d97706" : "#ef4444",
            }}
          />
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${
          rate >= 90 ? "bg-teal-50 text-teal-700 ring-teal-100"
          : rate >= 70 ? "bg-amber-50 text-amber-700 ring-amber-100"
          : "bg-red-50 text-red-600 ring-red-100"
        }`}>
          {rate >= 90 ? "Excellent" : rate >= 70 ? "Fair" : "Poor"}
        </span>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-4 flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-48">
          <label className="text-xs text-[#737373] font-medium shrink-0">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 text-sm border border-[#e5e5e5] rounded-[0.625rem] bg-white px-3 py-2 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
          />
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-48">
          <label className="text-xs text-[#737373] font-medium shrink-0">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 text-sm border border-[#e5e5e5] rounded-[0.625rem] bg-white px-3 py-2 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-[#e5e5e5] rounded-[0.625rem] bg-white px-3 py-2 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#002244]/20"
        >
          <option value="All">All Status</option>
          <option value="valid">On Time</option>
          <option value="late">Late</option>

          <option value="absent">Absent</option>
        </select>
        {(from || to || statusFilter !== "All") && (
          <button
            onClick={() => { setFrom(""); setTo(""); setStatusFilter("All"); }}
            className="text-xs text-[#737373] hover:text-[#002244] font-medium px-3 py-2 rounded-[0.625rem] border border-[#e5e5e5] hover:border-[#002244] transition-all"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#e5e5e5] flex items-center justify-between">
          <p className="text-[#737373] text-xs">{filtered.length} record{filtered.length !== 1 ? "s" : ""} found</p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg className="w-10 h-10 text-[#e5e5e5] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-[#737373] text-sm font-medium">No records match your filters</p>
            <p className="text-[#737373] text-xs mt-1">Try adjusting the date range or status filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#fafafa] border-b border-[#e5e5e5]">
                  <th className="text-left text-[#737373] text-xs font-medium px-5 py-3.5">Date</th>
                  <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5 hidden sm:table-cell">Day</th>
                  <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5">Clock In</th>
                  <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5">Clock Out</th>
                  <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5 hidden md:table-cell">Duration</th>
                  <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5 hidden lg:table-cell">Branch</th>
                  <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5]">
                {filtered.map((log, i) => {
                  const d        = new Date(log.date);
                  const dateStr  = d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
                  const dayStr   = d.toLocaleDateString("en-US", { weekday: "long" });
                  const duration = parseDuration(log.timeIn, log.timeOut);
                  const isActive = log.timeIn && !log.timeOut;

                  return (
                    <tr
                      key={i}
                      className={`transition-colors ${isActive ? "bg-teal-50/20 hover:bg-teal-50/40" : "hover:bg-[#fafafa]"}`}
                    >
                      {/* Date */}
                      <td className="px-5 py-3.5">
                        <p className="text-[#0a0a0a] font-semibold text-sm">{dateStr}</p>
                      </td>

                      {/* Day */}
                      <td className="px-4 py-3.5 text-[#737373] text-sm hidden sm:table-cell">{dayStr}</td>

                      {/* Clock In */}
                      <td className="px-4 py-3.5">
                        {log.timeIn ? (
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-teal-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                              <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
                            </svg>
                            <span className="text-[#0a0a0a] font-semibold tabular-nums">{log.timeIn}</span>
                          </div>
                        ) : (
                          <span className="text-[#737373]">—</span>
                        )}
                      </td>

                      {/* Clock Out */}
                      <td className="px-4 py-3.5">
                        {isActive ? (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
                            <span className="text-teal-600 font-semibold">Active</span>
                          </div>
                        ) : log.timeOut ? (
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-[#737373] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                              <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
                            </svg>
                            <span className="text-[#0a0a0a] font-semibold tabular-nums">{log.timeOut}</span>
                          </div>
                        ) : (
                          <span className="text-[#737373]">—</span>
                        )}
                      </td>

                      {/* Duration */}
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className={`font-medium tabular-nums ${isActive ? "text-teal-600" : "text-[#737373]"}`}>
                          {duration}
                        </span>
                      </td>

                      {/* Branch */}
                      <td className="px-4 py-3.5 text-[#737373] hidden lg:table-cell">{log.branch}</td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ring-1 ${statusStyle[log.status]}`}>
                          {statusLabel[log.status]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EmployeeHistoryPage() {
  return (
    <Suspense>
      <HistoryContent />
    </Suspense>
  );
}
