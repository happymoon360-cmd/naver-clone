"use client";

import Image from "next/image";
import { usePostStore } from "@/store/usePostStore";
import { FALLBACK_THUMBNAIL, toSimpleTitle } from "@/lib/blogConstants";

export default function MobileSidebar() {
    const { posts, currentPostId } = usePostStore();
    const post = posts.find(item => item.id === currentPostId);
    const relatedPosts = posts.filter(item => item.id !== currentPostId).slice(0, 6);

    if (!post || relatedPosts.length === 0) return null;

    return (
        <>
            {/* Author card */}
            <section className="mt-6 rounded-[10px] border border-[#ececec] bg-[#fafafa] px-3.5 py-3.5 md:hidden">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#e8e8e8]">
                            {post.authorProfileImage ? (
                                <Image src={post.authorProfileImage} alt={post.author} fill className="object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center text-[14px] font-semibold text-[#555]">
                                    {post.author.slice(0, 1)}
                                </span>
                            )}
                        </div>
                        <div>
                            <p className="text-[14px] font-semibold text-[#1b1b1b]">{post.author}</p>
                            <p className="mt-0.5 text-[11px] text-[#8b8b8b]">mybestie</p>
                        </div>
                    </div>
                    <button type="button" className="rounded-[5px] border border-primary px-2.5 py-1 text-[11px] font-semibold text-primary">
                        + 구독
                    </button>
                </div>
            </section>

            {/* Recent posts */}
            <section className="mt-5 md:hidden">
                <div className="mb-2.5 flex items-center justify-between">
                    <h4 className="text-[14px] font-bold text-[#111]">최근 글</h4>
                    <button type="button" className="text-[11px] text-[#777]">더보기</button>
                </div>
                <div className="space-y-2.5">
                    {relatedPosts.slice(0, 3).map((item, index) => (
                        <article key={item.id} className="flex items-center gap-2.5 rounded-[8px] border border-[#efefef] bg-white p-2">
                            <div className="relative h-[60px] w-[84px] shrink-0 overflow-hidden rounded-[6px] bg-[#f1f1f1]">
                                <Image
                                    src={item.headerImage || FALLBACK_THUMBNAIL}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="line-clamp-2 text-[12px] font-medium leading-[1.35] text-[#202020]">{toSimpleTitle(index)}</p>
                                <p className="mt-1 text-[11px] text-[#8d8d8d]">{item.date}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Related content grid */}
            <section className="mt-5 md:hidden">
                <h4 className="mb-2.5 text-[14px] font-bold text-[#111]">관련 글</h4>
                <div className="grid grid-cols-2 gap-2">
                    {relatedPosts.slice(0, 4).map((item, index) => (
                        <article key={`${item.id}-thumb`} className="overflow-hidden rounded-[8px] border border-[#efefef] bg-white">
                            <div className="relative aspect-[4/3] w-full bg-[#f1f1f1]">
                                <Image
                                    src={item.headerImage || FALLBACK_THUMBNAIL}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-2">
                                <p className="line-clamp-2 text-[11px] leading-[1.3] text-[#292929]">{toSimpleTitle(index)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
