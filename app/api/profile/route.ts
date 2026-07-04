import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const phone = String(formData.get("phone") ?? "");
    const address = String(formData.get("address") ?? "");
    const jobRole = String(formData.get("jobRole") ?? "");
    const image = String(formData.get("image") ?? "");

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        phone,
        address,
        jobRole,
        image,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update failed", error);
    return NextResponse.json(
      { message: "Unable to update profile" },
      { status: 500 },
    );
  }
}
