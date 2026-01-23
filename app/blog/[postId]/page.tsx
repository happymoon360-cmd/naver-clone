import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PostDetail({ params }: { params: Promise<{ postId: string }> }) {
    const { postId: idStr } = await params;
    const postId = parseInt(idStr);

    if (isNaN(postId)) return notFound();

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) return notFound();

    // 일단 메인 페이지로 리다이렉트 (나중에 동적 데이터 연동 시 수정)
    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-xl font-bold">{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>
    );
}
