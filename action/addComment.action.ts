"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth";
import { connect } from "http2";
import { headers } from "next/headers";

interface AddCommentActionProps {
  comment: string;
  taskId: string;
}

export async function AddCommentAction({
  comment,
  taskId,
}: AddCommentActionProps) {
  try {
    const data = await auth.api.getSession({
      headers: await headers(),
    });

    if (!data) {
      return { error: "Unauthorized access" };
    }

    await prisma.comment.create({
      data: {
        body: comment,
        task: {
          connect: {
            id: taskId,
          },
        },
        author: {
          connect: {
            id: data?.user.id,
          },
        },
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
