import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import type { ContentBlock, BlockType, PostRow } from "@/lib/database.types";

const isString = (value: unknown): value is string => typeof value === "string";
const isNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isBlockType = (value: unknown): value is BlockType =>
  value === "text" || value === "image" || value === "quote" || value === "line" || value === "html";

const isContentBlock = (value: unknown): value is ContentBlock => {
  if (!isRecord(value)) return false;
  if (!isString(value.id)) return false;
  if (!isBlockType(value.type)) return false;
  if (value.content !== undefined && !isString(value.content)) return false;
  if (value.src !== undefined && !isString(value.src)) return false;
  if (value.caption !== undefined && !isString(value.caption)) return false;
  if (value.width !== undefined && !isNumber(value.width)) return false;
  if (value.height !== undefined && !isNumber(value.height)) return false;
  return true;
};

const normalizeTags = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.filter(isString).map(tag => tag.trim()).filter(Boolean);
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  void request;
  const { id } = await context.params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "포스트를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const post = data as PostRow;
  return NextResponse.json({
    id: post.id,
    title: post.title,
    category: post.category,
    date: post.date,
    author: post.author,
    authorProfileImage: post.author_profile_image,
    headerImage: post.header_image,
    tags: post.tags || [],
    content: post.content || [],
    commentsEnabled: post.comments_enabled,
    likeCount: post.like_count,
    createdAt: post.created_at,
  });
}

export async function PUT(
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

  const title = body.title;
  const category = body.category;
  const content = body.content;

  if (!isString(title) || !title.trim()) {
    return NextResponse.json(
      { message: "제목을 입력하세요." },
      { status: 400 }
    );
  }
  if (!isString(category) || !category.trim()) {
    return NextResponse.json(
      { message: "카테고리를 입력하세요." },
      { status: 400 }
    );
  }
  if (!Array.isArray(content) || !content.every(isContentBlock) || content.length === 0) {
    return NextResponse.json(
      { message: "본문 내용을 입력하세요." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const now = Date.now();

  const payload = {
    id,
    title: title.trim(),
    category: category.trim(),
    date: isString(body.date) ? body.date.trim() : new Date(now).toLocaleString("ko-KR"),
    author: isString(body.author) ? body.author.trim() : "작성자",
    author_profile_image: isString(body.authorProfileImage) ? body.authorProfileImage.trim() : "",
    header_image: isString(body.headerImage) ? body.headerImage.trim() : "",
    tags: normalizeTags(body.tags),
    content,
    comments_enabled: typeof body.commentsEnabled === "boolean" ? body.commentsEnabled : true,
    like_count: typeof body.likeCount === "number" ? Math.max(0, Math.floor(body.likeCount)) : 0,
    updated_at: now,
  };

  const { data: existingPost } = await supabase
    .from("posts")
    .select("id")
    .eq("id", id)
    .single();

  let result: PostRow;
  if (existingPost) {
    const { data, error } = await supabase
      .from("posts")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    
    if (error || !data) {
      return NextResponse.json(
        { message: "포스트 수정에 실패했습니다." },
        { status: 500 }
      );
    }
    result = data as PostRow;
  } else {
    const insertPayload = {
      ...payload,
      created_at: now,
    };
    const { data, error } = await supabase
      .from("posts")
      .insert(insertPayload)
      .select()
      .single();
    
    if (error || !data) {
      return NextResponse.json(
        { message: "포스트 생성에 실패했습니다." },
        { status: 500 }
      );
    }
    result = data as PostRow;
  }

  return NextResponse.json({
    id: result.id,
    title: result.title,
    category: result.category,
    date: result.date,
    author: result.author,
    authorProfileImage: result.author_profile_image,
    headerImage: result.header_image,
    tags: result.tags,
    content: result.content,
    commentsEnabled: result.comments_enabled,
    likeCount: result.like_count,
    createdAt: result.created_at,
  });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  void request;
  const { id } = await context.params;
  const supabase = await createClient();

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { message: "포스트 삭제에 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
