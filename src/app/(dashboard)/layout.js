import Sidebar from "@/features/dashboard/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto bg-gray-100">{children}</main>
    </div>
  );
}
