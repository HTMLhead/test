import { cx } from "@/lib/styles";
import styles from "./OlivePrinciples.module.css";
export default function OlivePrinciples() {
  const principles = [
    {
      title: "미션 기반 학습",
      description: "온라인 강의 대신 직접 주어진 미션을 해결합니다.",
    },
    {
      title: "AI 활용법 내재화",
      description:
        "단순한 질문과 답변을 넘어서서, AI를 더 효율적으로 활용하는 방법을 학습합니다.",
    },
    {
      title: "동료 피드백",
      description:
        "동료의 학습 결과를 검토하고 상호 피드백으로 풍부하게 성장합니다.",
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "olive-principles")}
        aria-labelledby="olive-principles-heading"
      >
        <div className={cx(styles, "container olive-principles-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="olive-principles-heading"
              className={cx(styles, "typo-display-md text-wrap-pretty")}
            >
              강의를 듣기만 하는 학습에서,
              <br />
              AI를 활용하여 직접 해결하는 학습으로
            </h2>
            <p className={cx(styles, "typo-body-lg text-wrap-pretty")}>
              올리브는 강의를 듣고 끝내는 학습이 아닙니다. <br />
              직접 미션을 풀며, AI를 활용해 문제를 해결하는 법을 익힙니다.
            </p>
          </div>

          <ul className={cx(styles, "principle-grid")}>
            {principles.map((principle, itemIndex) => (
              <li key={itemIndex}>
                <h3 className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
                  {principle.title}
                </h3>
                <div className={cx(styles, "principle-grid-line")}></div>
                <p className={cx(styles, "typo-body-md text-wrap-pretty")}>
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
