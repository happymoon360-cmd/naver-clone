import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const toPositiveInteger = (value: string) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
};

export async function POST(
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
  const { data: commentRow, error: commentError } = await supabase
    .from("comments")
    .select("id, likes")
    .eq("id", parsedCommentId)
    .eq("post_id", id)
    .single();

  if (commentError || !commentRow) {
    return NextResponse.json(
      { message: "댓글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const cookieStore = await cookies();
  let sessionId = cookieStore.get("comment_like_session")?.value;
  let shouldSetCookie = false;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    shouldSetCookie = true;
  }

  const { data: existingLike, error: existingLikeError } = await supabase
    .from("comment_likes")
    .select("id")
    .eq("comment_id", parsedCommentId)
    .eq("session_id", sessionId)
    .maybeSingle();

  if (existingLikeError) {
    return NextResponse.json(
      { message: "댓글 공감을 처리하지 못했습니다." },
      { status: 500 }
    );
  }

  let isLiked = false;
  let nextLikes = Math.max(0, Number(commentRow.likes) || 0);

  if (existingLike) {
    const { error: deleteLikeError } = await supabase
      .from("comment_likes")
      .delete()
      .eq("id", existingLike.id);

    if (deleteLikeError) {
      return NextResponse.json(
        { message: "댓글 공감을 처리하지 못했습니다." },
        { status: 500 }
      );
    }

    isLiked = false;
    nextLikes = Math.max(0, nextLikes - 1);
  } else {
    const { error: insertLikeError } = await supabase
      .from("comment_likes")
      .insert({
        comment_id: parsedCommentId,
        session_id: sessionId,
        created_at: Date.now(),
      });

    if (insertLikeError) {
      return NextResponse.json(
        { message: "댓글 공감을 처리하지 못했습니다." },
        { status: 500 }
      );
    }

    isLiked = true;
    nextLikes += 1;
  }

  const { error: updateError } = await supabase
    .from("comments")
    .update({ likes: nextLikes })
    .eq("id", parsedCommentId)
    .eq("post_id", id);

  if (updateError) {
    return NextResponse.json(
      { message: "댓글 공감을 처리하지 못했습니다." },
      { status: 500 }
    );
  }

  if (shouldSetCookie) {
    cookieStore.set("comment_like_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return NextResponse.json({
    commentId: parsedCommentId,
    likes: nextLikes,
    isLiked,
  });
}
