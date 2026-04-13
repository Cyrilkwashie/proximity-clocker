import UserSidebar from "./_components/UserSidebar";
import UserTopbar from "./_components/UserTopbar";
import { ThemeLayout } from "../context/ThemeContext";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeLayout className="flex h-screen overflow-hidden bg-[#f5f5f5] dark:bg-[#0f172a]">
      <UserSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <UserTopbar />
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">{children}</main>
      </div>
    </ThemeLayout>
  );
}
