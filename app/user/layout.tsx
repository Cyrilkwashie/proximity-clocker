import UserSidebar from "./_components/UserSidebar";
import UserTopbar from "./_components/UserTopbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f5]">
      <UserSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <UserTopbar />
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
