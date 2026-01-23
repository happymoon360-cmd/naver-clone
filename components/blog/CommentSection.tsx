"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { User, MessageSquare, Heart, CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
    id: number;
    authorName: string;
    content: string;
    likeCount: number;
    createdAt: string;
    parentId?: number | null;
}

interface CommentProps {
    postId: string | null;
    allowComment?: boolean;
}

export function CommentSection({ postId, allowComment = true }: CommentProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("익명");
    const [replyTo, setReplyTo] = useState<number | null>(null);

    useEffect(() => {
        if (postId) {
            fetchComments();
        }
    }, [postId]);

    const fetchComments = () => {
        fetch(`/api/posts/${postId}/comments`)
            .then((res) => res.json())
            .then(setComments)
            .catch(console.error);
    };

    const handleSubmit = async (parentId?: number) => {
        if (!allowComment) return;
        if (!content.trim() || !postId) return;

        const res = await fetch(`/api/posts/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify({
                authorName,
                content,
                parentId: parentId || null,
            }),
        });

        if (res.ok) {
            setContent("");
            setReplyTo(null);
            fetchComments();
        }
    };

    const handleLike = async (commentId: number) => {
        // Optimistic update
        setComments(prev => prev.map(c =>
            c.id === commentId ? { ...c, likeCount: c.likeCount + 1 } : c
        ));

        await fetch(`/api/comments/${commentId}/likes`, { method: "POST" });
    };

    const renderComment = (comment: Comment, isReply = false) => (
        <div key={comment.id} className={cn("flex gap-3", isReply && "pl-11 mt-3")}>
            <div className="w-[34px] h-[34px] rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                <svg className="w-full h-full text-white bg-[#d6d6d6] p-1.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-bold text-[13px] text-[#333]">{comment.authorName}</span>
                </div>
                <div className="text-[14px] text-[#333] whitespace-pre-wrap leading-6 mb-1.5">{comment.content}</div>

                <div className="flex items-center gap-2 text-[12px] text-[#959595]">
                    <span>{format(new Date(comment.createdAt), "yyyy.M.d. HH:mm")}</span>
                    {!isReply && allowComment && (
                        <>
                            <span className="w-0.5 h-0.5 bg-[#dcdcdc] rounded-full"></span>
                            <button onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)} className="font-bold text-[#666]">답글쓰기</button>
                        </>
                    )}
                    {(comment.likeCount > 0 || allowComment) && (
                        <div className="flex items-center gap-1 ml-auto">
                            <button onClick={() => handleLike(comment.id)} className="flex items-center gap-1">
                                <Heart className={cn("w-3.5 h-3.5", comment.likeCount > 0 ? "fill-red-500 text-red-500" : "text-[#bbbbbb]")} />
                                {comment.likeCount > 0 && <span className="text-xs">{comment.likeCount}</span>}
                            </button>
                        </div>
                    )}
                </div>

                {/* Reply Form - Only if allowed */}
                {allowComment && replyTo === comment.id && !isReply && (
                    <div className="mt-3 bg-[#f9f9f9] p-3 rounded border border-[#efefef]">
                        <input
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="text-[13px] font-bold border-b border-[#e5e5e5] mb-2 w-full bg-transparent outline-none pb-1 placeholder:font-normal"
                            placeholder="닉네임"
                        />
                        <textarea
                            className="w-full h-16 text-[14px] p-2 border border-[#e5e5e5] bg-white rounded resize-none mb-2 focus:border-[#03c75a] outline-none"
                            placeholder="답글을 남겨주세요."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setReplyTo(null)} className="px-3 py-1.5 text-[12px] border border-[#d6d6d6] bg-white rounded text-[#666]">취소</button>
                            <button onClick={() => handleSubmit(comment.id)} className="px-3 py-1.5 text-[12px] bg-[#03c75a] text-white rounded font-bold">등록</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    if (!postId) return null;

    const rootComments = comments.filter(c => !c.parentId);

    return (
        <div className="border-t border-[#f0f0f0] pt-6">
            <div className="flex items-center gap-1 mb-5">
                <h3 className="font-bold text-[16px] text-black">댓글</h3>
                <span className="text-[#03c75a] font-bold text-[16px]">{comments.length}</span>
            </div>

            <div className="space-y-6 mb-8 px-1">
                {rootComments.map(root => (
                    <div key={root.id}>
                        {renderComment(root)}
                        {comments.filter(c => c.parentId === root.id).map(reply => renderComment(reply, true))}
                    </div>
                ))}
            </div>

            {/* Main Comment Form - Only if allowed */}
            {allowComment && replyTo === null && (
                <div className="bg-[#f7f7f7] p-4 rounded-[8px] border border-[#f0f0f0]">
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            type="text"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="text-[13px] font-bold bg-transparent border-b border-[#e0e0e0] focus:border-black outline-none w-32 px-1 pb-1 placeholder:font-normal"
                            placeholder="닉네임"
                        />
                    </div>
                    <div className="relative">
                        <textarea
                            className="w-full h-24 bg-white border border-[#e0e0e0] rounded-[6px] p-3 text-[14px] resize-none focus:outline-none focus:border-[#03c75a] placeholder:text-[#bbbbbb]"
                            placeholder="댓글을 남겨보세요."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={() => handleSubmit()}
                                className="bg-[#03c75a] text-white px-4 py-2 text-[13px] font-bold rounded-[4px] hover:bg-[#02b351] transition-colors"
                            >
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
