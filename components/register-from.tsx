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
      router.push("/auth/signin");
    }
  }

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-3xl font-extrabold tracking-tight text-black">
        Create an account
      </h2>

      <p className="mt-3 text-sm text-black/70">
        Start managing your projects with a clean FlowDesk workspace.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <Input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Full name"
            className="h-10 rounded-none border-0 border-b border-[#cfcfcf] px-0 text-sm text-black shadow-none placeholder:text-gray-500 focus-visible:border-black focus-visible:ring-0"
          />
        </div>

        <div>
          <Input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="Email address"
            className="h-10 rounded-none border-0 border-b border-[#cfcfcf] px-0 text-sm text-black shadow-none placeholder:text-gray-500 focus-visible:border-black focus-visible:ring-0"
          />
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="new-password"
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

        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirm password"
            className="h-10 rounded-none border-0 border-b border-[#cfcfcf] px-0 pr-8 text-sm text-black shadow-none placeholder:text-gray-500 focus-visible:border-black focus-visible:ring-0"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-black/60 hover:text-black"
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

        <div className="flex items-start gap-2 text-xs leading-5 text-black">
          <Checkbox
            id="terms"
            className="mt-0.5 size-4 rounded-none border-[#d9d9d9]"
          />
          <Label htmlFor="terms" className="cursor-pointer font-normal">
            I agree to the Terms & Conditions and Privacy Policy.
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full cursor-pointer rounded bg-black text-sm font-medium text-white hover:bg-neutral-900"
        >
          Create account
        </Button>

        <p className="text-center text-xs text-black">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-semibold underline underline-offset-2 hover:text-black/70"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
