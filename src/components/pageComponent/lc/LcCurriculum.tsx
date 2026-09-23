import { cx } from "@/lib/styles";
import styles from "./LcCurriculum.module.css";
export default function LcCurriculum() {
  const curricula = [
    {
      title: "Builders",
      days: [
        {
          title: "Day 1 · 원리",
          items: [
            "프롬프트, 컨텍스트, 하네스의 개념과 차이",
            "개발 워크플로우와 Agent 개발 워크플로우의 차이",
            "Agent가 잘하는 것과 못하는 것, 신뢰 경계",
            "비개발자에게 필요한 개발지식 에센셜",
          ],
        },
        {
          title: "Day 2 · 실전",
          items: [
            "Agent 개발 환경과 시스템, Claude Code와 Codex CLI",
            "실무 주제 페어 실습, 워크플로우 기반 Agent 설계와 제작",
            "신뢰성을 확보하는 기본 테스팅",
            "그룹 세션을 통한 진행 사항 공유",
          ],
        },
      ],
    },
    {
      title: "Engineers",
      days: [
        {
          title: "Day 1 · 원리",
          items: [
            "아키텍처 설계, 리팩토링, 코드 평가의 엔지니어링 기본",
            "올바른 설계와 판단의 기준 세우기",
            "상황별 하네스 엔지니어링 전략",
          ],
        },
        {
          title: "Day 2 · 실전",
          items: [
            "사례별 개발 워크플로우 패턴 실습",
            "실무 주제 페어 실습과 결과물 검증, 평가",
            "나의 워크플로우 개선점 도출과 전략 계획",
            "그룹 세션을 통한 진행 사항 공유",
          ],
        },
      ],
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "lc-curriculum")}
        aria-labelledby="lc-curriculum-heading"
      >
        <div className={cx(styles, "container lc-curriculum-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="lc-curriculum-heading"
              className={cx(styles, "typo-display-md")}
            >
              학습 커리큘럼
            </h2>
            <p className={cx(styles, "typo-body-lg")}>
              두 과정 모두 Day 1 원리, Day 2 실전 흐름으로 진행합니다.
            </p>
          </div>

          <ul className={cx(styles, "curriculum-grid")}>
            {curricula.map((course, itemIndex) => (
              <li key={itemIndex}>
                <h3 className={cx(styles, "typo-bold-xl")}>
                  Agent Workflows <br />
                  for <strong>{course.title}</strong>
                </h3>
                <div className={cx(styles, "day-list")}>
                  {course.days.map((day, itemIndex) => (
                    <section
                      aria-label={`${course.title} ${day.title}`}
                      key={itemIndex}
                    >
                      <h3 className={cx(styles, "typo-bold-lg")}>
                        {day.title}
                      </h3>
                      <ul>
                        {day.items.map((item, itemIndex) => (
                          <li
                            className={cx(styles, "typo-body-md")}
                            key={itemIndex}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <p className={cx(styles, "curriculum-note typo-body-sm")}>
            * 실전 완주 구성은 2주 실무 적용과 Day 3 개선까지 이어집니다. 자세한
            커리큘럼은 도입 문의 시 제공합니다.
          </p>
        </div>
      </section>
    </>
  );
}
