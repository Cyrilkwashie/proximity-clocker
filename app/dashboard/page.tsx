"use client";

const stats = [
  {
    label: "Total Employees",
    value: "110",
    change: "+6 this month",
    up: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "text-[#002244] bg-[#002244]/10",
  },
  {
    label: "Active Today",
    value: "89",
    change: "81% presence rate",
    up: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-teal-600 bg-teal-50",
  },
  {
    label: "Total Branches",
    value: "5",
    change: "2 cities active",
    up: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "text-violet-600 bg-violet-50",
  },
  {
    label: "Attendance Rate",
    value: "94.2%",
    change: "+2.1% vs last week",
    up: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "text-amber-600 bg-amber-50",
  },
];

const weeklyBars = [
  { day: "Mon", rate: 91 },
  { day: "Tue", rate: 96 },
  { day: "Wed", rate: 88 },
  { day: "Thu", rate: 97 },
  { day: "Fri", rate: 84 },
  { day: "Sat", rate: 62 },
  { day: "Sun", rate: 45 },
];

const branches = [
  { name: "Head Office",     employees: 42, active: 38, rate: 90 },
  { name: "Downtown Hub",    employees: 28, active: 25, rate: 89 },
  { name: "Westside Branch", employees: 19, active: 17, rate: 89 },
  { name: "Airport Desk",    employees: 13, active:  9, rate: 69 },
  { name: "North Campus",    employees:  8, active:  0, rate:  0 },
];

const recentLogs = [
  { name: "Marcus Reid", branch: "Head Office", time: "08:04 AM", status: "valid" },
  { name: "Asha Patel", branch: "Downtown Hub", time: "08:11 AM", status: "valid" },
  { name: "James Osei", branch: "Westside Branch", time: "08:22 AM", status: "valid" },
  { name: "Lena Vogel", branch: "Head Office", time: "08:35 AM", status: "late" },
  { name: "Carlos Méndez", branch: "Airport Desk", time: "08:41 AM", status: "late" },
  { name: "Nina Chow", branch: "Downtown Hub", time: "08:55 AM", status: "valid" },
];

const statusStyle: Record<string, string> = {
  valid: "bg-teal-50 text-teal-700",
  late: "bg-amber-50 text-amber-700",
};

// SVG chart geometry
const VW = 560, VH = 180;
const PAD = { top: 24, right: 20, bottom: 32, left: 40 };
const IW = VW - PAD.left - PAD.right;
const IH = VH - PAD.top - PAD.bottom;
const MIN_R = 40, MAX_R = 100;
function gx(i: number) { return PAD.left + (i / (weeklyBars.length - 1)) * IW; }
function gy(r: number) { return PAD.top + IH - ((r - MIN_R) / (MAX_R - MIN_R)) * IH; }

import { useState } from "react";

