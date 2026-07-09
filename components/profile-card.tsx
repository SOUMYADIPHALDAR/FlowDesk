"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserProfileCard() {
  const { session } = useAuth();

  const userName = session?.name ?? "Users";
  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .map((word: string) => word[0])
      .join("")
      .toUpperCase() || "U";

  const icon = session?.role === "ADMIN" ? "⭐" : " ";

  return (
    <Card className="w-full rounded-[20px] bg-[#FDFEFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <CardContent className="flex flex-col items-center p-4 sm:p-6">
        {/* Avatar */}
        <Avatar className="h-12 w-12 border border-[#F0F6FF]">
          {session?.image ? (
            <AvatarImage src={session.image} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>

        {session && (
          <div>
            {/* User Info */}
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-[16px] font-bold text-[#4B4B4B]">
                {icon}
                {session.name}
              </h2>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#4B4B4B]" />
                <div className="text-sm text-slate-600">{session.address}</div>
              </div>
            </div>

            <Separator className="my-6 bg-[#D9E6F7]" />

            {/* Job */}
            <div className="w-full space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 shrink-0 text-[#4B4B4B]" />
                <span className="text-sm text-[#4B4B4B] sm:text-[16px]">
                  {session.jobRole}
                </span>
              </div>
            </div>

            <Separator className="my-6 bg-[#D9E6F7]" />

            {/* Contact */}
            <div className="w-full space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#4B4B4B]" />
                <span className="break-all text-sm text-[#4B4B4B] sm:text-[16px]">
                  +91 {session.phone}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#4B4B4B]" />
                <span className="break-all text-sm text-[#4B4B4B] sm:text-[16px]">
                  {session.email}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
