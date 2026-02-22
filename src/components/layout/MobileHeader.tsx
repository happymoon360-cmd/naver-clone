import Link from "next/link";
import { LayoutGrid, Menu, Search } from "lucide-react";

export default function MobileHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur">
            <div className="flex h-14 items-center gap-3 px-5">
                <Link href="/" className="text-[28px] leading-none tracking-[-0.02em] text-[#1f1f1f]">
                    blog
                </Link>

                <Link href="/posts" className="flex min-w-0 items-center gap-2">
                    <LayoutGrid size={18} strokeWidth={1.9} className="shrink-0 text-[#202020]" />
                    <span className="truncate text-[15px] font-medium text-[#1a1a1a]">팀 트라이 : 성장 기록 아카이브</span>
                </Link>

                <div className="ml-auto flex items-center gap-4 text-[#1a1a1a]">
                    <Link href="/posts" aria-label="검색" className="p-0.5">
                        <Search size={22} strokeWidth={1.9} />
                    </Link>
                    <Link href="/posts" aria-label="메뉴" className="p-0.5">
                        <Menu size={22} strokeWidth={1.9} />
                    </Link>
                </div>
            </div>
        </header>
    );
}
