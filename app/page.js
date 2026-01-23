'use client';
import MobileHeader from '@/src/components/mobile/MobileHeader';
import PostFooter from '@/src/components/mobile/PostFooter';
import CommentSection from '@/src/components/comment/CommentSection';
import Footer from '@/src/components/Footer';

export default function Home() {
  // Sample data to match the screenshot "Traveler"
  const post = {
    title: "나만의 블로그 시작하기",
    category: "일상",
    date: "2026. 1. 22.",
    content: `
        <p>안녕하세요! 이것은 예시 블로그 포스트입니다.</p>
        <br/>
        <p>서버 연결 없이도 블로그의 모습을 확인할 수 있습니다.</p>
        <br/>
        <p>오늘은 날씨가 참 좋습니다. 블로그 디자인을 개편하면서 모바일 뷰를 중점적으로 확인하고 있습니다.</p>
        <br/>
        <p><strong>주요 변경 사항:</strong></p>
        <p>- 상단 헤더 디자인 개선</p>
        <p>- 하단 바 아이콘 변경 (종이비행기 등)</p>
        <p>- 댓글 및 푸터 UI 네이버 스타일로 동기화</p>
        <br/>
        <p>스크롤을 내려서 하단의 댓글과 통계바를 확인해주세요.</p>
        <br/>
        <p>감사합니다.</p>
        <br/><br/><br/>
    `,
    hashtags: ['청국장찌개', '청국장', '청국장맛있게끓이는법', '두부청국장'],
    userInfo: {
      blogTitle: "My Vlog",
      nickname: "여행가",
      category: "요리·레시피",
      neighborCount: "99,999+",
      description: "건강이 최고의 재테크!",
      profileImageUrl: "https://i.pravatar.cc/150?u=traveler"
    },
    stats: {
      likeCount: 45,
      commentCount: 12,
      shareCount: 10
    }
  };

  return (
    <div className="bg-white min-h-screen pb-[60px]">
      <MobileHeader blogName={post.userInfo.blogTitle} />

      <main className="pt-[52px]"> {/* Adjusted for new header height */}
        <div className="px-5 py-6">
          <div className="mb-6">
            <span className="text-[13px] text-[#03c75a] font-bold block mb-2">{post.category}</span>
            <h1 className="text-[24px] font-bold leading-normal text-[#111] -tracking-[0.5px] mb-[10px]">{post.title}</h1>

            {/* User Info / Date Line */}
            <div className="flex items-center gap-2 text-[13px] text-[#888]">
              <span className="font-bold text-[#333]">{post.userInfo.nickname}</span>
              <span className="text-[#e5e5e5]">|</span>
              <span>{post.date}</span>
            </div>
          </div>

          <hr className="border-t border-[#f0f0f0] my-6" />

          {/* Post Content */}
          <div className="prose max-w-none text-[16px] leading-[1.8] text-[#333] min-h-[100px]"
            dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Post Footer (Stats, Hashtags, Profile) */}
        <PostFooter
          hashtags={post.hashtags}
          likeCount={post.stats.likeCount}
          commentCount={post.stats.commentCount}
          shareCount={post.stats.shareCount}
          authorName={post.userInfo.nickname}
          authorCategory={post.userInfo.category}
          neighborCount={post.userInfo.neighborCount}
          blogDescription={post.userInfo.description}
          authorImage={post.userInfo.profileImageUrl}
        />

        {/* Comment Section */}
        <CommentSection postId={1} />

        {/* Page Footer */}
        <Footer />
      </main>
    </div>
  );
}
