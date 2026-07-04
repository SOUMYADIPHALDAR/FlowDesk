"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserProfileCard() {
  const { session } = useAuth();
  const router = useRouter();
  
  if (!session) {
    router.push("/signin");
  }

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
    <Card className="w-[322px] rounded-[20px] bg-[#FDFEFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <CardContent className="p-6 flex flex-col items-center">
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
            <div className="text-center space-y-2">
              <h2 className="text-[16px] font-bold text-[#4B4B4B]">
                {icon}{session.name}
              </h2>

              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 text-[#4B4B4B]" />
                <div>
                  {session.address}
                </div>
              </div>
            </div>

            <Separator className="my-6 bg-[#D9E6F7]" />

            {/* Job */}
            <div className="w-full space-y-6">
              <div className="flex items-center gap-4">
                <User className="w-6 h-6 text-[#4B4B4B]" />
                <span className="text-[16px] text-[#4B4B4B]">
                  {session.jobRole}
                </span>
              </div>
            </div>

            <Separator className="my-6 bg-[#D9E6F7]" />

            {/* Contact */}
            <div className="w-full space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-[#4B4B4B]" />
                <span className="text-[16px] text-[#4B4B4B]">
                  +91 {session.phone}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-[#4B4B4B]" />
                <span className="text-[16px] text-[#4B4B4B]">
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
