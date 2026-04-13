"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard Overview",
  "/dashboard/employees": "Employee Management",
  "/dashboard/branches": "Branch Management",
  "/dashboard/attendance": "Attendance Records",
  "/dashboard/reports": "Reports & Analytics",
  "/dashboard/invite": "Invite System",
  "/dashboard/settings": "Settings",
  "/dashboard/map": "Live Map",
};

const nav = [
  { label: "Dashboard",  href: "/dashboard",            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { label: "Employees",  href: "/dashboard/employees",  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { label: "Branches",   href: "/dashboard/branches",   icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { label: "Attendance", href: "/dashboard/attendance", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
  { label: "Reports",    href: "/dashboard/reports",    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { label: "Invite",     href: "/dashboard/invite",     icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { label: "Settings",   href: "/dashboard/settings",   icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { label: "Live Map",   href: "/dashboard/map",        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg> },
];

export default function Topbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <>
    <header className="h-16 bg-white dark:bg-[#1e293b] border-b border-[#e5e5e5] dark:border-[#334155] flex items-center justify-between px-6 shrink-0">
      {/* Left: hamburger (mobile) + logo + page title */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-[#737373] dark:text-[#94a3b8] hover:bg-[#f5f5f5] dark:hover:bg-[#334155] transition-colors"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-base leading-tight">{title}</h1>
          <p className="text-[#737373] dark:text-[#94a3b8] text-xs hidden sm:block">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[#737373] dark:text-[#94a3b8] hover:text-[#002244] dark:hover:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#334155] transition-all"
          aria-label="Toggle theme"
        >
          {dark ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>

        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[#737373] dark:text-[#94a3b8] hover:text-[#002244] dark:hover:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#334155] transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white dark:ring-[#1e293b]" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-[#e5e5e5] dark:bg-[#334155] mx-1" />

        {/* Admin badge */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-[#002244] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">AD</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[#002244] dark:text-[#e2e8f0] text-xs font-semibold leading-tight">Admin User</p>
            <p className="text-[#737373] dark:text-[#94a3b8] text-[10px]">Super Admin</p>
          </div>
        </div>

        {/* Sign out */}
        <Link
          href="/login"
          className="ml-2 px-3 py-1.5 rounded-xl bg-[#f5f5f5] dark:bg-[#0f172a] text-[#737373] dark:text-[#94a3b8] text-xs font-medium hover:text-[#002244] dark:hover:text-white hover:bg-[#e5e5e5] dark:hover:bg-[#334155] transition-all"
        >
          Sign out
        </Link>
      </div>
    </header>

    {/* Mobile drawer overlay */}
    {menuOpen && (
      <div className="lg:hidden fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <aside className="relative z-10 flex flex-col w-72 max-w-[85vw] bg-white dark:bg-[#1e293b] h-full shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-[#e5e5e5] dark:border-[#334155] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#002244] flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-[#002244] dark:text-[#e2e8f0] font-bold text-base tracking-tight leading-tight">
                Proximity<br /><span className="text-teal-600 dark:text-teal-400 text-sm">Clocker</span>
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-[#737373] dark:text-[#94a3b8] hover:bg-[#f5f5f5] dark:hover:bg-[#334155]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 py-5 px-3 space-y-0.5 overflow-y-auto">
            <p className="text-[#737373] dark:text-[#94a3b8] text-[10px] font-bold tracking-widest uppercase px-3 mb-3">Main Menu</p>
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-[#002244] dark:bg-teal-600 text-white shadow-sm"
                      : "text-[#737373] dark:text-[#94a3b8] hover:text-[#002244] dark:hover:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#334155]"
                  }`}
                >
                  <span className={active ? "text-white" : "text-[#737373] dark:text-[#94a3b8]"}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Admin card */}
          <div className="p-3 border-t border-[#e5e5e5] dark:border-[#334155]">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#f5f5f5] dark:bg-[#0f172a]">
              <div className="w-8 h-8 rounded-full bg-[#002244] flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">AD</span>
              </div>
              <div className="min-w-0">
                <p className="text-[#0a0a0a] dark:text-[#e2e8f0] text-xs font-semibold truncate">Admin User</p>
                <p className="text-[#737373] dark:text-[#94a3b8] text-[10px] truncate">Super Admin</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    )}
    </>
  );
}
