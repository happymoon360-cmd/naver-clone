"use client";

import Image from "next/image";
import { BadgeCheck, MoreVertical } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";

const getInitial = (value: string) => value.trim().charAt(0) || "B";

export default function PostHeader() {
    const { posts, currentPostId } = usePostStore();
    const post = posts.find(p => p.id === currentPostId);

    if (!post) return null;

    const postIndex = Math.max(1, posts.findIndex(item => item.id === post.id) + 1);
    const displayCategory = "카테고리";
    const displayTitle = `포스트 제목 ${String(postIndex).padStart(2, "0")}`;

    const hasProfileImage = post.authorProfileImage.trim().length > 0;

    return (
        <section className="bg-white">
            <div className="px-3.5 pb-3.5 pt-3.5">
                <p className="text-[12px] font-normal text-[#666]">{displayCategory}</p>

                <h1 className="mt-2 text-[27px] font-extrabold leading-[1.3] tracking-[-0.03em] text-[#101010]">
                    {displayTitle}
                </h1>

                <div className="mt-4.5 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#ececec]">
                            {hasProfileImage ? (
                                <Image src={post.authorProfileImage} alt={post.author} fill className="object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center text-[12px] font-semibold text-[#5f5f5f]">
                                    {getInitial(post.author)}
                                </span>
                            )}
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-1 text-[14px] font-semibold text-[#111]">
                                <span className="truncate">{post.author}</span>
                                <BadgeCheck size={14} className="text-primary" strokeWidth={1.8} />
                            </div>
                            <p className="mt-0.5 text-[11px] text-[#8d8d8d]">{post.date}</p>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                        <button type="button" className="h-7 rounded-[4px] border border-primary px-2.5 text-[11px] font-semibold text-primary">
                            +구독
                        </button>
                        <button type="button" aria-label="더보기" className="grid h-7 w-7 place-items-center text-[#7b7b7b]">
                            <MoreVertical size={15} strokeWidth={1.9} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-3.5 border-b border-border" />
        </section>
    );
}
