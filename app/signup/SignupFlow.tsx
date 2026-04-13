"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  inviteCode: string;
  companyName: string;
}

/* ─── Step meta ─────────────────────────────────────────────────────────── */
const STEPS = [
  { label: "Account" },
  { label: "Company" },
  { label: "Location" },
  { label: "Done" },
];

/* ─── Shared input class ─────────────────────────────────────────────────── */
const inputCls = `
  w-full px-4 py-3
  bg-white border border-[#e5e5e5] shadow-sm
  rounded-[0.625rem] text-[#0a0a0a] text-sm
  placeholder:text-[#737373]
  focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]
  transition-all duration-200
`;

const iconInputCls = `
  w-full pl-10 pr-4 py-3
  bg-white border border-[#e5e5e5] shadow-sm
  rounded-[0.625rem] text-[#0a0a0a] text-sm
  placeholder:text-[#737373]
  focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]
  transition-all duration-200
`;

/* ─── Progress bar ───────────────────────────────────────────────────────── */
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8">
      {/* Step labels */}
      <div className="flex items-center justify-between mb-3">
        {STEPS.map((s, i) => (
          <span
            key={s.label}
            className={`text-xs font-semibold transition-colors duration-300 ${
              i < step
                ? "text-teal-600"
                : i === step
                ? "text-[#002244]"
                : "text-[#737373]"
            }`}
          >
            {s.label}
          </span>
        ))}
      </div>

      {/* Track */}
      <div className="relative h-1.5 bg-[#e5e5e5] rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[#002244] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / (total - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Logo ───────────────────────────────────────────────────────────────── */
function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
      <div className="w-8 h-8 rounded-lg bg-[#002244] flex items-center justify-center">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <span className="text-[#002244] font-bold text-lg tracking-tight">
        Proximity <span className="text-teal-600">Clocker</span>
      </span>
    </Link>
  );
}

