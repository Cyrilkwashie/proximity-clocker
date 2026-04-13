"use client";

import { useState } from "react";

type Branch = {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  radius: number;
  employees: number;
  active: number;
  status: "active" | "inactive";
};

type BranchEmployee = {
  name: string;
  role: string;
  email: string;
  timeIn: string | null;
  timeOut: string | null;
  clockedIn: boolean;
  status: "valid" | "late" | "absent";
};

const initialBranches: Branch[] = [
  { id: 1, name: "Head Office",     address: "14 Commerce Ave, Suite 400", city: "New York",  country: "USA", lat: 40.7128, lng: -74.006,   radius: 100, employees: 42, active: 38, status: "active"   },
  { id: 2, name: "Westside Branch", address: "287 West Blvd",              city: "Los Angeles",country: "USA", lat: 34.0522, lng: -118.2437, radius: 150, employees: 19, active: 17, status: "active"   },
  { id: 3, name: "Downtown Hub",    address: "55 King Street",             city: "Chicago",    country: "USA", lat: 41.8781, lng: -87.6298,  radius: 75,  employees: 28, active: 25, status: "active"   },
  { id: 4, name: "Airport Desk",    address: "Terminal 2, Gate C",         city: "Houston",    country: "USA", lat: 29.7604, lng: -95.3698,  radius: 200, employees: 13, active: 9,  status: "active"   },
  { id: 5, name: "North Campus",    address: "University Park, Block 3",   city: "Boston",     country: "USA", lat: 42.3601, lng: -71.0589,  radius: 120, employees: 8,  active: 0,  status: "inactive" },
];

const branchEmployees: Record<string, BranchEmployee[]> = {
  "Head Office": [
    { name: "Marcus Reid",  role: "Engineer",    email: "m.reid@company.com",   timeIn: "08:04 AM", timeOut: "05:12 PM", clockedIn: false, status: "valid"  },
    { name: "Lena Vogel",   role: "HR Manager",  email: "l.vogel@company.com",  timeIn: "08:35 AM", timeOut: null,       clockedIn: true,  status: "late"   },
    { name: "Priya Kumar",  role: "Developer",   email: "p.kumar@company.com",  timeIn: "09:15 AM", timeOut: null,       clockedIn: true,  status: "late"   },
    { name: "Dana Okafor",  role: "Finance",     email: "d.okafor@company.com", timeIn: "07:58 AM", timeOut: "04:45 PM", clockedIn: false, status: "valid"  },
    { name: "Felix Nguyen", role: "Security",    email: "f.nguyen@company.com", timeIn: "08:00 AM", timeOut: null,       clockedIn: true,  status: "valid"  },
    { name: "Rachel Kim",   role: "Operations",  email: "r.kim@company.com",    timeIn: "08:10 AM", timeOut: null,       clockedIn: true,  status: "valid"  },
    { name: "Owen Brooks",  role: "Legal",       email: "o.brooks@company.com", timeIn: "07:59 AM", timeOut: "05:00 PM", clockedIn: false, status: "valid"  },
    { name: "Tara Silva",   role: "Marketing",   email: "t.silva@company.com",  timeIn: null,       timeOut: null,       clockedIn: false, status: "absent" },
  ],
  "Westside Branch": [
    { name: "James Osei",    role: "Sales Lead", email: "j.osei@company.com",     timeIn: "08:22 AM", timeOut: "05:18 PM", clockedIn: false, status: "valid"  },
    { name: "Brian Torres",  role: "Support",    email: "b.torres@company.com",   timeIn: "09:02 AM", timeOut: null,       clockedIn: true,  status: "late"   },
    { name: "Kylie Park",    role: "Cashier",    email: "k.park@company.com",     timeIn: "08:00 AM", timeOut: "04:30 PM", clockedIn: false, status: "valid"  },
    { name: "Sam Ford",      role: "Supervisor", email: "s.ford@company.com",     timeIn: "07:55 AM", timeOut: null,       clockedIn: true,  status: "valid"  },
    { name: "Aisha Williams",role: "Clerk",      email: "a.williams@company.com", timeIn: null,       timeOut: null,       clockedIn: false, status: "absent" },
  ],
  "Downtown Hub": [
    { name: "Asha Patel",     role: "Designer", email: "a.patel@company.com",     timeIn: "08:11 AM", timeOut: null,       clockedIn: true,  status: "valid"  },
    { name: "Nina Chow",      role: "Analyst",  email: "n.chow@company.com",      timeIn: "08:55 AM", timeOut: "05:30 PM", clockedIn: false, status: "valid"  },
    { name: "Suki Yamamoto",  role: "Manager",  email: "s.yamamoto@company.com",  timeIn: "09:30 AM", timeOut: null,       clockedIn: true,  status: "late"   },
    { name: "Diego Ruiz",     role: "Engineer", email: "d.ruiz@company.com",      timeIn: "08:05 AM", timeOut: "05:05 PM", clockedIn: false, status: "valid"  },
    { name: "Mei Lin",        role: "QA",       email: "m.lin@company.com",       timeIn: "08:15 AM", timeOut: null,       clockedIn: true,  status: "valid"  },
    { name: "Nathan Cross",   role: "Product",  email: "n.cross@company.com",     timeIn: null,       timeOut: null,       clockedIn: false, status: "absent" },
  ],
  "Airport Desk": [
    { name: "Carlos Méndez", role: "Coordinator", email: "c.mendez@company.com", timeIn: "08:41 AM", timeOut: null,       clockedIn: true,  status: "late" },
    { name: "Thomas Adler",  role: "Supervisor",  email: "t.adler@company.com",  timeIn: null,       timeOut: null,       clockedIn: false, status: "absent"  },
    { name: "Eve Carter",    role: "Handler",      email: "e.carter@company.com", timeIn: "07:50 AM", timeOut: "03:30 PM", clockedIn: false, status: "valid"   },
    { name: "Luis Barros",   role: "Agent",        email: "l.barros@company.com", timeIn: "08:00 AM", timeOut: null,       clockedIn: true,  status: "valid"   },
  ],
  "North Campus": [
    { name: "Grace Tan",   role: "Researcher", email: "g.tan@company.com",   timeIn: "09:00 AM", timeOut: null,       clockedIn: true,  status: "late"   },
    { name: "Paul Monroe", role: "Lab Tech",   email: "p.monroe@company.com", timeIn: "08:30 AM", timeOut: "04:00 PM", clockedIn: false, status: "valid"  },
    { name: "Iris Chen",   role: "Lecturer",   email: "i.chen@company.com",   timeIn: null,       timeOut: null,       clockedIn: false, status: "absent" },
  ],
};

