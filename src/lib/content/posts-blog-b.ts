import { type Post } from '@/store/usePostStore';

export const postsBlogB: Post[] = [
  {
    id: 'b-001',
    title: '남편 차 탈 때마다 잔소리했는데 이제 안 해요',
    category: '일상',
    date: '3일 전',
    author: '살림하는엄마',
    authorProfileImage: '/profile-b.jpg',
    headerImage: '/posts/b-001-header.jpg',
    tags: ['남편차', '방향제', '차량용품', '일상'],
    content: [
      { id: 'b001-1', type: 'text', content: '남편 차에 타면 항상 냄새가 좀 그랬거든요. 잔소리하기도 그렇고...' },
      { id: 'b001-2', type: 'image', src: '/posts/b-001-01.jpg', caption: '' },
      { id: 'b001-3', type: 'text', content: '그래서 몰래 하나 올려놨는데 "이거 뭐야?" 하면서 좋아하더라고요 ㅎㅎ' },
      { id: 'b001-4', type: 'image', src: '/posts/b-001-02.jpg', caption: '' },
      { id: 'b001-5', type: 'text', content: '태양열로 돌아가는 거라 선 연결도 없고, 주차번호판이랑 겸용이라 대시보드도 깔끔해요.' },
      { id: 'b001-6', type: 'text', content: '향이 은은해서 저도 옆에 타면 기분이 좋아지더라고요. 남편도 만족 중 ㅎ' },
    ],
    comments: [
      { id: 1, content: '오 이거 어디서 사셨어요? 저도 남편 차에 하나 해주고 싶어요~', author: '꽃길걷자', timestamp: Date.now() - 172800000, likes: 3, isLiked: false },
      { id: 2, content: '여기서 샀어요~ https://sjhur3601.cafe24.com/ 포장도 괜찮아서 선물용으로도 좋더라고요', author: '살림하는엄마', timestamp: Date.now() - 169200000, likes: 1, isLiked: false, parentId: 1 },
    ],
    isLiked: false,
    likeCount: 12,
    commentsEnabled: true,
    createdAt: Date.now() - 259200000,
  },
];
