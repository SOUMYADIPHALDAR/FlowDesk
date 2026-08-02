"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";

export default async function UpdateUserAction(id: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        role: "ADMIN",
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internel server error" };
  }
}
