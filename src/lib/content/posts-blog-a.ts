import { type Post } from '@/store/usePostStore';

export const postsBlogA: Post[] = [
  {
    id: 'a-001',
    title: '새차 출고 당일, G80 받던 날 이야기',
    category: '차량용품',
    date: '2일 전',
    author: '깔끔한드라이버',
    authorProfileImage: '',
    headerImage: '',
    tags: ['새차', '출고', 'G80', '대시보드', '블랙박스'],
    content: [
      {
        id: 'a001-1',
        type: 'text',
        content:
          '새차 출고일 아침은 생각보다 빨리 왔습니다. 딜러한테 연락 받고 전날 밤에 잠을 잘 못 잤습니다. 아침 9시에 전시장 도착해서 서류 정리하고, 키 받고, 주차장에서 G80을 처음 봤습니다. 흰색 외장에 검정 시트. 사진이랑 실물은 확실히 달랐습니다.',
      },
      {
        id: 'a001-2',
        type: 'image',
        src: '/posts/a-001-01.jpg',
        caption: '출고 첫날 주차장에 세운 모습',
      },
      {
        id: 'a001-3',
        type: 'text',
        content:
          '전시장에서 나오자마자 블랙박스 설치하러 갔습니다. 예약해둔 곳이 차로 십 분 거리였는데, 그 십 분이 첫 주행이었습니다. 시트 포지션도 안 맞춰놓고 그냥 출발했습니다. 설치 끝나고 바로 옆 주유소에서 첫 주유도 했습니다. 기름값이 얼마였는지는 기억 안 납니다.',
      },
      {
        id: 'a001-4',
        type: 'text',
        content:
          '집에 도착하니 오후 1시쯤이었습니다. 주차하고 나서 바로 실내 세팅을 시작했습니다. 시트 포지션 맞추고, 미러 각도 잡고, 네비 즐겨찾기 등록하고. 그러다 대시보드 쪽으로 손이 갔습니다.',
      },
      {
        id: 'a001-5',
        type: 'text',
        content:
          '대시보드 위에 올려둘 것들을 하나씩 꺼냈습니다. 주차 번호판 세팅하고, 임시로 둘 것 정리하고, 미리 사둔 것 중에 하나 올려뒀습니다. 이것저것 자리 잡아주니까 삼십 분은 금방 지나더군요. 정리가 끝나니 비로소 내 차 같은 느낌이 들었습니다.',
      },
      {
        id: 'a001-6',
        type: 'image',
        src: '/posts/a-001-02.jpg',
        caption: '세팅 중인 대시보드',
      },
      {
        id: 'a001-7',
        type: 'text',
        content:
          '저녁 먹고 나서 첫 야간 드라이브를 나갔습니다. 집 근처 한 바퀴 돌고 올 생각이었는데, 결국 한 시간 넘게 돌았습니다. 밤에 보는 계기판 조명이 낮이랑 완전히 다른 차였습니다. 조용하고 묵직한 승차감에 창문도 안 열었습니다.',
      },
      {
        id: 'a001-8',
        type: 'image',
        src: '/posts/a-001-03.jpg',
        caption: '밤 주차장에서 본 모습',
      },
      {
        id: 'a001-9',
        type: 'text',
        content:
          '출고 첫날을 돌아보면 별거 없었습니다. 서류 받고, 블랙박스 달고, 주유하고, 대시보드 정리하고, 밤에 한 바퀴 돈 게 전부였습니다. 그런데 그 하루가 꽤 길게 느껴졌습니다.',
      },
      {
        id: 'a001-10',
        type: 'text',
        content:
          '새차 받으면 제일 먼저 뭘 하는지 정리해봤습니다. 블랙박스 설치, 첫 주유, 실내 세팅, 야간 드라이브. 이 네 가지가 출고 당일에 한 것 전부입니다. 새차일수록 첫날 세팅을 빨리 끝내두는 게 편했습니다.',
      },
    ],
    comments: [
      {
        id: 1,
        content: '저도 G80 출고하고 첫날 블박부터 달러 갔습니다. 그 첫 주행 긴장감 아직도 기억납니다.',
        author: 'g90주인장',
        timestamp: Date.now() - 2 * 86400000 + 2 * 3600000,
        likes: 4,
        isLiked: false,
      },
      {
        id: 2,
        content: '맞습니다. 첫 주행은 시트도 안 맞춰놓고 출발하게 되더군요.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 2 * 86400000 + 4 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 1,
      },
      {
        id: 3,
        content: '대시보드에 올려두신 거 어디서 구하셨나요? 저도 출고 앞두고 있어서요.',
        author: 'GV80입문자',
        timestamp: Date.now() - 2 * 86400000 + 18 * 3600000,
        likes: 2,
        isLiked: false,
      },
      {
        id: 4,
        content: '여기서 봤습니다. https://sjhur3601.cafe24.com/ 선 연결 없는 타입이라 대시보드 깔끔하게 쓰기 좋았습니다.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 2 * 86400000 + 21 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 3,
      },
      {
        id: 5,
        content: '첫 야간 드라이브 공감합니다. 한 바퀴만 돌려다가 한 시간 넘게 돌게 되더군요.',
        author: '세차좋아',
        timestamp: Date.now() - 2 * 86400000 + 34 * 3600000,
        likes: 3,
        isLiked: false,
      },
    ],
    isLiked: false,
    likeCount: 12,
    commentsEnabled: true,
    createdAt: Date.now() - 172800000,
  },
  {
    id: 'a-002',
    title: '주차 알림판 뭐 쓰세요? 번호판 겸용으로 바꿨습니다',
    category: '차량용품',
    date: '4일 전',
    author: '깔끔한드라이버',
    authorProfileImage: '',
    headerImage: '',
    tags: ['주차 알림판', '주차번호판', '차량용품', '대시보드'],
    content: [
      {
        id: 'a002-1',
        type: 'text',
        content:
          '주차 알림판은 출고하고 나서 한동안 자석식으로 썼습니다. 번호만 잘 보이면 된다고 생각해서 급한 대로 올려뒀는데, G80 대시보드에서는 생각보다 자꾸 눈에 걸리더군요. 주차할 때 번호 가리는 건 쉬워서 처음엔 이 정도면 된다 싶었습니다.',
      },
      {
        id: 'a002-2',
        type: 'image',
        src: '/posts/a-002-01.jpg',
        caption: '기존에 쓰던 자석식 주차 알림판',
      },
      {
        id: 'a002-3',
        type: 'text',
        content:
          '가격 부담이 없고 번호 교체도 간단해서 처음에는 나쁘지 않았습니다. 급하게 세워둘 때는 손이 덜 가는 편이라 그냥 계속 쓰게 되더군요.',
      },
      {
        id: 'a002-4',
        type: 'text',
        content:
          '처음 사흘 정도는 괜찮았습니다. 문 열고 닫을 때도 크게 움직이지 않았고, 번호 확인도 금방 됐습니다.',
      },
      {
        id: 'a002-5',
        type: 'text',
        content:
          '그런데 더운 날 하루 지나면 접착이 애매해집니다. 한번은 퇴근길에 툭 미끄러져 내려와서 다시 올려뒀고, 그 뒤로는 시동 걸 때마다 자리부터 보게 됐습니다. 전화번호만 보이면 되는 물건인데 자리를 너무 차지한다 싶었습니다. 결국 다른 방식을 찾게 됐습니다.',
      },
      {
        id: 'a002-6',
        type: 'image',
        src: '/posts/a-002-02.jpg',
        caption: '밀려 내려온 주차 알림판 자리',
      },
      {
        id: 'a002-7',
        type: 'text',
        content:
          '그러다 번호 확인과 향을 한 번에 처리하는 타입을 알게 됐습니다. 햇빛만 들어오면 움직이고 선 연결이 없어서 대시보드 위가 덜 복잡해 보였습니다. 하나만 올려두니 번호판 따로, 향 따로 둘 때보다 훨씬 단정했습니다.',
      },
      {
        id: 'a002-8',
        type: 'image',
        src: '/posts/a-002-03.jpg',
        caption: '겸용 타입으로 정리한 대시보드',
      },
      {
        id: 'a002-9',
        type: 'text',
        content:
          '지금은 주차할 때 번호 확인이 더 편해졌습니다. 물건이 하나로 줄어서 시야에 걸리는 것도 덜하고, 대시보드 닦을 때 손이 덜 가는 점도 나쁘지 않았습니다.',
      },
      {
        id: 'a002-10',
        type: 'text',
        content:
          '기존 주차 알림판이 나쁜 건 아닙니다. 잠깐 쓰기엔 가볍고 번호 바꾸기도 쉽습니다. 다만 대시보드를 깔끔하게 쓰려면 기능이 겹치는 물건 수부터 줄이는 게 낫습니다.',
      },
    ],
    comments: [
      {
        id: 1,
        content: '저도 자석식은 사흘 지나니 자꾸 밀려서 결국 바꿨습니다.',
        author: 'G90타는형',
        timestamp: Date.now() - 4 * 86400000 + 3 * 3600000,
        likes: 4,
        isLiked: false,
      },
      {
        id: 2,
        content: '맞습니다. 처음엔 편한데 자리 다시 잡는 일이 생기더군요.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 4 * 86400000 + 5 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 1,
      },
      {
        id: 3,
        content: '지금 쓰시는 건 선 없는 타입 맞나요? 번호 가림도 되나요?',
        author: '주차매너',
        timestamp: Date.now() - 4 * 86400000 + 14 * 3600000,
        likes: 2,
        isLiked: false,
      },
      {
        id: 4,
        content: '여기서 봤습니다. https://sjhur3601.cafe24.com/ 태양열이라 선 연결 없고 번호 가림도 됩니다.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 4 * 86400000 + 16 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 3,
      },
      {
        id: 5,
        content: '여름엔 대시보드에 붙여둔 게 한 번씩 내려오니 그게 제일 번거롭더군요.',
        author: '보배드림초보',
        timestamp: Date.now() - 4 * 86400000 + 33 * 3600000,
        likes: 2,
        isLiked: false,
      },
    ],
    isLiked: false,
    likeCount: 15,
    commentsEnabled: true,
    createdAt: Date.now() - 4 * 86400000,
  },
  {
    id: 'a-003',
    title: '다이소 차량용품 써본 것들 솔직 정리',
    category: '차량용품',
    date: '6일 전',
    author: '깔끔한드라이버',
    authorProfileImage: '',
    headerImage: '',
    tags: ['다이소', '차량용품', '다이소 차량용품', '가성비'],
    content: [
      {
        id: 'a003-1',
        type: 'text',
        content:
          '다이소 차량용품 코너는 그냥 지나치기가 어렵습니다. G80 출고하고 나서도 세차용 장갑 보러 갔다가 송풍구 클립, 컵홀더 패드, 휴대폰 거치 보조판 같은 걸 몇 개씩 집어왔습니다. 값이 부담 없으니 일단 써보자는 생각이 들더군요. 처음엔 이 정도면 충분하다 싶었습니다.',
      },
      {
        id: 'a003-2',
        type: 'image',
        src: '/posts/a-003-01.jpg',
        caption: '다이소에서 사 온 차량용품 몇 가지',
      },
      {
        id: 'a003-3',
        type: 'text',
        content:
          '송풍구 클립은 급할 때 나쁘지 않았습니다. 천 원대라 부담 없고, 바로 달아보기에 편해서 가장 먼저 손이 갔습니다.',
      },
      {
        id: 'a003-4',
        type: 'text',
        content:
          '컵홀더 정리 패드는 지금도 남아 있습니다. 먼지 받아주는 역할은 분명했고, 세척해서 다시 쓰는 것도 어렵지 않았습니다.',
      },
      {
        id: 'a003-5',
        type: 'text',
        content:
          '그런데 휴대폰 거치 보조판은 일주일을 못 갔습니다. 햇빛 강한 날엔 접착이 빨리 풀렸고, 물티슈 케이스 걸이는 손 닿는 자리가 애매해서 며칠 지나니 빼두게 됐습니다. 싸게 맞춰보기엔 괜찮지만 차에 오래 남는 건 따로 있더군요. 결국 매일 쓰는 것만 남겼습니다.',
      },
      {
        id: 'a003-6',
        type: 'image',
        src: '/posts/a-003-02.jpg',
        caption: '며칠 쓰고 빼둔 다이소 소품들',
      },
      {
        id: 'a003-7',
        type: 'text',
        content:
          '그러고 나서 보니 대시보드에는 물건을 줄이는 쪽이 낫습니다. 선 연결 없이 햇빛만 들어오면 움직이는 타입 하나를 올려두니 따로 달아둔 소품보다 덜 복잡해 보였습니다. 번호 확인까지 같이 되니 남겨둘 이유가 있었습니다.',
      },
      {
        id: 'a003-8',
        type: 'image',
        src: '/posts/a-003-03.jpg',
        caption: '지금 차에 남겨둔 정리용 물건',
      },
      {
        id: 'a003-9',
        type: 'text',
        content:
          '지금도 남아 있는 건 컵홀더 정리 패드 하나와 대시보드 위 한 가지 정도입니다. 많이 사본 뒤에 내린 결론은 단순했습니다. 싼 것보다 자주 손이 가는 게 결국 남습니다.',
      },
      {
        id: 'a003-10',
        type: 'text',
        content:
          '다이소 차량용품이 나쁜 건 아닙니다. 급하게 써보거나 소모품처럼 돌리기엔 부담이 적습니다. 다만 매일 보게 되는 자리에는 오래 남는 것만 두는 게 낫습니다.',
      },
    ],
    comments: [
      {
        id: 1,
        content: '저도 다이소 가면 세 개씩 집어오는데 결국 한두 개만 남더군요.',
        author: '세차좋아',
        timestamp: Date.now() - 6 * 86400000 + 4 * 3600000,
        likes: 4,
        isLiked: false,
      },
      {
        id: 2,
        content: '맞습니다. 부담 없어서 사오는데 오래 남는 건 의외로 적습니다.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 6 * 86400000 + 6 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 1,
      },
      {
        id: 3,
        content: '방향 관련해서는 다이소 말고 어떤 타입 쓰세요? 선 없는 건가요?',
        author: '운전은취미',
        timestamp: Date.now() - 6 * 86400000 + 21 * 3600000,
        likes: 2,
        isLiked: false,
      },
      {
        id: 4,
        content: '여기서 봤습니다. https://sjhur3601.cafe24.com/ 태양열이라 선 연결 없고 번호 확인도 같이 됩니다.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 6 * 86400000 + 23 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 3,
      },
      {
        id: 5,
        content: '컵홀더 패드는 저도 아직 씁니다. 그런 건 가격 생각하면 괜찮더군요.',
        author: 'GV80생활',
        timestamp: Date.now() - 6 * 86400000 + 37 * 3600000,
        likes: 2,
        isLiked: false,
      },
    ],
    isLiked: false,
    likeCount: 14,
    commentsEnabled: true,
    createdAt: Date.now() - 6 * 86400000,
  },
  {
    id: 'a-004',
    title: '다이소 방향제 한 달 써보고 바꾼 이유',
    category: '차량용품',
    date: '8일 전',
    author: '깔끔한드라이버',
    authorProfileImage: '',
    headerImage: '',
    tags: ['다이소 방향제', '차량 방향제', '방향제 비교', '태양열 방향제'],
    content: [
      {
        id: 'a004-1',
        type: 'text',
        content: 'G80 출고하고 나서 제일 먼저 달아둔 게 다이소 방향제였습니다. 새 차 냄새가 아직 남아 있긴 했는데, 금방 빠진다는 걸 알고 있었거든요. 값도 부담 없고 바로 살 수 있으니 일단 하나 집어왔습니다. 대시보드 위에 올려두고 이 정도면 됐다 싶었습니다.',
      },
      {
        id: 'a004-2',
        type: 'image',
        src: '/posts/a-004-01.jpg',
        caption: '다이소에서 사 온 차량용 방향제',
      },
      {
        id: 'a004-3',
        type: 'text',
        content: '가격이 천 원대라 부담이 없었고, 향도 처음 달았을 때는 생각보다 나쁘지 않았습니다. 자동차 전용 방향제치고는 달지 않고 과하지 않아서 잠시 만족했습니다.',
      },
      {
        id: 'a004-4',
        type: 'text',
        content: '처음 이틀 정도는 괜찮았습니다. 차에 탈 때마다 은은하게 났고, 달아둔 자리도 깔끔했습니다.',
      },
      {
        id: 'a004-5',
        type: 'text',
        content: '그런데 일주일 지나니 향이 거의 안 납니다. 코 가까이 대야 겨우 날 수 있는 수준이었습니다. 더운 날에는 처음 달았을 때 향이 너무 빠르게 퍼졌다가 금방 날아간 것 같았습니다. 결국 다른 걸 찾아보게 됐습니다.',
      },
      {
        id: 'a004-6',
        type: 'image',
        src: '/posts/a-004-02.jpg',
        caption: '대시보드에 올려둔 다이소 방향제',
      },
      {
        id: 'a004-7',
        type: 'text',
        content: '그러다 햇빛만 들어오면 알아서 돌아가는 타입이 있다는 걸 알게 됐습니다. 선 연결이 없고, 번호판 겸용이라 대시보드 위가 덜 복잡해 보였습니다. 따로 달아두던 번호 확인용 물건을 치우고 이걸 하나만 올려두니 눈에 걸리는 게 줄었습니다.',
      },
      {
        id: 'a004-8',
        type: 'image',
        src: '/posts/a-004-03.jpg',
        caption: '지금 대시보드에 올려둔 방향제',
      },
      {
        id: 'a004-9',
        type: 'text',
        content: '지금도 달고 다닙니다. 향이 급하게 치고 들어오지 않고 은은하게 남는 편이라 거슬리지 않습니다. 대시보드가 정리된 것도 나쁘지 않고요.',
      },
      {
        id: 'a004-10',
        type: 'text',
        content: '다이소 방향제가 나쁜 건 아닙니다. 짧게 써보기엔 가격도 부담 없고 접근성도 좋습니다. 다만 오래 둘 생각이라면 지속력을 따져보는 게 낫습니다.',
      },
    ],
    comments: [
      {
        id: 1,
        content: '다이소 방향제 저도 써봤는데 딱 일주일이더군요.',
        author: 'g90주인장',
        timestamp: Date.now() - 8 * 86400000 + 3 * 3600000,
        likes: 4,
        isLiked: false,
      },
      {
        id: 2,
        content: '맞습니다. 처음엔 괜찮았는데 금방 퍼지더군요.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 8 * 86400000 + 5 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 1,
      },
      {
        id: 3,
        content: '지금 쓰시는 거 어디서 구하셨나요? 선 없는 타입 맞나요?',
        author: 'GV80입문자',
        timestamp: Date.now() - 8 * 86400000 + 27 * 3600000,
        likes: 2,
        isLiked: false,
      },
      {
        id: 4,
        content: '여기서 봤습니다. https://sjhur3601.cafe24.com/ 태양열이라 선 연결 없습니다.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 8 * 86400000 + 30 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 3,
      },
      {
        id: 5,
        content: '번호판 겸용이라는 게 신기하네요. 저도 따로 두는 거 정리하려고 했는데.',
        author: '보배드림러',
        timestamp: Date.now() - 8 * 86400000 + 52 * 3600000,
        likes: 2,
        isLiked: false,
      },
    ],
    isLiked: false,
    likeCount: 18,
    commentsEnabled: true,
    createdAt: Date.now() - 8 * 86400000,
  },
  {
    id: 'a-005',
    title: '깔끔하게 차 꾸미기, 대시보드 정리 꿀팁',
    category: '차량용품',
    date: '11일 전',
    author: '깔끔한드라이버',
    authorProfileImage: '',
    headerImage: '',
    tags: ['차 꾸미기', '대시보드 정리', '차량 인테리어', '미니멀'],
    content: [
      {
        id: 'a005-1',
        type: 'text',
        content:
          '차 꾸미기 검색하면 붙이는 물건부터 많이 나옵니다. 그런데 제 기준에선 대시보드 정리부터 끝내는 게 먼저였습니다. G80은 대시보드 면이 넓은 편이라 물건이 하나만 늘어도 금방 눈에 들어옵니다. 처음엔 저도 이것저것 올려뒀습니다.',
      },
      {
        id: 'a005-2',
        type: 'image',
        src: '/posts/a-005-01.jpg',
        caption: '소품이 많았던 대시보드 상태',
      },
      {
        id: 'a005-3',
        type: 'text',
        content:
          '처음엔 휴대폰 거치대, 번호판, 작은 소품을 따로 뒀습니다. 필요한 것만 모아놨다고 생각했는데, 막상 운전석에 앉아 보면 시선이 분산됐습니다.',
      },
      {
        id: 'a005-4',
        type: 'text',
        content:
          '처음 일주일은 새 차라 그런지 다 괜찮아 보였습니다. 그런데 닦을 때마다 하나씩 들어 올리고 자리를 다시 맞추는 게 번거롭더군요.',
      },
      {
        id: 'a005-5',
        type: 'text',
        content:
          '결국 문제는 물건 수였습니다. 색이 달라도 튀고, 기능이 겹쳐도 지저분해 보였습니다. 꾸미려고 올린 건데 오히려 대시보드가 좁아 보였고, 햇빛 받는 날엔 반사도 거슬렸습니다. 그래서 덜어내기부터 했습니다.',
      },
      {
        id: 'a005-6',
        type: 'image',
        src: '/posts/a-005-02.jpg',
        caption: '정리 전후를 고민하던 대시보드',
      },
      {
        id: 'a005-7',
        type: 'text',
        content:
          '그러다 번호 확인과 향을 한 번에 처리하는 타입으로 바꿨습니다. 선 연결이 없고 색도 튀지 않아서 대시보드 위에는 이것 하나만 남겨두게 됐습니다. 따로 두던 소품을 빼니 차 안 분위기가 훨씬 담백해졌습니다.',
      },
      {
        id: 'a005-8',
        type: 'image',
        src: '/posts/a-005-03.jpg',
        caption: '물건 수를 줄인 뒤의 대시보드',
      },
      {
        id: 'a005-9',
        type: 'text',
        content:
          '지금은 대시보드 위에 올려둔 게 거의 없습니다. 청소가 쉬워진 것도 좋지만, 운전할 때 눈에 걸리는 게 줄어든 점이 더 낫습니다. 깔끔한 차는 결국 비워둔 면적이 만들어주더군요.',
      },
      {
        id: 'a005-10',
        type: 'text',
        content:
          '차 꾸미기는 결국 더하는 작업이 아니라 대시보드 정리에서 시작합니다. 작은 물건을 여러 개 올리는 것보다, 꼭 필요한 기능만 남겨두는 쪽이 오래 봐도 덜 질립니다.',
      },
    ],
    comments: [
      {
        id: 1,
        content: '저도 장식 세 개 올려뒀다가 일주일 못 가서 다 뺐습니다.',
        author: '미니멀라이프',
        timestamp: Date.now() - 11 * 86400000 + 5 * 3600000,
        likes: 4,
        isLiked: false,
      },
      {
        id: 2,
        content: '맞습니다. 보기 좋게 두는 것보다 안 어지럽게 두는 게 먼저더군요.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 11 * 86400000 + 7 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 1,
      },
      {
        id: 3,
        content: '번호 확인까지 같이 되는 타입은 어디서 보셨나요? 선 없는 건가요?',
        author: 'G80산책',
        timestamp: Date.now() - 10 * 86400000 + 1 * 3600000,
        likes: 2,
        isLiked: false,
      },
      {
        id: 4,
        content: '여기서 봤습니다. https://sjhur3601.cafe24.com/ 태양열이라 선 연결 없고 번호 확인도 같이 됩니다.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 10 * 86400000 + 3 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 3,
      },
      {
        id: 5,
        content: '조수석에서 봐도 물건 수 줄인 차가 확실히 덜 답답해 보이더군요.',
        author: '보배회원',
        timestamp: Date.now() - 10 * 86400000 + 18 * 3600000,
        likes: 2,
        isLiked: false,
      },
    ],
    isLiked: false,
    likeCount: 11,
    commentsEnabled: true,
    createdAt: Date.now() - 11 * 86400000,
  },
  {
    id: 'a-006',
    title: '새차 출고 후 제일 먼저 한 세 가지',
    category: '일상',
    date: '14일 전',
    author: '깔끔한드라이버',
    authorProfileImage: '',
    headerImage: '',
    tags: ['새차', '출고', '블랙박스', '차량용품', '방향제'],
    content: [
      {
        id: 'a006-1',
        type: 'text',
        content:
          '새차 받으면 이것저것 만지고 싶어집니다. 그런데 출고 첫날엔 순서를 먼저 잡아두는 게 낫더군요. G80 인수하던 날도 저는 세 가지만 바로 처리했습니다. 그래야 괜히 실내만 어지럽히지 않습니다.',
      },
      {
        id: 'a006-2',
        type: 'image',
        src: '/posts/a-006-01.jpg',
        caption: '출고 첫날 주차장에 세운 새 차',
      },
      {
        id: 'a006-3',
        type: 'text',
        content:
          '첫 번째는 블랙박스였습니다. 첫날부터 주차할 일이 있으니 이건 미루지 않는 편이 마음이 편했습니다.',
      },
      {
        id: 'a006-4',
        type: 'text',
        content:
          '두 번째는 주차할 때 바로 쓸 번호 세팅이었습니다. 처음 이틀은 종이로 적어도 되겠지 싶었는데, 문 열 때마다 꺼내는 게 생각보다 번거롭더군요.',
      },
      {
        id: 'a006-5',
        type: 'text',
        content:
          '문제는 세팅을 미루면 실내가 금방 임시 상태로 남는다는 점이었습니다. 케이블은 케이블대로 보이고, 종이 번호는 구겨지고, 대시보드 위에는 임시로 올려둔 물건이 늘어났습니다. 출고 직후 느낌을 오래 가져가려면 초반 정리가 먼저였습니다. 그래서 세 번째를 바로 맞췄습니다.',
      },
      {
        id: 'a006-6',
        type: 'image',
        src: '/posts/a-006-02.jpg',
        caption: '설치와 임시 세팅이 겹친 첫날 실내',
      },
      {
        id: 'a006-7',
        type: 'text',
        content:
          '세 번째는 차 안 공기와 대시보드 정리였습니다. 햇빛만 들어오면 움직이는 선 없는 타입을 올려두니 별도 연결이 필요 없고, 번호 확인도 같이 처리돼서 첫날 분위기를 해치지 않았습니다. 하나만 두는 쪽이 새차에는 잘 맞았습니다.',
      },
      {
        id: 'a006-8',
        type: 'image',
        src: '/posts/a-006-03.jpg',
        caption: '정리 후 깔끔해진 새 차 대시보드',
      },
      {
        id: 'a006-9',
        type: 'text',
        content:
          '그렇게 세 가지를 먼저 끝내고 나니 더 손댈 게 줄었습니다. 처음 며칠 동안 차 안이 안정된 느낌이 드니 괜히 이것저것 추가하지 않게 되더군요. 출고 직후엔 이게 가장 편했습니다.',
      },
      {
        id: 'a006-10',
        type: 'text',
        content:
          '새차 출고 후에는 이것저것 사는 것보다 순서를 정하는 게 먼저였습니다. 제 기준에선 블랙박스, 번호 세팅, 대시보드 정리 이 세 가지를 먼저 끝내는 편이 훨씬 편했습니다.',
      },
    ],
    comments: [
      {
        id: 1,
        content: '저도 출고 첫 주엔 블박이랑 번호 세팅부터 했습니다. 그게 제일 급하더군요.',
        author: '첫차구매',
        timestamp: Date.now() - 14 * 86400000 + 4 * 3600000,
        likes: 4,
        isLiked: false,
      },
      {
        id: 2,
        content: '맞습니다. 기본 세팅부터 끝내야 나중에 손이 덜 갑니다.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 14 * 86400000 + 6 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 1,
      },
      {
        id: 3,
        content: '세 번째로 올려두신 건 선 없는 타입 맞나요? 번호 확인도 같이 되나요?',
        author: '신차대기중',
        timestamp: Date.now() - 13 * 86400000 + 2 * 3600000,
        likes: 2,
        isLiked: false,
      },
      {
        id: 4,
        content: '여기서 봤습니다. https://sjhur3601.cafe24.com/ 태양열이라 선 연결 없고 번호 확인도 같이 됩니다.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 13 * 86400000 + 5 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 3,
      },
      {
        id: 5,
        content: '출고 첫날엔 새 차 냄새보다 종이 번호판 굴러다니는 게 더 신경 쓰이긴 하더군요.',
        author: 'GV70오너',
        timestamp: Date.now() - 13 * 86400000 + 19 * 3600000,
        likes: 2,
        isLiked: false,
      },
    ],
    isLiked: false,
    likeCount: 16,
    commentsEnabled: true,
    createdAt: Date.now() - 14 * 86400000,
  },
];
