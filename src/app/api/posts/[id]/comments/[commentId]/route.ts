import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const toPositiveInteger = (value: string) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
};

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string; commentId: string }> }
) {
  const { id, commentId } = await context.params;
  const parsedCommentId = toPositiveInteger(commentId);

  if (!id || !id.trim() || parsedCommentId === null) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "요청 본문이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { message: "요청 본문이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  const nextAuthor = body.author;
  const nextContent = body.content;

  if (nextAuthor !== undefined && typeof nextAuthor !== "string") {
    return NextResponse.json(
      { message: "작성자 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }
  if (nextContent !== undefined && typeof nextContent !== "string") {
    return NextResponse.json(
      { message: "댓글 내용 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  if (nextAuthor === undefined && nextContent === undefined) {
    return NextResponse.json(
      { message: "수정할 필드를 전달하세요." },
      { status: 400 }
    );
  }

  const updatePayload: Record<string, unknown> = {};
  if (typeof nextAuthor === "string") {
    updatePayload.author = nextAuthor.trim() || "익명";
  }
  if (typeof nextContent === "string") {
    const trimmed = nextContent.trim();
    if (!trimmed) {
      return NextResponse.json(
        { message: "댓글 내용을 입력하세요." },
        { status: 400 }
      );
    }
    updatePayload.content = trimmed;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .update(updatePayload)
    .eq("id", parsedCommentId)
    .eq("post_id", id)
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "댓글 수정에 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    id: data.id,
    content: data.content,
    author: data.author,
    timestamp: data.created_at,
    likes: data.likes,
    isLiked: false,
    parentId: data.parent_id ?? undefined,
  });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string; commentId: string }> }
) {
  void request;
  const { id, commentId } = await context.params;
  const parsedCommentId = toPositiveInteger(commentId);

  if (!id || !id.trim() || parsedCommentId === null) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", parsedCommentId)
    .eq("post_id", id);

  if (error) {
    return NextResponse.json(
      { message: "댓글 삭제에 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
