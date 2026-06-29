"use client";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import SignInAction from "@/action/sign-in.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const { error } = await SignInAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("User logged in successfully.");
      router.push("/dashboard");
    }
  }

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-3xl font-extrabold tracking-tight text-black">
        Welcome back, Yash
      </h2>

      <p className="mt-3 text-sm text-black/70">
        Welcome back! Please enter your details.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-7">
        {/* Email */}
        <div>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="h-10 rounded-none border-0 border-b border-[#cfcfcf] px-0 text-sm text-black shadow-none placeholder:text-gray-500 focus-visible:border-black focus-visible:ring-0"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            className="h-10 rounded-none border-0 border-b border-[#cfcfcf] px-0 pr-8 text-sm text-black shadow-none placeholder:text-gray-500 focus-visible:border-black focus-visible:ring-0"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-black/60 hover:text-black"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </button>
        </div>

        {/* Terms + Forgot */}
        <div className="flex items-center justify-between gap-4 text-xs text-black">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              className="size-4 rounded-none border-[#d9d9d9]"
            />
            <Label htmlFor="terms" className="cursor-pointer font-normal">
              Terms & Conditions
            </Label>
          </div>

          <button
            type="button"
            className="underline underline-offset-2 hover:text-black/70"
          >
            Forgot Password
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded bg-black text-sm font-medium cursor-pointer text-white hover:bg-neutral-900"
        >
          Log in
        </Button>

        {/* Signup */}
        <p className="text-center text-xs text-black">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            type="button"
            className="font-semibold underline underline-offset-2 mr-1 cursor-pointer"
          >
            Sign up
          </Link>
          for free
        </p>
      </form>
    </div>
  );
}
