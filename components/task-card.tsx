"use client";

import { Clock3, Lightbulb, MessageCircle, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskPriority, TaskStatus } from "@/lib/generated/prisma/enums";
import { Task } from "@/lib/generated/prisma/client";
import { useEffect, useState } from "react";
import FetchTasksAction from "@/action/fetchTasks.action";
import { toast } from "sonner";
import { Button } from "./ui/button";
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

export default function TaskCard() {
  const [taskList, setTaskList] = useState<Task[]>([]);
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
        <div className="flex h-80 flex-col items-center justify-center rounded-2xl border border-dashed bg-white">
          <h3 className="text-xl font-semibold">No Tasks Found</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first task to start managing your team.
          </p>

          <Button className="mt-6 rounded-xl">
            <Link
              href="/admin/tasks/create"
              className="flex justify-center items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Link>
          </Button>
        </div>
      ) : (
        <Card className="rounded-2xl border-0 shadow-sm transition hover:shadow-md">
          <CardContent className="flex items-center justify-between gap-6 p-6">
            {taskList.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between gap-6"
              >
                {/* Task */}
                <div className="flex flex-1 items-start gap-5">
                  <div className="rounded-xl bg-blue-100 p-3">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-semibold">{task.title}</h3>

                      <Badge className={priorityStyles[task.priority]}>
                        {task.priority}
                      </Badge>

                      <Badge className={statusStyles[task.status]}>
                        {task.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2">
                  <Clock3 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
