"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/images/clock in.jpg",
    tag: "GPS-Based Attendance",
    headline: "Clock in only when\nyou're actually there.",
    body: "Proximity Clocker uses real-time GPS coordinates to verify physical presence before registering any attendance — eliminating proxy clocking entirely.",
  },
  {
    image: "/images/location pin.jpg",
    tag: "Branch Radius Validation",
    headline: "Every branch has its\nown smart boundary.",
    body: "Define a GPS radius for each location. The system automatically checks whether staff are within that boundary and assigns attendance to the correct branch.",
  },
  {
    image: "/images/workforce.jpg",
    tag: "Real-Time Admin Oversight",
    headline: "See your entire workforce\nat a glance.",
    body: "Admins get a live dashboard showing who clocked in, from which branch, and at what time — with full logs and exportable reports ready when you need them.",
  },
];

const INTERVAL = 5500;

export default function LoginLeft() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 400);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <aside
      className="
        relative flex flex-col
        lg:w-[52%]
        overflow-hidden
        px-8 py-10
        lg:px-14 lg:py-14
      "
    >
      {/* Slide background images */}
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.tag}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-linear-to-b from-[#002244]/80 via-[#002244]/60 to-[#001833]/90" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#001833]/80 to-transparent" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2.5 mb-auto">
        <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          Proximity <span className="text-teal-300">Clocker</span>
        </span>
      </div>

      {/* Slide content — desktop centered, mobile compact */}
      <div className="relative z-10 mt-16 lg:mt-0 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-start lg:justify-center lg:px-14">
        {/* Slide card */}
        <div
          className={`max-w-md transition-all duration-400 ${
            fading ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
          }`}
          style={{ transitionDuration: "400ms" }}
        >
          {/* Tag pill */}
          <div className="mb-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-300 text-xs font-semibold tracking-widest uppercase">
              {slide.tag}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-white text-3xl lg:text-4xl font-extrabold leading-snug mb-5 whitespace-pre-line">
            {slide.headline}
          </h2>

          {/* Body */}
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            {slide.body}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="mt-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFading(true);
                setTimeout(() => { setActive(i); setFading(false); }, 400);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-7 h-2 bg-teal-400"
                  : "w-2 h-2 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="relative z-10 mt-16 lg:mt-0 lg:absolute lg:bottom-10 lg:left-14 lg:right-14 flex items-end justify-between">
        <p className="text-white/30 text-xs leading-relaxed max-w-xs">
          Trusted by teams across multiple branches.<br />
          Accurate. Automatic. Accountable.
        </p>
        <div className="hidden lg:flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-white/30 text-xs">Live</span>
        </div>
      </div>
    </aside>
  );
}
