import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/layout/Sidebar";
import { PostArticle } from "@/components/blog/PostArticle";
import { notFound } from "next/navigation";

export default async function PostDetail({ params }: { params: Promise<{ postId: string }> }) {
    const { postId: idStr } = await params;
    const postId = parseInt(idStr);

    if (isNaN(postId)) return notFound();

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) return notFound();

    return (
        <div className="flex flex-col gap-4 p-4">
            <PostArticle post={post} />
            <Sidebar className="w-full" />
        </div>
    );
}
