"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import GetStartedButton from "@/components/get-started-button";
import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Palette, Search } from "lucide-react";
import { Input } from "./ui/input";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <div className="flex h-[45px] w-[50px] items-center justify-center rounded-lg">
            <Palette size={40} className="text-[#1E638A]" strokeWidth={2} />
          </div>

          <span className="text-[#0B3051]">FlowDesk</span>
        </Link>
        <div className="flex items-center gap-8">
          <div className="relative w-[420px]">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#787486]" />

            <Input
              placeholder="Search for anything..."
              className="h-11 rounded-md border-[#9A93B3] bg-[#FEFEFE] pl-10 text-sm placeholder:text-[#787486] focus-visible:ring-1"
            />
          </div>
          {session ? (
            <div className="hidden items-center gap-3 lg:flex">
              <Link href="/profile">
                <div className="flex cursor-pointer items-center gap-3">
                  <div className="text-right">
                    <p className="text-base font-normal text-[#0D062D]">
                      {session.user.name}
                    </p>
                  </div>

                  <Avatar className="h-12 w-12 border border-[#F0F6FF]">
                    {session.user.image ? (
                      <AvatarImage src={session.user.image} />
                    ) : (
                      <AvatarFallback>
                        {session.user.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
              </Link>
            </div>
          ) : (
            <div className="hidden items-center gap-3 lg:flex">
              <Button variant="ghost" onClick={() => router.push("/signin")}>
                Login
              </Button>
              <GetStartedButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
