"use client";

import { useState } from "react";

const monthlyData = [
  { month: "Jan", rate: 88, total: 2480, valid: 2182 },
  { month: "Feb", rate: 91, total: 2240, valid: 2038 },
  { month: "Mar", rate: 86, total: 2480, valid: 2133 },
  { month: "Apr", rate: 93, total: 2400, valid: 2232 },
  { month: "May", rate: 90, total: 2480, valid: 2232 },
  { month: "Jun", rate: 95, total: 2400, valid: 2280 },
  { month: "Jul", rate: 87, total: 2480, valid: 2158 },
  { month: "Aug", rate: 92, total: 2480, valid: 2282 },
  { month: "Sep", rate: 94, total: 2400, valid: 2256 },
  { month: "Oct", rate: 96, total: 2480, valid: 2381 },
  { month: "Nov", rate: 91, total: 2400, valid: 2184 },
  { month: "Dec", rate: 89, total: 2480, valid: 2207 },
];

const quarterlyData = [
  { month: "Q1", rate: Math.round((88 + 91 + 86) / 3) },
  { month: "Q2", rate: Math.round((93 + 90 + 95) / 3) },
  { month: "Q3", rate: Math.round((87 + 92 + 94) / 3) },
  { month: "Q4", rate: Math.round((96 + 91 + 89) / 3) },
];

const branchReport = [
  { branch: "Head Office", employees: 42, avgRate: 94, onTime: 38, late: 4 },
  { branch: "Westside Branch", employees: 19, avgRate: 89, onTime: 16, late: 3 },
  { branch: "Downtown Hub", employees: 28, avgRate: 92, onTime: 25, late: 3 },
  { branch: "Airport Desk", employees: 13, avgRate: 71, onTime: 9, late: 4 },
  { branch: "North Campus", employees: 8, avgRate: 85, onTime: 6, late: 2 },
];

const statusBreakdown = { valid: 76, late: 20, absent: 4 };

const maxRate = Math.max(...monthlyData.map((d) => d.rate));

// SVG chart geometry
const VW = 700, VH = 220;
const PAD = { top: 24, right: 24, bottom: 36, left: 48 };
const IW = VW - PAD.left - PAD.right;
const IH = VH - PAD.top - PAD.bottom;
const MIN_RATE = 80, MAX_RATE = 100;
function getX(i: number, total: number) { return PAD.left + (i / (total - 1)) * IW; }
function getY(rate: number) { return PAD.top + IH - ((rate - MIN_RATE) / (MAX_RATE - MIN_RATE)) * IH; }

