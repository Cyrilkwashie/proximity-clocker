"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const PAGE_TITLES: Record<string, string> = {
  "/user": "My Dashboard",
  "/user/history": "My Attendance History",
  "/user/branch": "My Branch",
  "/user/profile": "My Profile",
};

const NAV = [
  { label: "Dashboard",  href: "/user",          icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { label: "My History", href: "/user/history",  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { label: "My Branch",  href: "/user/branch",   icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { label: "Profile",    href: "/user/profile",  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
];

export default function UserTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifs, setShowNotifs] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const title = PAGE_TITLES[pathname] ?? "Employee Portal";

  return (
    <>
    <header className="h-14 shrink-0 bg-white border-b border-[#e5e5e5] flex items-center justify-between px-5 gap-4">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[#737373] hover:bg-[#f5f5f5] transition-colors"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-[#002244] font-semibold text-sm">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#737373] hover:bg-[#f5f5f5] transition-colors relative"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-teal-500" />
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-10 w-72 bg-white rounded-2xl shadow-xl ring-1 ring-[#e5e5e5] z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e5e5e5]">
                <p className="text-[#002244] font-semibold text-sm">Notifications</p>
              </div>
              <div className="divide-y divide-[#e5e5e5]">
                {[
                  { msg: "You are within your branch radius", time: "Just now", dot: "bg-teal-500" },
                  { msg: "Clock-in recorded for April 10", time: "2 days ago", dot: "bg-[#002244]" },
                  { msg: "Attendance report generated", time: "1 week ago", dot: "bg-[#737373]" },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-[#f5f5f5] cursor-default">
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.dot}`} />
                    <div>
                      <p className="text-[#0a0a0a] text-xs">{n.msg}</p>
                      <p className="text-[#737373] text-[10px] mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sign out */}
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-1.5 text-[#737373] hover:text-red-500 text-xs font-medium transition-colors px-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </header>

    {/* Mobile drawer overlay */}
    {menuOpen && (
      <div className="md:hidden fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <aside className="relative z-10 flex flex-col w-64 max-w-[85vw] bg-white h-full shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-[#e5e5e5]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#002244] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[#002244] font-bold text-sm leading-tight">ProxClocker</p>
                <p className="text-[#737373] text-[10px]">Employee Portal</p>
              </div>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-[#737373] hover:bg-[#f5f5f5]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {NAV.map((item) => {
              const active = item.href === "/user" ? pathname === "/user" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-[#002244] text-white shadow-sm"
                      : "text-[#737373] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]"
                  }`}
                >
                  <span className={active ? "text-white" : "text-[#737373]"}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User card */}
          <div className="px-3 pb-4">
            <div className="bg-[#f5f5f5] rounded-xl px-3 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#002244] flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">SJ</span>
              </div>
              <div className="min-w-0">
                <p className="text-[#0a0a0a] text-xs font-semibold truncate">Sarah Johnson</p>
                <p className="text-[#737373] text-[10px] truncate">Marketing Specialist</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    )}
    </>
  );
}

