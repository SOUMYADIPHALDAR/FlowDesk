"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth";
import { headers } from "next/headers";

export async function GetOneProjectAction(name: string) {
  try {
    if (!name) {
      return { error: "Enter a valid name." };
    }

    const result = await prisma.project.findUnique({
      where: {
        name,
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

export async function GetManyProjectsAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { error: "Unauthorized access.." };
    }

    const result = await prisma.project.findMany({
      where: {
        ownerId: session.user.id,
      },
      include: {
        leader: {
          select: {
            name: true,
          },
        },
        members: {
          select: {
            id: true,
          },
        },
        tasks: {
          select: {
            status: true,
          },
        },
      },
    });

    return { error: null, result };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error." };
  }
}