export default function ReportsPage() {
  const [period, setPeriod] = useState<"monthly" | "quarterly">("monthly");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);

  function handleExport() {
    setExporting(true);
    setTimeout(() => setExporting(false), 1500);
  }

  const chartData = period === "monthly" ? monthlyData : quarterlyData;
  const points = chartData.map((d, i) => ({ x: getX(i, chartData.length), y: getY(d.rate), ...d }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x},${PAD.top + IH} L ${points[0].x},${PAD.top + IH} Z`;
  const yGridLines = [80, 85, 90, 95, 100];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[#002244] font-bold text-xl">Reports & Analytics</h2>
          <p className="text-[#737373] text-sm mt-0.5">Attendance trends and performance insights</p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002244] text-white text-sm font-medium hover:bg-[#003366] transition-colors disabled:opacity-70"
        >
          {exporting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Exportingâ€¦
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </>
          )}
        </button>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Avg Monthly Rate", value: `${Math.round(monthlyData.reduce((a, b) => a + b.rate, 0) / monthlyData.length)}%`, color: "text-teal-600" },
          { label: "Total Clock-Ins", value: monthlyData.reduce((a, b) => a + b.valid, 0).toLocaleString(), color: "text-[#002244]" },
          { label: "Peak Month", value: monthlyData.find((d) => d.rate === maxRate)?.month ?? "â€”", color: "text-violet-600" },
          { label: "Active Branches", value: "5", color: "text-amber-600" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-5">
            <p className="text-[#737373] text-xs font-medium">{k.label}</p>
            <p className={`text-3xl font-bold mt-1 ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* SVG Line Chart */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[#002244] font-semibold text-base">Attendance Rate Trend</h3>
            <p className="text-[#737373] text-xs mt-0.5">Full year overview â€” 2025</p>
          </div>
          <div className="flex gap-1.5 bg-[#f5f5f5] rounded-xl p-1">
            {(["monthly", "quarterly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => { setPeriod(p); setHoveredIdx(null); }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  period === p ? "bg-white text-[#002244] shadow-sm" : "text-[#737373]"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="w-full"
            style={{ minWidth: "320px", height: "220px" }}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#002244" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#002244" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Y-axis grid lines */}
            {yGridLines.map((v) => {
              const y = getY(v);
              return (
                <g key={v}>
                  <line
                    x1={PAD.left} y1={y} x2={VW - PAD.right} y2={y}
                    stroke="#e5e5e5" strokeWidth="1" strokeDasharray={v % 10 === 0 ? "0" : "4 3"}
                  />
                  <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#737373">{v}%</text>
                </g>
              );
            })}

            {/* Gradient area */}
            <path d={areaPath} fill="url(#areaGrad)" />

            {/* Line */}
            <path d={linePath} fill="none" stroke="#002244" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

            {/* X-axis labels */}
            {points.map((p, i) => (
              <text key={i} x={p.x} y={VH - 8} textAnchor="middle" fontSize="10" fill="#737373">{p.month}</text>
            ))}

            {/* Hover zones + dots */}
            {points.map((p, i) => (
              <g key={i} onMouseEnter={() => setHoveredIdx(i)}>
                {/* Wide invisible hover target */}
                <rect
                  x={i === 0 ? p.x - 20 : (points[i - 1].x + p.x) / 2}
                  y={PAD.top}
                  width={
                    i === 0
                      ? (points[1].x - p.x) / 2 + 20
                      : i === points.length - 1
                      ? p.x - (points[i - 1].x + p.x) / 2 + 20
                      : (points[i + 1].x - points[i - 1].x) / 2
                  }
                  height={IH}
                  fill="transparent"
                />
                {/* Vertical hover line */}
                {hoveredIdx === i && (
                  <line x1={p.x} y1={PAD.top} x2={p.x} y2={PAD.top + IH} stroke="#002244" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
                )}
                {/* Dot */}
                <circle
                  cx={p.x} cy={p.y}
                  r={hoveredIdx === i ? 6 : 4}
                  fill="white" stroke="#002244" strokeWidth="2.5"
                  className="transition-all duration-100"
                />
                {/* Dot accent for high performance */}
                {p.rate >= 93 && hoveredIdx !== i && (
                  <circle cx={p.x} cy={p.y} r={2} fill="#002244" />
                )}
                {/* Tooltip */}
                {hoveredIdx === i && (() => {
                  const ttW = 80, ttH = 42, ttX = Math.min(Math.max(p.x - ttW / 2, 2), VW - ttW - 2);
                  const ttY = p.y - ttH - 10;
                  return (
                    <g>
                      <rect x={ttX} y={ttY} width={ttW} height={ttH} rx="6" fill="#002244" />
                      <text x={ttX + ttW / 2} y={ttY + 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="white">{p.rate}%</text>
                      <text x={ttX + ttW / 2} y={ttY + 29} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.65)">{p.month} 2025</text>
                    </g>
                  );
                })()}
              </g>
            ))}
          </svg>
        </div>

        <div className="flex items-center gap-5 mt-2 pt-4 border-t border-[#e5e5e5]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-[#002244] rounded" />
            <span className="text-[#737373] text-xs">Attendance rate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#002244]" />
            <span className="text-[#737373] text-xs">â‰¥ 93% excellent</span>
          </div>
          <div className="ml-auto text-[#737373] text-xs hidden sm:block">Hover a point for details</div>
        </div>
      </div>

      {/* Bottom row: Donut + Branch Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Status Donut */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-6 flex flex-col">
          <h3 className="text-[#002244] font-semibold text-base">Status Breakdown</h3>
          <p className="text-[#737373] text-xs mt-0.5 mb-6">All clock-ins this year</p>

          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            {/* Donut */}
            <div
              className="relative w-44 h-44 rounded-full shrink-0"
              style={{
                background: `conic-gradient(
                  #14b8a6 0% ${statusBreakdown.valid}%,
                  #f59e0b ${statusBreakdown.valid}% ${statusBreakdown.valid + statusBreakdown.late}%,
                  #e5e5e5 ${statusBreakdown.valid + statusBreakdown.late}% 100%
                )`,
              }}
            >
              {/* White center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-bold text-[#002244]">{statusBreakdown.valid}%</span>
                  <span className="text-[10px] text-[#737373] font-medium">On Time</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full grid grid-cols-1 gap-y-2.5">
              {[
                { label: "Valid / On Time", pct: statusBreakdown.valid, color: "bg-teal-500" },
                { label: "Late Arrival", pct: statusBreakdown.late, color: "bg-amber-400" },
                { label: "Absent", pct: statusBreakdown.absent, color: "bg-[#e5e5e5]" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.color}`} />
                  <div>
                    <p className="text-[#0a0a0a] text-[10px] font-semibold leading-tight">{s.pct}%</p>
                    <p className="text-[#737373] text-[10px] leading-tight">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branch Performance Bars */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-6 flex flex-col">
          <h3 className="text-[#002244] font-semibold text-base">Branch Performance</h3>
          <p className="text-[#737373] text-xs mt-0.5 mb-6">Average attendance rate by branch</p>

          <div className="flex-1 space-y-4">
            {branchReport.sort((a, b) => b.avgRate - a.avgRate).map((b) => (
              <div key={b.branch}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0a0a0a] text-sm font-medium">{b.branch}</span>
                    <span className="text-[#737373] text-[10px]">{b.employees} staff</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs tabular-nums">
                    <span className="text-teal-600 font-medium">{b.onTime} on time</span>
                    <span className="text-[#0a0a0a] font-bold">{b.avgRate}%</span>
                  </div>
                </div>
                <div className="h-2.5 bg-[#f5f5f5] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      b.avgRate >= 93 ? "bg-teal-500" : b.avgRate >= 88 ? "bg-[#002244]" : "bg-amber-400"
                    }`}
                    style={{ width: `${b.avgRate}%` }}
                  />
                </div>
                <div className="flex gap-3 mt-1.5">
                  {[
                    { label: "On Time", val: b.onTime, cls: "text-teal-600" },
                    { label: "Late", val: b.late, cls: "text-amber-600" },
                  ].map((s) => (
                    <span key={s.label} className={`text-[10px] ${s.cls}`}>{s.label}: <strong>{s.val}</strong></span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4 mt-4 border-t border-[#e5e5e5]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <span className="text-[#737373] text-[10px]">â‰¥93% Excellent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#002244]" />
              <span className="text-[#737373] text-[10px]">88â€“92% Good</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-[#737373] text-[10px]">&lt;88% Review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
