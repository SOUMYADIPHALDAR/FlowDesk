"use client";

import { useState } from "react";
import { Loader2, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AddCommentAction } from "@/action/addComment.action";
import { toast } from "sonner";

interface ReplyFormProps {
  parentId: string;
  taskId: string;
  onCancel: () => void;
}

export default function ReplyForm({
  parentId,
  taskId,
  onCancel,
}: ReplyFormProps) {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const { error } = await AddCommentAction({
        comment: reply,
        parentId,
        taskId,
      });
      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Replied successfully.");
      setReply("");
      onCancel();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 rounded-lg border bg-muted/30 p-4">
      <Textarea
        placeholder="Write your reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        rows={3}
      />

      <div className="mt-3 flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>

        <Button onClick={handleSubmit} disabled={loading || !reply.trim()}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Replying...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Reply
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
