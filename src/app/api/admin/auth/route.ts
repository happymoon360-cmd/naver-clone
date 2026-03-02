import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
const isString = (value: unknown): value is string => typeof value === "string";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "요청 본문이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  if (!isRecord(body) || !isString(body.password)) {
    return NextResponse.json(
      { message: "비밀번호를 입력하세요." },
      { status: 400 }
    );
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { message: "서버 설정 오류입니다." },
      { status: 500 }
    );
  }

  if (body.password !== adminPassword) {
    return NextResponse.json(
      { message: "비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return NextResponse.json({ authenticated: session?.value === "authenticated" });
}
