"use client";

import { useEffect, useRef, useState } from "react";

const userFeatures = [
  { icon: "🔐", text: "Easy, secure login" },
  { icon: "📍", text: "Automatic clock-in on arrival" },
  { icon: "✅", text: "Location-based validation" },
  { icon: "📋", text: "Simple attendance history" },
  { icon: "📱", text: "Works on any device" },
  { icon: "🔔", text: "Real-time status feedback" },
];

const adminFeatures = [
  { icon: "🏢", text: "View and manage all branches" },
  { icon: "👥", text: "Monitor all staff attendance" },
  { icon: "🗺️", text: "Track who clocked in and where" },
  { icon: "📊", text: "Workforce analytics dashboard" },
  { icon: "⚙️", text: "Configure branch GPS radius" },
  { icon: "📤", text: "Export attendance reports" },
];

function useFadeIn(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function UserAdmin() {
  const { ref: headRef, visible: headVisible } = useFadeIn();
  const { ref: userRef, visible: userVisible } = useFadeIn();
  const { ref: adminRef, visible: adminVisible } = useFadeIn();

  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="inline-block text-teal-600 text-xs font-bold tracking-widest uppercase mb-4">
            Built For Everyone
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#002244] leading-tight">
            Tailored for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              users & admins
            </span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            Whether you are clocking in or overseeing a 500-person workforce,
            Proximity Clocker has the right tools for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Card */}
          <div
            ref={userRef}
            className={`relative overflow-hidden bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-700 ${userVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-80" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-teal-600 font-bold tracking-widest uppercase mb-0.5">Employee Portal</div>
                  <h3 className="text-xl font-extrabold text-[#002244]">User Experience</h3>
                </div>
              </div>

              <ul className="space-y-3">
                {userFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-3">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-slate-700 font-medium">{f.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  Seamless. Automatic. No effort required.
                </div>
              </div>
            </div>
          </div>

          {/* Admin Card */}
          <div
            ref={adminRef}
            className={`relative overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#0d2040] rounded-3xl p-8 shadow-2xl shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-700 ${adminVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400/20 to-blue-400/20 border border-teal-500/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-teal-400 font-bold tracking-widest uppercase mb-0.5">Admin Portal</div>
                  <h3 className="text-xl font-extrabold text-white">Admin Dashboard</h3>
                </div>
              </div>

              <ul className="space-y-3">
                {adminFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-3">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-slate-300 font-medium">{f.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  Full control. Total visibility. Everywhere.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
