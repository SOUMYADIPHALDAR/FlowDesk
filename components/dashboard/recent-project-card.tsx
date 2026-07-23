"use client";

import Link from "next/link";
import { CalendarDays, CheckCircle2, Users, ArrowRight } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { ProjectStatus, TaskStatus } from "@/lib/generated/prisma/enums";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { GetManyProjectsAction } from "@/action/getPorject.action";
import { toast } from "sonner";

interface RecentProjectCardProps {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  image?: string | null;

  leader: {
    name: string;
  };

  startDate: Date;
  endDate: Date;

  members: { id: string }[];
  tasks: { status: TaskStatus }[];
}

export default function RecentProjectCard() {
  const [projectList, setProjectList] = useState<RecentProjectCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);

      try {
        const { error, result } = await GetManyProjectsAction();

        if (error) {
          toast.error(error);
          return;
        }

        if (!result) {
          toast.error("No projects found.");
          return;
        }

        setProjectList(result);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-slate-900">Recent projects</p>
              <p className="mt-1 text-sm text-muted-foreground">
                A quick view of your team&apos;s active work.
              </p>
            </div>

            <Link
              href="/admin/projects"
              className="inline-flex h-7 shrink-0 items-center gap-2 rounded-lg px-2.5 text-[0.8rem] font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projectList.slice(0, 3).map((project) => {
            const completedTasks = project.tasks.filter(
              (task) => task.status === TaskStatus.DONE,
            ).length;
            const progress = project.tasks.length
              ? Math.round((completedTasks / project.tasks.length) * 100)
              : 0;

            return (
            <Card
              key={project.id}
              className="overflow-hidden rounded-2xl border-slate-200 shadow-none transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="grid gap-4 p-5">
                <div className="grid grid-cols-[auto_1fr] items-start gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-200" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="truncate text-base font-semibold text-slate-900">
                        {project.name}
                      </h2>
                      <Badge className="shrink-0">{project.status.replace("_", " ")}</Badge>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                      {project.description ?? "No description provided."}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="grid grid-cols-[1fr_auto] text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-slate-700">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Leader</p>
                    <p className="mt-1 truncate font-medium">{project.leader.name}</p>
                  </div>

                  <div className="grid grid-cols-[auto_1fr] items-center gap-2 self-end">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{project.members.length} Members</span>
                  </div>

                  <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <span>{completedTasks}/{project.tasks.length} done</span>
                  </div>

                  <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>{project.endDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            );
          })}
          </div>
        </div>
      )}
    </section>
  );
}
