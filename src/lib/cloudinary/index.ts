const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

interface UploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

export async function uploadImage(file: File): Promise<UploadResult> {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    throw new Error("Cloudinary 환경변수가 설정되지 않았습니다.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const timestamp = Math.round(Date.now() / 1000);
  const signature = await generateSignature(timestamp);

  const formData = new FormData();
  formData.append("file", dataUri);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "이미지 업로드 실패");
  }

  return response.json();
}

async function generateSignature(timestamp: number): Promise<string> {
  const API_SECRET = process.env.CLOUDINARY_API_SECRET!;
  const paramsToSign = `timestamp=${timestamp}${API_SECRET}`;
  
  const encoder = new TextEncoder();
  const data = encoder.encode(paramsToSign);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export function getOptimizedUrl(
  publicId: string,
  options?: { width?: number; quality?: number }
): string {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const transforms = [];
  
  if (options?.width) {
    transforms.push(`w_${options.width}`);
  }
  if (options?.quality) {
    transforms.push(`q_${options.quality}`);
  }
  
  const transformStr = transforms.length > 0 ? `${transforms.join(",")}/` : "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}${publicId}`;
}
