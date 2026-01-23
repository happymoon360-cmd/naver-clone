'use client';

import { ArrowLeft, Search, Menu } from 'lucide-react';
import Link from 'next/link';

export default function MobileHeader({ blogName }) {
    return (
        <header className="fixed top-0 left-0 right-0 h-[52px] bg-white z-50 flex items-center justify-between px-3 border-b border-[#e5e5e5]">
            <div className="flex items-center">
                <button className="p-2 -ml-2 text-[#333]">
                    <ArrowLeft size={24} strokeWidth={1.5} />
                </button>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[60%] truncate">
                <Link href="/" className="text-[17px] font-bold text-[#333] truncate">
                    {blogName}
                </Link>
            </div>

            <div className="flex items-center gap-1">
                <button className="p-2 text-[#333]">
                    <Search size={24} strokeWidth={1.5} />
                </button>
                <button className="p-2 -mr-2 text-[#333]">
                    <Menu size={24} strokeWidth={1.5} />
                </button>
            </div>
        </header>
    );
}
