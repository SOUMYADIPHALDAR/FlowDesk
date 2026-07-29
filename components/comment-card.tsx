"use client";

import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Reply, Pencil, Trash2 } from "lucide-react";

import { CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/lib/generated/prisma/enums";
import { useEffect, useState } from "react";
import ReplyForm from "./reply-comment-card";

interface CommentWithRelations {
  id: string;
  body: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    image: string | null;
    role: string;
  };
  taskId: string;
}

interface User {
  id?: string;
  name?: string | null;
  role?: UserRole | string | null;
}

interface CommentCardProps {
  comment: CommentWithRelations;
  currentUser: User;
  isReply?: boolean;
}

export default function CommentsCard({
  comment,
  currentUser,
  isReply = false,
}: CommentCardProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const updateRelativeTime = () => {
      setRelativeTime(formatDistanceToNow(comment.createdAt, { addSuffix: true }));
    };

    updateRelativeTime();
    const intervalId = window.setInterval(updateRelativeTime, 60_000);

    return () => window.clearInterval(intervalId);
  }, [comment.createdAt]);

  const isAuthor = currentUser?.id === comment.author.id;

  const permissions = {
    canReply: currentUser?.id !== comment.author.id,
    canEdit: isAuthor,
    canDelete: isAuthor,
  };

  const showMenu = permissions.canEdit || permissions.canDelete;

  return (
    <CardContent>
      <div className="flex gap-4 border-b pb-5 last:border-none last:pb-0">
        <Avatar className="h-11 w-11 shrink-0">
          <AvatarImage src={comment.author.image ?? ""} />

          <AvatarFallback>
            {(comment.author.name ?? "")
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((word) => word[0])
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
                <span suppressHydrationWarning>{relativeTime}</span>
              </p>
            </div>

            {showMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  }
                />

                <DropdownMenuContent align="end">
                  {permissions.canEdit && (
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  )}

                  {permissions.canDelete && (
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <p
            className={`mt-3 whitespace-pre-wrap text-sm font-medium leading-6 ${
              isReply ? "text-primary" : "text-foreground"
            }`}
          >
            {comment.body}
          </p>

          <div className="mt-4 flex items-center gap-2">
            {permissions.canReply && (
              <>
                {replyingTo !== comment.id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(comment.id)}
                  >
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                )}

                {replyingTo === comment.id && (
                  <ReplyForm
                    taskId={comment.taskId}
                    parentId={comment.id}
                    onCancel={() => setReplyingTo(null)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  );
}
