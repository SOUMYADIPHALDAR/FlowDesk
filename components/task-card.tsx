"use client";

import {
  Clock3,
  Lightbulb,
  MessageCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskPriority, TaskStatus } from "@/lib/generated/prisma/enums";

interface TaskCardProps {
  id: string;
  title: string;
  createdAt: Date;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: {
    name: string;
    image?: string | null;
  } | null;
}

const statusStyles = {
  TODO: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

const priorityStyles = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-orange-100 text-orange-700",
  HIGH: "bg-red-100 text-red-700",
};

export default function TaskCard({
  id,
  title,
  createdAt,
  priority,
  status,
  assignee,
}: TaskCardProps) {
  return (
    <Card className="rounded-2xl border-0 shadow-sm transition hover:shadow-md">
      <CardContent className="flex items-center justify-between gap-6 p-6">

        {/* Left */}
        <div className="flex flex-1 items-start gap-5">

          <div className="rounded-xl bg-blue-100 p-3">
            <Lightbulb className="h-6 w-6 text-blue-600" />
          </div>

          <div className="space-y-2">

            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-base font-semibold">
                {title}
              </h3>

              <Badge
                className={priorityStyles[priority]}
              >
                {priority}
              </Badge>

              <Badge
                className={statusStyles[status]}
              >
                {status.replace("_", " ")}
              </Badge>
            </div>
          </div>

        </div>

        {/* Timer */}

        <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2">

          <Clock3 className="h-5 w-5 text-green-600" />

        </div>

        {/* Assignee */}

        <Avatar className="h-11 w-11">
          <AvatarImage src={assignee?.image ?? ""} />
          <AvatarFallback>
            {assignee?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

      </CardContent>
    </Card>
  );
}