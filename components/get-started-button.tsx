"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";

export default function GetStartedButton() {
  const { data: session, isPending } = useSession();
  const href = session ? "/profile" : "/signin";

  return (
    <Button size="sm" disabled={isPending} className="hover:-translate-y-0.5">
      <Link href={href}> Get Started</Link>
    </Button>
  );
}
