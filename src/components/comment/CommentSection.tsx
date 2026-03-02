"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import MobileSidebar from "@/components/post/MobileSidebar";
import { usePostStore } from "@/store/usePostStore";
import type { Comment } from "@/store/usePostStore";

const getErrorMessage = async (response: Response, fallback: string) => {
    try {
        const data = (await response.json()) as { message?: unknown };
        if (typeof data.message === "string" && data.message.trim()) {
            return data.message;
        }
    } catch {
        return fallback;
    }
    return fallback;
};

export default function CommentSection() {
    const {
        currentPostId,
        posts,
        setComments,
        addComment,
        setCommentLikeState,
        toggleCommentLike
    } = usePostStore();

    const post = useMemo(
        () => posts.find(item => item.id === currentPostId),
        [posts, currentPostId]
    );

    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState<string | null>(null);
    const [busyCommentId, setBusyCommentId] = useState<number | null>(null);

    const buildLocalComment = (payload: { author: string; content: string; parentId?: number }) => {
        if (!post) return null;
        const nextId = post.comments.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
        const localComment: Comment = {
            id: nextId,
            content: payload.content.trim(),
            author: payload.author.trim() || "익명",
            timestamp: Date.now(),
            likes: 0,
            isLiked: false,
            parentId: payload.parentId
        };
        return localComment;
    };

    useEffect(() => {
        if (!currentPostId) return;
        let active = true;

        const loadComments = async () => {
            setLoading(true);
            setNotice(null);
            try {
                const response = await fetch(`/api/posts/${currentPostId}/comments`, {
                    cache: "no-store"
                });

                if (!response.ok) {
                    if (active) {
                        setNotice("서버 연결이 불안정해 로컬 댓글 모드로 동작합니다.");
                    }
                    return;
                }

                const data = await response.json();
                if (!active) return;

                if (Array.isArray(data)) {
                    setComments(currentPostId, data);
                } else {
                    setComments(currentPostId, []);
                }
            } catch {
                if (active) {
                    setNotice("네트워크 오류로 로컬 댓글 모드로 동작합니다.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        void loadComments();

        return () => {
            active = false;
        };
    }, [currentPostId, setComments]);

    const handleAddComment = async (payload: { author: string; content: string; parentId?: number }) => {
        if (!currentPostId) return;

        const body = {
            content: payload.content,
            author: payload.author,
            parentId: payload.parentId
        };

        try {
            const response = await fetch(`/api/posts/${currentPostId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const message = await getErrorMessage(response, "댓글 등록에 실패했습니다.");
                const localComment = buildLocalComment(payload);
                if (!localComment) {
                    throw new Error(message);
                }
                addComment(currentPostId, localComment);
                setNotice("서버 저장에 실패해 임시 로컬 댓글로 추가되었습니다.");
                return;
            }

            const data = await response.json();
            addComment(currentPostId, data);
            setNotice(null);
        } catch {
            const localComment = buildLocalComment(payload);
            if (!localComment) {
                throw new Error("댓글 등록에 실패했습니다.");
            }
            addComment(currentPostId, localComment);
            setNotice("네트워크 문제로 임시 로컬 댓글로 추가되었습니다.");
        }
    };

    const handleLikeComment = async (commentId: number) => {
        if (!currentPostId) return;

        setBusyCommentId(commentId);
        setNotice(null);
        try {
            const response = await fetch(`/api/posts/${currentPostId}/comments/${commentId}/like`, {
                method: "POST"
            });

            if (!response.ok) {
                toggleCommentLike(currentPostId, commentId);
                setNotice("로컬 댓글 모드에서 공감을 반영했습니다.");
                return;
            }

            const data = await response.json();
            if (
                typeof data.likes === "number" &&
                typeof data.isLiked === "boolean"
            ) {
                setCommentLikeState(currentPostId, commentId, data.likes, data.isLiked);
            }
        } catch {
            toggleCommentLike(currentPostId, commentId);
            setNotice("네트워크 문제로 로컬 공감으로 반영했습니다.");
        } finally {
            setBusyCommentId(null);
        }
    };

    const onSubmitComment = async (payload: { author: string; content: string }) => {
        await handleAddComment(payload);
    };

    const onSubmitReply = async (payload: { author: string; content: string; parentId: number }) => {
        await handleAddComment(payload);
    };

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

                {notice && (
                    <div className="mb-2.5 rounded-sm border border-[#e9ece7] bg-[#f8faf7] px-2.5 py-2 text-[12px] text-[#67756b]">
                        {notice}
                    </div>
                )}

                {loading ? (
                    <div className="py-6 text-center text-[13px] text-[#8f8f8f]">댓글을 불러오는 중입니다.</div>
                ) : (
                    <CommentList
                        comments={post.comments}
                        onLikeComment={handleLikeComment}
                        onAddReply={onSubmitReply}
                        readOnly={!post.commentsEnabled}
                        busyCommentId={busyCommentId}
                    />
                )}

                <div className="mt-3">
                    <CommentInput
                        onAddComment={onSubmitComment}
                        disabled={!post.commentsEnabled}
                        disabledMessage="댓글이 비활성화되었습니다."
                        placeholder="댓글을 입력해 주세요."
                    />
                </div>

                <MobileSidebar />
                    </>
                )}
            </div>
        </section>
    );
}
