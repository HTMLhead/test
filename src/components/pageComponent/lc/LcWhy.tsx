import { cx, inlineStyle } from "@/lib/styles";
import icons from "@/assets/img/icons";
import styles from "./LcWhy.module.css";
export default function LcWhy() {
  const checkIconUrl = icons.check;
  const problems = [
    {
      title: "Agent 개발의 문제",
      description: "데모는 만들지만 실무 환경에서는 쉽게 깨집니다.",
      answer: "실용적인 개발 방식, 하네스, 검증 콘텐츠로 해결합니다.",
    },
    {
      title: "학습의 문제",
      description:
        "배웠다는 감각은 있지만 실제 업무 흐름으로 이어지지 않습니다.",
      answer: "협력, 실전 적용, 피드백이 있는 학습 방식으로 해결합니다.",
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "lc-why")}
        aria-labelledby="lc-why-heading"
      >
        <div className={cx(styles, "container lc-why-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2 id="lc-why-heading" className={cx(styles, "typo-display-md")}>
              왜 LC - Learning Consulting일까요?
            </h2>
            <p className={cx(styles, "typo-body-lg")}>
              Agent, 데모는 되지만 실무에선 깨집니다.
              <br />
              배워도, 실무로 이어지지 않습니다.
              <br />
              LC - Learning Consulting은 콘텐츠와 방식, 두 축을 함께 다루며
              실무에서 작동하는 AI 활용 역량을 만듭니다.
            </p>
          </div>

          <ul className={cx(styles, "problem-grid")}>
            {problems.map((problem, itemIndex) => (
              <li key={itemIndex}>
                <h3 className={cx(styles, "typo-bold-xl")}>{problem.title}</h3>
                <p className={cx(styles, "problem-description typo-body-md")}>
                  {problem.description}
                </p>
                <p className={cx(styles, "problem-answer typo-bold-md")}>
                  <span
                    className={cx(styles, "check-icon")}
                    style={inlineStyle(`--check-icon: url("${checkIconUrl}")`)}
                    aria-hidden="true"
                  />
                  {problem.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
