"use server";

import { TaskPriority, TaskStatus } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth";

export default async function FetchTasksAction() {
  try {
    const result = await prisma.task.findMany({
      include: {
        assignee: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            comments: true,
          }
        },
      },
    });

    return { error: null, result };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message, result: [] };
    }
    return { error: "Internel server error", result: [] };
  }
}
