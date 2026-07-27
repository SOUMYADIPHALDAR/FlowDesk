import BackButton from "@/components/back-button";
import CommentsCard from "@/components/comment-card";
import { MessageSquare } from "lucide-react";

interface CommentsPageProps {
  params: Promise<{
    taskId: string;
  }>;
}

export default function CommentsPage({
  taskId,
}: {
  taskId: string;
}) {
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      {/* Header */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <BackButton />
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Task Comments
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View and participate in discussions related to this task.
            </p>
          </div>
        </div>
      </div>

      {/* Comments */}
      <CommentsCard taskId={taskId} />
    </div>
  );
}
