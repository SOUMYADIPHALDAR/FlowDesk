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
    <div className="w-full max-w-md">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Welcome back, Yash
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Please enter your details to continue into your workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email.."
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-[#1E638A] focus-visible:ring-2 focus-visible:ring-[#9AC3D7]/50"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 pr-10 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-[#1E638A] focus-visible:ring-2 focus-visible:ring-[#9AC3D7]/50"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[2.45rem] text-slate-500 transition hover:text-slate-800"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              className="size-4 rounded border-slate-300 data-[state=checked]:bg-[#1E638A] data-[state=checked]:text-white"
            />
            <Label htmlFor="terms" className="cursor-pointer font-normal">
              Remember me
            </Label>
          </div>

          <button
            type="button"
            className="font-medium text-[#1E638A] transition hover:text-[#0B3051]"
          >
            Forgot Password
          </button>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-11 w-full cursor-pointer rounded-xl bg-[#0B3051] text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#09253f] hover:shadow-md"
        >
          {isPending ? "Signing in..." : "Log in"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            type="button"
            className="mr-1 cursor-pointer font-semibold text-[#1E638A] underline-offset-2 hover:text-[#0B3051]"
          >
            Sign up
          </Link>
          for free
        </p>
      </form>
    </div>
  );
}
