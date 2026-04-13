"use client";

import { useState } from "react";

type Status = "valid" | "late" | "absent";

const records: {
  id: number;
  date: string;
  timeIn: string | null;
  timeOut: string | null;
  branch: string;
  status: Status;
  duration: string;
  active?: boolean;
}[] = [
  {
    id: 1,
    date: "Mon, Apr 13 2026",
    timeIn: "09:12 AM",
    timeOut: null,
    branch: "Head Office",
    status: "valid",
    duration: "Ongoing",
    active: true,
  },
  {
    id: 2,
    date: "Fri, Apr 10 2026",
    timeIn: "08:55 AM",
    timeOut: "05:30 PM",
    branch: "Head Office",
    status: "valid",
    duration: "8h 35m",
  },
  {
    id: 3,
    date: "Thu, Apr 9 2026",
    timeIn: "09:34 AM",
    timeOut: "06:00 PM",
    branch: "Head Office",
    status: "late",
    duration: "8h 26m",
  },
  {
    id: 4,
    date: "Wed, Apr 8 2026",
    timeIn: "09:01 AM",
    timeOut: "05:15 PM",
    branch: "Head Office",
    status: "valid",
    duration: "8h 14m",
  },
  {
    id: 5,
    date: "Tue, Apr 7 2026",
    timeIn: null,
    timeOut: null,
    branch: "Head Office",
    status: "absent",
    duration: "—",
  },
  {
    id: 6,
    date: "Mon, Apr 6 2026",
    timeIn: "08:47 AM",
    timeOut: "04:58 PM",
    branch: "Head Office",
    status: "valid",
    duration: "8h 11m",
  },
  {
    id: 7,
    date: "Fri, Apr 3 2026",
    timeIn: "09:15 AM",
    timeOut: "05:45 PM",
    branch: "Head Office",
    status: "valid",
    duration: "8h 30m",
  },
  {
    id: 8,
    date: "Thu, Apr 2 2026",
    timeIn: "10:02 AM",
    timeOut: "06:15 PM",
    branch: "Downtown Hub",
    status: "late",
    duration: "8h 13m",
  },
  {
    id: 9,
    date: "Wed, Apr 1 2026",
    timeIn: "09:00 AM",
    timeOut: "05:30 PM",
    branch: "Head Office",
    status: "valid",
    duration: "8h 30m",
  },
  {
    id: 10,
    date: "Tue, Mar 31 2026",
    timeIn: "09:20 AM",
    timeOut: "05:50 PM",
    branch: "Head Office",
    status: "valid",
    duration: "8h 30m",
  },
  {
    id: 11,
    date: "Mon, Mar 30 2026",
    timeIn: "08:50 AM",
    timeOut: "05:20 PM",
    branch: "Head Office",
    status: "valid",
    duration: "8h 30m",
  },
  {
    id: 12,
    date: "Fri, Mar 27 2026",
    timeIn: null,
    timeOut: null,
    branch: "Head Office",
    status: "absent",
    duration: "—",
  },
];

const STATUS_STYLE: Record<Status, string> = {
  valid: "bg-teal-50 text-teal-700",
  late: "bg-amber-50 text-amber-700",
  absent: "bg-[#f5f5f5] text-[#737373]",
};

const STATUS_LABEL: Record<Status, string> = {
  valid: "On Time",
  late: "Late",
  absent: "Absent",
};

export default function HistoryPage() {
  const [filter, setFilter] = useState<"all" | Status>("all");

  const filtered =
    filter === "all" ? records : records.filter((r) => r.status === filter);

  const presentDays = records.filter((r) => r.status !== "absent").length;
  const onTimeDays = records.filter((r) => r.status === "valid").length;
  const lateDays = records.filter((r) => r.status === "late").length;
  const absentDays = records.filter((r) => r.status === "absent").length;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h2 className="text-[#002244] font-bold text-xl">Attendance History</h2>
        <p className="text-[#737373] text-sm mt-0.5">Your personal attendance records</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Days Present", value: presentDays, color: "text-[#002244]" },
          { label: "On Time", value: onTimeDays, color: "text-teal-600" },
          { label: "Late Arrivals", value: lateDays, color: "text-amber-600" },
          { label: "Absent", value: absentDays, color: "text-red-500" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-4 text-center"
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[#737373] text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "valid", "late", "absent"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === f
                ? "bg-[#002244] text-white"
                : "bg-white text-[#737373] ring-1 ring-[#e5e5e5] hover:bg-[#f5f5f5]"
            }`}
          >
            {f === "all" ? "All Records" : STATUS_LABEL[f]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e5e5]">
                <th className="text-left text-[#737373] text-xs font-medium px-5 py-3.5">
                  Date
                </th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5">
                  Clock In
                </th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5">
                  Clock Out
                </th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5">
                  Duration
                </th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5 hidden sm:table-cell">
                  Branch
                </th>
                <th className="text-left text-[#737373] text-xs font-medium px-5 py-3.5">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className={r.active ? "bg-teal-50/30" : "hover:bg-[#fafafa]"}
                >
                  <td className="px-5 py-3.5 font-medium text-[#0a0a0a] text-xs whitespace-nowrap">
                    {r.date}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[#0a0a0a] font-semibold text-xs tabular-nums">
                      {r.timeIn ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {r.active ? (
                      <span className="flex items-center gap-1.5 text-teal-600 font-semibold text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                        Active
                      </span>
                    ) : (
                      <span className="text-[#0a0a0a] font-semibold text-xs tabular-nums">
                        {r.timeOut ?? "—"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-xs font-medium ${
                        r.active ? "text-teal-600" : "text-[#737373]"
                      } tabular-nums`}
                    >
                      {r.duration}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#737373] hidden sm:table-cell">
                    {r.branch}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        STATUS_STYLE[r.status]
                      }`}
                    >
                      {STATUS_LABEL[r.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-[#737373] text-sm">
            No records match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
