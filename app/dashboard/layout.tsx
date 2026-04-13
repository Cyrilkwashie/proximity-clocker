import type { Metadata } from "next";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";
import { ThemeLayout } from "../context/ThemeContext";

export const metadata: Metadata = {
  title: "Dashboard | Proximity Clocker",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeLayout className="flex h-screen bg-[#f5f5f5] dark:bg-[#0f172a] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </ThemeLayout>
  );
}
