import { cx } from "@/lib/styles";
import { Badge } from "@/components/ui";
import styles from "./LcPrograms.module.css";
export default function LcPrograms() {
  const programs = [
    {
      name: "Builders",
      title: "Agent Workflows",
      target: "디자인, 기획, PM, IT 관련자 등 비개발자",
      problem: "개발 의존으로 느린 검증, 데모에서 멈추는 결과물",
      outcome:
        "기본 테스팅과 신뢰 경계를 갖춰, 본인 업무에 믿고 쓸 Agent를 직접 개발합니다.",
    },
    {
      name: "Engineers",
      title: "Agent Workflows",
      target: "주니어 수준 전문 개발자",
      problem: "임기응변식 프롬프트, 하네스와 패턴 선택 기준 부재",
      outcome:
        "올바른 설계, 판단, 검증, 평가 기준을 세우고 상황별 최적 하네스 엔지니어링을 익힙니다.",
    },
  ];
  const formats = [
    {
      name: "집중 학습",
      description: "2day",
      detail:
        "Day 1 - 2 동안 핵심 원리와 실전 개발 흐름을 집중적으로 학습합니다.",
      scope: ["학습"],
    },
    {
      name: "실전 완주",
      description: "2day + 2주 실무 적용 + 3day",
      detail: "집중 학습 이후 현업 과제에 적용하고, 최종 개선까지 이어갑니다.",
      scope: ["학습", "적용", "개선"],
    },
  ];
  const scopes = [
    {
      name: "학습",
      description: "Day 1 - 2",
    },
    {
      name: "적용",
      description: "2주 · 온라인",
    },
    {
      name: "개선",
      description: "Day 3",
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "lc-programs")}
        aria-labelledby="lc-programs-heading"
      >
        <div className={cx(styles, "container lc-programs-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="lc-programs-heading"
              className={cx(styles, "typo-display-md")}
            >
              역할에 맞는 과정,
              <br />
              목표에 맞는 구성
            </h2>
            <p className={cx(styles, "typo-body-lg")}>
              팀의 역할에 맞는 과정을 선택하고, 교육 목표에 맞춰 진행 구성을
              결정합니다.
            </p>
          </div>

          <section
            className={cx(styles, "program-detail")}
            aria-labelledby="lc-program-detail-heading"
          >
            <div className={cx(styles, "sub-heading")}>
              <h3
                id="lc-program-detail-heading"
                className={cx(styles, "typo-display-sm")}
              >
                과정 안내
              </h3>
              <p className={cx(styles, "typo-body-lg")}>
                두 과정 모두 집중 학습 또는 실전 완주 구성으로 도입할 수
                있습니다.
              </p>
            </div>

            <ul className={cx(styles, "program-grid")}>
              {programs.map((program, itemIndex) => (
                <li key={itemIndex}>
                  <div className={cx(styles, "typo-bold-xl")}>
                    <span>
                      {program.title} <br />
                      for <strong>{program.name}</strong>
                    </span>
                  </div>
                  <dl>
                    <div>
                      <dt className={cx(styles, "typo-bold-md")}>대상</dt>
                      <dd className={cx(styles, "typo-body-md")}>
                        {program.target}
                      </dd>
                    </div>
                    <div>
                      <dt className={cx(styles, "typo-bold-md")}>해결 과제</dt>
                      <dd className={cx(styles, "typo-body-md")}>
                        {program.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className={cx(styles, "typo-bold-md")}>기대 효과</dt>
                      <dd className={cx(styles, "typo-body-md")}>
                        {program.outcome}
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={cx(styles, "format-detail")}
            aria-labelledby="lc-format-heading"
          >
            <div className={cx(styles, "sub-heading")}>
              <h3
                id="lc-format-heading"
                className={cx(styles, "typo-display-sm")}
              >
                구성 안내
              </h3>
              <p className={cx(styles, "typo-body-lg")}>
                구성에 따라 학습 이후 실무 적용과 개선까지 이어갈 수 있습니다.
              </p>
            </div>

            <div className={cx(styles, "format-grid")}>
              {formats.map((format, itemIndex) => (
                <article key={itemIndex}>
                  <div className={cx(styles, "article-header")}>
                    <div className={cx(styles, "typo-bold-xl")}>
                      {format.name}
                    </div>
                    <Badge label={format.description} color="green" />
                  </div>
                  <p className={cx(styles, "typo-body-md")}>{format.detail}</p>
                </article>
              ))}
            </div>

            <div
              className={cx(styles, "coverage")}
              aria-labelledby="lc-coverage-heading"
            >
              <h3
                id="lc-coverage-heading"
                className={cx(styles, "typo-bold-xl")}
              >
                구성별 진행 범위
              </h3>
              <div className={cx(styles, "coverage-list")}>
                {formats.map((format, itemIndex) => (
                  <div className={cx(styles, "coverage-row")} key={itemIndex}>
                    <div className={cx(styles, "coverage-title")}>
                      <p className={cx(styles, "typo-bold-lg")}>
                        {format.name}
                      </p>
                    </div>
                    <ul>
                      {scopes.map((scope, itemIndex) => {
                        const isActive = format.scope.includes(scope.name);
                        return (
                          <li
                            className={cx(styles, [
                              "coverage-chip",
                              {
                                "is-active": isActive,
                              },
                            ])}
                            key={itemIndex}
                          >
                            <strong className={cx(styles, "typo-bold-sm")}>
                              {scope.name}
                            </strong>
                            {isActive && (
                              <span className={cx(styles, "typo-body-xs")}>
                                {scope.description}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
