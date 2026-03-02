import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import type { CommentRow } from "@/lib/database.types";
import { cookies } from "next/headers";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
const isString = (value: unknown): value is string => typeof value === "string";
const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  void request;
  const { id } = await context.params;
  if (!id || !id.trim()) {
    return NextResponse.json(
      { message: "잘못된 게시글 ID입니다." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { message: "댓글을 불러오지 못했습니다." },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const likeSessionId = cookieStore.get("comment_like_session")?.value;
  const rows = data as CommentRow[];

  let likedCommentIds = new Set<number>();
  if (likeSessionId && rows.length > 0) {
    const commentIds = rows.map(comment => comment.id);
    const { data: likedRows } = await supabase
      .from("comment_likes")
      .select("comment_id")
      .eq("session_id", likeSessionId)
      .in("comment_id", commentIds);

    likedCommentIds = new Set(
      (likedRows ?? [])
        .map(row => row.comment_id)
        .filter((commentId): commentId is number => Number.isFinite(commentId))
    );
  }

  const comments = rows.map(comment => ({
    id: comment.id,
    content: comment.content,
    author: comment.author,
    timestamp: comment.created_at,
    likes: comment.likes,
    isLiked: likedCommentIds.has(comment.id),
    parentId: comment.parent_id ?? undefined,
  }));

  return NextResponse.json(comments);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id || !id.trim()) {
    return NextResponse.json(
      { message: "잘못된 게시글 ID입니다." },
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

  const content = body.content;
  const author = body.author;
  const parentId = body.parentId;

  if (!isString(content) || !content.trim()) {
    return NextResponse.json(
      { message: "댓글 내용을 입력하세요." },
      { status: 400 }
    );
  }

  if (parentId !== undefined && !isNumber(parentId)) {
    return NextResponse.json(
      { message: "잘못된 댓글 정보입니다." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("comments_enabled")
    .eq("id", id)
    .single();

  if (!post || !post.comments_enabled) {
    return NextResponse.json(
      { message: "댓글이 비활성화되었습니다." },
      { status: 403 }
    );
  }

  const timestamp = Date.now();
  const insertPayload = {
    post_id: id,
    content: content.trim(),
    author: isString(author) && author.trim() ? author.trim() : "익명",
    likes: 0,
    parent_id: isNumber(parentId) ? parentId : null,
    created_at: timestamp,
  };

  const { data, error } = await supabase
    .from("comments")
    .insert(insertPayload)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "댓글 등록에 실패했습니다." },
      { status: 500 }
    );
  }

  const comment = data as CommentRow;
  return NextResponse.json(
    {
      id: comment.id,
      content: comment.content,
      author: comment.author,
      timestamp: comment.created_at,
      likes: comment.likes,
      isLiked: false,
      parentId: comment.parent_id,
    },
    { status: 201 }
  );
}
