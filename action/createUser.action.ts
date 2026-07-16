"use server";

import { GenerateEmployeeId } from "@/lib/employee/generateEmployeeId";
import { generateInvitationToken } from "@/lib/employee/generateInvitationToken";
import { sendEmail } from "@/lib/employee/sendEmail";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateUserSchema } from "@/lib/validations/createUserSchema";
import { Prisma } from "@/lib/generated/prisma/client";
import { APIError } from "better-auth";
import { headers } from "next/headers";

interface CreateUserActionProps {
  name: string;
  email: string;
  joiningDate: Date;
  phone?: string;
  designation: string;
  department: string;
}

export default async function CreateUserAction(data: CreateUserActionProps) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user || session.user.role !== "ADMIN") {
      return { error: "Only administrators can create users." };
    }

    const validation = CreateUserSchema.safeParse(data);
    if (!validation.success) {
      return {
        error: validation.error.issues[0].message,
      };
    }

    const { name, email, joiningDate, phone, designation, department } =
      validation.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        error: "A user already exists with this email.",
      };
    }

    const employeeId = await GenerateEmployeeId();
    const invitationToken = generateInvitationToken();
    const invitationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

   await prisma.user.create({
    data: {
      name,
      email,
      employeeId,
      phone,
      designation,
      department,
      joiningDate,
      invitationToken,
      invitationExpires,
      role: "USER",
      emailVerified: false
    }
   })

    const appUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
    const activationLink = `${appUrl.replace(/\/$/, "")}/activate?token=${invitationToken}`;

    try {
      await sendEmail({
        email,
        employeeName: name,
        employeeId,
        joiningDate,
        designation,
        department,
        activationLink,
      });
    } catch (error) {
      console.error("Invitation email delivery failed:", error);
      return {
        error: null,
        warning:
          "User was created, but the invitation email could not be sent. Check the email settings and resend the invitation.",
      };
    }

    return { error: null };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return { error: "A user already exists with this email or employee ID." };
    }
    if (err instanceof APIError) {
      return { error: err.message };
    }
    console.error("Unable to create user:", err);
    return { error: "Internal server error" };
  }
}
