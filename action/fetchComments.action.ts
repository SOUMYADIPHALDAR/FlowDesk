"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";

export default async function FetchCommentsAction(taskId: string) {
  try {
    const result = await prisma.comment.findMany({
      where: { taskId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
          },
        },
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
