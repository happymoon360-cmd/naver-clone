"use client";

import SeText from "../smart-editor/SeText";
import SeImage from "../smart-editor/SeImage";
import SeQuote from "../smart-editor/SeQuote";
import SeLine from "../smart-editor/SeLine";
import { usePostStore, BlockType, ContentBlock } from "@/store/usePostStore";

export default function PostBody() {
    const { posts, currentPostId } = usePostStore();
    const post = posts.find(p => p.id === currentPostId);

    if (!post) return <div className="px-4 py-8 text-center text-[#888]">Post not found</div>;

    const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const textPool = ["본문 텍스트", "디자인 샘플", "레이아웃 확인", "구성 확인 문장"];
    const compactText = (seed: string) => textPool[seed.length % textPool.length];
    const fallbackImages = [
        "https://picsum.photos/seed/bestie-inline-1/1200/900",
        "https://picsum.photos/seed/bestie-inline-2/1200/900",
        "https://picsum.photos/seed/bestie-inline-3/1200/900"
    ];

    const renderBlock = (block: ContentBlock) => {
        switch (block.type as BlockType) {
            case "text":
                return <SeText key={block.id}>{compactText(block.id)}</SeText>;
            case "html":
                return <SeText key={block.id}>{compactText(stripHtml(block.content ?? "") + block.id)}</SeText>;
            case "image":
                if (!block.src) return null;
                return (
                    <SeImage
                        key={block.id}
                        src={block.src}
                        caption={block.caption}
                        width={block.width}
                        height={block.height}
                    />
                );
            case "quote":
                return <SeQuote key={block.id}>{"강조 문장"}</SeQuote>;
            case "line":
                return <SeLine key={block.id} />;
            default:
                return null;
        }
    };

    const hasImageBlock = post.content.some(block => block.type === "image");
    const decoratedContent = post.content.flatMap((block, blockIndex) => {
        const rendered = renderBlock(block);
        if (!rendered) return [];
        if (hasImageBlock || block.type !== "text") return [rendered];

        const textOrder = post.content
            .slice(0, blockIndex + 1)
            .filter(item => item.type === "text").length;

        if (textOrder % 9 !== 0) return [rendered];

        const imageSrc = fallbackImages[Math.floor(textOrder / 9) % fallbackImages.length];
        return [
            rendered,
            <SeImage
                key={`fallback-image-${block.id}`}
                src={imageSrc}
                caption="본문 이미지"
                width={1200}
                height={900}
            />
        ];
    });

    return (
        <section className="bg-white px-3.5 pb-5 pt-3.5">
            <div className="space-y-4">{decoratedContent}</div>
        </section>
    );
}
