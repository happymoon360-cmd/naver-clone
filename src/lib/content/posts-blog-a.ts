import { type Post } from '@/store/usePostStore';

export const postsBlogA: Post[] = [
  {
    id: 'a-001',
    title: 'G80 출고하고 제일 먼저 한 것',
    category: '차량용품',
    date: '2일 전',
    author: '깔끔한드라이버',
    authorProfileImage: '/profile-a.jpg',
    headerImage: '/posts/a-001-header.jpg',
    tags: ['새차', '방향제', 'G80', '대시보드'],
    content: [
      { id: 'a001-1', type: 'text', content: '출고하고 대시보드부터 정리했습니다.' },
      { id: 'a001-2', type: 'image', src: '/posts/a-001-01.jpg', caption: '' },
      { id: 'a001-3', type: 'text', content: '번호판이랑 방향제를 따로 두는 게 싫어서 겸용으로 하나 올려봤는데, 생각보다 깔끔하게 들어갑니다.' },
      { id: 'a001-4', type: 'image', src: '/posts/a-001-02.jpg', caption: '' },
      { id: 'a001-5', type: 'text', content: '태양열이라 선 연결도 없고. 요즘 날씨에 햇빛만 들면 알아서 돕니다. 향도 은은한 편이라 거슬리지 않고.' },
      { id: 'a001-6', type: 'text', content: '대시보드 깔끔한 거 좋아하는 분들한테는 괜찮을 듯.' },
    ],
    comments: [
      { id: 1, content: '오 이거 어디서 파는 건가요?', author: '차덕후아저씨', timestamp: Date.now() - 86400000, likes: 2, isLiked: false },
      { id: 2, content: '카페24에서 샀습니다~ https://sjhur3601.cafe24.com/', author: '깔끔한드라이버', timestamp: Date.now() - 82800000, likes: 0, isLiked: false, parentId: 1 },
      { id: 3, content: '혹시 가격대가 어떻게 되나요?', author: '보배드림러', timestamp: Date.now() - 43200000, likes: 1, isLiked: false },
      { id: 4, content: '2만원대였던 거 같습니다', author: '깔끔한드라이버', timestamp: Date.now() - 39600000, likes: 0, isLiked: false, parentId: 3 },
    ],
    isLiked: false,
    likeCount: 7,
    commentsEnabled: true,
    createdAt: Date.now() - 172800000,
  },
];
