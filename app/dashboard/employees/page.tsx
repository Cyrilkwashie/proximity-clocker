"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const allEmployees = [
  // ─── Head Office (19) ───────────────────────────────────────────
  { id:  1, name: "Marcus Reid",          email: "m.reid@company.com",         branch: "Head Office",     role: "Software Engineer",      status: "active",   lastClock: "Today 08:04 AM" },
  { id:  2, name: "Lena Vogel",           email: "l.vogel@company.com",        branch: "Head Office",     role: "HR Manager",             status: "active",   lastClock: "Today 08:35 AM" },
  { id:  3, name: "Priya Kumar",          email: "p.kumar@company.com",        branch: "Head Office",     role: "Backend Developer",      status: "active",   lastClock: "Today 09:15 AM" },
  { id:  4, name: "Suki Yamamoto",        email: "s.yamamoto@company.com",     branch: "Head Office",     role: "Product Manager",        status: "active",   lastClock: "Today 09:30 AM" },
  { id:  5, name: "Oliver Grant",         email: "o.grant@company.com",        branch: "Head Office",     role: "Data Analyst",          status: "active",   lastClock: "Today 08:48 AM" },
  { id:  6, name: "Emma Schultz",         email: "e.schultz@company.com",      branch: "Head Office",     role: "Marketing Lead",         status: "active",   lastClock: "Today 08:52 AM" },
  { id:  7, name: "Daniel Park",          email: "d.park@company.com",         branch: "Head Office",     role: "Frontend Developer",     status: "active",   lastClock: "Today 09:06 AM" },
  { id:  8, name: "Rachel Kim",           email: "r.kim@company.com",          branch: "Head Office",     role: "DevOps Engineer",        status: "active",   lastClock: "Today 09:10 AM" },
  { id:  9, name: "George Nkrumah",       email: "g.nkrumah@company.com",      branch: "Head Office",     role: "Financial Analyst",      status: "active",   lastClock: "Today 09:22 AM" },
  { id: 10, name: "Fatima Al-Rashid",     email: "f.alrashid@company.com",     branch: "Head Office",     role: "Legal Counsel",          status: "active",   lastClock: "Today 09:45 AM" },
  { id: 11, name: "Henry Larson",         email: "h.larson@company.com",       branch: "Head Office",     role: "Operations Manager",     status: "active",   lastClock: "Today 10:01 AM" },
  { id: 12, name: "Ingrid Hansen",        email: "i.hansen@company.com",       branch: "Head Office",     role: "Compliance Officer",     status: "active",   lastClock: "Today 10:15 AM" },
  { id: 13, name: "Jason Obi",            email: "j.obi@company.com",          branch: "Head Office",     role: "Systems Architect",      status: "active",   lastClock: "Today 07:58 AM" },
  { id: 14, name: "Kira Santos",          email: "k.santos@company.com",       branch: "Head Office",     role: "Business Analyst",       status: "active",   lastClock: "Today 09:00 AM" },
  { id: 15, name: "Lucas Weber",          email: "l.weber@company.com",        branch: "Head Office",     role: "QA Engineer",            status: "active",   lastClock: "Today 09:04 AM" },
  { id: 16, name: "Maria Fernandez",      email: "m.fernandez@company.com",    branch: "Head Office",     role: "Executive Assistant",    status: "active",   lastClock: "Today 09:18 AM" },
  { id: 17, name: "Nadia Kowalski",       email: "n.kowalski@company.com",     branch: "Head Office",     role: "IT Support Specialist",  status: "inactive", lastClock: "Yesterday 05:00 PM" },
  { id: 18, name: "Paul Thompson",        email: "p.thompson@company.com",     branch: "Head Office",     role: "Tax Accountant",         status: "inactive", lastClock: "Yesterday 04:30 PM" },
  { id: 19, name: "Quinn Edwards",        email: "q.edwards@company.com",      branch: "Head Office",     role: "Talent Recruiter",       status: "inactive", lastClock: "2 days ago" },

  // ─── Westside Branch (9) ────────────────────────────────────────
  { id: 20, name: "James Osei",           email: "j.osei@company.com",         branch: "Westside Branch", role: "Sales Lead",             status: "active",   lastClock: "Today 08:22 AM" },
  { id: 21, name: "Brian Torres",         email: "b.torres@company.com",       branch: "Westside Branch", role: "Customer Support",       status: "active",   lastClock: "Today 09:02 AM" },
  { id: 22, name: "Amara Diallo",         email: "a.diallo@company.com",       branch: "Westside Branch", role: "Sales Associate",        status: "active",   lastClock: "Today 08:40 AM" },
  { id: 23, name: "Derek Walsh",          email: "d.walsh@company.com",        branch: "Westside Branch", role: "Regional Manager",       status: "active",   lastClock: "Today 08:15 AM" },
  { id: 24, name: "Elena Popova",         email: "e.popova@company.com",       branch: "Westside Branch", role: "Marketing Specialist",   status: "active",   lastClock: "Today 09:00 AM" },
  { id: 25, name: "Frank Okafor",         email: "f.okafor@company.com",       branch: "Westside Branch", role: "Sales Executive",        status: "active",   lastClock: "Today 08:55 AM" },
  { id: 26, name: "Grace Lee",            email: "g.lee@company.com",          branch: "Westside Branch", role: "Account Manager",        status: "active",   lastClock: "Today 09:20 AM" },
  { id: 27, name: "Hamid Nasiri",         email: "h.nasiri@company.com",       branch: "Westside Branch", role: "Operations Coordinator", status: "active",   lastClock: "Today 09:35 AM" },
  { id: 28, name: "Iris Bergmann",        email: "i.bergmann@company.com",     branch: "Westside Branch", role: "Customer Success",       status: "inactive", lastClock: "Yesterday 04:30 PM" },

  // ─── Downtown Hub (13) ──────────────────────────────────────────
  { id: 29, name: "Nina Chow",            email: "n.chow@company.com",         branch: "Downtown Hub",    role: "Data Analyst",          status: "active",   lastClock: "Today 08:55 AM" },
  { id: 30, name: "Uma Krishnan",         email: "u.krishnan@company.com",     branch: "Downtown Hub",    role: "Project Manager",        status: "active",   lastClock: "Today 08:20 AM" },
  { id: 31, name: "Victor Mensah",        email: "v.mensah@company.com",       branch: "Downtown Hub",    role: "Software Developer",     status: "active",   lastClock: "Today 08:30 AM" },
  { id: 32, name: "Wendy Zhao",           email: "w.zhao@company.com",         branch: "Downtown Hub",    role: "Content Strategist",     status: "active",   lastClock: "Today 08:45 AM" },
  { id: 33, name: "Xander Muller",        email: "x.muller@company.com",       branch: "Downtown Hub",    role: "Web Developer",          status: "active",   lastClock: "Today 09:05 AM" },
  { id: 34, name: "Yasmine Bouchard",     email: "y.bouchard@company.com",     branch: "Downtown Hub",    role: "Digital Marketing",      status: "active",   lastClock: "Today 09:25 AM" },
  { id: 35, name: "Zoe Nakamura",         email: "z.nakamura@company.com",     branch: "Downtown Hub",    role: "Brand Designer",         status: "active",   lastClock: "Today 09:40 AM" },
  { id: 36, name: "Aaron Kimani",         email: "a.kimani@company.com",       branch: "Downtown Hub",    role: "IT Specialist",          status: "active",   lastClock: "Today 08:10 AM" },
  { id: 37, name: "Bianca Russo",         email: "b.russo@company.com",        branch: "Downtown Hub",    role: "Product Owner",          status: "active",   lastClock: "Today 08:35 AM" },
  { id: 38, name: "Chris Moreau",         email: "c.moreau@company.com",       branch: "Downtown Hub",    role: "Backend Engineer",       status: "active",   lastClock: "Today 08:50 AM" },
  { id: 39, name: "David Okonkwo",        email: "d.okonkwo@company.com",      branch: "Downtown Hub",    role: "UX Researcher",          status: "active",   lastClock: "Today 09:15 AM" },
  { id: 40, name: "Eva Lindqvist",        email: "e.lindqvist@company.com",    branch: "Downtown Hub",    role: "Scrum Master",           status: "inactive", lastClock: "Yesterday 05:15 PM" },
  { id: 41, name: "Felix Andrade",        email: "f.andrade@company.com",      branch: "Downtown Hub",    role: "QA Lead",                status: "inactive", lastClock: "Yesterday 05:30 PM" },

  // ─── Airport Desk (6) ───────────────────────────────────────────
  { id: 42, name: "Carlos Mendez",        email: "c.mendez@company.com",       branch: "Airport Desk",    role: "Airport Coordinator",    status: "inactive", lastClock: "Yesterday 05:12 PM" },
  { id: 43, name: "Diana Osei",           email: "d.osei@company.com",         branch: "Airport Desk",    role: "Ground Operations",      status: "active",   lastClock: "Today 06:00 AM" },
  { id: 44, name: "Edwin Larsson",        email: "e.larsson@company.com",      branch: "Airport Desk",    role: "Logistics Officer",      status: "active",   lastClock: "Today 06:30 AM" },
  { id: 45, name: "Fiona Walsh",          email: "fi.walsh@company.com",       branch: "Airport Desk",    role: "Passenger Services",     status: "active",   lastClock: "Today 07:00 AM" },
  { id: 46, name: "Gareth Obi",           email: "g.obi@company.com",          branch: "Airport Desk",    role: "Security Supervisor",    status: "active",   lastClock: "Today 07:30 AM" },
  { id: 47, name: "Haruki Tanaka",        email: "h.tanaka@company.com",       branch: "Airport Desk",    role: "Night Shift Lead",       status: "inactive", lastClock: "Yesterday 11:00 PM" },

  // ─── North Campus (3) ───────────────────────────────────────────
  { id: 48, name: "Irene Castillo",       email: "i.castillo@company.com",     branch: "North Campus",    role: "Research Analyst",       status: "inactive", lastClock: "Yesterday 04:00 PM" },
  { id: 49, name: "Jake Petersen",        email: "j.petersen@company.com",     branch: "North Campus",    role: "Lab Technician",         status: "inactive", lastClock: "2 days ago" },
  { id: 50, name: "Kate Oduya",           email: "k.oduya@company.com",        branch: "North Campus",    role: "Campus Coordinator",     status: "inactive", lastClock: "3 days ago" },
];

