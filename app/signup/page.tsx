import type { Metadata } from "next";
import SignupFlow from "./SignupFlow";

export const metadata: Metadata = {
  title: "Create Account — Proximity Clocker",
  description: "Join Proximity Clocker and start tracking your attendance with GPS-based precision.",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4 lg:p-8">
      <SignupFlow />
    </main>
  );
}