/* ─── Step 1 — Account ──────────────────────────────────────────────────── */
function StepAccount({
  data,
  onChange,
  onNext,
}: {
  data: FormData;
  onChange: (field: keyof FormData, val: string) => void;
  onNext: () => void;
}) {
  const [showPw, setShowPw] = useState(false);

  const valid =
    data.firstName.trim() &&
    data.lastName.trim() &&
    data.email.includes("@") &&
    data.password.length >= 8;

  return (
    <div>
      <p className="text-teal-600 text-xs font-bold tracking-widest uppercase mb-2">
        Step 1 of 3
      </p>
      <h2 className="text-[#002244] text-2xl font-extrabold mb-1">Create your account</h2>
      <p className="text-[#737373] text-sm mb-7">
        Start by setting up your personal profile.
      </p>

      <div className="space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-[#002244] text-sm font-semibold">First name</label>
            <input
              type="text"
              autoComplete="given-name"
              placeholder="Ada"
              value={data.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              className={inputCls}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[#002244] text-sm font-semibold">Last name</label>
            <input
              type="text"
              autoComplete="family-name"
              placeholder="Okonkwo"
              value={data.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-[#002244] text-sm font-semibold">Work email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={iconInputCls}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-[#002244] text-sm font-semibold">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type={showPw ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              value={data.password}
              onChange={(e) => onChange("password", e.target.value)}
              className={`${iconInputCls} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#737373] hover:text-[#002244] transition-colors"
            >
              {showPw ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {/* Password strength */}
          {data.password.length > 0 && (
            <div className="flex items-center gap-1.5 mt-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                    data.password.length >= (i + 1) * 3
                      ? i < 1 ? "bg-rose-400"
                        : i < 2 ? "bg-amber-400"
                        : i < 3 ? "bg-teal-400"
                        : "bg-teal-500"
                      : "bg-[#e5e5e5]"
                  }`}
                />
              ))}
              <span className="text-[#737373] text-xs ml-1">
                {data.password.length < 4 ? "Weak" : data.password.length < 7 ? "Fair" : data.password.length < 10 ? "Good" : "Strong"}
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!valid}
        className="
          mt-7 w-full flex items-center justify-center gap-2
          bg-[#002244] hover:bg-[#003366]
          text-white text-sm font-bold
          py-3.5 rounded-xl
          transition-all duration-200
          shadow-sm hover:shadow-md shadow-[#002244]/20
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        Continue
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Step 2 — Company ──────────────────────────────────────────────────── */
function StepCompany({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: FormData;
  onChange: (field: keyof FormData, val: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = data.inviteCode.trim().length >= 4;

  return (
    <div>
      <p className="text-teal-600 text-xs font-bold tracking-widest uppercase mb-2">
        Step 2 of 3
      </p>
      <h2 className="text-[#002244] text-2xl font-extrabold mb-1">Join your company</h2>
      <p className="text-[#737373] text-sm mb-7">
        Enter the invite code provided by your HR or admin team to connect your account to your company.
      </p>

      <div className="space-y-4">
        {/* Company name (optional) */}
        <div className="space-y-1.5">
          <label className="block text-[#002244] text-sm font-semibold">
            Company name{" "}
            <span className="text-[#737373] font-normal">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5m4 0H9" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Acme Corp"
              value={data.companyName}
              onChange={(e) => onChange("companyName", e.target.value)}
              className={iconInputCls}
            />
          </div>
        </div>

        {/* Invite code */}
        <div className="space-y-1.5">
          <label className="block text-[#002244] text-sm font-semibold">
            Invite code <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="e.g. ACME-2026-XK9"
              value={data.inviteCode}
              onChange={(e) => onChange("inviteCode", e.target.value.toUpperCase())}
              className={`${iconInputCls} font-mono tracking-widest`}
            />
          </div>
          <p className="text-[#737373] text-xs mt-1 flex items-start gap-1.5">
            <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Your invite code links you to the correct company branches. Contact your admin if you don&apos;t have one.
          </p>
        </div>

        {/* Info card */}
        <div className="flex items-start gap-3 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl p-4">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-[#002244]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#002244]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-[#002244] text-xs font-semibold mb-0.5">Verified access only</p>
            <p className="text-[#737373] text-xs leading-relaxed">
              Only employees with a valid invite code can join a company workspace. This keeps your attendance data secure.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#737373] hover:text-[#002244] text-sm font-semibold transition-colors px-4 py-3.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="
            flex-1 flex items-center justify-center gap-2
            bg-[#002244] hover:bg-[#003366]
            text-white text-sm font-bold
            py-3.5 rounded-xl
            transition-all duration-200
            shadow-sm hover:shadow-md shadow-[#002244]/20
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Continue
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Step 3 — Location ─────────────────────────────────────────────────── */
function StepLocation({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "granted" | "denied">("idle");

  function requestPermission() {
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      () => {
        setStatus("granted");
        setTimeout(onNext, 800);
      },
      () => setStatus("denied"),
      { timeout: 8000 }
    );
  }

  return (
    <div>
      <p className="text-teal-600 text-xs font-bold tracking-widest uppercase mb-2">
        Step 3 of 3
      </p>
      <h2 className="text-[#002244] text-2xl font-extrabold mb-1">Enable location access</h2>
      <p className="text-[#737373] text-sm mb-7">
        Proximity Clocker needs your GPS location to verify you&apos;re at your assigned branch before clocking you in.
      </p>

      {/* Visual */}
      <div className="flex flex-col items-center py-8 mb-6">
        {/* Ripple rings */}
        <div className="relative flex items-center justify-center">
          <div className={`absolute w-36 h-36 rounded-full border-2 transition-all duration-700 ${
            status === "granted" ? "border-teal-300/50 scale-110" : "border-[#002244]/10"
          } animate-ping`} style={{ animationDuration: "2s" }} />
          <div className={`absolute w-28 h-28 rounded-full border-2 transition-all duration-500 ${
            status === "granted" ? "border-teal-300/40" : "border-[#002244]/10"
          }`} />
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            status === "granted"
              ? "bg-teal-500 shadow-lg shadow-teal-500/30"
              : status === "denied"
              ? "bg-rose-50 border-2 border-rose-200"
              : "bg-[#002244] shadow-lg shadow-[#002244]/20"
          }`}>
            {status === "loading" ? (
              <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : status === "granted" ? (
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : status === "denied" ? (
              <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </div>
        </div>

        <p className={`mt-6 text-sm font-semibold transition-colors duration-300 ${
          status === "granted" ? "text-teal-600" : status === "denied" ? "text-rose-500" : "text-[#002244]"
        }`}>
          {status === "idle" && "Ready to detect your location"}
          {status === "loading" && "Requesting permission…"}
          {status === "granted" && "Location access granted!"}
          {status === "denied" && "Permission denied — clock-in may not work"}
        </p>
      </div>

      {/* Why we need it */}
      <div className="space-y-2.5 mb-6">
        {[
          { label: "Verify branch presence", desc: "Confirms you are at your assigned location." },
          { label: "Automatic clock-in", desc: "No manual action needed — just arrive." },
          { label: "Never shared", desc: "Your GPS data is used only for attendance verification." },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <span className="text-[#002244] text-xs font-semibold">{item.label} — </span>
              <span className="text-[#737373] text-xs">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {status === "denied" && (
        <div className="mb-4 flex items-start gap-2.5 bg-rose-50 border border-rose-200 rounded-xl p-3.5">
          <svg className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-rose-700 text-xs leading-relaxed">
            Location was denied. You can enable it later in your browser settings. Clock-in will require location access to function.
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#737373] hover:text-[#002244] text-sm font-semibold transition-colors px-4 py-3.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>

        {status === "idle" || status === "denied" ? (
          <button
            onClick={requestPermission}
            className="
              flex-1 flex items-center justify-center gap-2
              bg-[#002244] hover:bg-[#003366]
              text-white text-sm font-bold
              py-3.5 rounded-xl
              transition-all duration-200
              shadow-sm hover:shadow-md shadow-[#002244]/20
            "
          >
            {status === "denied" ? "Try again" : "Allow location access"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={status === "loading"}
            className="
              flex-1 flex items-center justify-center gap-2
              bg-teal-600 hover:bg-teal-700
              text-white text-sm font-bold
              py-3.5 rounded-xl
              transition-all duration-200
              shadow-sm shadow-teal-600/20
              disabled:opacity-60
            "
          >
            {status === "loading" ? "Detecting…" : "Continue"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Step 4 — Success ──────────────────────────────────────────────────── */
function StepSuccess({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center text-center py-4">
      {/* Checkmark */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
          <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#002244] flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      <p className="text-teal-600 text-xs font-bold tracking-widest uppercase mb-2">
        You&apos;re all set
      </p>
      <h2 className="text-[#002244] text-2xl font-extrabold mb-2">
        Welcome, {name || "there"}!
      </h2>
      <p className="text-[#737373] text-sm max-w-xs leading-relaxed mb-8">
        Your account is ready. From now on, just arrive at your branch and Proximity Clocker will automatically clock you in.
      </p>

      {/* Summary pills */}
      <div className="w-full space-y-2.5 mb-8">
        {[
          { icon: "👤", label: "Account created", done: true },
          { icon: "🏢", label: "Company linked", done: true },
          { icon: "📍", label: "Location enabled", done: true },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl px-4 py-3"
          >
            <span className="text-base">{item.icon}</span>
            <span className="flex-1 text-[#002244] text-sm font-medium text-left">{item.label}</span>
            <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/login"
        className="
          w-full flex items-center justify-center gap-2
          bg-[#002244] hover:bg-[#003366]
          text-white text-sm font-bold
          py-3.5 rounded-xl
          transition-all duration-200
          shadow-sm hover:shadow-md shadow-[#002244]/20
        "
      >
        Go to sign in
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}

/* ─── Main flow ──────────────────────────────────────────────────────────── */
export default function SignupFlow() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    inviteCode: "",
    companyName: "",
  });

  function update(field: keyof FormData, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  return (
    <div className="w-full max-w-lg">
      {/* Card */}
      <div className="bg-white shadow-sm ring-1 ring-[#e5e5e5] rounded-2xl px-8 py-10 lg:px-10 lg:py-12">
        <Logo />

        {/* Progress — hide on success screen */}
        {step < 3 && <ProgressBar step={step} total={STEPS.length} />}

        {/* Animated step content */}
        <div
          key={step}
          className="animate-fadeIn"
          style={{ animation: "fadeSlideUp 0.35s ease both" }}
        >
          {step === 0 && (
            <StepAccount data={form} onChange={update} onNext={() => setStep(1)} />
          )}
          {step === 1 && (
            <StepCompany data={form} onChange={update} onNext={() => setStep(2)} onBack={() => setStep(0)} />
          )}
          {step === 2 && (
            <StepLocation onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && <StepSuccess name={form.firstName} />}
        </div>
      </div>

      {/* Below-card link */}
      {step < 3 && (
        <p className="mt-5 text-center text-[#737373] text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#002244] font-semibold hover:text-teal-600 transition-colors">
            Sign in
          </Link>
        </p>
      )}

      {/* Keyframe injection */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
