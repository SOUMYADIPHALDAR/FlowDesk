"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";

export async function FetchTasksAction() {
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
          },
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

export async function FetchTaskStatusAnalytics() {
  try {
    const result = await prisma.task.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    });

    const data = result.map((item) => ({
      status: item.status,
      count: item._count._all,
    }));

    return { error: null, data };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error" };
  }
}
