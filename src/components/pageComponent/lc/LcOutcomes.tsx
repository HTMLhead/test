import { cx } from "@/lib/styles";
import Image from "@/components/ui/Image";
import lc4 from "@/assets/img/illusts/lc/lc4.png";
import lc5 from "@/assets/img/illusts/lc/lc5.png";
import lc6 from "@/assets/img/illusts/lc/lc6.png";
import styles from "./LcOutcomes.module.css";
export default function LcOutcomes() {
  const outcomes = [
    {
      label: "실전 완주",
      labelClass: "",
      title: "결과물",
      description:
        "연습 과제가 아니라 실무에서 실제로 돌아가는 Agent를 남깁니다.",
      image: lc4,
    },
    {
      label: "실전 완주",
      labelClass: "",
      title: "일반화 리포트",
      description:
        "참가자 사례를 모아 일반화한 리포트를 회사의 학습 자산으로 남깁니다.",
      image: lc5,
    },
    {
      label: "공통",
      labelClass: "outcome-label-muted",
      title: "지속적인 업데이트 콘텐츠",
      description: "수료 후에도 접근할 수 있는 최신 학습 콘텐츠를 제공합니다.",
      image: lc6,
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "lc-outcomes")}
        aria-labelledby="lc-outcomes-heading"
      >
        <div className={cx(styles, "container lc-outcomes-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="lc-outcomes-heading"
              className={cx(styles, "typo-display-md")}
            >
              회사에 남는 것
            </h2>
          </div>

          <ul className={cx(styles, "outcome-grid")}>
            {outcomes.map((outcome, itemIndex) => (
              <li key={itemIndex}>
                <p
                  className={cx(styles, [
                    "outcome-label",
                    "typo-bold-sm",
                    outcome.labelClass,
                  ])}
                >
                  {outcome.label}
                </p>
                <Image
                  src={outcome.image}
                  alt=""
                  className={cx(styles, "outcome-image")}
                  aria-hidden="true"
                  loading="lazy"
                />
                <h3 className={cx(styles, "typo-bold-xl")}>{outcome.title}</h3>
                <p className={cx(styles, "typo-body-md")}>
                  {outcome.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
