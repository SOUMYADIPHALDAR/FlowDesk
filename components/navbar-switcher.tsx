"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import AuthNavbar from "@/components/auth-navbar";

export default function NavbarSwitcher() {
  const pathname = usePathname();
  const isAuthRoute =
    pathname === "/signin" ||
    pathname === "/register" ||
    pathname.startsWith("/signin/") ||
    pathname.startsWith("/register/");

  return isAuthRoute ? <AuthNavbar /> : <Navbar />;
}
