import { BarChart3, ChartNoAxesCombined } from "lucide-react";

import BackButton from "@/components/back-button";
import ProjectPerformanceChart from "@/components/analytics/project-performance-chart";
import TaskStatusChart from "@/components/analytics/task-status-card";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#dbeafe,_transparent_32%),linear-gradient(135deg,_#f8fbff_0%,_#f1f5f9_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur sm:p-7">
          <div className="flex items-start gap-4">
            <BackButton />

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5570F1]">
                <ChartNoAxesCombined className="size-3.5" />
                Workspace insights
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0E2040] sm:text-4xl">
                Analytics
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Track task distribution and project progress across your workspace.
              </p>
            </div>
          </div>
        </header>

        <section aria-labelledby="analytics-overview" className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <BarChart3 className="size-4 text-[#5570F1]" />
            <h2 id="analytics-overview" className="text-sm font-semibold text-slate-700">
              Performance overview
            </h2>
          </div>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
            <ProjectPerformanceChart />
            <TaskStatusChart />
          </div>
        </section>
      </div>
    </main>
  );
}
