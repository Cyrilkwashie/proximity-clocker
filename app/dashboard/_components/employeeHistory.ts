export type HistoryLog = {
  date: string;
  timeIn: string | null;
  timeOut: string | null;
  branch: string;
  status: "valid" | "late" | "absent";
};

// Keyed by employee email
export const employeeHistory: Record<string, HistoryLog[]> = {
  "m.reid@company.com": [
    { date: "2026-04-13", timeIn: "08:04 AM", timeOut: "05:12 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-12", timeIn: "07:52 AM", timeOut: "05:00 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-11", timeIn: "08:10 AM", timeOut: "05:05 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-10", timeIn: "09:05 AM", timeOut: "05:30 PM", branch: "Head Office",     status: "late"   },
    { date: "2026-04-09", timeIn: "08:00 AM", timeOut: "04:55 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-08", timeIn: "08:15 AM", timeOut: "05:10 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-07", timeIn: null,       timeOut: null,       branch: "Head Office",     status: "absent" },
    { date: "2026-04-04", timeIn: "07:58 AM", timeOut: "05:02 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-03", timeIn: "08:05 AM", timeOut: "05:15 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-02", timeIn: "09:20 AM", timeOut: "05:40 PM", branch: "Head Office",     status: "late"   },
    { date: "2026-04-01", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-03-31", timeIn: "08:02 AM", timeOut: "04:58 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-03-28", timeIn: null,       timeOut: null,       branch: "Head Office",     status: "absent" },
    { date: "2026-03-27", timeIn: "08:08 AM", timeOut: "05:08 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-03-26", timeIn: "08:45 AM", timeOut: "05:45 PM", branch: "Head Office",     status: "late"   },
  ],
  "l.vogel@company.com": [
    { date: "2026-04-13", timeIn: "08:35 AM", timeOut: null,       branch: "Head Office",     status: "late"   },
    { date: "2026-04-12", timeIn: "08:20 AM", timeOut: "05:00 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-11", timeIn: "09:10 AM", timeOut: "05:30 PM", branch: "Head Office",     status: "late"   },
    { date: "2026-04-10", timeIn: "08:05 AM", timeOut: "05:05 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-09", timeIn: "08:00 AM", timeOut: "04:45 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-08", timeIn: null,       timeOut: null,       branch: "Head Office",     status: "absent" },
    { date: "2026-04-07", timeIn: "08:30 AM", timeOut: "05:15 PM", branch: "Head Office",     status: "late"   },
    { date: "2026-04-04", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-03", timeIn: "08:15 AM", timeOut: "05:10 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-02", timeIn: "07:55 AM", timeOut: "04:55 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-01", timeIn: "09:30 AM", timeOut: "05:30 PM", branch: "Head Office",     status: "late"   },
    { date: "2026-03-31", timeIn: "08:00 AM", timeOut: "04:50 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-03-28", timeIn: "08:10 AM", timeOut: "05:00 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-03-27", timeIn: null,       timeOut: null,       branch: "Head Office",     status: "absent" },
    { date: "2026-03-26", timeIn: "08:05 AM", timeOut: "05:05 PM", branch: "Head Office",     status: "valid"  },
  ],
  "p.kumar@company.com": [
    { date: "2026-04-13", timeIn: "09:15 AM", timeOut: null,       branch: "Head Office",     status: "late"   },
    { date: "2026-04-12", timeIn: "09:00 AM", timeOut: "05:30 PM", branch: "Head Office",     status: "late"   },
    { date: "2026-04-11", timeIn: "08:05 AM", timeOut: "05:05 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-10", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-09", timeIn: "09:45 AM", timeOut: "06:00 PM", branch: "Head Office",     status: "late"   },
    { date: "2026-04-08", timeIn: "08:10 AM", timeOut: "05:10 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-07", timeIn: null,       timeOut: null,       branch: "Head Office",     status: "absent" },
    { date: "2026-04-04", timeIn: "08:00 AM", timeOut: "04:50 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-03", timeIn: "09:20 AM", timeOut: "05:40 PM", branch: "Head Office",     status: "late"   },
    { date: "2026-04-02", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-04-01", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-03-31", timeIn: "10:00 AM", timeOut: "06:00 PM", branch: "Head Office",     status: "late"   },
    { date: "2026-03-28", timeIn: "08:05 AM", timeOut: "05:05 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-03-27", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Head Office",     status: "valid"  },
    { date: "2026-03-26", timeIn: null,       timeOut: null,       branch: "Head Office",     status: "absent" },
  ],
  "j.osei@company.com": [
    { date: "2026-04-13", timeIn: "08:22 AM", timeOut: "05:18 PM", branch: "Westside Branch", status: "valid"  },
    { date: "2026-04-12", timeIn: "08:15 AM", timeOut: "05:10 PM", branch: "Westside Branch", status: "valid"  },
    { date: "2026-04-11", timeIn: "09:05 AM", timeOut: "05:30 PM", branch: "Westside Branch", status: "late"   },
    { date: "2026-04-10", timeIn: "08:00 AM", timeOut: "04:55 PM", branch: "Westside Branch", status: "valid"  },
    { date: "2026-04-09", timeIn: null,       timeOut: null,       branch: "Westside Branch", status: "absent" },
    { date: "2026-04-08", timeIn: "08:20 AM", timeOut: "05:15 PM", branch: "Westside Branch", status: "valid"  },
    { date: "2026-04-07", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Westside Branch", status: "valid"  },
    { date: "2026-04-04", timeIn: "09:10 AM", timeOut: "05:40 PM", branch: "Westside Branch", status: "late"   },
    { date: "2026-04-03", timeIn: "08:05 AM", timeOut: "05:05 PM", branch: "Westside Branch", status: "valid"  },
    { date: "2026-04-02", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Westside Branch", status: "valid"  },
    { date: "2026-04-01", timeIn: "08:30 AM", timeOut: "05:20 PM", branch: "Westside Branch", status: "late"   },
    { date: "2026-03-31", timeIn: "08:00 AM", timeOut: "04:50 PM", branch: "Westside Branch", status: "valid"  },
    { date: "2026-03-28", timeIn: null,       timeOut: null,       branch: "Westside Branch", status: "absent" },
    { date: "2026-03-27", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Westside Branch", status: "valid"  },
    { date: "2026-03-26", timeIn: "08:10 AM", timeOut: "05:10 PM", branch: "Westside Branch", status: "valid"  },
  ],
  "n.chow@company.com": [
    { date: "2026-04-13", timeIn: "08:55 AM", timeOut: "05:30 PM", branch: "Downtown Hub",    status: "valid"  },
    { date: "2026-04-12", timeIn: "08:40 AM", timeOut: "05:20 PM", branch: "Downtown Hub",    status: "valid"  },
    { date: "2026-04-11", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Downtown Hub",    status: "valid"  },
    { date: "2026-04-10", timeIn: "09:30 AM", timeOut: "05:45 PM", branch: "Downtown Hub",    status: "late"   },
    { date: "2026-04-09", timeIn: "08:05 AM", timeOut: "05:05 PM", branch: "Downtown Hub",    status: "valid"  },
    { date: "2026-04-08", timeIn: null,       timeOut: null,       branch: "Downtown Hub",    status: "absent" },
    { date: "2026-04-07", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Downtown Hub",    status: "valid"  },
    { date: "2026-04-04", timeIn: "08:50 AM", timeOut: "05:30 PM", branch: "Downtown Hub",    status: "valid"  },
    { date: "2026-04-03", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Downtown Hub",    status: "valid"  },
    { date: "2026-04-02", timeIn: "09:00 AM", timeOut: "05:30 PM", branch: "Downtown Hub",    status: "late"   },
    { date: "2026-04-01", timeIn: "08:00 AM", timeOut: "04:55 PM", branch: "Downtown Hub",    status: "valid"  },
    { date: "2026-03-31", timeIn: "08:10 AM", timeOut: "05:10 PM", branch: "Downtown Hub",    status: "valid"  },
    { date: "2026-03-28", timeIn: "08:00 AM", timeOut: "05:00 PM", branch: "Downtown Hub",    status: "valid"  },
    { date: "2026-03-27", timeIn: null,       timeOut: null,       branch: "Downtown Hub",    status: "absent" },
    { date: "2026-03-26", timeIn: "08:05 AM", timeOut: "05:05 PM", branch: "Downtown Hub",    status: "valid"  },
  ],
  "c.mendez@company.com": [
    { date: "2026-04-13", timeIn: "08:41 AM", timeOut: null,       branch: "Airport Desk",    status: "late"},
    { date: "2026-04-12", timeIn: "08:30 AM", timeOut: "04:30 PM", branch: "Airport Desk",    status: "valid"  },
    { date: "2026-04-11", timeIn: "07:50 AM", timeOut: "03:50 PM", branch: "Airport Desk",    status: "valid"  },
    { date: "2026-04-10", timeIn: "09:10 AM", timeOut: "05:00 PM", branch: "Airport Desk",    status: "late"},
    { date: "2026-04-09", timeIn: "08:00 AM", timeOut: "04:00 PM", branch: "Airport Desk",    status: "valid"  },
    { date: "2026-04-08", timeIn: null,       timeOut: null,       branch: "Airport Desk",    status: "absent" },
    { date: "2026-04-07", timeIn: "08:05 AM", timeOut: "04:05 PM", branch: "Airport Desk",    status: "valid"  },
    { date: "2026-04-04", timeIn: "08:00 AM", timeOut: "04:00 PM", branch: "Airport Desk",    status: "valid"  },
    { date: "2026-04-03", timeIn: "09:00 AM", timeOut: "05:00 PM", branch: "Airport Desk",    status: "late"},
    { date: "2026-04-02", timeIn: "08:10 AM", timeOut: "04:10 PM", branch: "Airport Desk",    status: "valid"  },
    { date: "2026-04-01", timeIn: "08:00 AM", timeOut: "04:00 PM", branch: "Airport Desk",    status: "valid"  },
    { date: "2026-03-31", timeIn: null,       timeOut: null,       branch: "Airport Desk",    status: "absent" },
    { date: "2026-03-28", timeIn: "07:55 AM", timeOut: "03:55 PM", branch: "Airport Desk",    status: "valid"  },
    { date: "2026-03-27", timeIn: "08:20 AM", timeOut: "04:20 PM", branch: "Airport Desk",    status: "valid"  },
    { date: "2026-03-26", timeIn: "09:15 AM", timeOut: "05:15 PM", branch: "Airport Desk",    status: "late"},
  ],
};

export function parseDuration(timeIn: string | null, timeOut: string | null): string {
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
