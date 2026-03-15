import Link from "next/link";
import { LayoutGrid, Menu, Search } from "lucide-react";
import { blogConfig } from "@/lib/blogConfig";

export default function MobileHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#ececec] bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-[48px] w-full max-w-[1120px] items-center gap-2 px-3.5 md:h-[54px] md:px-5">
                <Link href="/" aria-label="홈" className="grid h-6 w-6 place-items-center rounded-[5px] bg-primary text-[12px] font-bold text-white">
                    {blogConfig.name.charAt(0).toUpperCase()}
                </Link>

                <Link href="/posts" className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
                    <LayoutGrid size={15} strokeWidth={1.9} className="shrink-0 text-[#202020]" />
                    <span className="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium text-[#1a1a1a]">
                        {blogConfig.name}
                    </span>
                </Link>

                <div className="ml-auto flex items-center gap-1.5 text-[#1a1a1a]">
                    <Link href="/posts" aria-label="검색" className="grid h-8 w-8 place-items-center rounded-full active:bg-[#f2f2f2]">
                        <Search size={18} strokeWidth={1.9} />
                    </Link>
                    <Link href="/admin" aria-label="관리자" className="grid h-8 w-8 place-items-center rounded-full active:bg-[#f2f2f2]">
                        <Menu size={19} strokeWidth={1.9} />
                    </Link>
                </div>
            </div>
        </header>
    );
}
