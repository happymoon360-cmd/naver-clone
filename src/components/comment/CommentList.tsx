import { User } from "lucide-react";

export default function CommentList() {
    const comments = [
        {
            id: 1,
            author: "김개발",
            content: "Next.js 마이그레이션 기대됩니다! 화이팅!",
            date: "2026. 1. 23. 21:05",
            isReply: false,
        },
        {
            id: 2,
            author: "이디자이너",
            content: "네이버 그린 컬러 코드가 정확하네요. 깔끔합니다.",
            date: "2026. 1. 23. 21:10",
            isReply: false,
        },
        {
            id: 3,
            author: "허석준",
            content: "감사합니다! 디자인 디테일에 신경을 많이 쓰고 있습니다.",
            date: "2026. 1. 23. 21:15",
            isReply: true,
        },
    ];

    return (
        <div className="space-y-4 mb-8">
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    className={`flex gap-3 ${comment.isReply ? "ml-10 pl-4 border-l-2 border-gray-100" : ""}`}
                >
                    <div className="flex-shrink-0 w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                        <User size={18} />
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-gray-800">{comment.author}</span>
                            <span className="text-xs text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-normal">
                            {comment.content}
                        </p>
                        <div className="mt-1 flex gap-2 text-xs text-gray-400">
                            <button className="hover:underline">답글</button>
                            <button className="hover:underline">공감</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
