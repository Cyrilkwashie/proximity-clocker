"use client";

import { useState } from "react";

const COMPANY_CODE = "PROX-7X4K-2025";
const SHARE_URL = "https://app.proximityclocker.com/join?code=PROX-7X4K-2025";

const inviteHistory = [
  { id: 1, email: "daniel.k@company.com", sentAt: "Jan 15, 2025 · 10:22 AM", status: "accepted", usedAt: "Jan 15, 2025 · 11:04 AM" },
  { id: 2, email: "priya.r@company.com", sentAt: "Jan 14, 2025 · 03:45 PM", status: "pending", usedAt: "—" },
  { id: 3, email: "tony.m@company.com", sentAt: "Jan 14, 2025 · 09:11 AM", status: "accepted", usedAt: "Jan 14, 2025 · 09:58 AM" },
  { id: 4, email: "sara.b@company.com", sentAt: "Jan 13, 2025 · 02:00 PM", status: "expired", usedAt: "—" },
  { id: 5, email: "leo.v@company.com", sentAt: "Jan 12, 2025 · 11:30 AM", status: "accepted", usedAt: "Jan 12, 2025 · 12:15 PM" },
];

export default function InvitePage() {
  const [codeCopied, setCodeCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [currentCode, setCurrentCode] = useState(COMPANY_CODE);

  function copyCode() {
    navigator.clipboard.writeText(currentCode).catch(() => {});
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  }

  function copyURL() {
    navigator.clipboard.writeText(SHARE_URL).catch(() => {});
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  }

  function sendInvite() {
    if (!inviteEmail) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setInviteEmail("");
      setTimeout(() => setSent(false), 3000);
    }, 1400);
  }

  function regenerate() {
    setRegenerating(true);
    setTimeout(() => {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      const seg = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      setCurrentCode(`PROX-${seg(4)}-${new Date().getFullYear()}`);
      setRegenerating(false);
    }, 1000);
  }

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-[#002244] dark:text-[#e2e8f0] font-bold text-xl">Invite System</h2>
        <p className="text-[#737373] dark:text-[#94a3b8] text-sm mt-0.5">Share your company code or send email invitations to new employees</p>
      </div>

      {/* Company code card */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </span>
          <h3 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-sm">Company Invite Code</h3>
        </div>

        <div className="bg-[#f5f5f5] dark:bg-[#0f172a] rounded-xl px-5 py-5 flex items-center justify-between gap-4 mb-4">
          <span className="font-mono text-2xl font-bold tracking-[0.2em] text-[#002244] dark:text-[#e2e8f0]">{currentCode}</span>
          <button
            onClick={copyCode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
              codeCopied
                ? "bg-teal-50 text-teal-700 ring-1 ring-teal-200 dark:bg-teal-900/40 dark:text-teal-300 dark:ring-teal-800"
                : "bg-white dark:bg-[#1e293b] text-[#002244] dark:text-[#e2e8f0] ring-1 ring-[#e5e5e5] dark:ring-[#334155] hover:ring-[#002244] dark:hover:ring-teal-500"
            }`}
          >
            {codeCopied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Code
              </>
            )}
          </button>
        </div>

        <p className="text-[#737373] dark:text-[#94a3b8] text-xs mb-4">
          Share this code with new employees. They'll enter it during signup to join your company automatically.
          Codes expire after <span className="font-medium text-[#0a0a0a] dark:text-[#e2e8f0]">7 days</span> of no use.
        </p>

        <button
          onClick={regenerate}
          disabled={regenerating}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-[#e5e5e5] dark:border-[#334155] text-[#737373] dark:text-[#94a3b8] hover:text-[#002244] dark:hover:text-white hover:border-[#002244] dark:hover:border-teal-500 transition-all disabled:opacity-60"
        >
          {regenerating ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          Regenerate Code
        </button>
      </div>

      {/* Share link */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-6">
        <h3 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-sm mb-3">Shareable Link</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2.5 bg-[#f5f5f5] dark:bg-[#0f172a] rounded-[0.625rem] text-xs text-[#737373] dark:text-[#94a3b8] font-mono truncate border border-[#e5e5e5] dark:border-[#334155]">
            {SHARE_URL}
          </div>
          <button
            onClick={copyURL}
            className={`px-3 py-2.5 rounded-[0.625rem] text-xs font-medium transition-all shrink-0 ${
              urlCopied
                ? "bg-teal-50 text-teal-700 ring-1 ring-teal-200"
                : "bg-[#002244] text-white hover:bg-[#003366]"
            }`}
          >
            {urlCopied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Email invite */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] p-6">
        <h3 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-sm mb-1">Send Email Invitation</h3>
        <p className="text-[#737373] dark:text-[#94a3b8] text-xs mb-4">Send a direct invite link to a specific employee's email address</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="colleague@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendInvite()}
            className="flex-1 px-3 py-2.5 text-sm border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] bg-white dark:bg-[#0f172a] dark:text-[#e2e8f0] placeholder:text-[#737373] dark:placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]"
          />
          <button
            onClick={sendInvite}
            disabled={sending || !inviteEmail}
            className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#002244] text-white hover:bg-[#003366] transition-colors disabled:opacity-60 shrink-0"
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
        {sent && (
          <p className="text-teal-600 text-xs mt-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Invitation sent successfully!
          </p>
        )}
      </div>

      {/* Invite history */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm ring-1 ring-[#e5e5e5] dark:ring-[#334155] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e5e5] dark:border-[#334155]">
          <h3 className="text-[#002244] dark:text-[#e2e8f0] font-semibold text-sm">Recent Invitations</h3>
        </div>
        <div className="divide-y divide-[#e5e5e5] dark:divide-[#334155]">
          {inviteHistory.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between gap-4 px-6 py-3.5 hover:bg-[#fafafa] dark:hover:bg-[#334155]/50 transition-colors">
              <div>
                <p className="text-[#0a0a0a] dark:text-[#e2e8f0] text-sm font-medium">{inv.email}</p>
                <p className="text-[#737373] dark:text-[#94a3b8] text-xs mt-0.5">Sent {inv.sentAt}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  inv.status === "accepted"
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300"
                    : inv.status === "pending"
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                    : "bg-[#f5f5f5] text-[#737373] dark:bg-[#334155] dark:text-[#94a3b8]"
                }`}>
                  {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                </span>
                {inv.usedAt !== "—" && (
                  <p className="text-[#737373] dark:text-[#94a3b8] text-[10px] mt-1">Used {inv.usedAt}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
