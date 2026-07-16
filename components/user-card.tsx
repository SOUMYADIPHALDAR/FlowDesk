"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Building2, Briefcase, Calendar } from "lucide-react";
import { UserRole } from "@/lib/generated/prisma/enums";
import { useEffect, useState } from "react";
import { GetAllUser } from "@/action/getUser.action";
import { toast } from "sonner";
import { join } from "path";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function UserCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [joiningDate, setJoiningDate] = useState<Date>(new Date());
  const [role, setRole] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const { error, result } = await GetAllUser();
        if (error) {
          toast.error(error);
          return;
        }
        if (!result) {
          toast.error("No user found.");
          return;
        }

        const [
          {
            name,
            email,
            phone,
            image,
            designation,
            department,
            joiningDate,
            role,
            employeeId,
          },
        ] = result;

        setName(name);
        setEmail(email);
        setPhone(phone ?? "");
        setImage(image ?? "");
        setDepartment(department ?? "");
        setDesignation(designation ?? "");
        setRole(role);
        setEmployeeId(employeeId ?? "");
        setJoiningDate(joiningDate ?? new Date());
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      {loading ? (
        <Card className="rounded-2xl border shadow-sm">
          <CardContent className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>

            {/* Divider */}
            <Skeleton className="h-px w-full" />

            {/* User Details */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-9/12" />
              <Skeleton className="h-4 w-8/12" />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Skeleton className="h-10 w-20 rounded-lg" />
              <Skeleton className="h-10 w-20 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={image ?? ""} />
                <AvatarFallback className="text-lg font-semibold">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-xl font-semibold">{name}</h2>

                <p className="text-sm text-muted-foreground">{employeeId}</p>

                <Badge
                  className={`mt-2 ${
                    role === UserRole.ADMIN
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {role}
                </Badge>
              </div>
            </div>

            <Button variant="outline" size="sm">
              View
            </Button>
          </div>

          {/* Divider */}
          <div className="my-5 border-t" />

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{email}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{phone || "Not Added"}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{designation}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{department}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{joiningDate.toLocaleDateString("en-GB")}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline">Edit</Button>

            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      )}
    </div>
  );
}
