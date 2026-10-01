import { experiencePath, experienceTitle, experienceTasks } from "./experience";

export const siteSeo = {
  name: "코드스쿼드",
  defaultTitle: "코드스쿼드 | AI·개발 교육",
  defaultDescription:
    "코드스쿼드는 AI 시대에 필요한 개발 역량과 학습 경험을 설계하는 교육기관입니다.",
  locale: "ko_KR",
  ogImage: "/assets/img/seo/codesquad.png",
  logo: "/assets/img/seo/codesquad-logo.png",
  email: "yoda@codesquad.kr",
  sameAs: [
    "https://codesquad-yoda.medium.com/",
    "https://www.youtube.com/channel/UC8OU76dfIn8jvWmXt8roMZg",
    "https://www.facebook.com/codesquad.kr/",
  ],
};

export const seoPages = [
  {
    path: "/",
    title: "코드스쿼드 | AI·개발 교육",
    description:
      "AI와 개발 역량을 함께 기르는 코드스쿼드의 마스터즈, 올리브, 기업 교육 프로그램을 소개합니다.",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/masters",
    title: "마스터즈 2027 | 코드스쿼드",
    description:
      "AI 시대의 자바 백엔드 기반 풀스택 과정, 코드스쿼드 마스터즈 2027을 소개합니다.",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/olive",
    title: "AI 배우고 써보기 | 코드스쿼드",
    description:
      "AI와의 첫 대화를 직접 체험하고, 올리브의 미션과 동료 피드백으로 AI 활용을 배워보세요.",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: experiencePath,
    title: `${experienceTitle} | 코드스쿼드`,
    description:
      "AI 요청의 원리를 이해하고 나만의 프롬프트를 만든 뒤, 후속 요청으로 다듬는 체험입니다.",
    priority: "0.7",
    changefreq: "monthly",
  },
  ...experienceTasks.map((task) => ({
    path: `${experiencePath}/${task.id}` as const,
    title: `${task.title} | ${experienceTitle} | 코드스쿼드`,
    description: task.description,
    priority: "0.6",
    changefreq: "monthly",
  })),
  {
    path: "/partners",
    title: "LC 기업 교육 | 코드스쿼드",
    description:
      "Agent 개발방법을 배우고 실무에 바로 적용하는 코드스쿼드의 기업 대상 교육 프로그램 LC를 소개합니다.",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/learning-method",
    title: "학습법 | 코드스쿼드",
    description:
      "코드스쿼드의 전문가 설계, PBL 미션, 근거기반 교육공학, CS와 AI 활용까지 연결되는 학습 설계 방식을 소개합니다.",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/about",
    title: "회사 소개 | 코드스쿼드",
    description:
      "코드스쿼드가 개발 교육과 현장 사이의 간극을 줄여온 방식, 마스터, 과정, 교육 연혁을 소개합니다.",
    priority: "0.6",
    changefreq: "monthly",
  },
] as const;

export type SeoPath = (typeof seoPages)[number]["path"];

export const getPageSeo = (path: SeoPath) => {
  const page = seoPages.find((item) => item.path === path);

  if (!page) {
    return {
      title: siteSeo.defaultTitle,
      description: siteSeo.defaultDescription,
      canonicalPath: "/",
    };
  }

  return {
    title: page.title,
    description: page.description,
    canonicalPath: page.path,
  };
};
