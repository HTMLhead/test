export const experiencePath = "/olive/experience";
export const experienceTitle = "대화형 AI 사용하기";
export const experienceLevel = "입문";
export const experienceDuration = "약 1시간";
export const experienceCompleters = 0;
export const experienceTasks = [
  {
    id: "1",
    title: "시작하기",
    description: "이 코스에서 어떤 일을 해 볼지 살펴봅니다.",
    minutes: 3,
  },
  {
    id: "2",
    title: "AI란 무엇일까요?",
    description:
      "AI와 LLM은 어떻게 다르고, 대화형 AI서비스는 이를 어떻게 활용하는지 알아봅니다.",
    minutes: 7,
  },
  {
    id: "3",
    title: "첫 대화 해보기",
    description:
      "AI 서비스 하나를 골라 예시 요청을 보내고, 첫 답변을 받아 봅니다.",
    minutes: 10,
  },
  {
    id: "4",
    title: "요청 다듬기",
    description:
      "저녁 메뉴를 요청하면서 필요한 정보를 더하고, 답변을 본 뒤 후속 요청으로 다듬어 봅니다.",
    minutes: 15,
  },
  {
    id: "5",
    title: "내 일에 써 보기",
    description:
      "메일 초안, 긴 글 요약처럼 내 일에 맞는 요청을 직접 만들어 보냅니다.",
    minutes: 15,
  },
  {
    id: "6",
    title: "돌아보고 이어가기",
    description:
      "답을 확인하는 기준을 익히고, AI를 계속 배워 갈 방법을 살펴봅니다.",
    minutes: 7,
  },
] as const;
export const experienceOutcomes = [
  "AI가 무엇이고 대화형 AI서비스와 어떤 관계인지에 대한 기초 이해",
  "프롬프트를 쓰고, 맥락을 주고, 답을 검토하는 더 탄탄한 습관",
  "평소 자주 하는 실제 업무 하나를 더 낫게 다듬은 결과물",
];
