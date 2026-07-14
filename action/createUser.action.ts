"use server";

import { GenerateEmployeeId } from "@/lib/employee/generateEmployeeId";
import { generateInvitationToken } from "@/lib/employee/generateInvitationToken";
import { sendEmail } from "@/lib/employee/sendEmail";
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

    const existingUser = await prisma.user.findUnique({
      where: { 
        email,
        role: "USER"
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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        joiningDate,
        phone,
        department,
        designation,

        employeeId,
        invitationToken,
        invitationExpires
      },
    });

    const activationLink = `http://localhost:3000/activate?token=${invitationToken}`;

    await sendEmail({
      email: user.email,
      employeeName: user.name,
      employeeId,
      designation,
      department,
      activationLink,
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error" };
  }
}
