import type { Metadata } from "next";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";

export const metadata: Metadata = {
  title: "Sign In — Proximity Clocker",
  description: "Sign in to your Proximity Clocker account to manage attendance across all your branches.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-6xl min-h-[600px] flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-sm ring-1 ring-[#e5e5e5]">
        {/* Left — branding panel */}
        <LoginLeft />
        {/* Right — auth panel */}
        <LoginRight />
      </div>
    </main>
  );
}
