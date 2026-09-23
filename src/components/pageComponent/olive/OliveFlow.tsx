import { cx, inlineStyle } from "@/lib/styles";
import icons from "@/assets/img/icons";
import styles from "./OliveFlow.module.css";
export default function OliveFlow() {
  const getAssetUrl = (
    asset:
      | string
      | {
          src: string;
        },
  ) => (typeof asset === "string" ? asset : asset.src);
  const chevronDownIcon = getAssetUrl(icons.chevronDown);
  const learningFlow = [
    {
      title: "시작하기",
      description: "미션을 본격적으로 시작하기 전, 전반적인 안내를 확인합니다.",
    },
    {
      title: "학습하기",
      description:
        "미션을 진행하면서 주제에 대해 학습하고 AI 활용법을 익힙니다.",
    },
    {
      title: "제출하기",
      description: "학습하는 과정에서 작성한 내용을 최종 검토하고 제출합니다.",
    },
    {
      title: "피드백 하기",
      description: "동료들의 제출물을 보고 자신의 소감을 남깁니다.",
    },
    {
      title: "피드백 보기",
      description:
        "동료들이 내게 남긴 소감을 확인하고, 추가적으로 서로 다양한 의견을 주고 받습니다.",
    },
    {
      title: "완료하기",
      description: "최종적으로 미션을 마무리하며 배운 내용을 정리합니다.",
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "olive-flow")}
        aria-labelledby="olive-flow-heading"
      >
        <div className={cx(styles, "container olive-flow-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="olive-flow-heading"
              className={cx(styles, "typo-display-md text-wrap-pretty")}
            >
              어떻게 배우나요?
            </h2>
            <p className={cx(styles, "typo-body-lg text-wrap-pretty")}>
              올리브에서는 올리브만의 학습 프로세스를 통해서 학습할 수 있습니다.
            </p>
          </div>

          <ol
            className={cx(styles, "flow-list")}
            style={inlineStyle(`--flow-arrow-icon: url("${chevronDownIcon}")`)}
          >
            {learningFlow.map((step, index) => (
              <li key={index}>
                <span className={cx(styles, "flow-index typo-bold-sm")}>
                  {String(index + 1)}
                </span>
                <div className={cx(styles, "flow-copy")}>
                  <h3 className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
                    {step.title}
                  </h3>
                  <p className={cx(styles, "typo-body-md text-wrap-pretty")}>
                    {step.description}
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
