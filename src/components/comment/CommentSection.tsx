"use client";

import { useMemo } from "react";
import { MessageCircle } from "lucide-react";
import CommentList from "./CommentList";
import MobileSidebar from "@/components/post/MobileSidebar";
import { usePostStore } from "@/store/usePostStore";

export default function CommentSection() {
    const { currentPostId, posts } = usePostStore();

    const post = useMemo(
        () => posts.find(item => item.id === currentPostId),
        [posts, currentPostId]
    );

    if (!post) {
        return null;
    }

    const isVisible = post.commentsVisible ?? true;
    const isOpen = post.commentsOpen ?? true;

    if (!isVisible) {
        return null;
    }

    return (
        <section id="comment-section" className="border-t border-[#e9e9e9] bg-white pb-6 pt-3 md:pb-8 md:pt-4">
            <div className="px-3.5 md:px-6">
                <div className="mx-auto mb-2.5 h-1.5 w-10 rounded-full bg-[#d8d8d8]" />
                <div className="mb-2.5 flex items-center gap-1.5">
                    <MessageCircle size={18} className="text-[#202020]" />
                    <h3 className="text-[20px] font-bold tracking-[-0.02em] text-[#101010] md:text-[22px]">
                        댓글 <span className="text-primary">{post.comments.length}</span>
                    </h3>
                </div>

                {!isOpen ? (
                    <div className="rounded-md border border-[#ececec] bg-[#fafafa] px-3 py-2 text-[12px] text-[#6f6f6f]">
                        댓글창이 관리자에 의해 닫혀 있습니다.
                    </div>
                ) : null}

                {!isOpen ? null : (
                    <>
                        <CommentList
                            comments={post.comments}
                            onLikeComment={() => {}}
                            onAddReply={() => Promise.resolve()}
                            readOnly
                        />

                <div className="mt-3 rounded-sm border border-[#e3e3e3] bg-white px-4 py-4 text-[15px] text-[#9a9a9a]">
                    댓글 작성은 열려 있지 않습니다.
                </div>

                <MobileSidebar />
                    </>
                )}
            </div>
        </section>
    );
}
