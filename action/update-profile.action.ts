"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth";
import { headers } from "next/headers";

interface UpdateProfileProps {
  phone?: string;
  jobRole?: string;
  address?: string;
  image?: string;
}

export default async function UpdateProfileAction(data: UpdateProfileProps) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { error: "Unauthorized access.." };
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        phone: data.phone || undefined,
        jobRole: data.jobRole || undefined,
        address: data.address || undefined,
        image: data.image || undefined,
      },
    });

    return { error: null, data: updatedUser };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error.." };
  }
}
