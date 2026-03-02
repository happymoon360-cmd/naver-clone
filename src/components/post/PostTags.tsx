"use client";

import { usePostStore } from "@/store/usePostStore";

export default function PostTags() {
    const { currentPostId, posts } = usePostStore();
    const post = posts.find(item => item.id === currentPostId);

    if (!post || post.tags.length === 0) return null;

    const visibleTags = post.tags.slice(0, 4);
    const hiddenTagCount = Math.max(0, post.tags.length - visibleTags.length);

    return (
        <section className="bg-white px-3.5 pb-2.5 pt-0.5">
            <div className="flex flex-wrap gap-1.5">
                {visibleTags.map(tag => (
                    <span
                        key={tag}
                        className="inline-flex h-6 items-center rounded-full bg-[#f2f2f2] px-2.5 text-[11px] text-[#404040]"
                    >
                        #{tag}
                    </span>
                ))}
                {hiddenTagCount > 0 ? (
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-[8px] bg-[#f2f2f2] px-1.5 text-[11px] text-[#666]">
                        +{hiddenTagCount}
                    </span>
                ) : null}
            </div>
        </section>
    );
}
