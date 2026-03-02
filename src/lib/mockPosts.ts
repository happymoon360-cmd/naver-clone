import type { ContentBlock, Post } from "@/store/usePostStore";

const articleParagraphs = [
  "본문 텍스트 자리입니다.",
  "디자인 확인용 문장입니다.",
  "레이아웃 테스트용 문장입니다.",
  "내용은 비워두고 형태만 유지합니다.",
  "짧은 본문 샘플입니다.",
  "이미지와 간격 확인용 텍스트입니다.",
  "스크롤 길이 확인용 텍스트입니다.",
  "구조 확인용 임시 문장입니다."
];

const quoteMap: Record<number, string> = {
  2: "강조 문장 샘플",
  6: "인용구 자리"
};

const DEFAULT_AUTHOR_IMAGE = "https://blogpfthumb-phinf.pstatic.net/MjAyNDA5MThfNzEg/MDAxNzI2NjM2MTg1ODk4.fPWx6JYAgleZ7YOgc1Ips9VLBlE3fOs17JZ8b8wbHiwg.FCD02sXtnTB7cHxKwN5A_WOB5bC6qyV2JI3y-8RgvAkg.JPEG/profileImageee7c.jpg?type=s1";
const DEFAULT_HEADER_IMAGE = "https://picsum.photos/seed/naver-header-cover/1200/900";

const ARTICLE_IMAGES = [
  "https://picsum.photos/seed/naver-detail-1/1200/900",
  "https://picsum.photos/seed/naver-detail-2/1200/900",
  "https://picsum.photos/seed/naver-detail-3/1200/900",
  "https://picsum.photos/seed/naver-detail-4/1200/900"
];

const CONTENT_REPEAT_COUNT = 2;

const buildContent = (prefix: string): ContentBlock[] => {
  const blocks: ContentBlock[] = [];

  for (let cycle = 0; cycle < CONTENT_REPEAT_COUNT; cycle += 1) {
    articleParagraphs.forEach((paragraph, index) => {
      const stepInCycle = index + 1;
      const step = cycle * articleParagraphs.length + stepInCycle;

      blocks.push({
        id: `${prefix}-text-${step}`,
        type: "text",
        content: paragraph
      });

      const quote = quoteMap[stepInCycle];
      if (quote) {
        blocks.push({
          id: `${prefix}-quote-${step}`,
          type: "quote",
          content: quote
        });
      }

      if (step % 6 === 0) {
        blocks.push({
          id: `${prefix}-line-${step}`,
          type: "line"
        });
      }

      if (step % 10 === 0) {
        const imageIndex = Math.floor(step / 10) % ARTICLE_IMAGES.length;
        blocks.push({
          id: `${prefix}-image-${step}`,
          type: "image",
          src: ARTICLE_IMAGES[imageIndex],
          caption: "작업 기록 이미지",
          width: 1200,
          height: 900
        });
      }
    });
  }

  return blocks;
};

const secondaryContent: ContentBlock[] = [
  {
    id: "secondary-1",
    type: "text",
    content: "본문 샘플 텍스트"
  },
  {
    id: "secondary-2",
    type: "quote",
    content: "강조 문장"
  },
  {
    id: "secondary-3",
    type: "text",
    content: "레이아웃 확인용 텍스트"
  }
];

const now = Date.now();

export const mockPosts: Post[] = [
  {
    id: "mock-main",
    title: "포스트 제목 01",
    category: "카테고리",
    date: "10시간 전",
    author: "팀 트라이",
    authorProfileImage: DEFAULT_AUTHOR_IMAGE,
    headerImage: DEFAULT_HEADER_IMAGE,
    tags: ["태그A", "태그B", "태그C", "태그D", "태그E"],
    content: buildContent("main"),
    comments: [
      {
        id: 1,
        author: "사용자A",
        content: "댓글 샘플 문장입니다.",
        timestamp: now - 1000 * 60 * 34,
        likes: 9,
        isLiked: false
      },
      {
        id: 2,
        author: "사용자B",
        content: "UI 확인용 댓글입니다.",
        timestamp: now - 1000 * 60 * 21,
        likes: 5,
        isLiked: false
      }
    ],
    isLiked: false,
    likeCount: 137,
    commentsEnabled: true,
    createdAt: now - 1000 * 60 * 60 * 10
  },
  {
    id: "mock-prev",
    title: "포스트 제목 02",
    category: "카테고리",
    date: "어제",
    author: "팀 트라이",
    authorProfileImage: DEFAULT_AUTHOR_IMAGE,
    headerImage: DEFAULT_HEADER_IMAGE,
    tags: ["태그A", "태그B"],
    content: secondaryContent,
    comments: [
      {
        id: 1,
        author: "사용자C",
        content: "짧은 댓글 샘플입니다.",
        timestamp: now - 1000 * 60 * 60 * 5,
        likes: 2,
        isLiked: false
      }
    ],
    isLiked: false,
    likeCount: 52,
    commentsEnabled: true,
    createdAt: now - 1000 * 60 * 60 * 24
  },
  {
    id: "mock-next",
    title: "포스트 제목 03",
    category: "카테고리",
    date: "2일 전",
    author: "팀 트라이",
    authorProfileImage: DEFAULT_AUTHOR_IMAGE,
    headerImage: DEFAULT_HEADER_IMAGE,
    tags: ["태그A", "태그B"],
    content: secondaryContent,
    comments: [],
    isLiked: false,
    likeCount: 44,
    commentsEnabled: true,
    createdAt: now - 1000 * 60 * 60 * 48
  }
];
