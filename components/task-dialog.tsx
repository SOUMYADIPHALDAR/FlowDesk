"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Flag, MessageCircle, User } from "lucide-react";
import { Prisma } from "@/lib/generated/prisma/client";
import { TaskPriority, TaskStatus } from "@/lib/generated/prisma/enums";
import AddCommentForm from "./addComment-form";

const statusStyles: Record<TaskStatus, string> = {
  PLANNING: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
  DELAYED: "bg-red-100 text-red-700",
};

const priorityStyles: Record<TaskPriority, string> = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-orange-100 text-orange-700",
  HIGH: "bg-red-100 text-red-700",
};

type TaskWithRelations = Prisma.TaskGetPayload<{
  include: {
    assignee: {
      select: {
        name: true;
        image: true;
      };
    };
    project: {
      select: {
        name: true;
      };
    };
    _count: {
      select: {
        comments: true;
      };
    };
  };
}>;

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  task: TaskWithRelations | null;
}

export default function TaskDialog({
  open,
  onClose,
  task,
}: TaskDialogProps) {
  if (!task) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {task.title}
          </DialogTitle>

          <DialogDescription>
            Task information and progress.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge className={statusStyles[task.status]}>
              {task.status.replace("_", " ")}
            </Badge>

            <Badge className={priorityStyles[task.priority]}>
              {task.priority}
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-5 md:grid-cols-2">

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Assigned To
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={task.assignee?.image ?? ""} />
                    <AvatarFallback>
                      {task.assignee?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <span className="font-medium">
                    {task.assignee?.name ?? "Unassigned"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Flag className="h-5 w-5 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Project
                </p>

                <p className="font-medium">
                  {task.project?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Due Date
                </p>

                <p className="font-medium">
                  {task.dueDate
                    ? task.dueDate.toLocaleDateString()
                    : "No due date"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Comments
                </p>

                <p className="font-medium">
                  {task._count.comments}
                </p>
              </div>
            </div>

          </div>

          <Separator />

          <div>
            <h3 className="mb-2 font-semibold">
              Description
            </h3>

            <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
              {task.description || "No description provided."}
            </p>
          </div>

          <Separator />

          {/* Replace these with your components */}
          {/* <TaskComments taskId={task.id} /> */}

          <AddCommentForm taskId={task.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}