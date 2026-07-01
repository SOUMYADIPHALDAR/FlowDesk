import Sidebar from "@/components/side-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-20 lg:w-72 border-r bg-white shadow-md shrink-0 sticky top-0 h-screen overflow-hidden">
        <Sidebar />
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
