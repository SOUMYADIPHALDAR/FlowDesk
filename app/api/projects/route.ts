import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const result = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
  });

  if (!result || result.length === 0) {
    return NextResponse.json({ error: "No projects found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 200 });
}
