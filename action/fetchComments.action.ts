"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";

export default async function FetchCommentsAction(taskId: string) {
  try {
    const result = await prisma.comment.findMany({
  where: {
    taskId,
    parentId: null,
  },
  include: {
    author: true,
    replies: {
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    },
  },
  orderBy: {
    createdAt: "asc",
  },
});

    return { error: null, result };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error" };
  }
}
