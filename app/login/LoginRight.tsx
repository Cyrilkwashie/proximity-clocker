"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginRight() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (email.toLowerCase() === "admin@company.com") {
        router.push("/dashboard");
      } else {
        router.push("/user");
      }
    }, 1200);
  }

  return (
    <section
      className="
        flex-1
        flex flex-col items-center justify-center
        bg-white
        px-6 py-12
        lg:px-16 lg:py-12
        relative
      "
    >
      <div className="w-full max-w-100">

        {/* Logo — only visible on mobile (left panel hides on mobile) */}
        <div className="flex lg:hidden items-center gap-2.5 mb-10">
          <div className="w-8 h-8 rounded-lg bg-[#002244] flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-[#002244] font-bold text-lg tracking-tight">
            Proximity <span className="text-teal-600">Clocker</span>
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <p className="text-teal-600 text-xs font-bold tracking-widest uppercase mb-2">
            Welcome back
          </p>
          <h1 className="text-[#002244] text-3xl font-extrabold leading-tight mb-2">
            Sign in to your account
          </h1>
          <p className="text-[#737373] text-sm leading-relaxed">
            Enter your credentials to access your attendance dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-red-50 ring-1 ring-red-100">
              <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-600 text-xs font-medium">{error}</p>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-[#002244] text-sm font-semibold"
            >
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="
                  w-full pl-10 pr-4 py-3
                  bg-white border border-[#e5e5e5] shadow-sm
                  rounded-[0.625rem] text-[#0a0a0a] text-sm
                  placeholder:text-[#737373]
                  focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]
                  transition-all duration-200
                "
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-[#002244] text-sm font-semibold"
              >
                Password
              </label>
              <a
                href="#"
                className="text-teal-600 hover:text-teal-700 text-xs font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="
                  w-full pl-10 pr-11 py-3
                  bg-white border border-[#e5e5e5] shadow-sm
                  rounded-[0.625rem] text-[#0a0a0a] text-sm
                  placeholder:text-[#737373]
                  focus:outline-none focus:ring-2 focus:ring-[#002244]/20 focus:border-[#002244]
                  transition-all duration-200
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#002244] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
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
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full flex items-center justify-center gap-2
              bg-[#002244] hover:bg-[#003366]
              text-white text-sm font-bold
              py-3.5 rounded-xl
              transition-all duration-200
              shadow-sm hover:shadow-md shadow-[#002244]/20
              disabled:opacity-60 disabled:cursor-not-allowed
              mt-2
            "
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Signing you in…
              </>
            ) : (
              <>
                Sign in
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-3">
          <div className="flex-1 h-px bg-[#e5e5e5]" />
          <span className="text-[#737373] text-xs font-medium">or</span>
          <div className="flex-1 h-px bg-[#e5e5e5]" />
        </div>

        {/* SSO placeholder */}
        <button
          type="button"
          className="
            w-full flex items-center justify-center gap-2.5
            border border-[#e5e5e5] hover:border-[#002244]/20
            bg-white hover:bg-[#f5f5f5]
            text-[#0a0a0a] text-sm font-medium
            py-3 rounded-[0.625rem] shadow-sm
            transition-all duration-200
          "
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Sign up link */}
        <p className="mt-8 text-center text-[#737373] text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#002244] font-semibold hover:text-teal-600 transition-colors">
            Request access
          </Link>
        </p>

        {/* Help link */}
        <p className="mt-4 text-center">
          <a
            href="#"
            className="text-[#737373] hover:text-[#0a0a0a] text-xs transition-colors"
          >
            Need help? Contact support
          </a>
        </p>

      </div>

      {/* Footer note */}
      <p className="mt-10 hidden lg:block text-center text-[#737373] text-xs">
        &copy; {new Date().getFullYear()} Proximity Clocker. All rights reserved.
      </p>
    </section>
  );
}
