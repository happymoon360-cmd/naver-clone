import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { ContentBlock } from "@/lib/database.types";

interface PostRow {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  author_profile_image: string;
  header_image: string;
  tags: string[];
  content: ContentBlock[];
  comments_enabled: boolean;
  like_count: number;
  created_at: number;
}

export async function GET() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { message: "포스트를 불러오지 못했습니다." },
      { status: 500 }
    );
  }

  const posts = (data as PostRow[]).map(post => ({
    id: post.id,
    title: post.title,
    category: post.category,
    date: post.date,
    author: post.author,
    authorProfileImage: post.author_profile_image,
    headerImage: post.header_image,
    tags: post.tags || [],
    content: post.content || [],
    comments: [],
    isLiked: false,
    commentsEnabled: post.comments_enabled,
    likeCount: post.like_count,
    createdAt: post.created_at,
  }));

  return NextResponse.json(posts);
}
