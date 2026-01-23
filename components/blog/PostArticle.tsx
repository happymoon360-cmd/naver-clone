"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Heart, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommentSection } from "@/components/blog/CommentSection";

export function PostArticle({ post: initialPost }: { post: any }) {
    const [post, setPost] = useState(initialPost);

    useEffect(() => {
        // Increment view count
        fetch(`/api/posts/${post.id}/views`, { method: "POST" }).catch(console.error);
    }, [post.id]);

    const handleLike = () => {
        // Read-only in public view per Phase 3 requirements
        alert("공감 수는 관리자만 조작할 수 있습니다.");
    };

    return (
        <article className="w-full bg-white pb-10">
            {/* Post Header */}
            <div className="px-5 pt-6 pb-4">
                <div className="text-[#03c75a] text-[13px] font-bold mb-2">
                    {post.category || "전체"}
                </div>
                <h1 className="text-[24px] leading-snug font-bold text-gray-900 mb-5 break-words">
                    {post.title}
                </h1>

                {/* Profile Section */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                        {/* Placeholder Avatar - In real app, use post.author.image */}
                        <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-[14px] font-bold text-black leading-tight">프로필</div>
                        <div className="text-[13px] text-[#888888] font-normal leading-tight mt-0.5">
                            {format(new Date(post.createdAt), "yyyy. M. d. HH:mm")}
                        </div>
                    </div>
                </div>

                {/* Divider removed per clean design, or subtle if needed */}
            </div>

            {/* Content */}
            <div className="px-5 min-h-[200px] text-[16px] text-[#333333] leading-7 mb-12 whitespace-pre-wrap break-words">
                {post.content}
            </div>

            {/* Tags (Example) */}
            <div className="px-5 mb-8 flex flex-wrap gap-2">
                <span className="bg-[#f2f2f2] text-[#666666] px-2 py-1 rounded-[4px] text-[13px]">#일상</span>
                <span className="bg-[#f2f2f2] text-[#666666] px-2 py-1 rounded-[4px] text-[13px]">#기록</span>
            </div>

            {/* Interactions Row (Like, Comment, etc) */}
            <div className="px-5 flex items-center gap-3 mb-6">
                {/* Like Button (Read Only) */}
                <button
                    onClick={handleLike}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-[#dedede] rounded-full bg-white transition-colors"
                >
                    <Heart className={cn("w-3.5 h-3.5", post.likeCount > 0 ? "fill-[#ff4d4d] text-[#ff4d4d]" : "text-[#888888]")} />
                    <span className="text-[13px] font-bold text-[#333333]">공감</span>
                    <span className="text-[13px] text-[#888888] font-bold ml-0.5">{post.likeCount}</span>
                </button>

                {/* Comment Count Display (Visual only here, logic in CommentSection) */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 ">
                    <svg className="w-4 h-4 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-[13px] font-bold text-[#333333]">댓글</span>
                </div>
            </div>

            <div className="border-b border-[#f0f0f0] mb-6 mx-5"></div>

            {/* Comments - Always rendered, logic inside controls form visibility */}
            <div className="px-5">
                <CommentSection postId={post.id.toString()} allowComment={post.allowComment} />
            </div>
        </article>
    );
}
