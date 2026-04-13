"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Log = {
  id: number;
  name: string;
  email: string;
  branch: string;
  date: string;
  timeIn: string | null;
  timeOut: string | null;
  clockedIn: boolean;
  status: "valid" | "late" | "absent";
};

const logs: Log[] = [
  // ── 2025-01-15 ──────────────────────────────────────────────────
  { id:  1, name: "Marcus Reid",      email: "m.reid@company.com",      branch: "Head Office",     date: "2025-01-15", timeIn: "08:04 AM", timeOut: "05:12 PM", clockedIn: false, status: "valid"  },
  { id:  2, name: "Asha Patel",       email: "a.patel@company.com",     branch: "Downtown Hub",    date: "2025-01-15", timeIn: "08:11 AM", timeOut: "05:05 PM", clockedIn: false, status: "valid"  },
  { id:  3, name: "James Osei",       email: "j.osei@company.com",      branch: "Westside Branch", date: "2025-01-15", timeIn: "08:22 AM", timeOut: "05:18 PM", clockedIn: false, status: "valid"  },
  { id:  4, name: "Lena Vogel",       email: "l.vogel@company.com",     branch: "Head Office",     date: "2025-01-15", timeIn: "08:35 AM", timeOut: "05:20 PM", clockedIn: false, status: "late"   },
  { id:  5, name: "Carlos Mendez",    email: "c.mendez@company.com",    branch: "Airport Desk",    date: "2025-01-15", timeIn: "08:00 AM", timeOut: "04:00 PM", clockedIn: false, status: "valid"  },
  { id:  6, name: "Nina Chow",        email: "n.chow@company.com",      branch: "Downtown Hub",    date: "2025-01-15", timeIn: "08:55 AM", timeOut: "05:30 PM", clockedIn: false, status: "valid"  },
  { id:  7, name: "Brian Torres",     email: "b.torres@company.com",    branch: "Westside Branch", date: "2025-01-15", timeIn: "09:02 AM", timeOut: "05:40 PM", clockedIn: false, status: "late"   },
  { id:  8, name: "Priya Kumar",      email: "p.kumar@company.com",     branch: "Head Office",     date: "2025-01-15", timeIn: "09:15 AM", timeOut: "05:50 PM", clockedIn: false, status: "late"   },
  { id:  9, name: "Suki Yamamoto",    email: "s.yamamoto@company.com",  branch: "Downtown Hub",    date: "2025-01-15", timeIn: "09:30 AM", timeOut: "06:00 PM", clockedIn: false, status: "late"   },
  { id: 10, name: "Thomas Adler",     email: "t.adler@company.com",     branch: "Airport Desk",    date: "2025-01-15", timeIn: null,       timeOut: null,       clockedIn: false, status: "absent" },
  { id: 11, name: "Felix Nguyen",     email: "f.nguyen@company.com",    branch: "Head Office",     date: "2025-01-15", timeIn: "08:00 AM", timeOut: "05:00 PM", clockedIn: false, status: "valid"  },
  { id: 12, name: "Dana Okafor",      email: "d.okafor@company.com",    branch: "Head Office",     date: "2025-01-15", timeIn: "07:58 AM", timeOut: "04:45 PM", clockedIn: false, status: "valid"  },
  { id: 13, name: "Sam Ford",         email: "s.ford@company.com",      branch: "Westside Branch", date: "2025-01-15", timeIn: "07:55 AM", timeOut: "04:50 PM", clockedIn: false, status: "valid"  },
  { id: 14, name: "Kylie Park",       email: "k.park@company.com",      branch: "Westside Branch", date: "2025-01-15", timeIn: "08:00 AM", timeOut: "04:30 PM", clockedIn: false, status: "valid"  },
  { id: 15, name: "Oliver Grant",     email: "o.grant@company.com",     branch: "Head Office",     date: "2025-01-15", timeIn: "08:48 AM", timeOut: "05:15 PM", clockedIn: false, status: "valid"  },
  { id: 16, name: "Emma Schultz",     email: "e.schultz@company.com",   branch: "Head Office",     date: "2025-01-15", timeIn: "08:52 AM", timeOut: "05:20 PM", clockedIn: false, status: "valid"  },
  { id: 17, name: "Daniel Park",      email: "d.park@company.com",      branch: "Head Office",     date: "2025-01-15", timeIn: "09:06 AM", timeOut: "05:45 PM", clockedIn: false, status: "late"   },
  { id: 18, name: "Rachel Kim",       email: "r.kim@company.com",       branch: "Head Office",     date: "2025-01-15", timeIn: "09:10 AM", timeOut: "05:55 PM", clockedIn: false, status: "late"   },
  { id: 19, name: "George Nkrumah",   email: "g.nkrumah@company.com",   branch: "Head Office",     date: "2025-01-15", timeIn: "09:22 AM", timeOut: "06:00 PM", clockedIn: false, status: "late"   },
  { id: 20, name: "Fatima Al-Rashid", email: "f.alrashid@company.com",  branch: "Head Office",     date: "2025-01-15", timeIn: "09:45 AM", timeOut: "06:10 PM", clockedIn: false, status: "late"   },
  { id: 21, name: "Henry Larson",     email: "h.larson@company.com",    branch: "Head Office",     date: "2025-01-15", timeIn: "08:01 AM", timeOut: "05:01 PM", clockedIn: false, status: "valid"  },
  { id: 22, name: "Ingrid Hansen",    email: "i.hansen@company.com",    branch: "Head Office",     date: "2025-01-15", timeIn: "08:15 AM", timeOut: "05:10 PM", clockedIn: false, status: "valid"  },
  { id: 23, name: "Jason Obi",        email: "j.obi@company.com",       branch: "Head Office",     date: "2025-01-15", timeIn: "07:58 AM", timeOut: "04:55 PM", clockedIn: false, status: "valid"  },
  { id: 24, name: "Kira Santos",      email: "k.santos@company.com",    branch: "Head Office",     date: "2025-01-15", timeIn: "09:00 AM", timeOut: "05:30 PM", clockedIn: false, status: "late"   },
  { id: 25, name: "Lucas Weber",      email: "l.weber@company.com",     branch: "Head Office",     date: "2025-01-15", timeIn: "09:04 AM", timeOut: "05:35 PM", clockedIn: false, status: "late"   },
  { id: 26, name: "Nadia Kowalski",   email: "n.kowalski@company.com",  branch: "Head Office",     date: "2025-01-15", timeIn: null,       timeOut: null,       clockedIn: false, status: "absent" },
  { id: 27, name: "Amara Diallo",     email: "a.diallo@company.com",    branch: "Westside Branch", date: "2025-01-15", timeIn: "08:40 AM", timeOut: "05:25 PM", clockedIn: false, status: "valid"  },
  { id: 28, name: "Derek Walsh",      email: "d.walsh@company.com",     branch: "Westside Branch", date: "2025-01-15", timeIn: "08:15 AM", timeOut: "05:10 PM", clockedIn: false, status: "valid"  },
  { id: 29, name: "Elena Popova",     email: "e.popova@company.com",    branch: "Westside Branch", date: "2025-01-15", timeIn: "09:00 AM", timeOut: "05:45 PM", clockedIn: false, status: "late"   },
  { id: 30, name: "Frank Okafor",     email: "f.okafor@company.com",    branch: "Westside Branch", date: "2025-01-15", timeIn: "08:55 AM", timeOut: "05:40 PM", clockedIn: false, status: "valid"  },
  { id: 31, name: "Grace Lee",        email: "g.lee@company.com",       branch: "Westside Branch", date: "2025-01-15", timeIn: "09:20 AM", timeOut: "06:00 PM", clockedIn: false, status: "late"   },
  { id: 32, name: "Hamid Nasiri",     email: "h.nasiri@company.com",    branch: "Westside Branch", date: "2025-01-15", timeIn: "09:35 AM", timeOut: "06:15 PM", clockedIn: false, status: "late"   },
  { id: 33, name: "Iris Bergmann",    email: "i.bergmann@company.com",  branch: "Westside Branch", date: "2025-01-15", timeIn: null,       timeOut: null,       clockedIn: false, status: "absent" },
  { id: 34, name: "Uma Krishnan",     email: "u.krishnan@company.com",  branch: "Downtown Hub",    date: "2025-01-15", timeIn: "08:20 AM", timeOut: "05:15 PM", clockedIn: false, status: "valid"  },
  { id: 35, name: "Victor Mensah",    email: "v.mensah@company.com",    branch: "Downtown Hub",    date: "2025-01-15", timeIn: "08:30 AM", timeOut: "05:20 PM", clockedIn: false, status: "valid"  },
  { id: 36, name: "Wendy Zhao",       email: "w.zhao@company.com",      branch: "Downtown Hub",    date: "2025-01-15", timeIn: "08:45 AM", timeOut: "05:30 PM", clockedIn: false, status: "valid"  },
  { id: 37, name: "Xander Muller",    email: "x.muller@company.com",    branch: "Downtown Hub",    date: "2025-01-15", timeIn: "09:05 AM", timeOut: "05:50 PM", clockedIn: false, status: "late"   },
  { id: 38, name: "Yasmine Bouchard", email: "y.bouchard@company.com",  branch: "Downtown Hub",    date: "2025-01-15", timeIn: "09:25 AM", timeOut: "06:00 PM", clockedIn: false, status: "late"   },
  { id: 39, name: "Diego Ruiz",       email: "d.ruiz@company.com",      branch: "Downtown Hub",    date: "2025-01-15", timeIn: "08:10 AM", timeOut: "05:05 PM", clockedIn: false, status: "valid"  },
  { id: 40, name: "Aaron Kimani",     email: "a.kimani@company.com",    branch: "Downtown Hub",    date: "2025-01-15", timeIn: "08:10 AM", timeOut: "05:00 PM", clockedIn: false, status: "valid"  },
  { id: 41, name: "Bianca Russo",     email: "b.russo@company.com",     branch: "Downtown Hub",    date: "2025-01-15", timeIn: "08:35 AM", timeOut: "05:20 PM", clockedIn: false, status: "valid"  },
  { id: 42, name: "Chris Moreau",     email: "c.moreau@company.com",    branch: "Downtown Hub",    date: "2025-01-15", timeIn: "08:50 AM", timeOut: "05:35 PM", clockedIn: false, status: "valid"  },
  { id: 43, name: "David Okonkwo",    email: "d.okonkwo@company.com",   branch: "Downtown Hub",    date: "2025-01-15", timeIn: "09:15 AM", timeOut: "05:55 PM", clockedIn: false, status: "late"   },
  { id: 44, name: "Eva Lindqvist",    email: "e.lindqvist@company.com", branch: "Downtown Hub",    date: "2025-01-15", timeIn: null,       timeOut: null,       clockedIn: false, status: "absent" },
  { id: 45, name: "Diana Osei",       email: "d.osei@company.com",      branch: "Airport Desk",    date: "2025-01-15", timeIn: "06:00 AM", timeOut: "02:00 PM", clockedIn: false, status: "valid"  },
  { id: 46, name: "Edwin Larsson",    email: "e.larsson@company.com",   branch: "Airport Desk",    date: "2025-01-15", timeIn: "06:30 AM", timeOut: "02:30 PM", clockedIn: false, status: "valid"  },
  { id: 47, name: "Fiona Walsh",      email: "fi.walsh@company.com",    branch: "Airport Desk",    date: "2025-01-15", timeIn: "07:00 AM", timeOut: "03:00 PM", clockedIn: false, status: "valid"  },
  { id: 48, name: "Gareth Obi",       email: "g.obi@company.com",       branch: "Airport Desk",    date: "2025-01-15", timeIn: "07:30 AM", timeOut: "03:30 PM", clockedIn: false, status: "valid"  },
  { id: 49, name: "Haruki Tanaka",    email: "h.tanaka@company.com",    branch: "Airport Desk",    date: "2025-01-15", timeIn: null,       timeOut: null,       clockedIn: false, status: "absent" },
  // ── 2025-01-14 ──────────────────────────────────────────────────
  { id: 50, name: "Marcus Reid",      email: "m.reid@company.com",      branch: "Head Office",     date: "2025-01-14", timeIn: "07:52 AM", timeOut: "05:00 PM", clockedIn: false, status: "valid"  },
  { id: 51, name: "Asha Patel",       email: "a.patel@company.com",     branch: "Downtown Hub",    date: "2025-01-14", timeIn: "08:05 AM", timeOut: "04:55 PM", clockedIn: false, status: "valid"  },
  { id: 52, name: "Diego Ruiz",       email: "d.ruiz@company.com",      branch: "Downtown Hub",    date: "2025-01-14", timeIn: "08:10 AM", timeOut: "05:05 PM", clockedIn: false, status: "valid"  },
  { id: 53, name: "Lena Vogel",       email: "l.vogel@company.com",     branch: "Head Office",     date: "2025-01-14", timeIn: "08:20 AM", timeOut: "05:00 PM", clockedIn: false, status: "valid"  },
  { id: 54, name: "James Osei",       email: "j.osei@company.com",      branch: "Westside Branch", date: "2025-01-14", timeIn: "08:15 AM", timeOut: "05:10 PM", clockedIn: false, status: "valid"  },
  { id: 55, name: "Nina Chow",        email: "n.chow@company.com",      branch: "Downtown Hub",    date: "2025-01-14", timeIn: "08:40 AM", timeOut: "05:20 PM", clockedIn: false, status: "valid"  },
  { id: 56, name: "Felix Nguyen",     email: "f.nguyen@company.com",    branch: "Head Office",     date: "2025-01-14", timeIn: "08:00 AM", timeOut: "05:00 PM", clockedIn: false, status: "valid"  },
  { id: 57, name: "Dana Okafor",      email: "d.okafor@company.com",    branch: "Head Office",     date: "2025-01-14", timeIn: "07:55 AM", timeOut: "04:50 PM", clockedIn: false, status: "valid"  },
  { id: 58, name: "Priya Kumar",      email: "p.kumar@company.com",     branch: "Head Office",     date: "2025-01-14", timeIn: "09:00 AM", timeOut: "05:30 PM", clockedIn: false, status: "late"   },
  { id: 59, name: "Brian Torres",     email: "b.torres@company.com",    branch: "Westside Branch", date: "2025-01-14", timeIn: "08:50 AM", timeOut: "05:35 PM", clockedIn: false, status: "valid"  },
  { id: 60, name: "Sam Ford",         email: "s.ford@company.com",      branch: "Westside Branch", date: "2025-01-14", timeIn: "07:58 AM", timeOut: "04:55 PM", clockedIn: false, status: "valid"  },
  { id: 61, name: "Oliver Grant",     email: "o.grant@company.com",     branch: "Head Office",     date: "2025-01-14", timeIn: "08:45 AM", timeOut: "05:20 PM", clockedIn: false, status: "valid"  },
  { id: 62, name: "Uma Krishnan",     email: "u.krishnan@company.com",  branch: "Downtown Hub",    date: "2025-01-14", timeIn: "08:18 AM", timeOut: "05:10 PM", clockedIn: false, status: "valid"  },
  { id: 63, name: "Victor Mensah",    email: "v.mensah@company.com",    branch: "Downtown Hub",    date: "2025-01-14", timeIn: "08:28 AM", timeOut: "05:15 PM", clockedIn: false, status: "valid"  },
  { id: 64, name: "Diana Osei",       email: "d.osei@company.com",      branch: "Airport Desk",    date: "2025-01-14", timeIn: "06:05 AM", timeOut: "02:05 PM", clockedIn: false, status: "valid"  },
  { id: 65, name: "Carlos Mendez",    email: "c.mendez@company.com",    branch: "Airport Desk",    date: "2025-01-14", timeIn: "08:00 AM", timeOut: "04:00 PM", clockedIn: false, status: "valid"  },
  { id: 66, name: "Thomas Adler",     email: "t.adler@company.com",     branch: "Airport Desk",    date: "2025-01-14", timeIn: null,       timeOut: null,       clockedIn: false, status: "absent" },
  { id: 67, name: "Kylie Park",       email: "k.park@company.com",      branch: "Westside Branch", date: "2025-01-14", timeIn: "08:05 AM", timeOut: "04:35 PM", clockedIn: false, status: "valid"  },
  { id: 68, name: "Amara Diallo",     email: "a.diallo@company.com",    branch: "Westside Branch", date: "2025-01-14", timeIn: "08:38 AM", timeOut: "05:22 PM", clockedIn: false, status: "valid"  },
];

