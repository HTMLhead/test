import { cx, inlineStyle } from "@/lib/styles";
import icons from "@/assets/img/icons";
import styles from "./OliveFaq.module.css";
export default function OliveFaq() {
  const getAssetUrl = (
    asset:
      | string
      | {
          src: string;
        },
  ) => (typeof asset === "string" ? asset : asset.src);
  const chevronDownIcon = getAssetUrl(icons.chevronDown);
  const faqGroups = [
    {
      id: "course",
      title: "코스 관련 질문",
      items: [
        {
          question: "모집 기간을 놓치면 어떻게 되나요?",
          answer:
            "모집 기간이 지나면 해당 기수 코스에는 참여할 수 없습니다. 코스는 정기적으로 새 기수가 열리니, 다음 모집 일정을 확인해 주세요.",
        },
        {
          question: "코스는 얼마나 자주 열리나요?",
          answer:
            "올리브는 정기적으로 새 코스와 새 기수가 열립니다. 자세한 모집 일정은 <a href='https://olive.codesquad.kr' target='_blank' rel='noreferrer'>공식 홈페이지</a>의 각 코스에서 확인할 수 있습니다.",
        },
        {
          question: "한 코스를 수강하는 데 얼마나 시간이 필요한가요?",
          answer:
            "코스마다 다르지만, 길게는 한달, 짧게는 한주만에 끝나기도 합니다.",
        },
        {
          question: "미션 수행에는 어느 정도 시간이 필요한가요?",
          answer:
            "미션의 난이도와 개인 역량에 따라 다르지만, 한 미션을 완수하는 데 평균 3시간 정도가 소요됩니다. 학습 콘텐츠를 읽고, 직접 결과물을 만들고, 동료 피드백까지 주고받는 과정이 모두 포함됩니다.",
        },
        {
          question: "코스가 끝난 후에도 미션을 제출할 수 있나요?",
          answer:
            "코스 종료 후에는 미션 제출이 불가합니다. 동료 피드백은 같은 기수 내 수강생들 사이에서 이루어지기 때문에, 기간 내 제출을 권장합니다.",
        },
        {
          question: "미션을 기간 내에 완료하지 못하면 어떻게 되나요?",
          answer:
            "미션마다 제출 기한이 있으며, 기한 내에 완료하지 못하면 해당 미션의 동료 피드백 교환이 어려울 수 있습니다.",
        },
        {
          question: "제출한 미션은 누가 볼 수 있나요?",
          answer:
            "제출한 미션은 같은 코스를 함께 수강하는 동료 수강생들에게 공개됩니다. 동료 피드백 단계에서 서로의 결과물을 보고 소감을 나누는 방식으로 운영됩니다. 코스 외부나 비수강생에게는 공개되지 않습니다.",
        },
        {
          question: "코스가 끝난 뒤에도 학습 내용을 볼 수 있나요?",
          answer:
            "코스가 종료된 후에도 내가 작성한 결과물과 학습 콘텐츠는 계속 열람할 수 있습니다.",
        },
      ],
    },
    {
      id: "feedback",
      title: "피드백 관련",
      items: [
        {
          question: "동료 피드백은 어떻게 진행되나요?",
          answer:
            "미션을 제출하면 동료들의 결과물이 공개됩니다. 피드백 하기 단계에서 동료의 결과물을 직접 확인하고 소감 댓글을 남기며, 피드백 보기 단계에서는 동료들이 내 결과물에 남긴 소감을 확인할 수 있습니다. 댓글을 통해 추가적인 의견을 주고받는 것도 가능합니다.",
        },
        {
          question: "피드백은 의무인가요?",
          answer:
            "네, 동료 피드백은 학습 과정의 일부입니다. 최소한 하나의 피드백을 남겨야 다음 단계로 진행할 수 있습니다. 피드백을 주고받는 과정 자체가 중요한 학습 경험이기 때문에 필수로 운영됩니다.",
        },
        {
          question: "피드백을 받지 못하면 어떻게 되나요?",
          answer:
            "동료 피드백은 수강생 수와 제출 시기에 따라 양이 다를 수 있습니다. 피드백을 받지 못하더라도 피드백 보기 단계를 완료하고 다음으로 넘어갈 수 있습니다.",
        },
      ],
    },
    {
      id: "outside-course",
      title: "코스 바깥 질문",
      items: [
        {
          question: "모바일에서도 학습할 수 있나요?",
          answer:
            "올리브는 웹 기반 서비스로 모바일 브라우저에서도 접속할 수 있습니다. 다만 코드 작성이나 파일 제출이 포함된 미션은 PC 환경에서 진행하는 것을 권장합니다.",
        },
        {
          question: "개발자가 아니어도 참여할 수 있나요?",
          answer:
            "네, 코스마다 요구하는 배경지식이 다릅니다. 각 코스 소개 페이지에서 권장 수준을 확인하신 후 자신에게 맞는 코스를 선택해 주세요.",
        },
        {
          question: "어떤 AI 도구를 사용해야 하나요?",
          answer:
            "특정 AI 도구를 강제하지 않습니다. ChatGPT, Claude, Gemini 등 본인에게 익숙한 도구를 자유롭게 활용하시면 됩니다. 코스 내에서 각 도구의 활용법도 함께 다룹니다.",
        },
        {
          question: "유료 AI 도구가 꼭 필요한가요?",
          answer:
            "무료 플랜으로도 학습을 진행할수도 있습니다. 다만 일부 고급 기능은 유료 플랜에서만 제공되는 경우가 있으므로, 학습 경험을 높이고 싶다면 유료 플랜을 고려해볼 수 있습니다.",
        },
        {
          question: "AI를 처음 써봐도 따라갈 수 있나요?",
          answer:
            "물론입니다. 올리브는 AI 도구를 처음 접하는 분들도 단계별로 익힐 수 있는 코스도 있습니다. 미션을 수행하면서 자연스럽게 AI 활용법을 익히게 됩니다.",
        },
        {
          question: "수업을 위해 정해진 시간에 접속해야 하나요?",
          answer:
            "아니요. 올리브는 비동기 방식으로 운영됩니다. 미션 기한 내라면 원하는 시간에 자유롭게 학습할 수 있습니다.",
        },
        {
          question: "코스마다 난이도가 다른가요?",
          answer:
            "네, 코스마다 다루는 주제와 난이도가 다릅니다. 각 코스 소개 페이지에서 권장 사전 지식과 난이도를 확인하실 수 있습니다.",
        },
        {
          question: "수료 기준이 있나요?",
          answer:
            "모든 미션을 제출하고 소감을 남기면 수료 기준을 충족합니다. 수료 시 수료증을 발급 받으실 수 있습니다.",
        },
      ],
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "olive-faq")}
        aria-labelledby="olive-faq-heading"
      >
        <div className={cx(styles, "container olive-faq-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="olive-faq-heading"
              className={cx(styles, "typo-display-md text-wrap-pretty")}
            >
              자주 묻는 질문
            </h2>
          </div>

          <div className={cx(styles, "faq-groups")}>
            {faqGroups.map((group, itemIndex) => (
              <section
                className={cx(styles, "faq-group")}
                aria-labelledby={`faq-${group.id}`}
                key={itemIndex}
              >
                <h3
                  id={`faq-${group.id}`}
                  className={cx(styles, "typo-bold-xl text-wrap-pretty")}
                >
                  {group.title}
                </h3>
                <div
                  className={cx(styles, "faq-accordion")}
                  style={inlineStyle(
                    `--faq-chevron-icon: url("${chevronDownIcon}")`,
                  )}
                >
                  {group.items.map((item, itemIndex) => (
                    <details className={cx(styles, "faq-card")} key={itemIndex}>
                      <summary className={cx(styles, "typo-bold-md")}>
                        <span className={cx(styles, "text-wrap-pretty")}>
                          {item.question}
                        </span>
                        <span
                          className={cx(styles, "faq-chevron")}
                          aria-hidden="true"
                        ></span>
                      </summary>
                      <div className={cx(styles, "faq-answer")}>
                        <p
                          className={cx(
                            styles,
                            "typo-body-md text-wrap-pretty",
                          )}
                          dangerouslySetInnerHTML={{
                            __html: item.answer,
                          }}
                        ></p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
