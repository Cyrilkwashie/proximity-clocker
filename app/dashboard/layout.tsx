import type { Metadata } from "next";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

export const metadata: Metadata = {
  title: "Dashboard | Proximity Clocker",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f5f5f5] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
