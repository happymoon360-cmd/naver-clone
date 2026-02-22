"use client";

import { BadgeCheck, ChevronRight, Heart, MessageCircle, Play } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";

const clipCards = [
    {
        id: "clip-1",
        title: "결국 멀리 가는 사람은 매일 같은 루틴을 지킨다",
        time: "3분 전",
        likes: 24,
        comments: 3,
        author: "팀 트라이"
    },
    {
        id: "clip-2",
        title: "의욕이 없어도 앞으로 나아가게 만드는 체크리스트",
        time: "9분 전",
        likes: 17,
        comments: 1,
        author: "팀 트라이"
    },
    {
        id: "clip-3",
        title: "집중력이 흔들릴 때 다시 중심을 잡는 5가지 방법",
        time: "23분 전",
        likes: 31,
        comments: 6,
        author: "팀 트라이"
    },
    {
        id: "clip-4",
        title: "작게 시작해서 끝까지 가는 시스템 설계법",
        time: "1시간 전",
        likes: 42,
        comments: 8,
        author: "팀 트라이"
    }
];

export default function CommentSection() {
    const { currentPostId, posts, setCurrentPostId } = usePostStore();
    const post = posts.find(item => item.id === currentPostId);

    if (!post) return null;

    const sameCategoryPosts = posts.filter(item => item.category === post.category);
    const currentIndex = sameCategoryPosts.findIndex(item => item.id === post.id);
    const previousPost = currentIndex > 0 ? sameCategoryPosts[currentIndex - 1] : null;
    const nextPost = currentIndex >= 0 && currentIndex < sameCategoryPosts.length - 1
        ? sameCategoryPosts[currentIndex + 1]
        : null;

    const handleNavigatePost = (targetId: string | null) => {
        if (!targetId) return;
        setCurrentPostId(targetId);
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <section id="comment-section" className="border-t border-border bg-white">
            <div className="px-5 pb-4 pt-2">
                <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 4).map(tag => (
                        <span
                            key={tag}
                            className="inline-flex h-7 items-center rounded-full bg-[#f2f2f2] px-3 text-[13px] text-[#404040]"
                        >
                            #{tag}
                        </span>
                    ))}
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#f2f2f2] text-[12px] text-[#666]">
                        +1
                    </span>
                </div>
            </div>

            <div className="px-5">
                <div className="rounded-2xl border border-[#e6e8eb] bg-white px-4 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[#eceff3] text-[20px] text-[#7a7a7a]">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5 text-[15px] font-semibold text-[#111]">
                                    <span>{post.author}</span>
                                    <BadgeCheck size={16} className="text-primary" strokeWidth={1.8} />
                                </div>
                                <p className="mt-1 text-[12px] text-[#7f7f7f]">꾸준한 성장 루틴을 기록합니다.</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="h-9 rounded-lg bg-primary px-4 text-[13px] font-semibold text-white"
                        >
                            이웃추가
                        </button>
                    </div>

                    <p className="mt-3 text-[13px] leading-[1.6] text-[#4a4a4a]">
                        매일의 실행 기록과 복기 노트를 통해 오래 가는 시스템을 만드는 방법을 공유합니다.
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-[12px] text-[#8a8a8a]">
                        <span>글 412</span>
                        <span>이웃 8,421</span>
                        <span>구독 1,203</span>
                    </div>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 px-5">
                <button
                    type="button"
                    onClick={() => handleNavigatePost(previousPost?.id ?? null)}
                    disabled={!previousPost}
                    className={`rounded-xl border px-4 py-3 text-left ${previousPost
                        ? "border-[#e4e4e4] bg-white"
                        : "border-[#efefef] bg-[#fafafa] text-[#a0a0a0]"
                        }`}
                >
                    <p className="text-[12px] font-semibold">이전글</p>
                    <p className="mt-1 line-clamp-2 text-[13px] leading-[1.5]">
                        {previousPost ? previousPost.title : "이전 글이 없습니다."}
                    </p>
                </button>

                <button
                    type="button"
                    onClick={() => handleNavigatePost(nextPost?.id ?? null)}
                    disabled={!nextPost}
                    className={`rounded-xl border px-4 py-3 text-left ${nextPost
                        ? "border-[#e4e4e4] bg-white"
                        : "border-[#efefef] bg-[#fafafa] text-[#a0a0a0]"
                        }`}
                >
                    <p className="text-right text-[12px] font-semibold">다음글</p>
                    <p className="mt-1 line-clamp-2 text-right text-[13px] leading-[1.5]">
                        {nextPost ? nextPost.title : "다음 글이 없습니다."}
                    </p>
                </button>
            </div>

            <div className="mt-8 px-5">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#1a1a1a]">
                        <span className="text-primary">네이버</span> 블로그 검색 클립 더보기
                    </h3>
                    <ChevronRight size={22} className="text-[#1f1f1f]" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    {clipCards.map(card => (
                        <article key={card.id} className="min-w-0">
                            <div className="relative h-[250px] overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#73b8ff_0%,#3f7fd8_40%,#274f91_100%)]">
                                <div className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full border border-white/70 bg-black/25 text-white">
                                    <Play size={15} className="translate-x-[1px]" fill="currentColor" />
                                </div>
                            </div>

                            <h4 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-[1.4] text-[#161616]">
                                {card.title}
                            </h4>

                            <div className="mt-1 flex items-center gap-2 text-[12px] text-[#7f7f7f]">
                                <span>{card.time}</span>
                                <span className="inline-flex items-center gap-1">
                                    <Heart size={12} /> {card.likes}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <MessageCircle size={12} /> {card.comments}
                                </span>
                            </div>

                            <div className="mt-2 flex items-center gap-2 text-[13px] text-[#6f6f6f]">
                                <span className="grid h-5 w-5 place-items-center rounded-full border border-[#d8d8d8] bg-[#f5f5f5] text-[10px]">
                                    팀
                                </span>
                                <span>{card.author}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="pb-10 pt-8 text-center text-[26px] tracking-[-0.02em] text-[#dddddd]">blog</div>
        </section>
    );
}
