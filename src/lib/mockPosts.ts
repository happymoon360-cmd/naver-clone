import type { ContentBlock, Post } from "@/store/usePostStore";

const articleParagraphs = [
  "성장은 갑자기 일어나지 않는다. 조용히 반복된 선택이 쌓이고, 어느 날 뒤를 돌아보면 완전히 다른 사람이 되어 있다.",
  "많은 사람들이 동기부여를 먼저 찾는다. 하지만 실제로 우리를 바꾸는 건 감정이 아니라 일정한 리듬이다.",
  "그래서 오늘도 같은 시간에 책상을 정리하고, 같은 자리에서 메모를 시작한다. 이 사소한 시작이 하루의 방향을 만든다.",
  "결국 루틴은 의지를 대신하는 시스템이다. 의지가 흔들리는 날에도 시스템은 우리를 다음 칸으로 데려간다.",
  "완벽한 계획보다 중요한 건 현실에서 유지되는 속도다. 100점을 목표로 하다 멈추는 것보다 70점으로 계속 가는 편이 멀리 간다.",
  "나는 실패를 줄이는 대신 재시작 비용을 줄이기로 했다. 놓친 날이 생겨도 다시 시작하기 쉬운 구조를 만들었다.",
  "아침 첫 30분은 입력보다 출력에 쓴다. 남의 문장을 읽기 전에 내 문장을 먼저 써보면 생각의 중심이 흔들리지 않는다.",
  "작은 기록은 생각보다 강하다. 기록은 기억을 보정하고, 감정을 객관화하며, 반복되는 실수를 눈앞에 보여준다.",
  "감정이 가라앉은 저녁에는 하루를 평가하지 않는다. 다음 행동 한 줄만 정하고 잠든다.",
  "장기전에서는 속도가 아니라 회복력이 승부를 가른다. 지치지 않는 사람이 아니라, 지친 뒤에 빨리 돌아오는 사람이 이긴다.",
  "비교는 방향을 잃게 만든다. 나는 어제의 나와 오늘의 나를 비교하는 방식으로만 진도를 확인한다.",
  "가끔은 멈추는 것도 전진이다. 무리해서 깨뜨리는 루틴은 오래가지 못한다.",
  "내가 집중하는 질문은 단 하나다. 지금 이 행동이 3개월 뒤의 나를 도와주는가.",
  "작업량을 늘리는 대신 마찰을 줄였다. 시작 버튼까지의 거리를 짧게 만들면 실행 빈도는 자연스럽게 올라간다.",
  "좋은 습관은 거창하지 않다. 눈에 보이는 신호, 짧은 행동, 즉시 확인 가능한 보상으로 충분하다.",
  "한 번의 큰 결심보다 반복되는 작은 합의가 더 강하다. 나는 매일 아침 나와 다시 합의한다.",
  "성과가 보이지 않는 구간이 가장 중요하다. 그 구간을 통과한 사람만 다음 계단을 본다.",
  "우리는 늘 정답을 찾으려 한다. 하지만 현실에서는 정답보다 작동하는 해법이 더 가치 있다.",
  "나를 바꾼 건 특별한 재능이 아니었다. 멈추지 않게 도와주는 환경과 구조였다.",
  "오늘의 결론은 단순하다. 작게 시작하고, 꾸준히 반복하고, 자주 복기하자.",
  "계획은 머리에서 끝나지만 실행은 몸에서 완성된다. 그래서 나는 할 일을 줄이고 시작 조건을 단순하게 만든다.",
  "아무도 보지 않는 구간에서 만든 습관이 결국 눈에 보이는 결과를 만든다.",
  "불안할수록 속도를 올리기보다 기준을 되찾는다. 무엇을 할지보다 무엇을 하지 않을지부터 정한다.",
  "지속 가능한 하루를 만들면, 지속 가능한 한 달이 따라온다.",
  "오늘도 대단한 하루가 아니어도 괜찮다. 멈추지 않은 하루라면 충분하다.",
  "끝까지 가는 사람의 공통점은 재능이 아니라 회복과 반복의 기술이라는 사실을 잊지 않으려 한다."
];

const quoteMap: Record<number, string> = {
  2: "의욕은 파도처럼 흔들리지만, 리듬은 매일 같은 자리에 돌아온다.",
  8: "완벽하지 않아도 된다. 멈추지 않으면 이미 이기고 있다.",
  15: "지속은 강한 사람이 하는 일이 아니라, 다시 시작하는 사람이 하는 일이다.",
  22: "결과는 늘 늦게 오고, 습관은 늘 먼저 쌓인다."
};

const CONTENT_REPEAT_COUNT = 5;

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
    });
  }

  return blocks;
};

const secondaryContent: ContentBlock[] = [
  {
    id: "secondary-1",
    type: "text",
    content: "작은 습관 하나를 고르는 순간부터 변화는 시작된다. 시작은 조용하지만 방향은 분명하다."
  },
  {
    id: "secondary-2",
    type: "quote",
    content: "하루의 밀도를 높이면 인생의 밀도도 바뀐다."
  },
  {
    id: "secondary-3",
    type: "text",
    content: "시간이 없어서 못 하는 게 아니라, 시작 조건이 복잡해서 못 하는 경우가 훨씬 많다."
  }
];

const now = Date.now();

export const mockPosts: Post[] = [
  {
    id: "mock-main",
    title: "습관은 의지보다 오래간다: 매일을 버티는 사람이 끝내 성장하는 이유",
    category: "네이버 칼럼",
    date: "10시간 전",
    author: "팀 트라이",
    authorProfileImage: "",
    headerImage: "",
    tags: ["습관", "루틴", "자기관리", "성장"],
    content: buildContent("main"),
    comments: [],
    isLiked: false,
    likeCount: 137,
    commentsEnabled: false,
    createdAt: now - 1000 * 60 * 60 * 10
  },
  {
    id: "mock-prev",
    title: "동기부여가 사라졌을 때도 계속 가는 사람들의 공통점",
    category: "성장 메모",
    date: "어제",
    author: "팀 트라이",
    authorProfileImage: "",
    headerImage: "",
    tags: ["동기부여", "회복력"],
    content: secondaryContent,
    comments: [],
    isLiked: false,
    likeCount: 52,
    commentsEnabled: false,
    createdAt: now - 1000 * 60 * 60 * 24
  },
  {
    id: "mock-next",
    title: "결국 멀리 가는 계획은 단순한 계획이다",
    category: "일의 기술",
    date: "2일 전",
    author: "팀 트라이",
    authorProfileImage: "",
    headerImage: "",
    tags: ["계획", "집중"],
    content: secondaryContent,
    comments: [],
    isLiked: false,
    likeCount: 44,
    commentsEnabled: false,
    createdAt: now - 1000 * 60 * 60 * 48
  }
];
