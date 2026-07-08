"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/task-card";
import FetchTasksAction from "@/action/fetchTasks.action";

type Tasks = Awaited<ReturnType<typeof FetchTasksAction>>["result"];

type Task = Tasks[number];

interface AdminTaskPageProps {
    tasks: Task[]
}

export default function AdminTaskPage({tasks}: AdminTaskPageProps) {

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Task Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create, manage and monitor every task assigned to your team.
            </p>
          </div>

          <Button
            className="h-11 rounded-xl px-6"
          >
            <Link href="/admin/tasks/create" className="flex justify-center items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Link>
          </Button>

        </div>

        {/* Task List */}
        <div className="space-y-5">

          {tasks.length === 0 ? (
            <div className="flex h-80 flex-col items-center justify-center rounded-2xl border border-dashed bg-white">

              <h3 className="text-xl font-semibold">
                No Tasks Found
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Create your first task to start managing your team.
              </p>

              <Button
                className="mt-6 rounded-xl"
              >
                <Link href="/admin/tasks/create" className="flex justify-center items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </Link>
              </Button>

            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
              />
            ))
          )}

        </div>
      </div>
    </div>
  );
}