export default function DashboardPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#737373] text-xs font-medium">{s.label}</p>
                <p className="text-[#002244] text-3xl font-bold mt-1">{s.value}</p>
              </div>
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                {s.icon}
              </span>
            </div>
            <p className="text-[#737373] text-xs mt-3">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Weekly attendance bar chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[#002244] font-semibold text-base">Weekly Attendance</h2>
              <p className="text-[#737373] text-xs mt-0.5">Presence rate by day (this week)</p>
            </div>
            <span className="text-xs text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full font-medium ring-1 ring-teal-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />Live
            </span>
          </div>

          {/* SVG line chart */}
          <div className="w-full overflow-x-auto" onMouseLeave={() => setHovered(null)}>
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="w-full"
              style={{ minWidth: 280, height: 180 }}
            >
              <defs>
                <linearGradient id="wkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#002244" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#002244" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Y-axis grid lines at 40 60 80 100 */}
              {[40, 60, 80, 100].map((v) => {
                const y = gy(v);
                return (
                  <g key={v}>
                    <line x1={PAD.left} y1={y} x2={VW - PAD.right} y2={y}
                      stroke="#e5e5e5" strokeWidth="1"
                      strokeDasharray={v === 100 ? "0" : "4 3"} />
                    <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#737373">{v}%</text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path
                d={[
                  ...weeklyBars.map((b, i) => `${i === 0 ? 'M' : 'L'} ${gx(i)},${gy(b.rate)}`),
                  `L ${gx(weeklyBars.length - 1)},${PAD.top + IH}`,
                  `L ${gx(0)},${PAD.top + IH} Z`,
                ].join(' ')}
                fill="url(#wkGrad)"
              />

              {/* Line */}
              <path
                d={weeklyBars.map((b, i) => `${i === 0 ? 'M' : 'L'} ${gx(i)},${gy(b.rate)}`).join(' ')}
                fill="none" stroke="#002244" strokeWidth="2.5"
                strokeLinejoin="round" strokeLinecap="round"
              />

              {/* X-axis labels */}
              {weeklyBars.map((b, i) => (
                <text key={i} x={gx(i)} y={VH - 6} textAnchor="middle" fontSize="10" fill="#737373">{b.day}</text>
              ))}

              {/* Dots + hover zones */}
              {weeklyBars.map((b, i) => {
                const x = gx(i), y = gy(b.rate);
                const isHov = hovered === i;
                const ttW = 62, ttH = 38;
                const ttX = Math.min(Math.max(x - ttW / 2, 2), VW - ttW - 2);
                const ttY = y - ttH - 8;
                return (
                  <g key={i} onMouseEnter={() => setHovered(i)}>
                    {/* Invisible wide hover target */}
                    <rect
                      x={i === 0 ? x - 24 : (gx(i - 1) + x) / 2}
                      y={PAD.top} height={IH}
                      width={
                        i === 0 ? (gx(1) - x) / 2 + 24
                        : i === weeklyBars.length - 1 ? x - (gx(i - 1) + x) / 2 + 24
                        : (gx(i + 1) - gx(i - 1)) / 2
                      }
                      fill="transparent"
                    />
                    {isHov && (
                      <line x1={x} y1={PAD.top} x2={x} y2={PAD.top + IH}
                        stroke="#002244" strokeWidth="1" strokeDasharray="4 3" opacity="0.35" />
                    )}
                    <circle cx={x} cy={y}
                      r={isHov ? 6 : 4}
                      fill="white" stroke={b.rate >= 88 ? "#002244" : b.rate >= 70 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="2.5"
                      className="transition-all duration-100"
                    />
                    {!isHov && b.rate >= 90 && <circle cx={x} cy={y} r={2} fill="#002244" />}
                    {isHov && (
                      <g>
                        <rect x={ttX} y={ttY} width={ttW} height={ttH} rx="6" fill="#002244" />
                        <text x={ttX + ttW / 2} y={ttY + 14} textAnchor="middle" fontSize="12" fontWeight="700" fill="white">{b.rate}%</text>
                        <text x={ttX + ttW / 2} y={ttY + 28} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.6)">{b.day} · this week</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 pt-3 mt-1 border-t border-[#e5e5e5]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#002244]" />
              <span className="text-[#737373] text-[10px]">≥88% Good</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-[#737373] text-[10px]">70–87% Fair</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-[#737373] text-[10px]">&lt;70% Low</span>
            </div>
            <span className="ml-auto text-[#737373] text-[10px] hidden sm:block">Hover for details</span>
          </div>
        </div>

        {/* Branch activity */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-6">
          <h2 className="text-[#002244] font-semibold text-base mb-1">Branch Activity</h2>
          <p className="text-[#737373] text-xs mb-5">Active employees per branch today</p>
          <div className="space-y-3.5">
            {branches.map((b) => (
              <div key={b.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0a0a0a] text-sm font-medium">{b.name}</span>
                    {b.active === 0 && (
                      <span className="text-[10px] font-medium text-[#737373] bg-[#f5f5f5] px-1.5 py-0.5 rounded">Inactive</span>
                    )}
                  </div>
                  <span className="text-[#737373] text-xs tabular-nums">{b.active}/{b.employees}</span>
                </div>
                <div className="h-1.5 bg-[#f5f5f5] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      b.rate >= 88 ? "bg-teal-500" : b.rate >= 70 ? "bg-[#002244]" : b.rate > 0 ? "bg-amber-400" : "bg-[#e5e5e5]"
                    }`}
                    style={{ width: `${b.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent clock-ins */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e5e5] flex items-center justify-between">
          <div>
            <h2 className="text-[#002244] font-semibold text-base">Recent Clock-Ins</h2>
            <p className="text-[#737373] text-xs mt-0.5">Today's latest attendance records</p>
          </div>
          <a href="/dashboard/attendance" className="text-teal-600 text-xs font-medium hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e5e5]">
                <th className="text-left text-[#737373] text-xs font-medium px-6 py-3">Employee</th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3">Branch</th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3">Time</th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {recentLogs.map((log) => (
                <tr key={log.name} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-6 py-3.5 font-medium text-[#0a0a0a]">{log.name}</td>
                  <td className="px-4 py-3.5 text-[#737373]">{log.branch}</td>
                  <td className="px-4 py-3.5 text-[#737373]">{log.time}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyle[log.status]}`}>
                      {log.status}
                    </span>
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
