import FetchCommentsAction from "@/action/fetchComments.action";
import { GetSessionAction } from "@/action/getSession.action";
import BackButton from "@/components/back-button";
import CommentsCard from "@/components/comment-card";
import ErrorCard from "@/components/error-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default async function CommentsPage({ taskId }: { taskId: string }) {
  const { error, result } = await FetchCommentsAction(taskId);
  const data = await GetSessionAction();

  const user = {
    id: data?.session?.user.id,
    name: data?.session?.user.name,
    role: data?.session?.user.role
  }

  if (error) {
    return (
      <ErrorCard
        title="Unable to load comments"
        message={error}
        retryHref="/comments"
      />
    );
  }

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
            <h1 className="text-3xl font-bold tracking-tight">Task Comments</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View and participate in discussions related to this task.
            </p>
          </div>
        </div>
      </div>

      {/* Comments */}
      <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments ({result?.length})
        </CardTitle>
      </CardHeader>
      {result?.map((comment) => 
        <CommentsCard key={comment.id} comment={comment} currentUser={user} />
      )}
      </Card>
    </div>
  );
}
