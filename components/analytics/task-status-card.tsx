"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";

import { FetchTaskStatusAnalytics } from "@/action/fetchTasks.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskStatus } from "@/lib/generated/prisma/enums";

interface TaskStatusData {
  status: TaskStatus;
  count: number;
}

const STATUS_COLORS: Record<TaskStatus, string> = {
  [TaskStatus.PLANNING]: "#94a3b8",
  [TaskStatus.IN_PROGRESS]: "#3b82f6",
  [TaskStatus.DONE]: "#22c55e",
  [TaskStatus.DELAYED]: "#f59e0b",
};

function formatStatus(status: TaskStatus) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function TaskStatusChart() {
  const [loading, setLoading] = useState(false);
  const [taskChart, setTaskChart] = useState<TaskStatusData[]>([]);

  useEffect(() => {
    async function getTaskStatus() {
      setLoading(true);
      try {
        const { error, data } = await FetchTaskStatusAnalytics();
        if (error) {
          toast.error(error);
          return;
        }
        if (!data) {
          toast.error("No data found");
          return;
        }
        setTaskChart(data);
      } finally {
        setLoading(false);
      }
    }
    getTaskStatus();
  }, []);

  const totalTasks = taskChart.reduce((total, item) => total + item.count, 0);

  return (
    <Card className="rounded-2xl border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle>Task Status</CardTitle>
        <CardDescription>
          Distribution of tasks by current status.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_9rem] md:items-center">
            <Skeleton className="mx-auto size-44 rounded-full" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ) : totalTasks === 0 ? (
          <div className="flex h-52 items-center justify-center rounded-xl border border-dashed bg-muted/30">
            <p className="text-sm text-muted-foreground">
              No task data available.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_9rem] md:items-center">
            <div className="relative mx-auto h-52 w-full max-w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskChart}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={86}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {taskChart.map((item) => (
                      <Cell key={item.status} fill={STATUS_COLORS[item.status]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} tasks`,
                      formatStatus(name as TaskStatus),
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-2xl font-semibold tracking-tight">{totalTasks}</p>
                <p className="text-xs font-medium text-muted-foreground">Total tasks</p>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-1.5 md:grid-cols-1" aria-label="Task status breakdown">
              {taskChart.map((item) => {
                const percentage = Math.round((item.count / totalTasks) * 100);

                return (
                  <li
                    key={item.status}
                    className="rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1.5"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: STATUS_COLORS[item.status] }}
                      />
                      <span className="truncate">{formatStatus(item.status)}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold tabular-nums">
                      {item.count}{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        ({percentage}%)
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
