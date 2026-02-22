"use client";

import SeText from "../smart-editor/SeText";
import SeImage from "../smart-editor/SeImage";
import SeQuote from "../smart-editor/SeQuote";
import SeLine from "../smart-editor/SeLine";
import { usePostStore, BlockType, ContentBlock } from "@/store/usePostStore";

export default function PostBody() {
    const { posts, currentPostId } = usePostStore();
    const post = posts.find(p => p.id === currentPostId);

    if (!post) return <div className="px-5 py-10 text-center text-[#888]">Post not found</div>;

    const renderBlock = (block: ContentBlock) => {
        switch (block.type as BlockType) {
            case "text":
                return <SeText key={block.id}>{block.content}</SeText>;
            case "html":
                return (
                    <div
                        key={block.id}
                        className="article-html"
                        dangerouslySetInnerHTML={{ __html: block.content ?? "" }}
                    />
                );
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
                return <SeQuote key={block.id}>{block.content}</SeQuote>;
            case "line":
                return <SeLine key={block.id} />;
            default:
                return null;
        }
    };

    return (
        <section className="se-main-container bg-white px-5 pb-6 pt-5">
            <div className="space-y-6">{post.content.map(renderBlock)}</div>
        </section>
    );
}
