import { cx } from "@/lib/styles";
import styles from "./LearningMethodOverview.module.css";
export default function LearningMethodOverview() {
  const principles = [
    {
      title: "전문가 설계",
      description: "과정 목표와 피드백 기준을 분야별 전문가가 직접 설계합니다.",
    },
    {
      title: "미션 중심",
      description:
        "학습자는 직접 만들고 고치며 지식이 필요한 순간을 경험합니다.",
    },
    {
      title: "활동 기반",
      description:
        "회고, 설명, 협업 활동으로 학습 과정을 더 선명하게 만듭니다.",
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "method-overview")}
        aria-labelledby="method-overview-heading"
      >
        <div className={cx(styles, "container method-overview-inner")}>
          <div className={cx(styles, "overview-copy")}>
            <h2
              id="method-overview-heading"
              className={cx(styles, "typo-display-md text-wrap-pretty")}
            >
              단순한 지식 전달이 아닌
              <br />
              성장하는 과정을 설계합니다
            </h2>
          </div>
          <ul
            className={cx(styles, "principle-list")}
            aria-label="코드스쿼드 학습법 핵심 원칙"
          >
            {principles.map((principle, itemIndex) => (
              <li key={itemIndex}>
                <strong className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
                  {principle.title}
                </strong>
                <span className={cx(styles, "typo-body-md text-wrap-pretty")}>
                  {principle.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
