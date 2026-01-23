export default function Footer() {
    return (
        <footer className="py-[40px] px-[20px] bg-[#f8f9fa] text-center border-t border-[#e5e5e5] mt-auto pb-[100px] sm:pb-[40px]">
            {/* Links Section */}
            <div className="flex justify-center items-center gap-[15px] mb-[15px]">
                <button className="text-[#666] text-[13px] bg-transparent border-0 p-0 cursor-pointer">로그인</button>
                <span className="w-[1px] h-[10px] bg-[#d3d3d3]"></span>
                <button className="text-[#666] text-[13px] bg-transparent border-0 p-0 cursor-pointer">PC버전</button>
                <span className="w-[1px] h-[10px] bg-[#d3d3d3]"></span>
                <button className="text-[#666] text-[13px] bg-transparent border-0 p-0 cursor-pointer">전체서비스</button>
            </div>
            {/* Legal Links Section (Optional but good for completeness based on previous code) */}
            <div className="flex justify-center items-center gap-[15px] mb-[20px]">
                <button className="text-[#666] text-[13px] bg-transparent border-0 p-0 cursor-pointer">이용약관</button>
                <span className="w-[1px] h-[10px] bg-[#d3d3d3]"></span>
                <button className="text-[#666] text-[13px] font-bold bg-transparent border-0 p-0 cursor-pointer">개인정보처리방침</button>
                <span className="w-[1px] h-[10px] bg-[#d3d3d3]"></span>
                <button className="text-[#666] text-[13px] bg-transparent border-0 p-0 cursor-pointer">도움말</button>
            </div>
            {/* Copyright Section */}
            <div className="text-[#8c8c8c] text-[11px] font-sans">
                &copy; <span className="font-bold uppercase tracking-wider">NAVER Corp.</span>
            </div>
        </footer>
    );
}