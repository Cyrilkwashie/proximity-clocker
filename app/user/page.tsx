"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type LocStatus = "checking" | "inside" | "outside";
type ToastType = "success" | "info" | "warn";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}

function formatElapsed(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0)
    return `${h}h ${m.toString().padStart(2, "0")}m ${sec.toString().padStart(2, "0")}s`;
  return `${m.toString().padStart(2, "0")}m ${sec.toString().padStart(2, "0")}s`;
}

const recentRecords = [
  { date: "Fri, Apr 10", timeIn: "08:55 AM", timeOut: "05:30 PM", status: "valid" },
  { date: "Thu, Apr 9", timeIn: "09:34 AM", timeOut: "06:00 PM", status: "late" },
  { date: "Wed, Apr 8", timeIn: "09:01 AM", timeOut: "05:15 PM", status: "valid" },
];

export default function UserDashboard() {
  const [locStatus, setLocStatus] = useState<LocStatus>("checking");
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockInDate, setClockInDate] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [now, setNow] = useState(new Date());
  const [acting, setActing] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);

  // Live clock tick
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Elapsed shift timer
  useEffect(() => {
    if (!clockedIn || !clockInDate) return;
    const t = setInterval(
      () => setElapsed(Math.floor((Date.now() - clockInDate.getTime()) / 1000)),
      1000
    );
    return () => clearInterval(t);
  }, [clockedIn, clockInDate]);

  // Simulate GPS detection on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setLocStatus("inside");
      showToast("You are now within your branch radius", "info");
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  function showToast(msg: string, type: ToastType) {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }

  function handleClockIn() {
    if (locStatus !== "inside" || clockedIn) return;
    setActing(true);
    setTimeout(() => {
      const d = new Date();
      setClockInDate(d);
      setClockInTime(
        d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
      setClockOutTime(null);
      setClockedIn(true);
      setElapsed(0);
      setActing(false);
      showToast("Clock-in successful — Have a great day!", "success");
    }, 1200);
  }

  function handleClockOut() {
    if (!clockedIn) return;
    setActing(true);
    setTimeout(() => {
      const d = new Date();
      setClockOutTime(
        d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
      setClockedIn(false);
      setClockInDate(null);
      setActing(false);
      showToast("Clocked out successfully — See you next time!", "success");
    }, 1200);
  }

  function toggleLocation() {
    if (locStatus === "checking") return;
    const next: LocStatus = locStatus === "inside" ? "outside" : "inside";
    setLocStatus(next);
    showToast(
      next === "inside"
        ? "You are now within your branch radius"
        : "You have moved outside the allowed area",
      next === "inside" ? "info" : "warn"
    );
  }

  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const canClockIn = locStatus === "inside" && !clockedIn;
  const canClockOut = clockedIn;
  const btnDisabled =
    acting || locStatus === "checking" || (!canClockIn && !canClockOut);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
            toast.type === "success"
              ? "bg-teal-600 text-white"
              : toast.type === "warn"
              ? "bg-amber-500 text-white"
              : "bg-[#002244] text-white"
          }`}
        >
          {toast.type === "success" && (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {toast.type === "warn" && (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          {toast.type === "info" && (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
          {toast.msg}
        </div>
      )}

      {/* Greeting row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#002244] dark:text-[#e2e8f0] font-bold text-xl">
            Good {getGreeting()}, Sarah
          </h2>
          <p className="text-[#737373] dark:text-[#94a3b8] text-sm mt-0.5">{dateStr}</p>
        </div>
        {/* Location toggle for demo */}
        <button
          onClick={toggleLocation}
          disabled={locStatus === "checking"}
          className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border transition-colors disabled:opacity-50 ${
            locStatus === "inside"
              ? "border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100"
              : locStatus === "outside"
              ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          {locStatus === "checking"
            ? "⏳ Detecting…"
            : locStatus === "inside"
            ? "📍 Inside Radius"
            : "📍 Outside Radius"}
        </button>
      </div>

      {/* Live Clock Card */}
      <div className="bg-[#002244] rounded-2xl p-7 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice">
            <circle cx="340" cy="-20" r="130" fill="white" />
            <circle cx="60" cy="180" r="90" fill="white" />
          </svg>
        </div>
        <div className="relative z-10">
          <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-3">
            Current Time
          </p>
          <p className="text-white text-5xl font-bold tracking-tight tabular-nums">
            {timeStr}
          </p>
          <p className="text-white/40 text-sm mt-2">{dateStr}</p>
        </div>
      </div>

      {/* Status row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Attendance Status */}
        <div
          className={`bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 p-5 transition-all ${
            clockedIn ? "ring-teal-200 dark:ring-teal-700" : "ring-[#e5e5e5] dark:ring-[#334155]"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`w-2 h-2 rounded-full ${
                clockedIn ? "bg-teal-500 animate-pulse" : "bg-[#e5e5e5]"
              }`}
            />
            <p className="text-[#737373] dark:text-[#94a3b8] text-[10px] font-semibold uppercase tracking-wide">
              Status
            </p>
          </div>
          <p
            className={`font-bold text-base leading-tight ${
              clockedIn ? "text-teal-600" : "text-[#737373] dark:text-[#94a3b8]"
            }`}
          >
            {clockedIn ? "Clocked In" : "Not Clocked In"}
          </p>
          <p className="text-[#737373] dark:text-[#94a3b8] text-[10px] mt-1.5">
            {clockedIn && clockInTime
              ? `Since ${clockInTime}`
              : !clockedIn && clockOutTime
              ? `Left at ${clockOutTime}`
              : "No record yet today"}
          </p>
        </div>

        {/* Location Status */}
        <div
          className={`bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 p-5 transition-all ${
            locStatus === "inside"
              ? "ring-teal-200 dark:ring-teal-700"
              : locStatus === "outside"
              ? "ring-red-200 dark:ring-red-900"
              : "ring-[#e5e5e5] dark:ring-[#334155]"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-2 h-2 flex items-center justify-center">
              <div
                className={`w-2 h-2 rounded-full ${
                  locStatus === "checking"
                    ? "bg-amber-400"
                    : locStatus === "inside"
                    ? "bg-teal-500"
                    : "bg-red-500"
                }`}
              />
              {locStatus === "inside" && (
                <span className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-70" />
              )}
            </div>
            <p className="text-[#737373] dark:text-[#94a3b8] text-[10px] font-semibold uppercase tracking-wide">
              Location
            </p>
          </div>
          <p
            className={`font-bold text-base leading-tight ${
              locStatus === "inside"
                ? "text-teal-600"
                : locStatus === "outside"
                ? "text-red-500"
                : "text-amber-500"
            }`}
          >
            {locStatus === "checking"
              ? "Detecting…"
              : locStatus === "inside"
              ? "In Range"
              : "Out of Range"}
          </p>
          <p className="text-[#737373] dark:text-[#94a3b8] text-[10px] mt-1.5">
            {locStatus === "inside"
              ? "Head Office · 150m radius"
              : locStatus === "outside"
              ? "Move closer to clock in"
              : "Checking GPS…"}
          </p>
        </div>
      </div>

      {/* Main Action Card */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-6">
        {/* Live elapsed when clocked in */}
        {clockedIn && (
          <div className="text-center mb-5 pb-5 border-b border-[#e5e5e5] dark:border-[#334155]">
            <p className="text-[#737373] dark:text-[#94a3b8] text-[10px] font-semibold uppercase tracking-widest mb-2">
              Time on Shift
            </p>
            <p className="text-4xl font-bold text-[#002244] dark:text-[#e2e8f0] tabular-nums">
              {formatElapsed(elapsed)}
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-teal-600 text-xs font-medium">Active shift</span>
            </div>
          </div>
        )}

        {/* Outside radius warning */}
        {locStatus === "outside" && !clockedIn && (
          <div className="mb-4 flex items-start gap-3 bg-red-50 rounded-xl py-3 px-4 ring-1 ring-red-100">
            <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-red-600 text-sm font-medium">
              Move closer to your assigned branch to clock in
            </p>
          </div>
        )}

        {/* GPS checking */}
        {locStatus === "checking" && (
          <div className="mb-4 flex items-center gap-3 bg-amber-50 rounded-xl py-3 px-4 ring-1 ring-amber-100">
            <svg className="w-4 h-4 text-amber-500 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-amber-700 text-sm font-medium">
              Detecting your location, please wait…
            </p>
          </div>
        )}

        {/* Primary button */}
        <button
          onClick={clockedIn ? handleClockOut : handleClockIn}
          disabled={btnDisabled}
          className={`w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-3 transition-all ${
            acting
              ? "bg-[#f5f5f5] dark:bg-[#334155] text-[#737373] dark:text-[#94a3b8] cursor-not-allowed"
              : clockedIn
              ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 active:scale-[0.99]"
              : canClockIn
              ? "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20 active:scale-[0.99]"
              : "bg-[#f5f5f5] dark:bg-[#334155] text-[#737373] dark:text-[#94a3b8] cursor-not-allowed"
          }`}
        >
          {acting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {clockedIn ? "Clocking Out…" : "Clocking In…"}
            </>
          ) : clockedIn ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Clock Out
            </>
          ) : canClockIn ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Clock In
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Clock In Unavailable
            </>
          )}
        </button>

        {canClockIn && (
          <p className="text-center text-[#737373] dark:text-[#94a3b8] text-xs mt-3">
            ✓ Location verified ·{" "}
            <span className="text-teal-600 font-medium">Head Office</span>
          </p>
        )}
        {clockedIn && locStatus === "outside" && (
          <p className="text-center text-amber-600 text-xs mt-3 font-medium">
            ⚠ You have moved outside the branch radius
          </p>
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "This Week", value: "4/5", sub: "days present", color: "text-[#002244]" },
          { label: "On Time", value: "92%", sub: "this month", color: "text-teal-600" },
          { label: "Avg Duration", value: "8h 24m", sub: "per day", color: "text-violet-600" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-4 text-center"
          >
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[#0a0a0a] dark:text-[#e2e8f0] text-[10px] font-semibold mt-0.5">{s.label}</p>
            <p className="text-[#737373] dark:text-[#94a3b8] text-[10px]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent records */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5] dark:border-[#334155]">
          <h3 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-sm">Recent Attendance</h3>
          <Link
            href="/user/history"
            className="text-teal-600 text-xs font-medium hover:text-teal-700 transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="divide-y divide-[#e5e5e5] dark:divide-[#334155]">
          {recentRecords.map((r, i) => {
            const cls =
              r.status === "valid"
                ? "bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300"
                : r.status === "late"
                ? "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400";
            const label =
              r.status === "valid" ? "On Time" : r.status === "late" ? "Late" : "Absent";
            return (
              <div key={i} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-[#0a0a0a] dark:text-[#e2e8f0] text-sm font-medium">{r.date}</p>
                  <p className="text-[#737373] dark:text-[#94a3b8] text-xs mt-0.5">
                    {r.timeIn} → {r.timeOut}
                  </p>
                </div>
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold ${cls}`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
