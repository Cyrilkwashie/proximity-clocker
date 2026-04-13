"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${scrolled ? "text-[#002244]" : "text-white"}`}>
              Proximity <span className={scrolled ? "text-teal-600" : "text-teal-400"}>Clocker</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className={`text-sm font-medium transition-colors duration-200 ${scrolled ? "text-slate-600 hover:text-[#002244]" : "text-white/80 hover:text-white"}`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className={`text-sm font-medium transition-colors duration-200 px-4 py-2 ${scrolled ? "text-slate-600 hover:text-[#002244]" : "text-white/80 hover:text-white"}`}
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-[#002244] hover:bg-[#003366] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-[#002244]/20"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#002244] p-2"
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 transition-all mb-1 ${scrolled ? "bg-[#002244]" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`w-5 h-0.5 transition-all mb-1 ${scrolled ? "bg-[#002244]" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 transition-all ${scrolled ? "bg-[#002244]" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4 px-2">
            {["Features", "How It Works", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMenuOpen(false)}
                className="block text-slate-600 hover:text-[#002244] py-3 px-4 text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-3 px-4 flex flex-col gap-2">
              <a href="/login" className="text-center text-slate-600 hover:text-[#002244] py-2 text-sm">Login</a>
              <a href="/signup" className="text-center bg-[#002244] text-white text-sm font-semibold py-2.5 rounded-full">
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
