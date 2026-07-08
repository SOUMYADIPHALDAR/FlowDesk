"use server";

import prisma from "@/lib/prisma";
import { TaskSchema } from "@/lib/validations/taskSchema";
import { APIError } from "better-auth";

interface CreateTaskActionProps {
  projectId: string;
  assigneeId: string;
  endDate: Date | null;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export default async function CreateTaskAction(data: CreateTaskActionProps) {
  const validation = TaskSchema.safeParse(data);
  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
    };
  }

  try {
    const {
      projectId,
      assigneeId,
      dueDate,
      title,
      description,
      status,
      priority,
    } = validation.data;
    await prisma.task.create({
      data: {
        projectId,
        assigneeId,
        dueDate,
        title,
        description,
        status,
        priority,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error" };
  }
}
