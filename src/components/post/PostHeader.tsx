"use client";

import Image from "next/image";
import { BadgeCheck, MoreVertical } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";

const getInitial = (value: string) => value.trim().charAt(0) || "B";

export default function PostHeader() {
    const { posts, currentPostId } = usePostStore();
    const post = posts.find(p => p.id === currentPostId);

    if (!post) return null;

    const hasProfileImage = post.authorProfileImage.trim().length > 0;

    return (
        <section className="bg-white">
            <div className="px-5 pb-4 pt-7">
                <p className="text-[14px] font-normal text-[#666]">{post.category}</p>

                <h1 className="mt-3 text-[31px] font-bold leading-[1.38] tracking-[-0.02em] text-[#101010]">
                    {post.title}
                </h1>

                <div className="mt-6 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#ececec]">
                            {hasProfileImage ? (
                                <Image src={post.authorProfileImage} alt={post.author} fill className="object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center text-[14px] font-semibold text-[#5f5f5f]">
                                    {getInitial(post.author)}
                                </span>
                            )}
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-1 text-[15px] font-semibold text-[#111]">
                                <span className="truncate">{post.author}</span>
                                <BadgeCheck size={16} className="text-primary" strokeWidth={1.8} />
                            </div>
                            <p className="mt-0.5 text-[12px] text-[#8d8d8d]">{post.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="h-8 rounded-[4px] border border-primary px-3 text-[13px] font-medium text-primary"
                        >
                            + 이웃추가
                        </button>
                        <button
                            type="button"
                            aria-label="더보기"
                            className="grid h-8 w-8 place-items-center rounded-md text-[#666]"
                        >
                            <MoreVertical size={18} strokeWidth={1.8} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-5 border-b border-border" />
        </section>
    );
}
