import Link from "next/link";
import { Search, Menu, Bell } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function Header() {
    const config = await prisma.blogConfig.findFirst();
    const blogName = config?.blogName || "My Blog";

    return (
        <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="flex h-[50px] items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-1">
                        <span className="w-5 h-5 bg-[#03c75a] text-white flex items-center justify-center font-bold text-xs rounded-sm">N</span>
                        <span className="text-black font-bold text-base truncate max-w-[200px]">{blogName}</span>
                    </Link>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                    <button className="text-[#333] border border-[#d3d3d3] rounded-[4px] px-2 py-1 text-[11px] font-bold bg-white">MY</button>
                </div>
            </div>
            {/* Sub-nav simplified for mobile */}
            <div className="flex items-center gap-5 px-5 py-2.5 border-b border-[#ececec] text-[15px] font-bold text-[#959595] overflow-x-auto hide-scrollbar bg-white">
                <Link href="#" className="text-[#03c75a] whitespace-nowrap pb-0.5 border-b-2 border-[#03c75a]">블로그</Link>
                <Link href="#" className="whitespace-nowrap pb-1">프롤로그</Link>
                <Link href="#" className="whitespace-nowrap pb-1">지도</Link>
                <Link href="#" className="whitespace-nowrap pb-1">서재</Link>
                <Link href="#" className="whitespace-nowrap pb-1">태그</Link>
            </div>
        </header>
    );
}
