"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ImageUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UpdateProfileAction from "@/action/update-profile.action";
import { useAuth } from "@/lib/auth-context";

export default function EditProfileForm() {
  const [isPending, setIsPending] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const router = useRouter();
  const { setSession } = useAuth();

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      toast.error("Choose a JPG, PNG, or WebP image");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be 5 MB or smaller");
      event.target.value = "";
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    previewUrlRef.current = nextPreviewUrl;
    setSelectedFile(file);
    setPreviewUrl(nextPreviewUrl);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      let image = "";

      // Only upload if a file is selected
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });
        const uploadResponse = (await response.json()) as {
          error?: string;
          url?: string;
        };

        if (!response.ok || !uploadResponse.url) {
          toast.error(uploadResponse.error ?? "Image upload failed");
          return;
        }

        image = uploadResponse.url;
      }

      const name = String(formData.get("name"));
      const phone = String(formData.get("phone"));
      const designation = String(formData.get("designation"));
      const address = String(formData.get("address"));

      const result = await UpdateProfileAction({
        name,
        phone,
        designation,
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
    } catch {
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
              <Label className="text-xs text-[#5E6366]">Name</Label>

              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                className="h-12 rounded-lg border-[#CFD3D5] px-3 text-sm placeholder:text-[#ABAFB1]"
              />
            </div>

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
                id="designation"
                name="designation"
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
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <label
                  htmlFor="profileImage"
                  className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  {selectedFile ? "Change image" : "Choose image"}
                </label>

                {selectedFile && (
                  <p className="text-xs text-muted-foreground">
                    {selectedFile.name}
                  </p>
                )}

                {previewUrl && (
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={previewUrl}
                      alt="Selected profile image preview"
                    />
                  </Avatar>
                )}
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
