"use client";

import { MessageSquare, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import FetchCommentsAction from "@/action/fetchComments.action";
import { toast } from "sonner";
import Loading from "@/components/loading";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface Comment {
  id: string;
  body: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    image: string | null;
    role: string;
  };
}

export default function CommentsCard({ taskId }: { taskId: string }) {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getComments() {
      setLoading(true);

      try {
        const { error, result } = await FetchCommentsAction(taskId);

        if (error) {
          toast.error(error);
          return;
        }

        if (!result) {
          toast.error("No comments found");
          return;
        }

        setCommentList(result);
      } finally {
        setLoading(false);
      }
    }

    void getComments();
  }, [taskId]);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments ({commentList.length})
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <Loading />
        ) : commentList.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-sm text-muted-foreground">No comments yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {commentList.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-4 border-b pb-5 last:border-none last:pb-0"
              >
                <Avatar size="lg" className="shrink-0">
                  <AvatarImage
                    src={comment.author.image ?? undefined}
                    alt={`${comment.author.name}'s profile picture`}
                  />
                  <AvatarFallback>
                    {comment.author.name
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{comment.author.name}</h4>

                      <p className="text-xs text-muted-foreground">
                        {comment.author.role} •{" "}
                        {formatDistanceToNow(comment.createdAt, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>

                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                    {comment.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
