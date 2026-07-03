"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import GetStartedButton from "@/components/get-started-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Palette, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const router = useRouter();
  const { session } = useAuth();
  
  const profile = session?.role === "ADMIN" ? "/admin/profile" : "/profile";
  const landingHref = session ? profile : "/signin";
  const userName = session?.name ?? "User";
  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .map((word: string) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex flex-wrap h-16 items-center justify-between gap-4 px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg sm:h-11 sm:w-11">
            <Palette
              size={34}
              className="text-[#1E638A] sm:size-10"
              strokeWidth={2}
            />
          </div>

          <span className="hidden text-[#0B3051] md:block">FlowDesk</span>
        </Link>

        {/* Right Section */}
        <div className="flex flex-1 min-w-0 items-center justify-end gap-3 md:gap-6">
          <div className="relative sm:flex flex-1 max-w-105">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#787486]" />

            <Input
              placeholder="Search..."
              className="h-10 w-full rounded-md border-[#9A93B3] bg-white pl-10"
            />
          </div>

          {session ? (
            <>
              {/* Desktop User */}
              <Link
                href={profile}
                className="hidden items-center gap-3 lg:flex"
              >
                <div className="text-right">
                  <p className="text-base font-normal text-[#0D062D]">
                    {userName}
                  </p>
                </div>

                <Avatar className="h-12 w-12 border border-[#F0F6FF]">
                  {session.image ? (
                    <AvatarImage src={session.image} />
                  ) : (
                    <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>
              </Link>

              {/* Mobile Avatar Only */}
              <Link href={profile} className="lg:hidden">
                <Avatar className="h-10 w-10 border border-[#F0F6FF]">
                  {session.image ? (
                    <AvatarImage src={session.image} />
                  ) : (
                    <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              {/* Desktop Buttons */}
              <div className="hidden items-center gap-3 lg:flex">
                <Button variant="ghost" onClick={() => router.push("/signin")}>
                  Login
                </Button>

                <GetStartedButton />
              </div>

              {/* Mobile: Get Started Only */}
              <div className="lg:hidden">
                <GetStartedButton />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
