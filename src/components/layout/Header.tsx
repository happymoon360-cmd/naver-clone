"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full">
            {/* Minimal Header - Blog Title Only */}
            <div className="w-full border-b border-border bg-white h-16 flex items-center justify-center px-6">
                <Link href="/" className="text-xl font-semibold text-text tracking-tight">
                    My Blog
                </Link>
            </div>
        </header>
    );
}
