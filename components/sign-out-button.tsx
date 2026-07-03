"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

export default function SignOutButton() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { setSession } = useAuth()

  async function handleClick () {
    await signOut({
        fetchOptions: {
            onRequest: () => {
                setIsPending(true);
            },
            onResponse: () => {
                setIsPending(false);
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
            },
            onSuccess: () => {
                setSession(null);
                router.push("/");
                toast.success("User logged out successfully.")
            }
        }
    })
  }

  return (
    <Button onClick={handleClick} size="sm" disabled={isPending} variant="destructive">
      Sign Out
    </Button>
  );
}
