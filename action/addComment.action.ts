"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";
import { GetSessionAction } from "./getSession.action";

interface AddCommentActionProps {
  comment: string;
  taskId: string;
}

export async function AddCommentAction({
  comment,
  taskId,
}: AddCommentActionProps) {
  try {
   const { error , session } = await GetSessionAction();

   if(error){
    return { error };
   }

   if(!session){
    return { error: "Unable to fetch user details."}
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
            id: session?.user.id,
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
