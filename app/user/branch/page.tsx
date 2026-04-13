"use client";

import { useState } from "react";

const BRANCH = {
  name: "Head Office",
  address: "123 Business Avenue, Suite 400",
  city: "New York",
  country: "United States",
  lat: 40.7128,
  lng: -74.006,
  radius: 150,
  manager: "James Okafor",
  totalStaff: 42,
  activeNow: 28,
  workHours: "09:00 AM – 06:00 PM",
  workDays: "Monday – Friday",
};

export default function BranchPage() {
  const [locSimActive, setLocSimActive] = useState(true);

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h2 className="text-[#002244] dark:text-[#e2e8f0] font-bold text-xl">My Branch</h2>
        <p className="text-[#737373] dark:text-[#94a3b8] text-sm mt-0.5">Your assigned workplace information</p>
      </div>

      {/* Branch Hero */}
      <div className="bg-[#002244] rounded-2xl overflow-hidden relative">
        {/* Background circles */}
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">
                Assigned Branch
              </p>
              <h3 className="text-white font-bold text-2xl leading-tight">{BRANCH.name}</h3>
              <p className="text-white/60 text-sm mt-1.5">{BRANCH.address}</p>
              <p className="text-white/60 text-sm">{BRANCH.city}, {BRANCH.country}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/10">
            <div>
              <p className="text-white text-xl font-bold">{BRANCH.activeNow}</p>
              <p className="text-white/50 text-[10px] mt-0.5">Active now</p>
            </div>
            <div>
              <p className="text-white text-xl font-bold">{BRANCH.totalStaff}</p>
              <p className="text-white/50 text-[10px] mt-0.5">Total staff</p>
            </div>
            <div>
              <p className="text-white text-xl font-bold">{BRANCH.radius}m</p>
              <p className="text-white/50 text-[10px] mt-0.5">Geofence radius</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Location Status */}
      <div
        className={`bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 p-5 flex items-center justify-between gap-4 ${
          locSimActive ? "ring-teal-200 dark:ring-teal-700" : "ring-red-200 dark:ring-red-900"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              locSimActive ? "bg-teal-50 dark:bg-teal-900/30" : "bg-red-50 dark:bg-red-900/30"
            }`}
          >
            <div className="relative">
              <div
                className={`w-3 h-3 rounded-full ${
                  locSimActive ? "bg-teal-500" : "bg-red-500"
                }`}
              />
              {locSimActive && (
                <span className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-60" />
              )}
            </div>
          </div>
          <div>
            <p
              className={`font-bold text-base ${
                locSimActive ? "text-teal-600" : "text-red-500"
              }`}
            >
              {locSimActive ? "You are within range" : "You are outside range"}
            </p>
            <p className="text-[#737373] dark:text-[#94a3b8] text-xs mt-0.5">
              {locSimActive
                ? `Within ${BRANCH.radius}m of ${BRANCH.name}`
                : `More than ${BRANCH.radius}m from ${BRANCH.name}`}
            </p>
          </div>
        </div>
        <button
          onClick={() => setLocSimActive(!locSimActive)}
          className="text-[10px] font-semibold px-2.5 py-1.5 rounded-lg bg-[#f5f5f5] dark:bg-[#334155] text-[#737373] dark:text-[#94a3b8] hover:bg-[#e5e5e5] dark:hover:bg-[#475569] transition-colors shrink-0"
        >
          Simulate
        </button>
      </div>

      {/* Geofence Visual */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-6">
        <h3 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-sm mb-4">Geofence Zone</h3>

        <div
          className="bg-[#f5f5f5] dark:bg-[#0f172a] rounded-xl flex items-center justify-center relative overflow-hidden"
          style={{ height: 210 }}
        >
          {/* Grid background */}
          <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden>
            <defs>
              <pattern id="geo-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#002244" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo-grid)" />
          </svg>

          {/* Geofence rings */}
          <div className="absolute w-44 h-44 rounded-full border-2 border-dashed border-[#002244]/15" />
          <div className="absolute w-32 h-32 rounded-full bg-teal-500/10 border-2 border-teal-400/40" />
          <div className="absolute w-24 h-24 rounded-full bg-teal-500/5 border border-teal-400/20" />

          {/* User dot (simulated) */}
          {locSimActive && (
            <div className="absolute" style={{ transform: "translate(28px, 20px)" }}>
              <div className="w-4 h-4 rounded-full bg-teal-500 border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <span className="absolute top-5 left-1/2 -translate-x-1/2 bg-white text-[#002244] text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                You
              </span>
            </div>
          )}

          {/* Branch pin */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#002244] shadow-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="bg-white dark:bg-[#1e293b] px-2 py-0.5 rounded-md text-[10px] font-semibold text-[#002244] dark:text-[#e2e8f0] shadow-sm">
              {BRANCH.name}
            </span>
          </div>

          <span className="absolute bottom-3 right-4 text-[10px] text-[#737373] dark:text-[#94a3b8] bg-white/70 dark:bg-[#1e293b]/80 px-2 py-0.5 rounded">
            {BRANCH.radius}m radius
          </span>
        </div>

        <div className="mt-4 space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#737373] dark:text-[#94a3b8]">Coordinates</span>
            <span className="text-[#0a0a0a] dark:text-[#e2e8f0] font-medium tabular-nums">
              {BRANCH.lat.toFixed(4)}, {BRANCH.lng.toFixed(4)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#737373] dark:text-[#94a3b8]">Allowed radius</span>
            <span className="text-[#0a0a0a] dark:text-[#e2e8f0] font-medium">{BRANCH.radius} meters</span>
          </div>
        </div>
      </div>

      {/* Branch Details */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-6">
        <h3 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-sm mb-1">Branch Details</h3>
        <p className="text-[#737373] dark:text-[#94a3b8] text-xs mb-4">Workplace information and schedule</p>
        <div className="divide-y divide-[#e5e5e5] dark:divide-[#334155]">
          {[
            { label: "Branch Manager", value: BRANCH.manager },
            { label: "Working Hours", value: BRANCH.workHours },
            { label: "Working Days", value: BRANCH.workDays },
            { label: "Location", value: `${BRANCH.city}, ${BRANCH.country}` },
            { label: "Total Staff", value: `${BRANCH.totalStaff} employees` },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-3 gap-4">
              <span className="text-[#737373] dark:text-[#94a3b8] text-sm shrink-0">{item.label}</span>
              <span className="text-[#0a0a0a] dark:text-[#e2e8f0] text-sm font-medium text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
