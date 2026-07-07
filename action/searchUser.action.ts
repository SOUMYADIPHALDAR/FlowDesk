"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";

export default async function SearchUserAction(name: string) {
  try {
    const result = await prisma.user.findUnique({
      where: { name: name },
    });

    if (!result) {
      return { error: "No User found with this name." };
    }

    return { error: null, result };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error." };
  }
}