const branches = ["All Branches", "Head Office", "Downtown Hub", "Westside Branch", "Airport Desk"];
const statusOptions = ["All Status", "valid", "late", "absent"];

const statusStyle: Record<string, string> = {
  valid:  "bg-teal-50 text-teal-700",
  late:   "bg-amber-50 text-amber-700",
  absent: "bg-[#f5f5f5] text-[#737373]",
};

const statusLabel: Record<string, string> = {
  valid:  "Valid",
  late:   "Late",
  absent: "Absent",
};

function parseDuration(timeIn: string | null, timeOut: string | null): string {
  if (!timeIn) return "—";
  if (!timeOut) return "Ongoing";
  const parse = (t: string) => {
    const [time, period] = t.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };
  const diff = parse(timeOut) - parse(timeIn);
  if (diff < 0) return "—";
  return `${Math.floor(diff / 60)}h ${(diff % 60).toString().padStart(2, "0")}m`;
}

export default function AttendancePage() {
  const router = useRouter();
  const [branch, setBranch] = useState("All Branches");
  const [status, setStatus] = useState("All Status");
  const [date, setDate] = useState("2025-01-15");
  const [search, setSearch] = useState("");

  const filtered = logs.filter((l) => {
    const matchBranch = branch === "All Branches" || l.branch === branch;
    const matchStatus = status === "All Status" || l.status === status;
    const matchDate = !date || l.date === date;
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    return matchBranch && matchStatus && matchDate && matchSearch;
  });

  const liveCount = filtered.filter((l) => l.clockedIn).length;
  const counts = {
    valid:  filtered.filter((l) => l.status === "valid").length,
    late:   filtered.filter((l) => l.status === "late").length,
    absent: filtered.filter((l) => l.status === "absent").length,
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-[#002244] font-bold text-xl">Attendance Records</h2>
            {liveCount > 0 && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold ring-1 ring-teal-100">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                {liveCount} Currently Active
              </span>
            )}
          </div>
          <p className="text-[#737373] text-sm mt-0.5">GPS-verified clock-in and clock-out logs</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-[#737373] text-sm font-medium hover:border-[#002244] hover:text-[#002244] transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { label: "On Time", key: "valid",  textColor: "text-teal-600",  bg: "bg-teal-50",   ring: "ring-teal-200"  },
          { label: "Late",    key: "late",   textColor: "text-amber-600", bg: "bg-amber-50",  ring: "ring-amber-200" },
          { label: "Absent",  key: "absent", textColor: "text-[#737373]", bg: "bg-[#f5f5f5]", ring: "ring-[#d4d4d4]"},
        ].map((s) => (
          <div
            key={s.key}
            onClick={() => setStatus(status === s.key ? "All Status" : s.key)}
            className={`bg-white rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md ${
              status === s.key ? `shadow-sm ring-2 ${s.ring}` : "shadow-sm ring-1 ring-[#e5e5e5]"
            }`}
          >
            <p className="text-[#737373] text-xs font-medium">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.textColor}`}>{counts[s.key as keyof typeof counts]}</p>
            <p className={`mt-2 inline-flex text-[10px] font-medium px-1.5 py-0.5 rounded-full ${s.bg} ${s.textColor}`}>
              {status === s.key ? "Filtered ✓" : "Click to filter"}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-4 flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-[#e5e5e5] rounded-[0.625rem] bg-white placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
          />
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="text-sm border border-[#e5e5e5] rounded-[0.625rem] bg-white px-3 py-2 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#002244]/20"
        />
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="text-sm border border-[#e5e5e5] rounded-[0.625rem] bg-white px-3 py-2 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#002244]/20"
        >
          {branches.map((b) => <option key={b}>{b}</option>)}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="text-sm border border-[#e5e5e5] rounded-[0.625rem] bg-white px-3 py-2 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#002244]/20"
        >
          {statusOptions.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#e5e5e5] flex items-center justify-between">
          <p className="text-[#737373] text-xs">{filtered.length} records found</p>
          <span className="flex items-center gap-1.5 text-[10px] text-[#737373]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Pulsing dot = still clocked in
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e5e5]">
                <th className="text-left text-[#737373] text-xs font-medium px-5 py-3.5">Employee</th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5 hidden md:table-cell">Branch</th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5 hidden sm:table-cell">Date</th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5">Clock In</th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5">Clock Out</th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5 hidden lg:table-cell">Duration</th>
                <th className="text-left text-[#737373] text-xs font-medium px-4 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {filtered.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => router.push(`/dashboard/employees/history?email=${encodeURIComponent(log.email)}&name=${encodeURIComponent(log.name)}&branch=${encodeURIComponent(log.branch)}`)}
                  className={`transition-colors cursor-pointer ${log.clockedIn ? "bg-teal-50/20 hover:bg-teal-50/40" : "hover:bg-[#fafafa]"}`}
                >
                  {/* Employee */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[#002244]/10 flex items-center justify-center">
                          <span className="text-[#002244] text-xs font-bold">{log.name.charAt(0)}</span>
                        </div>
                        {log.clockedIn && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-white animate-pulse" />
                        )}
                      </div>
                      <div>
                        <p className="text-[#0a0a0a] font-medium text-sm leading-tight">{log.name}</p>
                        <p className="text-[#737373] text-xs">{log.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#737373] text-xs hidden md:table-cell">{log.branch}</td>
                  <td className="px-4 py-3.5 text-[#737373] text-xs hidden sm:table-cell">{log.date}</td>

                  {/* Clock In */}
                  <td className="px-4 py-3.5">
                    {log.timeIn ? (
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-teal-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
                        </svg>
                        <span className="text-[#0a0a0a] font-semibold text-sm tabular-nums">{log.timeIn}</span>
                      </div>
                    ) : (
                      <span className="text-[#737373] text-sm">—</span>
                    )}
                  </td>

                  {/* Clock Out */}
                  <td className="px-4 py-3.5">
                    {log.clockedIn ? (
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
                        <span className="text-teal-600 font-semibold text-sm">Active</span>
                      </div>
                    ) : log.timeOut ? (
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-[#737373] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
                        </svg>
                        <span className="text-[#0a0a0a] font-semibold text-sm tabular-nums">{log.timeOut}</span>
                      </div>
                    ) : (
                      <span className="text-[#737373] text-sm">—</span>
                    )}
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <span className={`text-sm font-medium tabular-nums ${log.clockedIn ? "text-teal-600" : "text-[#737373]"}`}>
                      {parseDuration(log.timeIn, log.timeOut)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyle[log.status]}`}>
                      {statusLabel[log.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-[#737373] text-sm py-12">No records match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
