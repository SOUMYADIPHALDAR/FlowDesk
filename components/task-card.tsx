"use client";

import { Clock3, Lightbulb, MessageCircle, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskPriority, TaskStatus } from "@/lib/generated/prisma/enums";
import { Prisma} from "@/lib/generated/prisma/client";
import { useEffect, useState } from "react";
import {FetchTasksAction} from "@/action/fetchTasks.action";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Loading from "@/components/loading";

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
    assignee: {
      select: {
        name: true;
        image: true;
      };
    };
    _count: {
      select: {
        comments: true;
      };
    };
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
          toast.error("No tasks found..");
          return;
        }

        setTaskList(result);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {taskList.map((task) => (
            <Card
              key={task.id}
              className="mb-4 rounded-2xl shadow-sm transition hover:shadow-md duration-300 hover:-translate-y-1"
            >
              <CardContent className="flex items-center justify-between p-6 cursor-pointer">
                {/* Left Section */}
                <div className="flex items-center gap-5">
                  <div className="rounded-xl bg-blue-100 p-3">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{task.title}</h3>

                      <Badge className={priorityStyles[task.priority]}>
                        {task.priority}
                      </Badge>

                      <Badge className={statusStyles[task.status]}>
                        {task.status.replace("_", " ")}
                      </Badge>
                    </div>

                    {task.description && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 border">
                      <AvatarImage src={task.assignee?.image ?? ""} />
                      <AvatarFallback>
                        {task.assignee?.name?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>

                    {/* Desktop Only */}
                    <div className="hidden lg:block">
                      <p className="text-xs text-muted-foreground">
                        Assigned To
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        {task.assignee?.name ?? "Unassigned"}
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-2">
                    {/* Comment Count */}
                    <div className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2">
                      <MessageCircle className="h-4 w-4 text-slate-600" />

                      {/* Hide text on mobile */}
                      <span className="hidden md:inline text-sm font-medium text-slate-700">
                        {task._count.comments}
                      </span>
                    </div>

                    {/* Due Date */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="cursor-pointer rounded-lg bg-green-50 p-2 transition hover:bg-green-100">
                            <Clock3 className="h-5 w-5 text-green-600" />
                          </div>
                        </TooltipTrigger>

                        <TooltipContent>
                          {task.dueDate
                            ? task.dueDate.toLocaleDateString()
                            : "No due date"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Duration (Desktop Only) */}
                    <span className="hidden lg:inline font-medium text-green-700">
                      00 : 30 : 00
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
