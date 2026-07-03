"use client";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import RegisterAction from "@/action/register.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setIsPending(false);
      return;
    }

    const { error } = await RegisterAction(formData);
    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Registration successful.");
      router.push("/signin");
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Create an account
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Start managing projects with a clean FlowDesk workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Enter your name.."
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-[#1E638A] focus-visible:ring-2 focus-visible:ring-[#9AC3D7]/50"
          />
        </div>

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
            autoComplete="email"
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
            autoComplete="new-password"
            placeholder="Create a password"
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

        <div className="relative">
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Confirm password
          </label>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter password"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 pr-10 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-[#1E638A] focus-visible:ring-2 focus-visible:ring-[#9AC3D7]/50"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-[2.45rem] text-slate-500 transition hover:text-slate-800"
            aria-label={
              showConfirmPassword
                ? "Hide confirmed password"
                : "Show confirmed password"
            }
          >
            {showConfirmPassword ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </button>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs leading-5 text-slate-600">
          <Checkbox
            id="terms"
            className="mt-0.5 size-4 rounded border-slate-300 data-[state=checked]:bg-[#1E638A] data-[state=checked]:text-white"
          />
          <Label htmlFor="terms" className="cursor-pointer font-normal">
            I agree to the Terms & Conditions and Privacy Policy.
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-11 w-full cursor-pointer rounded-xl bg-[#0B3051] text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#09253f] hover:shadow-md"
        >
          {isPending ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#1E638A] underline-offset-2 hover:text-[#0B3051]"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
