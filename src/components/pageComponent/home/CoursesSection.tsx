import { cx } from "@/lib/styles";
import Button from "@/components/ui/Button";
import HeroLogoBackground from "@/components/ui/HeroLogoBackground";
import Tag from "@/components/ui/Tag";
import styles from "./CoursesSection.module.css";
type CourseAction = {
  label: string;
  href: string;
  accent?: boolean;
  target?: string;
};
type Course = {
  type: string;
  heroVariant: "olive" | "lc" | "masters";
  palette: "olive" | "partner" | "masters";
  layout: "featured" | "half";
  title: string;
  description: string;
  details: string[];
  actions: CourseAction[];
};
export default function CoursesSection() {
  const courses: Course[] = [
    {
      type: "개인 학습",
      heroVariant: "olive",
      palette: "olive",
      layout: "featured",
      title: "AI 배우고 써보기 - Olive",
      description:
        "미션 기반 학습으로 누구나 AI 활용을 익히는 B2C 교육 서비스입니다.",
      details: ["AI 입문·활용", "미션 중심 학습", "온라인 학습"],
      actions: [
        {
          label: "소개 보기",
          href: "/olive",
        },
        {
          label: "Olive 바로가기",
          href: "https://olive.codesquad.kr",
          accent: true,
          target: "_blank",
        },
      ],
    },
    {
      type: "기업 교육",
      heroVariant: "lc",
      palette: "partner",
      layout: "half",
      title: "기업·파트너 AI 교육",
      description:
        "조직의 AI 도입과 전환을 지원하는 맞춤형 교육 프로그램입니다.",
      details: ["AI Agent 활용", "AX 실무 전환", "2·4·8주 캠프"],
      actions: [
        {
          label: "기업 교육 과정 보기",
          href: "/partners",
          accent: true,
        },
      ],
    },
    {
      type: "부트캠프",
      heroVariant: "masters",
      palette: "masters",
      layout: "half",
      title: "마스터즈 코스",
      description: "6개월 풀타임으로 진행하는 정규 부트캠프입니다.",
      details: ["AI 엔지니어", "웹 풀스택", "모바일"],
      actions: [
        {
          label: "마스터즈 과정 보기",
          href: "/masters",
          accent: true,
        },
      ],
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "courses")}
        aria-labelledby="courses-label"
      >
        <div className={cx(styles, "container")}>
          <div className={cx(styles, "section-heading")}>
            <h2 id="courses-label" className={cx(styles, "typo-display-lg")}>
              메인 코스 안내
            </h2>
            <p className={cx(styles, "typo-bold-xl")}>
              현재 상황에 맞는 교육을 선택하세요.
            </p>
          </div>

          <ul className={cx(styles, "course-grid")}>
            {courses.map((course, itemIndex) => (
              <li
                className={cx(styles, [
                  "course-card",
                  `is-${course.layout}`,
                  `palette-${course.palette}`,
                ])}
                key={itemIndex}
              >
                <HeroLogoBackground
                  variant={course.heroVariant}
                  className={cx(styles, "course-card-bg")}
                />
                <div className={cx(styles, "course-card-content")}>
                  <div className={cx(styles, "course-card-main")}>
                    <div className={cx(styles, "course-title-row")}>
                      <h3 className={cx(styles, "typo-bold-xl")}>
                        {course.title}
                      </h3>
                      <Tag
                        label={course.type}
                        className={cx(styles, "course-tag")}
                      />
                    </div>
                    <p className={cx(styles, "typo-body-lg")}>
                      {course.description}
                    </p>
                  </div>

                  <ul
                    className={cx(styles, "course-detail-list")}
                    aria-label={`${course.title} 특징`}
                  >
                    {course.details.map((detail, itemIndex) => (
                      <li
                        className={cx(styles, "typo-bold-xs")}
                        key={itemIndex}
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className={cx(styles, "card-foot")}>
                    {course.actions.map((action, itemIndex) => (
                      <Button
                        label={action.label}
                        href={action.href}
                        icon="right"
                        status={action.accent ? "accent" : "default"}
                        target={action.target}
                        className={cx(styles, "course-action")}
                        key={itemIndex}
                      />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
