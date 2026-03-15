import Link from "next/link";
import { blogConfig } from "@/lib/blogConfig";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="w-full bg-bg-subtle border-t border-border py-6 mt-auto">
            <div className="max-w-[1080px] mx-auto px-4 text-center">
                <div className="text-sm text-text-light mb-2">
                    Made with ❤️ and coffee
                </div>
                <div className="text-xs text-text-light mb-2">
                    © {currentYear} {blogConfig.name}. All rights reserved.
                </div>
                <div className="text-xs">
                    <Link href="/admin" className="text-gray-300 hover:text-text-light transition-colors">
                        Admin
                    </Link>
                </div>
                <p className="mt-2 text-[10px] text-[#b0b0b0]">
                    이 블로그의 일부 게시물에는 제휴 링크가 포함되어 있습니다.
                </p>
            </div>
        </footer>
    );
}
