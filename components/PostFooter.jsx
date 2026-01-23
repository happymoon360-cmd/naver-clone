'use client';

import Image from 'next/image';

export default function PostFooter({
    hashtags,
    likeCount,
    commentCount,
    shareCount,
    authorName,
    authorCategory,
    neighborCount,
    blogDescription,
    authorImage,
    categoryPosts = [] // 카테고리 관련 글 목록
}) {
    return (
        <div className="pb-4">
            {/* Hashtags - 개별 칩 스타일 */}
            <div className="px-5 py-4 border-b border-[#f0f0f0]">
                <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag, index) => (
                        <button
                            key={index}
                            className="px-3 py-1.5 rounded-full border border-[#e5e5e5] bg-white text-[13px] text-[#333] hover:bg-[#f8f8f8] transition-colors"
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Buttons - 아이콘 + 숫자만 */}
            <div className="px-5 py-3 flex items-center gap-4 border-b border-[#f0f0f0]">
                {/* 공감 */}
                <button className="flex items-center gap-1.5 text-[#333]">
                    <span className="text-[20px]">♡</span>
                    <span className="text-[14px] text-[#ff6b6b] font-medium">{likeCount}</span>
                </button>

                {/* 댓글 */}
                <button className="flex items-center gap-1.5 text-[#333]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    <span className="text-[14px]">{commentCount}</span>
                </button>

                {/* 공유 */}
                <button className="flex items-center gap-1.5 text-[#333]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                    <span className="text-[14px]">{shareCount}</span>
                </button>
            </div>

            {/* Author Profile Card */}
            <div className="px-5 py-5 border-b border-[#f0f0f0]">
                <div className="flex items-start gap-4">
                    {/* 프로필 이미지 */}
                    <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border border-[#eee] flex-shrink-0">
                        {authorImage ? (
                            <Image src={authorImage} alt={authorName} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200" />
                        )}
                    </div>

                    {/* 프로필 정보 + 이웃추가 버튼 */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-[16px] text-[#03c75a]">{authorName}</span>
                                    <span className="text-[12px] text-[#666]">{authorCategory}</span>
                                    <span className="text-[12px] text-[#666]">·</span>
                                    <span className="text-[12px] text-[#666]">이웃{neighborCount}명</span>
                                </div>
                                <p className="text-[13px] text-[#666] leading-snug break-keep">{blogDescription}</p>
                            </div>

                            {/* 이웃추가 버튼 */}
                            <button className="flex-shrink-0 ml-3 px-4 py-2 bg-[#03c75a] text-white text-[13px] font-medium rounded-[4px] hover:bg-[#02b351] transition-colors">
                                이웃추가
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 이 블로그 카테고리 글 섹션 */}
            <div className="px-5 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-bold text-[#333]">
                        이 블로그 <span className="text-[#03c75a]">PC/MO</span> 카테고리 글
                    </h3>
                    <button className="text-[13px] text-[#666]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>

                {/* 카테고리 글 목록 */}
                <div className="space-y-4">
                    {/* 샘플 데이터 - 실제로는 categoryPosts prop 사용 */}
                    <CategoryPostItem
                        title="5G 안터짐 느림 현상 해결하는 방법"
                        date="2년 전"
                        likeCount={2}
                        commentCount={2}
                        thumbnail="/placeholder-5g.jpg"
                    />
                    <CategoryPostItem
                        title="이미지(사진)에 사각형 테두리 만들기"
                        date="2년 전"
                        likeCount={0}
                        commentCount={0}
                        thumbnail="/placeholder-image.jpg"
                    />
                </div>
            </div>
        </div>
    );
}

// 카테고리 글 아이템 컴포넌트
function CategoryPostItem({ title, date, likeCount, commentCount, thumbnail }) {
    return (
        <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
                <h4 className="text-[14px] text-[#333] font-medium leading-snug mb-1.5 line-clamp-2">
                    {title}
                </h4>
                <div className="flex items-center gap-2 text-[12px] text-[#999]">
                    <span>{date}</span>
                    <span className="flex items-center gap-0.5">
                        <span>♡</span> {likeCount}
                    </span>
                    <span className="flex items-center gap-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        </svg>
                        {commentCount}
                    </span>
                </div>
            </div>
            {/* 썸네일 */}
            <div className="w-[70px] h-[70px] rounded-[8px] overflow-hidden bg-[#f0f0f0] flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-[#4a90d9] to-[#357abd] flex items-center justify-center text-white text-[10px]">
                    {/* 플레이스홀더 */}
                </div>
            </div>
        </div>
    );
}
