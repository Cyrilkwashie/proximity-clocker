"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard Overview",
  "/dashboard/employees": "Employee Management",
  "/dashboard/branches": "Branch Management",
  "/dashboard/attendance": "Attendance Records",
  "/dashboard/reports": "Reports & Analytics",
  "/dashboard/invite": "Invite System",
  "/dashboard/settings": "Settings",
};

export default function Topbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="h-16 bg-white border-b border-[#e5e5e5] flex items-center justify-between px-6 shrink-0">
      {/* Left: Mobile logo + page title */}
      <div className="flex items-center gap-3">
        {/* Mobile only logo */}
        <div className="lg:hidden flex items-center gap-2 mr-2">
          <div className="w-7 h-7 rounded-lg bg-[#002244] flex items-center justify-center">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <div>
          <h1 className="text-[#002244] font-semibold text-base leading-tight">{title}</h1>
          <p className="text-[#737373] text-xs hidden sm:block">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[#737373] hover:text-[#002244] hover:bg-[#f5f5f5] transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-[#e5e5e5] mx-1" />

        {/* Admin badge */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-[#002244] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">AD</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[#002244] text-xs font-semibold leading-tight">Admin User</p>
            <p className="text-[#737373] text-[10px]">Super Admin</p>
          </div>
        </div>

        {/* Sign out */}
        <Link
          href="/login"
          className="ml-2 px-3 py-1.5 rounded-xl bg-[#f5f5f5] text-[#737373] text-xs font-medium hover:text-[#002244] hover:bg-[#e5e5e5] transition-all"
        >
          Sign out
        </Link>
      </div>
    </header>
  );
}