const TOTAL_EMPLOYEES = 110; // full company count (branches page source of truth)

const branches = ["All Branches", "Head Office", "Westside Branch", "Downtown Hub", "Airport Desk", "North Campus"];

type Employee = typeof allEmployees[number];

export default function EmployeesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All Branches");
  const [status, setStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  const filtered = allEmployees.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchBranch = branch === "All Branches" || e.branch === branch;
    const matchStatus = status === "all" || e.status === status;
    return matchSearch && matchBranch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[#002244] dark:text-[#e2e8f0] font-bold text-xl">Employees</h2>
          <p className="text-[#737373] dark:text-[#94a3b8] text-sm mt-0.5">
            {TOTAL_EMPLOYEES} total registered
            <span className="text-[#e5e5e5] dark:text-[#334155] mx-1.5">·</span>
            showing {filtered.length} of {allEmployees.length}
          </p>
        </div>
        <button
          onClick={() => { setEditEmployee(null); setShowModal(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002244] text-white text-sm font-medium hover:bg-[#003366] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] dark:text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] placeholder:text-[#737373] dark:placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
          />
        </div>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002244]/20"
        >
          {branches.map((b) => <option key={b}>{b}</option>)}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002244]/20"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafafa] dark:bg-[#0f172a] border-b border-[#e5e5e5] dark:border-[#334155]">
                <th className="text-left text-[#737373] dark:text-[#94a3b8] text-xs font-medium px-5 py-3.5">Name</th>
                <th className="text-left text-[#737373] dark:text-[#94a3b8] text-xs font-medium px-4 py-3.5 hidden md:table-cell">Role</th>
                <th className="text-left text-[#737373] dark:text-[#94a3b8] text-xs font-medium px-4 py-3.5">Branch</th>
                <th className="text-left text-[#737373] dark:text-[#94a3b8] text-xs font-medium px-4 py-3.5 hidden lg:table-cell">Last Clock-In</th>
                <th className="text-left text-[#737373] dark:text-[#94a3b8] text-xs font-medium px-4 py-3.5">Status</th>
                <th className="text-right text-[#737373] dark:text-[#94a3b8] text-xs font-medium px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5] dark:divide-[#334155]">
              {filtered.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-[#fafafa] dark:hover:bg-[#334155]/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/dashboard/employees/history?email=${encodeURIComponent(emp.email)}&name=${encodeURIComponent(emp.name)}&role=${encodeURIComponent(emp.role)}&branch=${encodeURIComponent(emp.branch)}`)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#002244]/10 dark:bg-[#002244]/30 flex items-center justify-center shrink-0">
                        <span className="text-[#002244] dark:text-teal-400 text-xs font-semibold">{emp.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-[#0a0a0a] dark:text-[#e2e8f0] font-medium leading-tight">{emp.name}</p>
                        <p className="text-[#737373] dark:text-[#94a3b8] text-xs">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#737373] dark:text-[#94a3b8] hidden md:table-cell">{emp.role}</td>
                  <td className="px-4 py-3.5 text-[#737373] dark:text-[#94a3b8]">{emp.branch}</td>
                  <td className="px-4 py-3.5 text-[#737373] dark:text-[#94a3b8] hidden lg:table-cell">{emp.lastClock}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      emp.status === "active" ? "bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" : "bg-[#f5f5f5] text-[#737373] dark:bg-[#334155] dark:text-[#94a3b8]"
                    }`}>
                      {emp.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditEmployee(emp); setShowModal(true); }}
                        className="text-xs text-[#002244] hover:underline font-medium"
                      >
                        Edit
                      </button>
                      <button onClick={(e) => e.stopPropagation()} className={`text-xs font-medium ${
                        emp.status === "active" ? "text-red-500 hover:underline" : "text-teal-600 hover:underline"
                      }`}>
                        {emp.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-[#737373] dark:text-[#94a3b8] text-sm py-12">No employees match your filters.</p>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl ring-1 ring-[#e5e5e5] dark:ring-[#334155] w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#002244] dark:text-[#e2e8f0] font-bold text-base">
                {editEmployee ? "Edit Employee" : "Add Employee"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#737373] dark:text-[#94a3b8] hover:text-[#0a0a0a] dark:hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">First Name</label>
                  <input defaultValue={editEmployee?.name.split(" ")[0]} className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Last Name</label>
                  <input defaultValue={editEmployee?.name.split(" ")[1]} className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Email</label>
                <input type="email" defaultValue={editEmployee?.email} className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Branch</label>
                <select defaultValue={editEmployee?.branch ?? ""} className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#002244]/20">
                  {branches.filter((b) => b !== "All Branches").map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Role</label>
                <input defaultValue={editEmployee?.role} placeholder="e.g. Engineer" className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] placeholder:text-[#737373] dark:placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-[#e5e5e5] dark:border-[#334155] text-[#737373] dark:text-[#94a3b8] hover:bg-[#f5f5f5] dark:hover:bg-[#334155] transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[#002244] text-white hover:bg-[#003366] transition-colors">
                {editEmployee ? "Save Changes" : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
