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
    <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div>
           <BackButton />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s an overview of your workspace.
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          {/* Left Side */}
          <div className="min-w-0 space-y-6">
            <RecentProjectCard />

            <RecentTasksCard />
          </div>

          {/* Right Side */}
          <div>
            <Card className="rounded-2xl shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">
                  Quick Actions
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  Common workspace actions
                </p>
              </CardHeader>

              <CardContent className="space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link
                      key={action.title}
                      href={action.href}
                      className="group flex items-center gap-4 rounded-xl border bg-white p-4 transition-all hover:border-primary/30 hover:bg-slate-50 hover:shadow-sm"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                        <Icon className="h-5 w-5 text-[#036EFF]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-900">
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
          </div>
        </div>
      </div>
    </main>
  );
}
