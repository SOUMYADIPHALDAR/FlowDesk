import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

interface CloudinaryUploadResutl {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResutl>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "next_flowdesk" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResutl);
          },
        );
        uploadStream.end(buffer);
      },
    );

    return NextResponse.json(
      {
        public_id: result.public_id,
        url: result.secure_url,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log("Upload Image failed", err);
    return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
  }
}
