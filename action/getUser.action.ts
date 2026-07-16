"use server";

import prisma from "@/lib/prisma";
import { APIError } from "better-auth";

export default async function GetUser(id: string) {
  try {
    const result = await prisma.user.findUnique({
      where: { id },
    });

    return { error: null, result };
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    return { error: "Internal server error" };
  }
}

export async function GetAllUser() {
  try {
    const result = await prisma.user.findMany({
      where: { role: "USER" },
    });

    return { error: null, result };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error" };
  }
}
