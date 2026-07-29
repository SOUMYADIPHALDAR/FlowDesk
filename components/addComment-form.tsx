"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AddCommentAction } from "@/action/addComment.action";

interface AddCommentFormProps {
  taskId: string;
}

export default function AddCommentForm({ taskId }: AddCommentFormProps) {
  const [comment, setComment] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setIsPending(true);
    try{
      const { error } = await AddCommentAction({ comment, taskId, parentId: null});
      if(error){
        toast.error(error);
      }
      toast.success("Comment added.");
      setComment("");
    }finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Add Comment</h3>

        <p className="text-sm text-muted-foreground">
          Share an update or leave feedback for this task.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          disabled={isPending}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending || !comment.trim()}>
            <SendHorizonal className="mr-2 h-4 w-4" />

            {isPending ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>
    </div>
  );
}
