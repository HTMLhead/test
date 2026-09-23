import { cx } from "@/lib/styles";
import Image from "@/components/ui/Image";
import olive1 from "@/assets/img/illusts/olive/olive1.png";
import olive2 from "@/assets/img/illusts/olive/olive2.png";
import olive3 from "@/assets/img/illusts/olive/olive3.png";
import styles from "./OliveOutcomes.module.css";
export default function OliveOutcomes() {
  const outcomes = [
    {
      title: "AI를 더 깊이 활용하는 능력",
      icon: olive1,
      description:
        "누구나 AI를 사용합니다. 올리브에서는 한 단계 더 나아가, AI의 근본적인 활용법을 학습 과정에서 체화하여 AI를 더 깊이 다루는 감각을 기릅니다.",
    },
    {
      title: "동료 피드백을 통해 넓어지는 관점",
      icon: olive2,
      description:
        "같은 미션도 사람마다 다르게 풀어냅니다. 동료들과 과정을 공유하며 하나의 문제를 더 다양한 방식으로 바라보는 힘을 기릅니다.",
    },
    {
      title: "미션을 풀면서 남는 실전 경험",
      icon: olive3,
      description:
        "강의를 들은 기억이 아니라, 직접 문제를 해결해 본 경험으로 AI 활용법을 내 학습 방식 안에 남깁니다.",
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "olive-outcomes")}
        aria-labelledby="olive-outcomes-heading"
      >
        <div className={cx(styles, "container olive-outcomes-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="olive-outcomes-heading"
              className={cx(styles, "typo-display-md text-wrap-pretty")}
            >
              올리브에서 무엇을 얻을 수 있나요?
            </h2>
          </div>

          <ul className={cx(styles, "outcome-grid")}>
            {outcomes.map((outcome, itemIndex) => (
              <li key={itemIndex}>
                <div className={cx(styles, "outcome-icon")} aria-hidden="true">
                  <Image src={outcome.icon} alt="" loading="lazy" />
                </div>
                <div className={cx(styles, "outcome-copy")}>
                  <h3 className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
                    {outcome.title}
                  </h3>
                  <p className={cx(styles, "typo-body-md text-wrap-pretty")}>
                    {outcome.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
