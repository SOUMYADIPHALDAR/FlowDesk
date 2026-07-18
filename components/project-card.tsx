"use client";

import Link from "next/link";
import {
  CalendarDays,
  Users,
  UserRound,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProjectStatus, TaskStatus } from "@/lib/generated/prisma/enums";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { GetManyProjectsAction } from "@/action/getPorject.action";
import { toast } from "sonner";
import Image from "next/image";
import RemoveProjectAction from "@/action/removeProject.action";

interface ProjectCardProps {
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

export default function ProjectCard() {
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState<ProjectCardProps[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
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

  async function handleDelete(id: string) {
    setLoading(true);
    try{
      const { error} = await RemoveProjectAction(id);

      if(error){
        toast.error(error);
        return;
      }

      const newProjectList = projectList.filter((project) => project.id !== id);
      setProjectList(newProjectList);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {projectList.map((project) => (
            <Card
              key={project.id}
              className="rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative mx-6 mt-6 h-16 w-16 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="h-full w-full bg-slate-200" />
                )}
              </div>
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{project.name}</h2>

                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {project.description ?? "No description provided."}
                    </p>
                  </div>

                  <Badge>{project.status.replace("_", " ")}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>

                    <span>
                      {project.tasks.length === 0
                        ? 0
                        : Math.round(
                            (project.tasks.filter(
                              (task) => task.status === TaskStatus.DONE,
                            ).length /
                              project.tasks.length) *
                              100,
                          )}
                      %
                    </span>
                  </div>

                  <Progress
                    value={
                      project.tasks.length === 0
                        ? 0
                        : Math.round(
                            (project.tasks.filter(
                              (task) => task.status === TaskStatus.DONE,
                            ).length /
                              project.tasks.length) *
                              100,
                          )
                    }
                  />
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-muted-foreground" />
                    <span>{project.leader.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{project.members.length} Members</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {
                        project.tasks.filter(
                          (task) => task.status === TaskStatus.DONE,
                        ).length
                      }{" "}
                      / {project.tasks.length} Tasks Completed
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {project.startDate.toLocaleDateString()} -{" "}
                      {project.endDate.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Deadline: {project.endDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  <Link href={`/admin/projects/${project.id}`}>View</Link>
                </Button>

                <Button variant="secondary">Edit</Button>

                <Button
                  onClick={() => handleDelete(project.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
