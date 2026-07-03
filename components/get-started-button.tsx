"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function GetStartedButton({ href }: { href?: string }) {
  const [isPending] = useState(false);
  const { session } = useAuth();

  const destination =
    href ?? (session?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");

  return (
    <Button size="sm" disabled={isPending} className="hover:-translate-y-0.5">
      <Link href={destination}>Get Started</Link>
    </Button>
  );
}
