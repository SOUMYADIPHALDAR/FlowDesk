"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

interface SignInOAuthProps {
  provider: "google" | "github";
  signUp?: boolean;
}

export default function SignInOAuth({ provider, signUp }: SignInOAuthProps) {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    await signIn.social({
      provider,
      callbackURL: "/profile",
      errorCallbackURL: "/auth/register",
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
      },
    });
  }

  const action = signUp ? "In" : "Up";
  const providerName = provider === "google" ? "Google" : "Github";
  const initial = provider === "google" ? "G" : "GH";

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
      className="h-11 w-full justify-center rounded-xl border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md"
    >
      <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
        {initial}
      </span>
      Sign {action} with {providerName}
    </Button>
  );
}
