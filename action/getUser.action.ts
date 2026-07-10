"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";

export default async function GetUser(id: string) {
  try {
    const result = await prisma.user.findUnique({
      where: {id}
    })

    return { error: null, result };
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    return { error: "Internal server error" };
  }
}
