import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-[#FAFAFA] border-t border-naver-border py-8 mt-auto text-[12px] text-gray-500">
            <div className="max-w-[1080px] mx-auto px-4 flex flex-col items-center gap-3">
                <div className="flex gap-3 text-gray-600">
                    <Link href="#" className="hover:underline">블로그 홈</Link>
                    <span className="text-gray-300">|</span>
                    <Link href="#" className="hover:underline">이용약관</Link>
                    <span className="text-gray-300">|</span>
                    <Link href="#" className="font-bold hover:underline text-gray-800">개인정보처리방침</Link>
                    <span className="text-gray-300">|</span>
                    <Link href="#" className="hover:underline">청소년보호정책</Link>
                    <span className="text-gray-300">|</span>
                    <Link href="#" className="hover:underline">운영정책</Link>
                </div>

                <div className="flex gap-2 text-[11px] text-gray-400">
                    <span>사업자등록번호 111-11-11111</span>
                    <span>통신판매업신고 제2026-경기성남-0000호</span>
                    <span>대표이사: 허석준</span>
                </div>

                <div className="mt-2 text-[11px]">
                    Copyright © <span className="font-bold text-gray-700">NAVER Corp.</span> All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
