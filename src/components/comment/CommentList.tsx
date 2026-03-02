"use client";

import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import type { Comment } from "@/store/usePostStore";
import CommentInput from "./CommentInput";

interface CommentListProps {
    comments: Comment[];
    onLikeComment: (id: number) => void;
    onAddReply: (payload: { author: string; content: string; parentId: number }) => void | Promise<void>;
    readOnly?: boolean;
    busyCommentId?: number | null;
}

export default function CommentList({ comments, onLikeComment, onAddReply, readOnly, busyCommentId }: CommentListProps) {
    if (comments.length === 0) {
        return (
            <div className="py-10 text-center text-[#8f8f8f]">
                <MessageCircle size={28} className="mx-auto mb-2 opacity-60" />
                <p className="text-[14px]">첫 댓글을 남겨보세요.</p>
            </div>
        );
    }

    const sorted = [...comments].sort((a, b) => b.timestamp - a.timestamp);

    const topLevel = sorted.filter(comment => !comment.parentId);
    const repliesByParent: Record<number, Comment[]> = {};

    sorted.forEach(comment => {
        if (comment.parentId) {
            if (!repliesByParent[comment.parentId]) {
                repliesByParent[comment.parentId] = [];
            }
            repliesByParent[comment.parentId].push(comment);
        }
    });

    return (
        <div className="space-y-2">
            {topLevel.map(comment => (
                <div key={comment.id}>
                    <CommentItem
                        comment={comment}
                        onLike={() => onLikeComment(comment.id)}
                        onReply={payload => onAddReply({ ...payload, parentId: comment.id })}
                        canReply={!readOnly}
                        isReadOnly={readOnly}
                        busy={busyCommentId === comment.id}
                    />
                    {repliesByParent[comment.id] &&
                        repliesByParent[comment.id]
                            .sort((a, b) => a.timestamp - b.timestamp)
                            .map(reply => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                onLike={() => onLikeComment(reply.id)}
                                onReply={() => Promise.resolve()}
                                isReply
                                isReadOnly={readOnly}
                                busy={busyCommentId === reply.id}
                            />
                        ))}
                </div>
            ))}
        </div>
    );
}

interface CommentItemProps {
    comment: Comment;
    onLike: () => void;
    onReply: (payload: { author: string; content: string }) => void | Promise<void>;
    isReply?: boolean;
    canReply?: boolean;
    isReadOnly?: boolean;
    busy?: boolean;
}

function CommentItem({ comment, onLike, onReply, isReply, canReply, isReadOnly, busy }: CommentItemProps) {
    const [isReplying, setIsReplying] = useState(false);

    const handleLike = () => {
        onLike();
    };

    const handleReplySubmit = async (payload: { author: string; content: string }) => {
        await onReply(payload);
        setIsReplying(false);
    };

    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const initial = comment.author.trim().charAt(0) || "익";

    return (
        <article className={`border-b border-[#efefef] px-0 py-4 ${isReply ? "ml-7" : ""}`}>
            <div className="flex items-start gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ececec] text-[12px] font-semibold text-[#656565]">
                    {initial}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="text-[14px] font-semibold text-[#1f1f1f]">{comment.author}</div>
                        <div className="text-[12px] text-[#999]">{formatTime(comment.timestamp)}</div>
                    </div>

                    <p className="mt-2 whitespace-pre-wrap text-[15px] leading-[1.55] text-[#272727]">{comment.content}</p>

                    <div className="mt-3 flex items-center gap-4">
                        <button
                            type="button"
                            onClick={handleLike}
                            disabled={isReadOnly || busy}
                            className={`inline-flex items-center gap-1 text-[13px] transition-colors ${
                                comment.isLiked ? "text-[#ff5e8b]" : "text-[#888] hover:text-[#4f4f4f]"
                            } ${isReadOnly || busy ? "cursor-not-allowed opacity-70" : ""}`}
                        >
                            <Heart size={14} fill={comment.isLiked ? "currentColor" : "none"} />
                            <span>{comment.likes}</span>
                        </button>

                        {canReply && (
                            <button
                                type="button"
                                onClick={() => setIsReplying(prev => !prev)}
                                className="text-[13px] text-[#9a9a9a] transition-colors hover:text-[#6c6c6c]"
                            >
                                {isReplying ? "취소" : "답글"}
                            </button>
                        )}
                    </div>

                    {canReply && isReplying && (
                        <div className="mt-3">
                            <CommentInput
                                compact
                                submitLabel="답글 등록"
                                placeholder="답글을 입력하세요."
                                onAddComment={handleReplySubmit}
                            />
                        </div>
                    )}
                </div>
                {busy && (
                    <div className="pt-2 text-[12px] text-[#9a9a9a]">
                        처리 중...
                    </div>
                )}
            </div>
        </article>
    );
}
