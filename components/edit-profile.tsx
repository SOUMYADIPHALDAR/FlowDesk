"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUp } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UpdateProfileAction from "@/action/update-profile.action";
import { useAuth } from "@/lib/auth-context";

export default function EditProfileForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { setSession } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      const fileInput = formData.get("file") as File | null;

      let image = "";
      let uploadResponse = "";

      // Only upload if a file is selected
      if (fileInput && fileInput.size > 0) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", fileInput);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        }).then((res) => res.json());

        if (uploadResponse.error) {
          toast.error(uploadResponse.error);
          setIsPending(false);
          return;
        }

        image = uploadResponse?.url || "";
      }

      const phone = String(formData.get("phone"));
      const jobRole = String(formData.get("jobRole"));
      const address = String(formData.get("address"));

      const result = await UpdateProfileAction({
        phone,
        jobRole,
        address,
        image,
      });

      if (result.error) {
        toast.error(result.error);
        setIsPending(false);
      } else {
        if (result.data) {
          setSession(result.data);
        }
        toast.success("Profile updated successfully..");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="w-full rounded-[18px] bg-[#FDFEFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <CardHeader className="pb-4 sm:pb-5">
        <CardTitle className="text-[22px] font-semibold text-[#0E2040] sm:text-[26px]">
          Edit Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2 md:gap-x-7">
            <div className="space-y-2">
              <Label className="text-xs text-[#5E6366]">Phone Number</Label>

              <Input
                id="phone"
                name="phone"
                placeholder="Phone No."
                className="h-12 rounded-lg border-[#CFD3D5] px-3 text-sm placeholder:text-[#ABAFB1]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-[#5E6366]">Job Role</Label>

              <Input
                id="jobRole"
                name="jobRole"
                placeholder="Enter your niche.."
                className="h-12 rounded-lg border-[#CFD3D5] px-3 text-sm placeholder:text-[#ABAFB1]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-xs text-[#5E6366]">Profile Image</Label>

              <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <ImageUp className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    Change profile image
                  </span>
                </div>

                <input
                  id="profileImage"
                  name="file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />

                <label
                  htmlFor="profileImage"
                  className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Upload
                </label>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-xs text-[#5E6366]">Address</Label>

              <Input
                id="address"
                name="address"
                placeholder="Enter your city and country name.."
                className="h-12 rounded-lg border-[#CFD3D5] px-3 text-sm placeholder:text-[#ABAFB1]"
              />
            </div>
          </div>

          <div className="flex justify-center pt-5">
            <Button
              type="submit"
              disabled={isPending}
              className="h-10.5 w-full rounded-xl bg-[#5570F1] text-base font-normal hover:bg-[#4863ea] sm:w-34"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
