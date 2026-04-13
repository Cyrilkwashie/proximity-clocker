"use client";

import { useEffect, useRef, useState } from "react";

function useFadeIn() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const mockStats = [
  { label: "Present Today", value: "142", color: "text-teal-400" },
  { label: "Branches Active", value: "8", color: "text-blue-400" },
  { label: "Clocked In", value: "96%", color: "text-emerald-400" },
];

const mockRows = [
  { name: "Adaeze Obi", branch: "Victoria Island", time: "08:11 AM", status: "Present" },
  { name: "Chukwuemeka Nze", branch: "Lekki Phase 1", time: "08:23 AM", status: "Present" },
  { name: "Fatima Yusuf", branch: "Abuja HQ", time: "08:47 AM", status: "Present" },
  { name: "David Mensah", branch: "Port Harcourt", time: "09:02 AM", status: "Late" },
  { name: "Ngozi Adeleke", branch: "Victoria Island", time: "—", status: "Absent" },
];

export default function DashboardShowcase() {
  const { ref, visible } = useFadeIn();

  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-teal-600 text-xs font-bold tracking-widest uppercase mb-4">
            Dashboard Preview
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#002244] leading-tight">
            Command your workforce{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              at a glance
            </span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            The admin dashboard gives you real-time insights into attendance,
            branch status, and workforce activity — all in one place.
          </p>
        </div>

        {/* Mock Dashboard Card */}
        <div
          ref={ref}
          className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
        >
          <div className="bg-gradient-to-br from-[#0a1628] to-[#0d2040] rounded-3xl shadow-2xl shadow-blue-900/30 overflow-hidden border border-white/5">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-rose-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <div className="ml-4 flex-1 bg-white/5 rounded-lg h-6 max-w-sm flex items-center px-3">
                <span className="text-slate-500 text-xs">app.proximityclocker.com/dashboard</span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-white font-bold text-lg">Attendance Overview</h3>
                  <p className="text-slate-400 text-sm">Monday, April 13, 2026</p>
                </div>
                <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-teal-400 text-xs font-semibold">Live</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {mockStats.map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className={`text-2xl font-extrabold ${s.color} mb-1`}>{s.value}</div>
                    <div className="text-slate-400 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="bg-white/3 rounded-2xl overflow-hidden border border-white/5">
                <div className="grid grid-cols-4 px-4 py-3 border-b border-white/5">
                  {["Employee", "Branch", "Clock-In", "Status"].map((h) => (
                    <span key={h} className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{h}</span>
                  ))}
                </div>
                {mockRows.map((row, i) => (
                  <div
                    key={row.name}
                    className={`grid grid-cols-4 px-4 py-3.5 items-center ${i < mockRows.length - 1 ? "border-b border-white/5" : ""}`}
                  >
                    <span className="text-white text-sm font-medium">{row.name}</span>
                    <span className="text-slate-400 text-sm">{row.branch}</span>
                    <span className="text-slate-300 text-sm font-mono">{row.time}</span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${
                        row.status === "Present"
                          ? "bg-teal-500/15 text-teal-400"
                          : row.status === "Late"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-rose-500/15 text-rose-400"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        row.status === "Present" ? "bg-teal-400" : row.status === "Late" ? "bg-amber-400" : "bg-rose-400"
                      }`} />
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
