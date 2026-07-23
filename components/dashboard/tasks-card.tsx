"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskPriority, TaskStatus } from "@/lib/generated/prisma/enums";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import {FetchTasksAction} from "@/action/fetchTasks.action";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;

  assignee: {
    name: string;
  } | null;
}

export default function RecentTasksCard() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const recentTasks = tasksList.slice(0, 3);

  useEffect(() => {
    async function GetTasks() {
        setLoading(true);
        try{
            const { error, result} = await FetchTasksAction();
            if(error){
                toast.error(error);
            }
            if(!result){
                toast.error("No tasks found");
            }
            setTasksList(result);
        } finally {
            setLoading(false);
        }
    }
    GetTasks();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Card className="rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Tasks</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Latest tasks in your workspace
              </p>
            </div>

            <Button variant="ghost" size="sm">
              <Link href="/admin/tasks">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
            {recentTasks.length === 0 ? (
              <div className="flex min-h-40 flex-col items-center justify-center">
                <CheckCircle2 className="mb-3 h-8 w-8 text-muted-foreground" />

                <p className="text-sm text-muted-foreground">No tasks found.</p>
              </div>
            ) : (
              <div className="divide-y">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    {/* Task Information */}

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/admin/tasks/${task.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {task.title}
                      </Link>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span>{task.assignee?.name ?? "Unassigned"}</span>

                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />

                            {task.dueDate.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status + Priority */}

                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary">
                        {task.status.replaceAll("_", " ")}
                      </Badge>

                      <span className="text-xs text-muted-foreground">
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
