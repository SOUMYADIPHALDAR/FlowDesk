"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUp } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditProfileForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      const profileImage = formData.get("profileImage");

      if (profileImage instanceof File && profileImage.size > 0) {
        const uploadFormData = new FormData();
        uploadFormData.set("file", profileImage);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const uploadData = await uploadResponse.json();
        formData.set("image", uploadData.imageUrl);
      }

      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to update profile");
      }

      toast.success("Profile updated");
      router.refresh();
      e.currentTarget.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update profile",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="w-[640px] rounded-[18px] bg-[#FDFEFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <CardHeader className="pb-5">
        <CardTitle className="text-[26px] font-semibold text-[#0E2040]">
          Edit Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-7 gap-y-5">
            <div className="space-y-2">
              <Label className="text-xs text-[#5E6366]">Phone Number</Label>

              <Input
                id="phone"
                name="phone"
                placeholder="Phone No."
                className="h-[48px] rounded-lg border-[#CFD3D5] px-3 text-sm placeholder:text-[#ABAFB1]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-[#5E6366]">Job Role</Label>

              <Input
                id="jobRole"
                name="jobRole"
                placeholder="Enter your niche.."
                className="h-[48px] rounded-lg border-[#CFD3D5] px-3 text-sm placeholder:text-[#ABAFB1]"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label className="text-xs text-[#5E6366]">Profile Image</Label>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <ImageUp className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    Change profile image
                  </span>
                </div>

                <input
                  id="profileImage"
                  name="profileImage"
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

            <div className="col-span-2 space-y-2">
              <Label className="text-xs text-[#5E6366]">Address</Label>

              <Input
                id="address"
                name="address"
                placeholder="Enter your city and country name.."
                className="h-[48px] rounded-lg border-[#CFD3D5] px-3 text-sm placeholder:text-[#ABAFB1]"
              />
            </div>
          </div>

          <div className="flex justify-center pt-5">
            <Button
              type="submit"
              disabled={isPending}
              className="h-[42px] w-[136px] rounded-xl bg-[#5570F1] text-base font-normal hover:bg-[#4863ea]"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
