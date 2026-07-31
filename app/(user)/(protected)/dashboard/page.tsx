import { LayoutDashboard, Sparkles } from "lucide-react";

import RecentProjectCard from "@/components/dashboard/recent-project-card";
import RecentTasksCard from "@/components/dashboard/tasks-card";

export default function UserDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">
      <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-7 sm:py-8">
        <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -bottom-24 right-24 h-44 w-44 rounded-full bg-indigo-100/70 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#5570F1] text-white shadow-[0_10px_24px_rgba(85,112,241,0.28)]">
              <LayoutDashboard className="size-6" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5570F1]">
                <Sparkles className="size-3.5" />
                My workspace
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                See your latest projects and tasks at a glance, and keep your work moving forward.
              </p>
            </div>
          </div>

          <p className="rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2 text-sm font-medium text-[#3552c8]">
            Your work, in focus
          </p>
        </div>
      </header>

      <div className="grid items-start gap-6">
        <RecentProjectCard />
        <RecentTasksCard />
      </div>
    </div>
  );
}
