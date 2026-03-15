"use client";

import Link from "next/link";
import { blogConfig } from "@/lib/blogConfig";

export default function Header() {
    return (
        <header className="w-full">
            {/* Minimal Header - Blog Title Only */}
            <div className="w-full border-b border-border bg-white h-16 flex items-center justify-center px-6">
                <Link href="/" className="text-xl font-semibold text-text tracking-tight">
                    {blogConfig.name}
                </Link>
            </div>
        </header>
    );
}
