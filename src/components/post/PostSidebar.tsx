"use client";

import Image from "next/image";
import { usePostStore } from "@/store/usePostStore";

const FALLBACK_THUMBNAIL = "https://picsum.photos/seed/naver-related/900/700";
const toSimpleTitle = (index: number) => `관련 글 제목 ${String(index + 1).padStart(2, "0")}`;

export default function PostSidebar() {
    const { posts, currentPostId } = usePostStore();
    const post = posts.find(item => item.id === currentPostId);

    const relatedPosts = posts.filter(item => item.id !== currentPostId).slice(0, 6);

    if (!post || relatedPosts.length === 0) return null;

    return (
        <aside className="hidden md:block">
            <div className="sticky top-[76px]">
                <section className="rounded-[12px] border border-[#e8e8e8] bg-white p-4">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#ececec]">
                                {post.authorProfileImage ? (
                                    <Image src={post.authorProfileImage} alt={post.author} fill className="object-cover" />
                                ) : (
                                    <span className="flex h-full w-full items-center justify-center text-[12px] font-semibold text-[#5f5f5f]">
                                        {post.author.slice(0, 1)}
                                    </span>
                                )}
                            </div>
                            <div>
                                <p className="text-[14px] font-semibold text-[#1b1b1b]">{post.author}</p>
                                <p className="mt-0.5 text-[11px] text-[#8b8b8b]">일상 기록과 작업 로그</p>
                            </div>
                        </div>
                        <button type="button" className="rounded-[5px] border border-[#03c75a] px-2.5 py-1 text-[11px] font-semibold text-[#03c75a]">
                            + 이웃추가
                        </button>
                    </div>
                </section>

                <section className="mt-4 rounded-[12px] border border-[#e8e8e8] bg-white p-4">
                    <div className="mb-2.5 flex items-center justify-between">
                        <h4 className="text-[14px] font-bold text-[#111]">이 블로그의 최근 글</h4>
                        <button type="button" className="text-[11px] text-[#777]">더보기</button>
                    </div>
                    <div className="space-y-2.5">
                        {relatedPosts.slice(0, 3).map((item, index) => (
                            <article key={item.id} className="flex items-center gap-2 rounded-[8px] border border-[#efefef] bg-white p-2">
                                <div className="relative h-[56px] w-[78px] shrink-0 overflow-hidden rounded-[6px] bg-[#f1f1f1]">
                                    {item.headerImage ? (
                                        <Image src={item.headerImage} alt={item.title} fill className="object-cover" />
                                    ) : (
                                        <Image src={FALLBACK_THUMBNAIL} alt={item.title} fill className="object-cover" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="line-clamp-2 text-[12px] font-medium leading-[1.35] text-[#202020]">{toSimpleTitle(index)}</p>
                                    <p className="mt-1 text-[11px] text-[#8d8d8d]">{item.date}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-4 rounded-[12px] border border-[#e8e8e8] bg-white p-4">
                    <h4 className="mb-2.5 text-[14px] font-bold text-[#111]">연관 콘텐츠</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {relatedPosts.slice(0, 4).map((item, index) => (
                            <article key={`${item.id}-thumb`} className="overflow-hidden rounded-[8px] border border-[#efefef] bg-white">
                                <div className="relative aspect-[4/3] w-full bg-[#f1f1f1]">
                                    {item.headerImage ? (
                                        <Image src={item.headerImage} alt={item.title} fill className="object-cover" />
                                    ) : (
                                        <Image src={FALLBACK_THUMBNAIL} alt={item.title} fill className="object-cover" />
                                    )}
                                </div>
                                <div className="p-2">
                                    <p className="line-clamp-2 text-[11px] leading-[1.3] text-[#292929]">{toSimpleTitle(index)}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="mt-5 border-t border-[#efefef] pt-3 text-center text-[22px] font-semibold tracking-[-0.03em] text-[#1f1f1f]">
                        blog
                    </div>
                </section>
            </div>
        </aside>
    );
}
