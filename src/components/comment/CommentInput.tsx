"use client";

import { useState } from "react";

interface CommentInputProps {
    onAddComment: (payload: { author: string; content: string }) => void | Promise<void>;
    disabled?: boolean;
    disabledMessage?: string;
    defaultAuthor?: string;
    compact?: boolean;
    submitLabel?: string;
    placeholder?: string;
}

export default function CommentInput({
    onAddComment,
    disabled,
    disabledMessage = "댓글을 작성하려면 로그인 해주세요.",
    defaultAuthor = "",
    compact = false,
    submitLabel = "등록",
    placeholder = "댓글을 남겨보세요."
}: CommentInputProps) {
    const [author, setAuthor] = useState(defaultAuthor);
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const canSubmit = !disabled && !submitting && content.trim().length > 0;

    const handleSubmit = async () => {
        if (!canSubmit) return;
        setSubmitting(true);
        try {
            await onAddComment({
                author: author.trim(),
                content: content.trim()
            });
            setContent("");
        } catch {
            return;
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void handleSubmit();
        }
    };

    if (disabled) {
        return (
            <div className="rounded-sm border border-[#e3e3e3] bg-white px-4 py-4 text-[15px] text-[#9a9a9a]">
                {disabledMessage}
            </div>
        );
    }

    return (
        <div className={`rounded-sm border border-[#e3e3e3] bg-white ${compact ? "p-3" : "p-4"}`}>
            <input
                value={author}
                onChange={e => setAuthor(e.target.value)}
                maxLength={24}
                className="mb-2 w-full rounded-sm border border-[#ededed] px-3 py-2 text-[13px] outline-none focus:border-[#cfd8d3] focus:ring-1 focus:ring-[#dce7e1]"
                placeholder="닉네임"
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`w-full resize-none rounded-sm border border-[#ededed] px-3 py-2 text-[14px] leading-6 outline-none focus:border-[#cfd8d3] focus:ring-1 focus:ring-[#dce7e1] ${compact ? "h-20" : "h-24"}`}
                placeholder={placeholder}
            />

            <div className="mt-3 flex items-center justify-end">
                <button
                    type="button"
                    onClick={() => void handleSubmit()}
                    disabled={!canSubmit}
                    className="rounded-sm bg-[#03c75a] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#00b14f] disabled:cursor-not-allowed disabled:bg-[#9fcab2]"
                >
                    {submitting ? "등록 중" : submitLabel}
                </button>
            </div>
        </div>
    );
}
