"use server";

import prisma from "@/lib/prisma";
import { CreateUserSchema } from "@/lib/validations/createUserSchema";
import { APIError } from "better-auth";

interface CreateUserActionProps {
  name: string;
  email: string;
  joiningDate: Date;
  phone: string;
  designation: string;
  department: string;
}

export default async function CreateUserAction(data: CreateUserActionProps) {
  try {
    const validation = CreateUserSchema.safeParse(data);
    if (!validation.success) {
      return {
        error: validation.error.issues[0].message,
      };
    }

    const { name, email, joiningDate, phone, designation, department } =
      validation.data;

    await prisma.user.create({
      data: {
        name,
        email,
        joiningDate,
        phone,
        department,
        designation,
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
