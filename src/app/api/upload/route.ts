import { uploadImage } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: "파일이 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "이미지 파일만 업로드 가능합니다." },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: "파일 크기는 10MB 이하여야 합니다." },
        { status: 400 }
      );
    }

    const result = await uploadImage(file);
    
    return NextResponse.json({
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { message: "이미지 업로드에 실패했습니다." },
      { status: 500 }
    );
  }
}
