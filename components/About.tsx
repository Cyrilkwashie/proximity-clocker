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

const pillars = [
  { label: "Web-Based", desc: "Access from any device, any browser." },
  { label: "Multi-Branch", desc: "Built for companies with many locations." },
  { label: "GPS-Driven", desc: "Location accuracy at the core." },
  { label: "Zero Fraud", desc: "Only present staff can clock in." },
];

export default function About() {
  const { ref: headRef, visible: headVisible } = useFadeIn();
  const { ref: textRef, visible: textVisible } = useFadeIn();
  const { ref: pillarsRef, visible: pillarsVisible } = useFadeIn();

  return (
    <section id="about" className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <div
              ref={headRef}
              className={`transition-all duration-700 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="inline-block text-teal-600 text-xs font-bold tracking-widest uppercase mb-4">
                About Proximity Clocker
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#002244] leading-tight mb-6">
                Attendance that knows{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                  where you are.
                </span>
              </h2>
            </div>

            <div
              ref={textRef}
              className={`transition-all duration-700 delay-150 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Proximity Clocker is a web-based attendance system designed for
                companies with multiple branches. It harnesses the power of GPS
                and defined location radii to ensure employees can only clock in
                when they are physically present at the correct branch.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Say goodbye to proxy attendance, buddy punching, and manual
                timesheets. Our platform delivers accurate, tamper-proof records
                that give HR and management complete confidence in their
                workforce data.
              </p>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:gap-3 transition-all duration-200"
              >
                See how it works
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Pillars grid */}
          <div
            ref={pillarsRef}
            className={`transition-all duration-700 delay-200 ${pillarsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <div
                  key={p.label}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    i % 2 === 0
                      ? "bg-slate-50 border-slate-100"
                      : "bg-gradient-to-br from-teal-500/10 to-blue-500/10 border-teal-200/60"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mb-4">
                    <span className="text-white text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-[#002244] font-bold text-base mb-1">{p.label}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
