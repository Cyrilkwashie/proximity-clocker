"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("Sarah Johnson");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [saving, setSaving] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleSaveProfile() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast("Profile updated successfully");
    }, 1200);
  }

  function handleChangePwd() {
    if (!currentPwd || !newPwd || newPwd !== confirmPwd) return;
    setSavingPwd(true);
    setTimeout(() => {
      setSavingPwd(false);
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
      showToast("Password changed successfully");
    }, 1200);
  }

  const pwdMismatch = newPwd.length > 0 && confirmPwd.length > 0 && newPwd !== confirmPwd;
  const pwdStrength =
    newPwd.length === 0
      ? null
      : newPwd.length < 6
      ? "Weak"
      : newPwd.length < 10
      ? "Fair"
      : "Strong";
  const strengthColor =
    pwdStrength === "Strong"
      ? "text-teal-600"
      : pwdStrength === "Fair"
      ? "text-amber-500"
      : "text-red-500";

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-teal-600 text-white text-sm font-medium shadow-lg">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {toast}
        </div>
      )}

      <div>
        <h2 className="text-[#002244] font-bold text-xl">My Profile</h2>
        <p className="text-[#737373] text-sm mt-0.5">Manage your personal information</p>
      </div>

      {/* Avatar card */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#002244] flex items-center justify-center shrink-0">
            <span className="text-white text-xl font-bold">SJ</span>
          </div>
          <div>
            <p className="text-[#0a0a0a] font-bold text-base">{name}</p>
            <p className="text-[#737373] text-sm mt-0.5">Marketing Specialist</p>
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
              <span className="text-[#737373] text-xs">Head Office</span>
              <span className="text-[#e5e5e5]">·</span>
              <span className="text-[#737373] text-xs">Acme Corporation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal info */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-6 space-y-4">
        <div>
          <h3 className="text-[#002244] font-semibold text-sm">Personal Information</h3>
          <p className="text-[#737373] text-xs mt-0.5">Update your name and phone number</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#e5e5e5] rounded-[0.625rem] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">Email Address</label>
          <input
            value="sarah.johnson@acme.com"
            readOnly
            className="w-full px-3 py-2.5 text-sm border border-[#e5e5e5] rounded-[0.625rem] bg-[#f5f5f5] text-[#737373] cursor-not-allowed"
          />
          <p className="text-[10px] text-[#737373] mt-1.5">
            Email cannot be changed. Contact your admin for help.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#e5e5e5] rounded-[0.625rem] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244] transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">Company</label>
            <input
              value="Acme Corporation"
              readOnly
              className="w-full px-3 py-2.5 text-sm border border-[#e5e5e5] rounded-[0.625rem] bg-[#f5f5f5] text-[#737373] cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">Branch</label>
            <input
              value="Head Office"
              readOnly
              className="w-full px-3 py-2.5 text-sm border border-[#e5e5e5] rounded-[0.625rem] bg-[#f5f5f5] text-[#737373] cursor-not-allowed"
            />
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="w-full py-2.5 rounded-xl bg-[#002244] hover:bg-[#003366] text-white text-sm font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving…
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-6 space-y-4">
        <div>
          <h3 className="text-[#002244] font-semibold text-sm">Change Password</h3>
          <p className="text-[#737373] text-xs mt-0.5">Choose a strong, unique password</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">
            Current Password
          </label>
          <input
            type="password"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2.5 text-sm border border-[#e5e5e5] rounded-[0.625rem] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244] transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-[#0a0a0a]">New Password</label>
            {pwdStrength && (
              <span className={`text-[10px] font-semibold ${strengthColor}`}>
                {pwdStrength}
              </span>
            )}
          </div>
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2.5 text-sm border border-[#e5e5e5] rounded-[0.625rem] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244] transition-all"
          />
          {newPwd.length > 0 && (
            <div className="flex gap-1 mt-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    pwdStrength === "Strong"
                      ? "bg-teal-500"
                      : pwdStrength === "Fair" && i < 2
                      ? "bg-amber-400"
                      : pwdStrength === "Weak" && i < 1
                      ? "bg-red-400"
                      : "bg-[#e5e5e5]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#0a0a0a] mb-1.5">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            placeholder="••••••••"
            className={`w-full px-3 py-2.5 text-sm border rounded-[0.625rem] placeholder:text-[#737373] focus:outline-none focus:ring-2 transition-all ${
              pwdMismatch
                ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                : "border-[#e5e5e5] focus:ring-[#002244]/20 focus:border-[#002244]"
            }`}
          />
          {pwdMismatch && (
            <p className="text-red-500 text-[10px] mt-1.5">Passwords do not match</p>
          )}
        </div>

        <button
          onClick={handleChangePwd}
          disabled={!currentPwd || !newPwd || pwdMismatch || savingPwd}
          className="w-full py-2.5 rounded-xl bg-[#002244] hover:bg-[#003366] text-white text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {savingPwd ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Updating…
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </div>

      {/* Account info (read-only) */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] p-6">
        <h3 className="text-[#002244] font-semibold text-sm mb-1">Account Information</h3>
        <p className="text-[#737373] text-xs mb-4">Read-only system details</p>
        <div className="divide-y divide-[#e5e5e5]">
          {[
            { label: "Employee ID", value: "EMP-00247" },
            { label: "Role", value: "Marketing Specialist" },
            { label: "Department", value: "Marketing" },
            { label: "Company", value: "Acme Corporation" },
            { label: "Branch", value: "Head Office" },
            { label: "Date Joined", value: "January 15, 2024" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-3 gap-4">
              <span className="text-[#737373] text-sm shrink-0">{item.label}</span>
              <span className="text-[#0a0a0a] text-sm font-medium text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
