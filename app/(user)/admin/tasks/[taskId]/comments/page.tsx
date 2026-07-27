import CommentsCard from "@/components/comment-card";

interface CommentsPageProps {
  params: Promise<{
    taskId: string;
  }>;
}

export default async function CommentsPage({ params }: CommentsPageProps) {
  const { taskId } = await params;

  return (
    <div>
      Comments
      <CommentsCard taskId={taskId} />
    </div>
  );
}
