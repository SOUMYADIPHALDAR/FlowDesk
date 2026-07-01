import Sidebar from "@/components/side-bar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="w-20 lg:w-72 border-r bg-white shadow-md fixed top-0 left-0 h-screen overflow-hidden z-10">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 ml-20 lg:ml-72">
        {children}
      </main>
    </div>
  );
}
