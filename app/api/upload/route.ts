import { Readable } from "stream";
import streamifier from "streamifier";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "File not found." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const stream = Readable.from(buffer);

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "nextjs",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        },
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return NextResponse.json({
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload failed", error);
    return NextResponse.json(
      {
        message:
          "Image upload failed. Please verify your Cloudinary credentials and upload settings.",
      },
      { status: 502 },
    );
  }
}
