import Link from "next/link";
import {
  ArrowRight,
  FolderPlus,
  ListPlus,
  UserPlus,
  Users,
} from "lucide-react";

import RecentProjectCard from "@/components/dashboard/recent-project-card";
import RecentTasksCard from "@/components/dashboard/tasks-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/back-button";

const quickActions = [
  {
    title: "Create Project",
    description: "Start a new project",
    href: "/admin/projects/create",
    icon: FolderPlus,
  },
  {
    title: "Create Task",
    description: "Add a new task",
    href: "/admin/tasks/create",
    icon: ListPlus,
  },
  {
    title: "Add User",
    description: "Add a team member",
    href: "/admin/users/create",
    icon: UserPlus,
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#dbeafe,_transparent_32%),linear-gradient(135deg,_#f8fbff_0%,_#f1f5f9_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex gap-4">
              <BackButton />
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5570F1]">
                  <Users className="size-3.5" />
                  Workspace overview
                </div>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0E2040] sm:text-4xl">
                  Dashboard
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Stay on top of the work your team is moving forward.
                </p>
              </div>
            </div>

            <Link
              href="/admin/projects/create"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#5570F1] px-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(85,112,241,0.28)] transition hover:-translate-y-0.5 hover:bg-[#4863ea] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#5570F1]/30"
            >
              <FolderPlus className="size-4" />
              New project
            </Link>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left Side */}
          <div className="min-w-0 space-y-6">
            <RecentProjectCard />

            <RecentTasksCard />
          </div>

          {/* Right Side */}
          <aside className="xl:sticky xl:top-6">
            <Card className="rounded-[24px] border-slate-200/80 bg-white/90 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-[#0E2040]">Quick Actions</CardTitle>

                <p className="text-sm text-muted-foreground">
                  Create and manage workspace essentials.
                </p>
              </CardHeader>

              <CardContent className="space-y-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link
                      key={action.title}
                      href={action.href}
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 transition-all hover:-translate-y-0.5 hover:border-[#5570F1]/30 hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F0FF]">
                        <Icon className="size-4.5 text-[#5570F1]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {action.title}
                        </p>

                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>

                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
