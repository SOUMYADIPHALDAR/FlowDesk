"use client";

import Link from "next/link";
import { CalendarDays, Users, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { ProjectStatus, TaskStatus } from "@/lib/generated/prisma/enums";
import { useEffect, useState } from "react";
import Loading from "./loading";
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
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {projectList.map((project) => (
            <Card
              key={project.id}
              className="rounded-2xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="space-y-5 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{project.name}</h2>

                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <Badge>{project.status.replace("_", " ")}</Badge>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Priority</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Leader</p>

                    <p className="mt-1 font-medium">{project.leader.name}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />

                    <span>{project.members.length} Members</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />

                    <span>{project.endDate.toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end">
                  <Button variant="ghost" className="gap-2">
                    <Link href={`/admin/projects/${project.id}`}>
                      View Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
