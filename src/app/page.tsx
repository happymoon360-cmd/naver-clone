"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import PostView from "@/components/post/PostView";
import { usePostStore } from "@/store/usePostStore";
import { mockPosts } from "@/lib/mockPosts";
import type { Post } from "@/store/usePostStore";

const toPosts = (value: unknown): Post[] => {
  if (!Array.isArray(value)) return mockPosts;
  const filtered = value.filter((item): item is Post => {
    if (!item || typeof item !== "object") return false;
    return typeof (item as Post).id === "string" && typeof (item as Post).title === "string";
  });
  return filtered.length > 0 ? filtered : mockPosts;
};

function HomeContent() {
  const searchParams = useSearchParams();
  const { setPosts, setCurrentPostId, posts } = usePostStore();

  useEffect(() => {
    let active = true;

    const apply = (next: Post[]) => {
      if (!active) return;
      setPosts(next);

      const queryPostId = searchParams.get("post");
      if (queryPostId && next.some(post => post.id === queryPostId)) {
        setCurrentPostId(queryPostId);
        return;
      }

      if (next.length > 0) {
        setCurrentPostId(next[0].id);
      }
    };

    const load = async () => {
      try {
        const response = await fetch("/api/posts", { cache: "no-store" });
        if (!response.ok) throw new Error("posts fetch failed");

        const data = await response.json();
        apply(toPosts(data));
      } catch {
        apply(mockPosts);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [searchParams, setCurrentPostId, setPosts]);

  if (posts.length === 0) {
    return (
      <div className="px-5 py-16 text-center text-[15px] text-[#666]">
        콘텐츠를 불러오는 중입니다.
      </div>
    );
  }

  return <PostView />;
}

export default function Home() {
  return (
    <Container>
      <Suspense fallback={<div className="px-5 py-16 text-center text-[#888]">로딩 중...</div>}>
        <HomeContent />
      </Suspense>
    </Container>
  );
}