const statusStyle: Record<string, string> = {
  valid: "bg-teal-50 text-teal-700", late: "bg-amber-50 text-amber-700",
  absent: "bg-[#f5f5f5] text-[#737373]",
};
const statusLabel: Record<string, string> = {
  valid: "Valid", late: "Late", absent: "Absent",
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

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [showModal, setShowModal] = useState(false);
  const [editBranch, setEditBranch] = useState<Branch | null>(null);
  const [rosterBranch, setRosterBranch] = useState<Branch | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: "", address: "", city: "", country: "USA", lat: "", lng: "", radius: "100",
  });

  function openCreate() {
    setForm({ name: "", address: "", city: "", country: "USA", lat: "", lng: "", radius: "100" });
    setEditBranch(null);
    setShowModal(true);
  }

  function openEdit(b: Branch) {
    setForm({ name: b.name, address: b.address, city: b.city, country: b.country, lat: String(b.lat), lng: String(b.lng), radius: String(b.radius) });
    setEditBranch(b);
    setShowModal(true);
  }

  function handleSave() {
    if (editBranch) {
      setBranches((prev) => prev.map((b) => b.id === editBranch.id ? { ...b, ...form, lat: parseFloat(form.lat), lng: parseFloat(form.lng), radius: parseInt(form.radius) } : b));
    } else {
      const id = Math.max(...branches.map((b) => b.id)) + 1;
      setBranches((prev) => [...prev, { id, name: form.name, address: form.address, city: form.city, country: form.country, lat: parseFloat(form.lat) || 0, lng: parseFloat(form.lng) || 0, radius: parseInt(form.radius) || 100, employees: 0, active: 0, status: "active" }]);
    }
    setShowModal(false);
  }

  function handleDelete(id: number) {
    setBranches((prev) => prev.filter((b) => b.id !== id));
    setDeleteId(null);
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[#002244] font-bold text-xl">Branch Management</h2>
          <p className="text-[#737373] text-sm mt-0.5">{branches.filter((b) => b.status === "active").length} active branches with GPS radius zones</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002244] text-white text-sm font-medium hover:bg-[#003366] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Branch
        </button>
      </div>

      {/* Branch cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {branches.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] overflow-hidden">
            {/* Map placeholder with radius visualization */}
            <div className="relative h-36 bg-[#f5f5f5] flex items-center justify-center overflow-hidden">
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`grid-${b.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#002244" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${b.id})`} />
              </svg>
              {/* Radius rings */}
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute rounded-full border border-[#002244]/10 bg-[#002244]/5"
                  style={{ width: `${Math.min(b.radius * 0.6, 120)}px`, height: `${Math.min(b.radius * 0.6, 120)}px` }}
                />
                <div
                  className="absolute rounded-full border border-teal-500/20 bg-teal-500/5"
                  style={{ width: `${Math.min(b.radius * 0.38, 76)}px`, height: `${Math.min(b.radius * 0.38, 76)}px` }}
                />
                <div className="relative w-8 h-8 rounded-full bg-[#002244] flex items-center justify-center shadow-lg z-10">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              {/* Radius label */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#002244] ring-1 ring-[#e5e5e5]">
                {b.radius}m radius
              </div>
              {/* Status badge */}
              <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold ring-1 ${
                b.status === "active"
                  ? "bg-teal-50 text-teal-700 ring-teal-100"
                  : "bg-[#f5f5f5] text-[#737373] ring-[#e5e5e5]"
              }`}>
                {b.status === "active" ? "● Active" : "○ Inactive"}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-[#002244] font-semibold text-base leading-tight">{b.name}</h3>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => openEdit(b)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#737373] hover:text-[#002244] hover:bg-[#f5f5f5] transition-all"
                    title="Edit branch"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteId(b.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#737373] hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Delete branch"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-[#737373] text-xs leading-relaxed">{b.address}</p>
              <p className="text-[#737373] text-xs">{b.city}, {b.country}</p>

              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#e5e5e5]">
                <div>
                  <p className="text-[#002244] text-base font-bold leading-tight">{b.active}</p>
                  <p className="text-[#737373] text-[10px]">Active now</p>
                </div>
                <div>
                  <p className="text-[#002244] text-base font-bold leading-tight">{b.employees}</p>
                  <p className="text-[#737373] text-[10px]">Total staff</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#737373] text-[10px]">Presence</p>
                    <p className="text-[#737373] text-[10px]">{b.employees ? Math.round((b.active / b.employees) * 100) : 0}%</p>
                  </div>
                  <div className="h-1.5 bg-[#f5f5f5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${b.employees ? (b.active / b.employees) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#e5e5e5] grid grid-cols-2 gap-2 text-[10px] text-[#737373]">
                <div>
                  <span className="font-medium text-[#0a0a0a]">Lat: </span>{b.lat.toFixed(4)}
                </div>
                <div>
                  <span className="font-medium text-[#0a0a0a]">Lng: </span>{b.lng.toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-[#e5e5e5] w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#002244] font-bold text-base">
                {editBranch ? "Edit Branch" : "Create Branch"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#737373] hover:text-[#0a0a0a] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">Branch Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Head Office"
                  className="w-full px-3 py-2 text-sm border border-[#e5e5e5] rounded-[0.625rem] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">Address</label>
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Street address"
                  className="w-full px-3 py-2 text-sm border border-[#e5e5e5] rounded-[0.625rem] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">City</label>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="City"
                    className="w-full px-3 py-2 text-sm border border-[#e5e5e5] rounded-[0.625rem] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">Country</label>
                  <input
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    placeholder="Country"
                    className="w-full px-3 py-2 text-sm border border-[#e5e5e5] rounded-[0.625rem] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">Latitude *</label>
                  <input
                    value={form.lat}
                    onChange={(e) => setForm({ ...form, lat: e.target.value })}
                    placeholder="e.g. 40.7128"
                    type="number"
                    step="any"
                    className="w-full px-3 py-2 text-sm border border-[#e5e5e5] rounded-[0.625rem] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">Longitude *</label>
                  <input
                    value={form.lng}
                    onChange={(e) => setForm({ ...form, lng: e.target.value })}
                    placeholder="e.g. -74.0060"
                    type="number"
                    step="any"
                    className="w-full px-3 py-2 text-sm border border-[#e5e5e5] rounded-[0.625rem] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">
                  Geofence Radius: <span className="text-teal-600 font-semibold">{form.radius}m</span>
                </label>
                <input
                  type="range"
                  min="25"
                  max="500"
                  step="25"
                  value={form.radius}
                  onChange={(e) => setForm({ ...form, radius: e.target.value })}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-[#737373] mt-1">
                  <span>25m</span><span>250m</span><span>500m</span>
                </div>
              </div>
              {/* Radius preview */}
              <div className="bg-[#f5f5f5] rounded-xl p-4 flex items-center justify-center h-28 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <defs>
                    <pattern id="modal-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#002244" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#modal-grid)" />
                </svg>
                <div className="relative flex items-center justify-center">
                  <div className="absolute rounded-full border border-[#002244]/15 bg-[#002244]/5"
                    style={{ width: `${Math.min(parseInt(form.radius) * 0.22, 100)}px`, height: `${Math.min(parseInt(form.radius) * 0.22, 100)}px` }}
                  />
                  <div className="absolute rounded-full border border-teal-400/20 bg-teal-400/5"
                    style={{ width: `${Math.min(parseInt(form.radius) * 0.14, 64)}px`, height: `${Math.min(parseInt(form.radius) * 0.14, 64)}px` }}
                  />
                  <div className="relative w-6 h-6 rounded-full bg-[#002244] flex items-center justify-center z-10 shadow">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-2.5 right-3 text-[10px] text-[#737373] font-medium">{form.radius}m radius</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-[#e5e5e5] text-[#737373] hover:bg-[#f5f5f5] transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[#002244] text-white hover:bg-[#003366] transition-colors">
                {editBranch ? "Save Changes" : "Create Branch"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-[#e5e5e5] w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-[#002244] font-bold text-base mb-1">Delete Branch?</h3>
            <p className="text-[#737373] text-sm mb-6">This action cannot be undone. All associated data will be removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-[#e5e5e5] text-[#737373] hover:bg-[#f5f5f5] transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Roster Drawer */}
      {rosterBranch !== null && (() => {
        const emps = branchEmployees[rosterBranch.name] ?? [];
        const liveCount = emps.filter((e) => e.clockedIn).length;
        const absentCount = emps.filter((e) => e.status === "absent").length;
        return (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="flex-1 bg-black/30" onClick={() => setRosterBranch(null)} />
            {/* Drawer */}
            <div className="w-full max-w-xl bg-white shadow-2xl flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[#e5e5e5] shrink-0">
                <div>
                  <h3 className="text-[#002244] font-bold text-lg leading-tight">{rosterBranch.name}</h3>
                  <p className="text-[#737373] text-xs mt-0.5">{rosterBranch.address} · {rosterBranch.city}</p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full ring-1 ring-teal-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                      {liveCount} Active
                    </span>
                    <span className="text-[10px] text-[#737373]">{emps.length} total · {absentCount} absent</span>
                  </div>
                </div>
                <button
                  onClick={() => setRosterBranch(null)}
                  className="mt-0.5 text-[#737373] hover:text-[#0a0a0a] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Employee table */}
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-[#fafafa] border-b border-[#e5e5e5]">
                    <tr>
                      <th className="text-left text-[#737373] text-xs font-medium px-5 py-3">Employee</th>
                      <th className="text-left text-[#737373] text-xs font-medium px-4 py-3">Clock In</th>
                      <th className="text-left text-[#737373] text-xs font-medium px-4 py-3">Clock Out</th>
                      <th className="text-left text-[#737373] text-xs font-medium px-4 py-3">Duration</th>
                      <th className="text-left text-[#737373] text-xs font-medium px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e5e5]">
                    {emps.map((emp) => (
                      <tr key={emp.email} className={emp.clockedIn ? "bg-teal-50/30" : "hover:bg-[#fafafa]"}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="relative shrink-0">
                              <div className="w-7 h-7 rounded-full bg-[#002244]/10 flex items-center justify-center">
                                <span className="text-[#002244] text-[10px] font-bold">{emp.name.charAt(0)}</span>
                              </div>
                              {emp.clockedIn && (
                                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal-500 ring-1 ring-white animate-pulse" />
                              )}
                            </div>
                            <div>
                              <p className="text-[#0a0a0a] font-medium text-xs leading-tight">{emp.name}</p>
                              <p className="text-[#737373] text-[10px]">{emp.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-[#0a0a0a] font-semibold text-xs tabular-nums">{emp.timeIn ?? "—"}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          {emp.clockedIn ? (
                            <span className="flex items-center gap-1.5 text-teal-600 font-semibold text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <span className="text-[#0a0a0a] font-semibold text-xs tabular-nums">{emp.timeOut ?? "—"}</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-xs font-medium ${emp.clockedIn ? "text-teal-600" : "text-[#737373]"}`}>
                            {parseDuration(emp.timeIn, emp.timeOut)}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyle[emp.status]}`}>
                            {statusLabel[emp.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
