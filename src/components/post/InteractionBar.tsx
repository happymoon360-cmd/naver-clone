import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

export default function InteractionBar() {
    return (
        <div className="flex justify-between items-center px-4 py-4 border-t border-naver-border bg-white">
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-1">
                    <Heart size={24} className="text-gray-400" />
                    <span className="text-xs text-gray-400 font-bold">공감</span>
                </button>

                <button className="flex items-center gap-1">
                    <MessageCircle size={24} className="text-gray-400" />
                    <span className="text-xs text-gray-400 font-bold">1</span>
                </button>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
                <Share2 size={22} />
                <MoreHorizontal size={22} />
            </div>
        </div>
    );
}
