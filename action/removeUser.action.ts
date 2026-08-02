"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";
import { GetSessionAction } from "./getSession.action";
import { revalidatePath } from "next/cache";

export default async function RemoveUserAction(id: string) {
  try {
    const { error, session } = await GetSessionAction();

    if (error || !session) {
      return { error: error ?? "Unauthorized access" };
    }

    if (session.user.role !== "ADMIN") {
      return { error: "Only administrators can delete users." };
    }

    if (session.user.id === id) {
      return { error: "You cannot delete your own account." };
    }

    await prisma.$transaction(async (tx) => {
      await tx.project.updateMany({
        where: { ownerId: id },
        data: { ownerId: session.user.id },
      });

      await tx.project.updateMany({
        where: { leaderId: id },
        data: { leaderId: session.user.id },
      });

      await tx.task.updateMany({
        where: { assigneeId: id },
        data: { assigneeId: null },
      });

      await tx.user.delete({
        where: { id },
      });
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/projects");
    revalidatePath("/admin/tasks");

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error" };
  }
}
