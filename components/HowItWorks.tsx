"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Sign Up & Log In",
    description:
      "Employees and admins register on the platform. Each user profile is linked to their assigned branch and role.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "GPS Location Detected",
    description:
      "When a staff member opens the app, the system silently detects their real-time GPS coordinates with high precision.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Branch Radius Check",
    description:
      "The platform cross-references the user's location against their assigned branch's defined GPS radius boundary.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Auto Clock-In",
    description:
      "If the user is within the valid radius, attendance is recorded instantly and automatically — no manual action required.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Connector line (all except last) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-[#002244]/15 to-transparent" />
      )}

      <div className="flex flex-col items-center text-center gap-5">
        {/* Icon ring */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-white border-2 border-[#002244]/20 flex items-center justify-center text-[#002244] shadow-lg shadow-slate-200">
            {step.icon}
          </div>
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">{index + 1}</span>
          </div>
        </div>

        <div>
          <h3 className="text-[#002244] font-bold text-lg mb-2">{step.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
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
    <section id="how-it-works" className="bg-[#f8f9fb] py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          ref={headRef}
          className={`text-center mb-20 transition-all duration-700 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="inline-block text-teal-600 text-xs font-bold tracking-widest uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#002244] leading-tight">
            Four steps to frictionless{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              attendance
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
