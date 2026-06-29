"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";

export default async function RegisterAction(formData: FormData) {
  const name = String(formData.get("name"));
  if (!name) return { error: "Enter your name." };

  const email = String(formData.get("email"));
  if (!email) return { error: "Enter your email." };

  const password = String(formData.get("password"));
  if (!password) return { error: "Enter your password." };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal server error." };
  }
}
