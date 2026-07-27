"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth";
import { headers } from "next/headers";

export async function FetchTasksAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Unauthorized access.", result: [] };
    }

    const result = await prisma.task.findMany({
      where:
        session.user.role === "ADMIN"
          ? undefined
          : {
              OR: [
                { project: { ownerId: session.user.id } },
                {
                  project: {
                    members: {
                      some: { userId: session.user.id },
                    },
                  },
                },
              ],
            },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
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
    console.error("Failed to fetch tasks:", err);

    if (err instanceof APIError) {
      return { error: err.message, result: [] };
    }
    return { error: "Internal server error", result: [] };
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
