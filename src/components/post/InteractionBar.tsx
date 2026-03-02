"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";
import { useState } from "react";

export default function InteractionBar() {
    const { currentPostId, posts, togglePostLike } = usePostStore();
    const post = posts.find(p => p.id === currentPostId);
    const [shareMessage, setShareMessage] = useState("");

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

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/?post=${encodeURIComponent(currentPostId)}`;

        try {
            await navigator.clipboard.writeText(shareUrl);
            setShareMessage("링크 복사됨");
            setTimeout(() => setShareMessage(""), 1500);
        } catch {
            setShareMessage("복사 실패");
            setTimeout(() => setShareMessage(""), 1500);
        }
    };

    return (
        <section className="bg-white px-3.5 py-3.5">
            <div className="flex items-center gap-5 text-[13px] text-[#232323]">
                <button type="button" onClick={handleLike} className="flex min-h-10 items-center gap-1.5">
                    <Heart
                        size={20}
                        strokeWidth={1.8}
                        className={post.isLiked ? "fill-[#ff4f77] text-[#ff4f77]" : "text-[#111]"}
                    />
                    <span className="text-[13px] text-[#111]">좋아요</span>
                    <span className="text-[11px] text-[#ff4f77]">♥</span>
                    <span className="text-[13px] text-[#2d2d2d]">{post.likeCount}</span>
                </button>

                <button type="button" onClick={handleComment} className="flex min-h-10 items-center gap-1.5">
                    <MessageCircle size={20} strokeWidth={1.8} className="text-[#111]" />
                    <span className="text-[13px] text-[#2d2d2d]">{post.comments.length}</span>
                </button>

                <button type="button" onClick={handleShare} className="flex min-h-10 items-center gap-1.5">
                    <Share2 size={19} strokeWidth={1.8} className="text-[#111]" />
                    <span className="text-[13px] text-[#2d2d2d]">{shareMessage || "공유"}</span>
                </button>
            </div>
        </section>
    );
}
