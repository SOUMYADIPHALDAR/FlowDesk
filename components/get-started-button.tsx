"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { useAuth } from "@/lib/auth-context";

export default function GetStartedButton() {
  const { session } = useAuth();

  const dashboard =
    session?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";

  const destination = session ? dashboard : "/signin";

  return (
    <Link
      href={destination}
      className={buttonVariants({
        size: "sm",
        className: "hover:-translate-y-0.5",
      })}
    >
      Get Started
    </Link>
  );
}
