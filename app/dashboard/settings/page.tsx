"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [profileSaved, setProfileSaved] = useState(false);
  const [systemSaved, setSystemSaved] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@company.com",
    phone: "+1 555 000 1234",
    company: "Acme Corp",
  });
  const [system, setSystem] = useState({
    defaultRadius: "100",
    timezone: "America/New_York",
    lateThreshold: "15",
    allowSelfClock: true,
    gpsRequired: true,
    notifyOnLate: false,
  });
  const [currPwd, setCurrPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdSaved, setPwdSaved] = useState(false);

  function saveProfile() {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  function saveSystem() {
    setSystemSaved(true);
    setTimeout(() => setSystemSaved(false), 2500);
  }

  function changePassword() {
    if (!currPwd || !newPwd || !confirmPwd) { setPwdError("All fields are required."); return; }
    if (newPwd.length < 8) { setPwdError("New password must be at least 8 characters."); return; }
    if (newPwd !== confirmPwd) { setPwdError("Passwords do not match."); return; }
    setPwdError("");
    setPwdSaved(true);
    setCurrPwd(""); setNewPwd(""); setConfirmPwd("");
    setTimeout(() => setPwdSaved(false), 2500);
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h2 className="text-[#002244] dark:text-[#e2e8f0] font-bold text-xl">Settings</h2>
        <p className="text-[#737373] dark:text-[#94a3b8] text-sm mt-0.5">Manage your profile, security, and system configuration</p>
      </div>

      {/* Admin Profile */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-6">
        <h3 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-base mb-5">Admin Profile</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#002244] flex items-center justify-center shrink-0">
            <span className="text-white text-xl font-bold">
              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-[#002244] dark:text-[#e2e8f0] font-semibold">{profile.firstName} {profile.lastName}</p>
            <p className="text-[#737373] dark:text-[#94a3b8] text-sm">{profile.email}</p>
            <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#002244]/10 dark:bg-[#002244]/30 text-[#002244] dark:text-teal-400">
              Super Admin
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">First Name</label>
            <input
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Last Name</label>
            <input
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Phone</label>
            <input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Company Name</label>
            <input
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          {profileSaved && (
            <p className="text-teal-600 text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Profile saved!
            </p>
          )}
          <div className="ml-auto">
            <button onClick={saveProfile} className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#002244] text-white hover:bg-[#003366] transition-colors">
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-6">
        <h3 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-base mb-4">Change Password</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Current Password</label>
            <input
              type="password"
              value={currPwd}
              onChange={(e) => setCurrPwd(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] placeholder:text-[#737373] dark:placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">New Password</label>
            <input
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] placeholder:text-[#737373] dark:placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Confirm New Password</label>
            <input
              type="password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] placeholder:text-[#737373] dark:placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
            />
          </div>
        </div>
        {pwdError && <p className="text-red-500 text-xs mt-2">{pwdError}</p>}
        {pwdSaved && (
          <p className="text-teal-600 text-xs mt-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Password updated successfully!
          </p>
        )}
        <div className="flex justify-end mt-4">
          <button onClick={changePassword} className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#002244] text-white hover:bg-[#003366] transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* System Configuration */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-6">
        <h3 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-base mb-5">System Configuration</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">
                Default Geofence Radius: <span className="text-teal-600 dark:text-teal-400">{system.defaultRadius}m</span>
              </label>
              <input
                type="range" min="25" max="500" step="25"
                value={system.defaultRadius}
                onChange={(e) => setSystem({ ...system, defaultRadius: e.target.value })}
                className="w-full accent-teal-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">
                Late Threshold: <span className="text-teal-600 dark:text-teal-400">{system.lateThreshold} min</span>
              </label>
              <input
                type="range" min="5" max="60" step="5"
                value={system.lateThreshold}
                onChange={(e) => setSystem({ ...system, lateThreshold: e.target.value })}
                className="w-full accent-teal-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5">Timezone</label>
            <select
              value={system.timezone}
              onChange={(e) => setSystem({ ...system, timezone: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#002244]/20"
            >
              <option value="America/New_York">America/New_York (UTC-5)</option>
              <option value="America/Chicago">America/Chicago (UTC-6)</option>
              <option value="America/Denver">America/Denver (UTC-7)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (UTC-8)</option>
              <option value="Europe/London">Europe/London (UTC+0)</option>
              <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
              <option value="Asia/Dubai">Asia/Dubai (UTC+4)</option>
              <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
              <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="space-y-0 divide-y divide-[#e5e5e5] dark:divide-[#334155] border border-[#e5e5e5] dark:border-[#334155] rounded-xl overflow-hidden">
            {[
              { key: "allowSelfClock", label: "Allow Self Clock-In", description: "Employees can clock in without admin approval" },
              { key: "gpsRequired", label: "Require GPS Verification", description: "Block clock-ins without valid GPS coordinates" },
              { key: "notifyOnLate", label: "Alert on Late Clock-In", description: "Send notification when employee exceeds late threshold" },
            ].map((toggle) => (
              <div key={toggle.key} className="flex items-center justify-between gap-4 px-4 py-3.5 bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#334155]/50 transition-colors">
                <div>
                  <p className="text-[#0a0a0a] dark:text-[#e2e8f0] text-sm font-medium">{toggle.label}</p>
                  <p className="text-[#737373] dark:text-[#94a3b8] text-xs mt-0.5">{toggle.description}</p>
                </div>
                <button
                  onClick={() => setSystem({ ...system, [toggle.key]: !system[toggle.key as keyof typeof system] })}
                  className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${
                    system[toggle.key as keyof typeof system] ? "bg-teal-500" : "bg-[#e5e5e5]"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      system[toggle.key as keyof typeof system] ? "left-5" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          {systemSaved && (
            <p className="text-teal-600 text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Settings saved!
            </p>
          )}
          <div className="ml-auto">
            <button onClick={saveSystem} className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#002244] text-white hover:bg-[#003366] transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-red-100 dark:ring-red-900/50 p-6">
        <h3 className="text-red-600 font-semibold text-base mb-1">Danger Zone</h3>
        <p className="text-[#737373] dark:text-[#94a3b8] text-xs mb-4">These actions are irreversible. Proceed with caution.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2.5 rounded-xl text-sm font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
            Clear All Attendance Data
          </button>
          <button className="px-4 py-2.5 rounded-xl text-sm font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
            Delete Company Account
          </button>
        </div>
      </div>
    </div>
  );
}
