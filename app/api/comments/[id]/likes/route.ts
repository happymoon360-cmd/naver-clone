import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const comment = await prisma.comment.update({
            where: { id },
            data: { likeCount: { increment: 1 } },
        });
        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: "Failed to increment comment likes" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const body = await request.json();
        const { count } = body; // Directly set like count

        const comment = await prisma.comment.update({
            where: { id },
            data: { likeCount: count },
        });
        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update comment likes" }, { status: 500 });
    }
}
