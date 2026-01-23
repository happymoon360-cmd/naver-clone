'use client';
import MobileHeader from '@/components/MobileHeader';
import PostFooter from '@/components/PostFooter';
import CommentSection from '@/components/CommentSection';
import Footer from '@/components/Footer';

export default function Home() {
  // Sample data matching the screenshot "PC에서 크롬 모바일 모드로..."
  const post = {
    title: "PC에서 크롬 모바일 모드로 보는 방법 (모바일 버전 화면)",
    category: "PC/MO",
    date: "2023. 12. 21. 23:53",
    content: `
        <p>PC로 크롬이나 익스플로어를 사용하다 보면 모바일에서 보는 화면을 모니터로 보고 싶은 하는 경우가 있다.</p>
        <p>아무래도 자료를 만드는 작업을 PC로 하다 보니, 캡쳐나 빠른 구동을 컴퓨터로 확인하는 것이 유용하기 때문이다.</p>
        <br/>
        <p>이럴 때 사용하는 PC의 모바일 모드 사용 방법을 알아보자.</p>
        <br/><br/>
        <div style="border-left: 4px solid #333; padding-left: 15px; margin: 30px 0;">
            <h3 style="font-size: 19px; font-weight: bold; color: #000; margin: 0;">PC에서 모바일 모드 사용하기</h3>
        </div>
        <br/>
        <p>F12를 누르면 개발자 모드가 켜집니다...</p>
        <br/><br/><br/>
    `,
    hashtags: ['PC모바일모드', '크롬모바일', '인터넷모바일', '모바일모드', '모바일버전'],
    userInfo: {
      blogTitle: "신선비의 IT학당",
      nickname: "신선비",
      category: "IT·컴퓨터",
      neighborCount: "362",
      description: "IT 전문 블로그 필요한 정보만 쉽게 설명합니다.",
      profileImageUrl: "https://i.pravatar.cc/150?u=sinsunbi"
    },
    stats: {
      likeCount: 6,
      commentCount: 3,
      shareCount: 1
    }
  };

  return (
    <div className="bg-white min-h-screen pb-[60px]">
      <MobileHeader blogName={post.userInfo.blogTitle} />

      <main className="pt-[52px]">
        {/* Cover Section (Green Background from screenshot) */}
        <div className="relative w-full aspect-[4/3] sm:aspect-video bg-[#587e45] flex flex-col justify-end p-[20px] text-white">
          <div className="mb-[15px]">
            <span className="text-[13px] opacity-90 mb-[5px] block font-light">{post.category}</span>
            <h1 className="text-[22px] font-bold leading-[1.4] break-keep">{post.title}</h1>
          </div>

          <div className="flex items-center gap-[8px] text-[13px] opacity-80 border-t border-white/30 pt-[15px]">
            <div className="w-[24px] h-[24px] rounded-full overflow-hidden bg-white/20">
              {/* Profile Icon Placeholder */}
              <img src={post.userInfo.profileImageUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold">{post.userInfo.nickname}</span>
            <span className="text-[12px]">{post.date}</span>
          </div>
        </div>

        <div className="px-[20px] py-[30px]">
          {/* Post Content */}
          <div className="prose max-w-none text-[16px] leading-[1.8] text-[#333] tracking-[-0.3px]"
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
      </main >
    </div >
  );
}
