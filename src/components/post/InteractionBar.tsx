"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";

export default function InteractionBar() {
    const { currentPostId, posts, togglePostLike } = usePostStore();
    const post = posts.find(p => p.id === currentPostId);

    if (!post) return null;

    const handleLike = () => {
        togglePostLike(currentPostId);
    };

    const handleComment = () => {
        const commentSection = document.getElementById("comment-section");
        if (commentSection) {
            commentSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="bg-white px-5 py-5">
            <div className="flex items-center gap-8 text-[14px] text-[#232323]">
                <button type="button" onClick={handleLike} className="flex items-center gap-2">
                    <Heart
                        size={22}
                        strokeWidth={1.8}
                        className={post.isLiked ? "fill-[#ff4f77] text-[#ff4f77]" : "text-[#111]"}
                    />
                    <span className="text-[14px] text-[#111]">좋아요</span>
                    <span className="text-[12px] text-[#ff4f77]">♥</span>
                    <span className="text-[14px] text-[#2d2d2d]">{post.likeCount}</span>
                </button>

                <button type="button" onClick={handleComment} className="flex items-center gap-2">
                    <MessageCircle size={22} strokeWidth={1.8} className="text-[#111]" />
                    <span className="text-[14px] text-[#2d2d2d]">{post.comments.length}</span>
                </button>

                <button type="button" className="flex items-center gap-2">
                    <Share2 size={21} strokeWidth={1.8} className="text-[#111]" />
                    <span className="text-[14px] text-[#2d2d2d]">공유</span>
                </button>
            </div>
        </section>
    );
}
