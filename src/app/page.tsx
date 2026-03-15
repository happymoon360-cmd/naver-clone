"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import PostView from "@/components/post/PostView";
import { usePostStore } from "@/store/usePostStore";
import { getStaticPosts } from "@/lib/blogConstants";

function HomeContent() {
  const searchParams = useSearchParams();
  const { setPosts, setCurrentPostId, posts } = usePostStore();

  useEffect(() => {
    const staticPosts = getStaticPosts();
    setPosts(staticPosts);

    const queryPostId = searchParams.get("post");
    if (queryPostId && staticPosts.some(post => post.id === queryPostId)) {
      setCurrentPostId(queryPostId);
    } else if (staticPosts.length > 0) {
      setCurrentPostId(staticPosts[0].id);
    }
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
