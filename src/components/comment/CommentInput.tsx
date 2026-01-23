import { Smile, Image as ImageIcon, Lock } from "lucide-react";

export default function CommentInput() {
    return (
        <div className="border border-naver-border rounded-sm bg-white p-4">
            <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-800">
                <span>허석준</span>
            </div>

            <textarea
                className="w-full h-20 resize-none outline-none text-sm placeholder-gray-400 mb-2"
                placeholder="이웃과 소통해보세요."
            ></textarea>

            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                <div className="flex gap-4 text-gray-400">
                    <button className="hover:text-gray-600"><ImageIcon size={18} /></button>
                    <button className="hover:text-gray-600"><Smile size={18} /></button>
                    <button className="hover:text-gray-600"><Lock size={18} /></button>
                </div>
                <button className="bg-white border border-gray-300 px-4 py-1.5 rounded-sm text-sm font-bold text-gray-500 hover:text-gray-800 hover:border-gray-400 transition-colors">
                    등록
                </button>
            </div>
        </div>
    );
}
