import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Find the first config, if not exists, create one
        let config = await prisma.blogConfig.findFirst();

        if (!config) {
            config = await prisma.blogConfig.create({
                data: {
                    blogName: "My Blog",
                    ownerName: "Owner",
                    categories: "Daily,Tech,Travel",
                },
            });
        }

        return NextResponse.json(config);
    } catch (error) {
        console.error("Error fetching config:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog config" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { blogName, ownerName, categories } = body;

        // Validate inputs (basic)
        if (!blogName || !ownerName || !categories) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Upsert the first record (id: 1 usually, but findFirst is safer logic)
        const firstConfig = await prisma.blogConfig.findFirst();

        const config = await prisma.blogConfig.upsert({
            where: {
                id: firstConfig?.id || 1, // Fallback to 1 if empty/deleted
            },
            update: {
                blogName,
                ownerName,
                categories,
            },
            create: {
                blogName,
                ownerName,
                categories,
            },
        });

        return NextResponse.json(config);
    } catch (error) {
        console.error("Error updating config:", error);
        return NextResponse.json(
            { error: "Failed to update blog config" },
            { status: 500 }
        );
    }
}
