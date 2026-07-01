"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { headers } from "next/headers";

export default async function SignInAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Enter your email." };

  const password = String(formData.get("password"));
  if (!password) return { error: "Enter your password." };

  try {
    const data = await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });
    return { error: null, data };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internel server error" };
  }
}
