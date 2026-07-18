"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";

export default async function RemoveProjectAction(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return {
        error: "No project found",
      };
    }

    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error" };
  }
}
