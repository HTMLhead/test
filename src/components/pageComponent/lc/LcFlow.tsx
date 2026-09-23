import { Fragment } from "react";
import { cx, inlineStyle } from "@/lib/styles";
import Image from "@/components/ui/Image";
import icons from "@/assets/img/icons";
import lc1 from "@/assets/img/illusts/lc/lc1.png";
import lc2 from "@/assets/img/illusts/lc/lc2.png";
import lc3 from "@/assets/img/illusts/lc/lc3.png";
import styles from "./LcFlow.module.css";
export default function LcFlow() {
  const getAssetUrl = (
    asset:
      | string
      | {
          src: string;
        },
  ) => (typeof asset === "string" ? asset : asset.src);
  const chevronRightIcon = getAssetUrl(icons.chevronRight);
  const flow = [
    {
      label: "오프라인 · Day 1 - 2",
      title: "학습",
      description: "Agent의 원리와 실전 개발 흐름을 익힙니다.",
      image: lc1,
    },
    {
      label: "온라인 · 2주",
      title: "적용",
      description: "본인의 현업 과제에 적용하고\n매주 피드백을 받습니다.",
      image: lc2,
    },
    {
      label: "오프라인 · Day 3",
      title: "개선",
      description: "최종 피드백을 통해 워크플로우를 완성합니다.",
      image: lc3,
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "lc-flow")}
        aria-labelledby="lc-flow-heading"
      >
        <div className={cx(styles, "container lc-flow-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2 id="lc-flow-heading" className={cx(styles, "typo-display-md")}>
              LC - Learning Consulting은
              <br />
              학습에서 끝내지 않습니다.
            </h2>
            <p className={cx(styles, "typo-body-lg")}>
              강의로 끝나는 교육이 아니라, 본인의 현업 과제로 한 사이클을
              완주합니다.
            </p>
          </div>

          <ol
            className={cx(styles, "flow-list")}
            style={inlineStyle(
              `--flow-chevron-icon: url("${chevronRightIcon}")`,
            )}
          >
            {flow.map((step, index) => (
              <li key={index}>
                <div className={cx(styles, "flow-card")}>
                  <Image
                    src={step.image}
                    alt=""
                    className={cx(styles, "flow-card-img")}
                    aria-hidden="true"
                    loading="lazy"
                  />
                  <p className={cx(styles, "flow-label typo-bold-sm")}>
                    {step.label}
                  </p>
                  <h3 className={cx(styles, "typo-bold-xl")}>{step.title}</h3>
                  <p className={cx(styles, "typo-body-md")}>
                    {step.description
                      .split("\n")
                      .map((line, lineIndex, lines) => (
                        <Fragment key={lineIndex}>
                          {line}
                          {lineIndex < lines.length - 1 && <br />}
                        </Fragment>
                      ))}
                  </p>
                </div>
                {index < flow.length - 1 && (
                  <span
                    className={cx(styles, "flow-arrow")}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
