"use client";

import { useState, useEffect, useRef } from "react";

const videos = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
  "/videos/hero-4.mp4",
];

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [nextVideo, setNextVideo] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentVideo((prev) => (prev + 1) % videos.length);
        setNextVideo((prev) => (prev + 1) % videos.length);
        setTransitioning(false);
      }, 1000);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video Background Layers */}
      {videos.map((src, index) => (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentVideo
              ? transitioning
                ? "opacity-0"
                : "opacity-100"
              : index === nextVideo && transitioning
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{ zIndex: index === currentVideo ? 1 : index === nextVideo ? 2 : 0 }}
        />
      ))}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,22,40,0.75) 0%, rgba(10,22,40,0.55) 40%, rgba(10,22,40,0.80) 100%)",
        }}
      />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 z-10 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,212,191,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-teal-300 text-xs font-semibold tracking-widest uppercase">
            Location-Based Attendance
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          Smart Attendance.{" "}
          <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            Powered by Location.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10">
          Proximity Clocker uses GPS and branch-based radius detection to
          automatically clock staff in only when they are physically present at
          the correct location.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#"
            className="group flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105"
          >
            Get Started
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Request Demo
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-slate-400 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Video dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentVideo(index);
              setNextVideo((index + 1) % videos.length);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentVideo ? "w-6 bg-teal-400" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Switch to video ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
