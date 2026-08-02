"use server";

import { auth } from "@/lib/auth";
import { UserRole } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth";

export default async function RegisterAction(formData: FormData) {
  const name = String(formData.get("name"));
  if (!name) return { error: "Enter your name." };

  const email = String(formData.get("email"));
  if (!email) return { error: "Enter your email." };

  const password = String(formData.get("password"));
  if (!password) return { error: "Enter your password." };

  try {
    const userCount = await prisma.user.count();

   if(userCount > 0){
    return {
      error: "Registration has been disabled. Contact your administrator."
    }
   }

    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    await prisma.user.update({
      where: { id: result.user.id},
      data: {
        role: UserRole.ADMIN
      }
    });
    
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error." };
  }
}
