"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { GetManyProjectsAction } from "@/action/getPorject.action";
import { toast } from "sonner";
import { TaskStatus } from "@/lib/generated/prisma/enums";

interface ProjectPerformanceData {
  id: string;
  name: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
}

export default function ProjectPerformanceChart() {
  const [loading, setLoading] = useState(false);
  const [projectPerformanceChart, setProjePerformanceChart] = useState<
    ProjectPerformanceData[]
  >([]);

  useEffect(() => {
    async function getProjectPerformance() {
      setLoading(true);
      try {
        const { error, result } = await GetManyProjectsAction();
        if (error) {
          toast.error(error);
          return;
        }
        if (!result) {
          toast.error("No data found");
          return;
        }
        const data = result.map((item) => {
          const totalTasks = item.tasks.length;

          const completedTasks = item.tasks.filter(
            (task) => task.status === TaskStatus.DONE,
          ).length;

          const progress =
            totalTasks === 0
              ? 0
              : Math.round((completedTasks / totalTasks) * 100);

          return {
            id: item.id,
            name: item.name,
            progress,
            totalTasks,
            completedTasks,
          };
        });

        setProjePerformanceChart(data);
      } finally {
        setLoading(false);
      }
    }
    getProjectPerformance();
  }, []);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Project Performance</CardTitle>

        <p className="text-sm text-muted-foreground">
          Task completion progress across projects.
        </p>
      </CardHeader>

      <CardContent>
        {projectPerformanceChart.length === 0 ? (
          <div className="flex h-[350px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No project data available.
            </p>
          </div>
        ) : (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectPerformanceChart}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip formatter={(value) => [`${value}%`, "Progress"]} />

                <Bar dataKey="progress" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
