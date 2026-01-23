import Link from "next/link";
import { Search, Menu } from "lucide-react";

export default function MobileHeader() {
    return (
        <div className="w-full bg-white border-b border-naver-border sticky top-0 z-50">
            <div className="flex justify-between items-center h-[52px] px-4">
                {/* Left Side: Service Logo */}
                <h1 className="flex items-center">
                    <Link href="#" className="flex items-center gap-1">
                        <span className="text-naver-green font-black text-xl tracking-tighter">blog</span>
                    </Link>
                </h1>

                {/* Center: Blog Title (Hidden on small screens if needed, or structured differently) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center text-center">
                    <span className="text-sm font-bold text-gray-800 line-clamp-1 max-w-[150px]">
                        iamdaedong
                    </span>
                </div>


                {/* Right Side: Tools */}
                <div className="flex items-center gap-4">
                    <button className="text-gray-800">
                        <Search size={24} strokeWidth={1.5} />
                    </button>
                    <button className="text-gray-800">
                        <Menu size={24} strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
