"use client";

import { useEffect, useRef, useState } from "react";

function useFadeIn() {
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
  return { ref, visible };
}

export default function CTA() {
  const { ref, visible } = useFadeIn();

  return (
    <section className="bg-[#0a1628] py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d2040] to-[#071020] border border-teal-500/20 p-12 md:p-16 text-center shadow-2xl transition-all duration-700 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {/* Glow blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-400 text-xs font-bold tracking-widest uppercase">
                Start Today
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Manage Attendance Smarter{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                with Proximity Clocker
              </span>
            </h2>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Track staff accurately across branches using real-time location
              verification. Eliminate fraud, reduce admin overhead, and gain
              complete confidence in your attendance data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="group flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105"
              >
                Get Started — It&apos;s Free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-200"
              >
                Request Demo
              </a>
            </div>

            {/* Trust note */}
            <p className="mt-8 text-slate-500 text-sm">
              No credit card required &nbsp;·&nbsp; Setup in minutes &nbsp;·&nbsp; Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
