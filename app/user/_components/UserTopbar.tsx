"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PAGE_TITLES: Record<string, string> = {
  "/user": "My Dashboard",
  "/user/history": "My Attendance History",
  "/user/branch": "My Branch",
  "/user/profile": "My Profile",
};

export default function UserTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifs, setShowNotifs] = useState(false);

  const title = PAGE_TITLES[pathname] ?? "Employee Portal";

  return (
    <header className="h-14 shrink-0 bg-white border-b border-[#e5e5e5] flex items-center justify-between px-5 gap-4">
      <div className="flex items-center gap-3">
        {/* Mobile logo */}
        <div className="md:hidden w-7 h-7 rounded-lg bg-[#002244] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
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
  );
}
