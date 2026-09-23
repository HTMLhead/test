import { cx } from "@/lib/styles";
import styles from "./MastersIntro.module.css";
export default function MastersIntro() {
  const narratives = [
    {
      kicker: "AI 시대의 질문",
      description:
        "AI는 코드를 빠르게 만들 수 있지만, 무엇을 만들어야 하는지 판단하고 결정하며 제대로 되었는지 검증하는 일은 여전히 개발자의 몫입니다.",
    },
    {
      kicker: "코드스쿼드가 지켜온 방식",
      description:
        "지난 10년간 코드스쿼드 마스터즈는 미션, 코드 리뷰, 동료 학습을 통해 개발자의 성장을 함께해 왔습니다.",
    },
    {
      kicker: "2027년의 변화",
      description:
        "2027년 마스터즈는 AI 시대에 맞춰 백엔드 중심 풀스택 과정으로 새롭게 바뀝니다.",
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "masters-intro")}
        aria-labelledby="masters-intro-heading"
      >
        <div className={cx(styles, "container masters-intro-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="masters-intro-heading"
              className={cx(styles, "typo-display-md text-wrap-pretty")}
            >
              AI가 코드를 만드는 시대,
              <br />
              개발자는 무엇을 배워야 할까요?
            </h2>
          </div>

          <ol className={cx(styles, "narrative-list")}>
            {narratives.map((item, index) => (
              <li key={index}>
                <span className={cx(styles, "narrative-index typo-bold-sm")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={cx(styles, "narrative-copy")}>
                  <p
                    className={cx(
                      styles,
                      "narrative-kicker typo-bold-md text-wrap-pretty",
                    )}
                  >
                    {item.kicker}
                  </p>
                  <p className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
