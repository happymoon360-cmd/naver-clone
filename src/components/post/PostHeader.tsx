export default function PostHeader() {
    return (
        <div className="relative w-full h-[250px] overflow-hidden">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px] opacity-90 scale-105"
                style={{ backgroundImage: "url('https://mblogthumb-phinf.pstatic.net/MjAyNjAxMjNfMTA1/MDAxNzY5MTUyNDQ2NDk1.opkMrJi9rJ5ZJ0ySe6bPBoTWTn/900%ef%bc%bf0ce40b128c7198df5a460d1be9f9ffaf.1000x1000x1a44d.png?type=w800')" }}
            ></div>
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content Layer */}
            <div className="absolute bottom-0 left-0 w-full p-5 text-white z-10">
                <div className="text-sm font-bold opacity-90 mb-2">주간 신곡 정리</div>
                <h1 className="text-xl font-bold leading-tight mb-4 text-shadow-sm">
                    [주간 리뷰] 26.01.23 (Harry Styles, James Blake, Joji 등등)
                </h1>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
                        <img src="https://blogpfthumb-phinf.pstatic.net/MjAyNDA5MThfNzEg/MDAxNzI2NjM2MTg1ODk4.fPWx6JYAgleZ7YOgc1Ips9VLBlE3fOs17JZ8b8wbHiwg.FCD02sXtnTB7cHxKwN5A_WOB5bC6qyV2JI3y-8RgvAkg.JPEG/profileImageee7c.jpg?type=s1" alt="Profile" />
                    </div>
                    <div className="flex flex-col text-[11px] leading-tight">
                        <span className="font-bold">대동</span>
                        <span className="opacity-80">4시간 전</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
