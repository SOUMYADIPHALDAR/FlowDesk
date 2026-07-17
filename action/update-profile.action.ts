"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UpdateUserSchema } from "@/lib/validations/updateUserSchema";
import { APIError } from "better-auth";
import { headers } from "next/headers";

interface UpdateProfileProps {
  name?: string;
  phone?: string;
  designation?: string;
  address?: string;
  image?: string;
}

export default async function UpdateProfileAction(data: UpdateProfileProps) {
  try {
    const validation = UpdateUserSchema.safeParse(data);
    if (!validation.success) {
      return { error: validation.error.issues[0].message };
    }

    const { name, phone, designation, address, image } = validation.data;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { error: "Unauthorized access.." };
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || undefined,
        phone: phone || undefined,
        designation: designation || undefined,
        address: address || undefined,
        image: image || undefined,
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
