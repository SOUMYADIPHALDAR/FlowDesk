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
import { ProjectStatus } from "@/lib/generated/prisma/enums";
import { useState } from "react";
import Loading from "./loading";
import { Project } from "@/lib/generated/prisma/client";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;

  leader: {
    name: string;
  };

  membersCount: number;

  totalTasks: number;
  completedTasks: number;

  startDate: Date;
  endDate: Date;
}

export default function ProjectCard({
  id,
  name,
  description,
  status,
  leader,
  membersCount,
  totalTasks,
  completedTasks,
  startDate,
  endDate,
}: ProjectCardProps) {
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState<ProjectCardProps[]>([]);

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {projectList.map((project) => (
            <Card className="rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{name}</h2>

                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>

                  <Badge>{status.replace("_", " ")}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>

                    <span>{progress}%</span>
                  </div>

                  <Progress value={progress} />
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-muted-foreground" />
                    <span>{leader.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{membersCount} Members</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {completedTasks} / {totalTasks} Tasks Completed
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {startDate.toLocaleDateString()} -{" "}
                      {endDate.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-muted-foreground" />
                    <span>Deadline: {endDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  <Link href={`/admin/projects/${id}`}>View</Link>
                </Button>

                <Button variant="secondary">Edit</Button>

                <Button variant="destructive">Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
