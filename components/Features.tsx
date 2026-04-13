"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "GPS Location Detection",
    description: "Uses the device's GPS to capture real-time coordinates with high precision during clock-in.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "from-teal-500 to-cyan-500",
    glow: "shadow-teal-500/20",
  },
  {
    title: "Branch Radius Validation",
    description: "Each branch has a configurable GPS radius. Only employees within that boundary can clock in.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    color: "from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/20",
  },
  {
    title: "Automatic Clock-In",
    description: "No manual action needed. Once verified at the right location, attendance is logged instantly.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20",
  },
  {
    title: "Admin Dashboard",
    description: "Comprehensive control panel for admins to view, filter, and manage all attendance records.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    color: "from-violet-500 to-purple-500",
    glow: "shadow-violet-500/20",
  },
  {
    title: "Multi-Branch Tracking",
    description: "Manage unlimited branch locations from a single platform with unified reporting.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5m4 0H9" />
      </svg>
    ),
    color: "from-orange-500 to-amber-500",
    glow: "shadow-orange-500/20",
  },
  {
    title: "Attendance Logs",
    description: "Full audit trail of every clock-in event including timestamp, location, and branch data.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    color: "from-sky-500 to-blue-500",
    glow: "shadow-sky-500/20",
  },
  {
    title: "Real-Time Monitoring",
    description: "Watch attendance activity as it happens across all branches in a live feed view.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-rose-500 to-pink-500",
    glow: "shadow-rose-500/20",
  },
  {
    title: "Secure Authentication",
    description: "Enterprise-grade authentication protects all user accounts and sensitive attendance data.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: "from-slate-500 to-slate-700",
    glow: "shadow-slate-500/20",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-default ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg ${feature.glow}`}>
        {feature.icon}
      </div>
      <h3 className="text-[#002244] font-bold text-base mb-2 group-hover:text-teal-600 transition-colors">
        {feature.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}

export default function Features() {
  const [headVisible, setHeadVisible] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeadVisible(true); },
      { threshold: 0.2 }
    );
    if (headRef.current) observer.observe(headRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="bg-[#f8f9fb] py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="inline-block text-teal-600 text-xs font-bold tracking-widest uppercase mb-4">
            Platform Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#002244] leading-tight">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              manage attendance
            </span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            A complete toolkit for accurate, automated, and transparent workforce
            attendance management.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
