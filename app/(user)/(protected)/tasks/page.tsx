import { FetchTasksAction } from "@/action/fetchTasks.action";
import BackButton from "@/components/back-button";
import ErrorCard from "@/components/error-card";
import TaskCard from "@/components/task-card";
import { ClipboardList } from "lucide-react";

export default async function UserTasksPage() {
  const { error, result } = await FetchTasksAction();

  if (error) {
    return (
      <ErrorCard
        title="Unable to load tasks"
        message={error}
        retryHref="/tasks"
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <header className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          <BackButton />

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                  <ClipboardList className="h-6 w-6 text-primary" />
                </div>

                <div className="min-w-0">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    My Tasks
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    View, track, and manage all tasks assigned to you.
                  </p>
                </div>
              </div>

              <div className="w-fit rounded-xl border bg-muted/40 px-4 py-2.5 sm:text-right">
                <p className="text-xs font-medium text-muted-foreground">
                  Total Tasks
                </p>
                <p className="text-2xl font-bold leading-tight">12</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Assigned Tasks</h2>
          <span className="text-sm text-muted-foreground">
            Sorted by due date
          </span>
        </div>

        <TaskCard taskList={result} />
      </section>
    </div>
  );
}
