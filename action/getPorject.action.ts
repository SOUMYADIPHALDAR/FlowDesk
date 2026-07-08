"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";

export default async function GetProjectAction(name: string) {
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
