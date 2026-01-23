import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function Sidebar({ className }: { className?: string }) {
    const config = await prisma.blogConfig.findFirst();
    const blogName = config?.blogName || "My Blog";
    const ownerName = config?.ownerName || "Owner";
    const categories = config?.categories.split(",") || ["Daily", "Tech"];

    return (
        <aside className={cn("w-full shrink-0 space-y-4", className)}>
            {/* Profile Card */}
            <div className="border border-gray-200 rounded-md p-5 bg-white shadow-sm text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center text-gray-400">
                    <User className="w-8 h-8" />
                </div>
                <h2 className="font-bold text-lg text-gray-900">{ownerName}</h2>
                <p className="text-xs text-gray-500 mt-1 mb-3">{blogName}</p>

                <div className="flex justify-center gap-2 text-xs text-gray-600 border-t pt-3">
                    <Link href="#" className="hover:underline">글쓰기</Link>
                </div>
            </div>

            {/* Categories */}
            <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm">
                <h3 className="font-bold text-sm border-b pb-2 mb-2 text-gray-800">카테고리</h3>
                <ul className="text-sm space-y-2 text-gray-600">
                    <li>
                        <Link href="/" className="hover:text-[#03c75a] hover:font-bold block py-1 border-l-2 border-transparent hover:border-[#03c75a] pl-2">
                            전체글 <span className="text-gray-400 text-xs ml-1">(99)</span>
                        </Link>
                    </li>
                    {categories.map((cat: string) => (
                        <li key={cat}>
                            <Link href="#" className="hover:text-[#03c75a] hover:underline block py-1 pl-2">
                                {cat.trim()}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
