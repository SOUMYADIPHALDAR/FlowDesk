"use client";

import { Clock3, Lightbulb, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskPriority, TaskStatus } from "@/lib/generated/prisma/enums";
import { Prisma } from "@/lib/generated/prisma/client";
import { useEffect, useState } from "react";
import { FetchTasksAction } from "@/action/fetchTasks.action";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Loading from "@/components/loading";
import Link from "next/link";

const statusStyles: Record<TaskStatus, string> = {
  PLANNING: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
  DELAYED: "bg-red-100 text-red-700",
};

const priorityStyles: Record<TaskPriority, string> = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-orange-100 text-orange-700",
  HIGH: "bg-red-100 text-red-700",
};

type TaskWithRelations = Prisma.TaskGetPayload<{
  include: {
    assignee: { select: { name: true; image: true } };
    _count: { select: { comments: true } };
  };
}>;

export default function TaskCard() {
  const [taskList, setTaskList] = useState<TaskWithRelations[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const { error, result } = await FetchTasksAction();
        if (error) {
          toast.error(error);
          return;
        }
        if (!result) {
          toast.error("No tasks found.");
          return;
        }
        setTaskList(result);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  if (loading) return <Loading />;

  if (taskList.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
          <div className="rounded-full bg-muted p-4">
            <Lightbulb className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold">No tasks to show</p>
            <p className="mt-1 text-sm text-muted-foreground">
              New tasks assigned to you will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {taskList.map((task) => (
        <Card
          key={task.id}
          className="rounded-2xl shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          <CardContent className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:p-6">
            <div className="flex min-w-0 items-start gap-3 sm:gap-5">
              <div className="shrink-0 rounded-xl bg-blue-100 p-3 dark:bg-blue-950/50">
                <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="break-words text-lg font-semibold">{task.title}</h3>
                  <Badge className={priorityStyles[task.priority]}>{task.priority}</Badge>
                  <Badge className={statusStyles[task.status]}>
                    {task.status.replace("_", " ")}
                  </Badge>
                </div>

                {task.description && (
                  <p className="mt-2 break-words text-sm text-muted-foreground">
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4 lg:shrink-0 lg:flex-nowrap lg:border-0 lg:pt-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 border">
                  <AvatarImage src={task.assignee?.image ?? ""} />
                  <AvatarFallback>{task.assignee?.name?.charAt(0) ?? "U"}</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-xs text-muted-foreground">Assigned To</p>
                  <p className="text-sm font-semibold">{task.assignee?.name ?? "Unassigned"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/admin/tasks/${task.id}/comments`}>
                  <div className="flex cursor-pointer items-center gap-1 rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/70">
                    <MessageCircle className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    <span className="hidden text-sm font-medium text-slate-700 md:inline dark:text-slate-200">
                      {task._count.comments}
                    </span>
                  </div>
                </Link>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="cursor-pointer rounded-lg bg-green-50 p-2 transition hover:bg-green-100 dark:bg-green-950/40 dark:hover:bg-green-950/60">
                        <Clock3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {task.dueDate ? task.dueDate.toLocaleDateString() : "No due date"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <span className="hidden whitespace-nowrap font-medium text-green-700 lg:inline dark:text-green-400">
                  00 : 30 : 00
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
