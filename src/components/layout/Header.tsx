"use client";

import Link from "next/link";
import { Search, Menu, Bell, User } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full flex flex-col">
            {/* 1. Global Navigation Bar (GNB) - Simulating Naver's Green/White top bar */}
            <div className="w-full border-b border-naver-border bg-white h-16 flex items-center justify-between px-6 border-b-[1px]">
                <div className="flex items-center gap-4">
                    {/* Logo Area */}
                    <Link href="/" className="text-2xl font-black text-naver-green tracking-tighter">
                        NAVER
                    </Link>
                    <span className="text-gray-300">|</span>
                    <span className="font-bold text-lg text-naver-text">Blog</span>
                </div>

                {/* Right Tools */}
                <div className="flex items-center gap-5 text-gray-500">
                    {/* Search Input Simulation */}
                    <div className="hidden md:flex relative group">
                        <input
                            type="text"
                            placeholder="블로그 검색"
                            className="w-64 h-9 pl-3 pr-10 border border-naver-border rounded-sm text-sm focus:outline-none focus:border-naver-green transition-colors"
                        />
                        <button className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center bg-naver-green text-white rounded-r-sm">
                            <Search size={16} />
                        </button>
                    </div>
                    <Bell size={20} className="hover:text-naver-green cursor-pointer" />
                    <div className="h-4 w-[1px] bg-gray-300"></div>
                    <User size={20} className="hover:text-naver-green cursor-pointer" />
                    <Menu size={20} className="hover:text-naver-green cursor-pointer" />
                </div>
            </div>

            {/* 2. Blog specific navigation (The black bar) */}
            <div className="w-full bg-white border-b border-naver-border shadow-sm z-10">
                <div className="max-w-[1080px] mx-auto h-[50px] flex items-center justify-between px-4 lg:px-0">
                    <div className="flex gap-6 text-[15px] font-bold text-gray-800">
                        <Link href="#" className="text-naver-green">내 블로그</Link>
                        <Link href="#" className="hover:text-naver-green transition-colors">이웃새글</Link>
                        <Link href="#" className="hover:text-naver-green transition-colors">블로그 홈</Link>
                        <Link href="#" className="hover:text-naver-green transition-colors">블로그 마켓</Link>
                    </div>
                    <div>
                        {/* Optional right side menu for blog nav */}
                    </div>
                </div>
            </div>
        </header>
    );
}
