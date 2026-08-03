import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/task-card";
import BackButton from "@/components/back-button";
import { FetchTasksAction } from "@/action/fetchTasks.action";
import ErrorCard from "@/components/error-card";

export default async function AdminTaskPage() {
  const { error, result } = await FetchTasksAction();

  if (error) {
    <ErrorCard
      title="Unable to load tasks"
      message={error}
      retryHref="/admin/tasks"
    />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <BackButton />
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Task Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create, manage and monitor every task assigned to your team.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="h-11 rounded-xl px-6">
              <Link
                href="/admin/tasks/create"
                className="flex items-center justify-center"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Link>
            </Button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-5">
          <TaskCard taskList={result ?? []} />
        </div>
      </div>
    </div>
  );
}
