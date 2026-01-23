import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idStr } = await params;
        const postId = parseInt(idStr);
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "asc" }, // Comments usually old -> new
        });
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idStr } = await params;
        const postId = parseInt(idStr);
        const body = await request.json();
        const { authorName, content, authorIcon, parentId } = body;

        const comment = await prisma.comment.create({
            data: {
                postId,
                authorName, // Core feature: Arbitrary name
                content,
                authorIcon,
                parentId,
            },
        });
        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
    }
}
