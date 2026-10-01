import { useId, useState, type CSSProperties } from "react";
import styles from "./AiResponseJourney.module.css";

const stages = [
  {
    label: "입력",
    title: "질문과 대화 내용을 일기",
    description:
      "사용자가 보낸 질문과 앞서 나눈 대화가 모델이 참고하는 맥락이 됩니다.",
  },
  {
    label: "모델의 예측",
    title: "다음에 올 말의 후보를 예측",
    description:
      "모델은 학습한 언어의 패턴과 현재 맥락을 바탕으로 다음에 이어질 가능성이 높은 말의 조각을 고릅니다.",
  },
  {
    label: "출력",
    title: "고른 말을 더하고 다시 예측",
    description:
      "새로 만든 말은 다음 예측의 맥락에 포함됩니다. 이 과정을 여러 번 반복해 하나의 답변을 완성합니다.",
  },
] as const;

const candidates = [
  ["우산을", 72],
  ["비옷을", 18],
  ["장화를", 10],
] as const;

export default function AiResponseJourney() {
  const headingId = useId();
  const detailId = useId();
  const [stage, setStage] = useState(0);
  const current = stages[stage];

  return (
    <section
      className={styles.journey}
      aria-labelledby={headingId}
      data-step={stage}
    >
      <div className={styles.header}>
        <h3 id={headingId}>모델이 답변을 만드는 단계</h3>
      </div>

      <ol className={styles.stageCards} aria-label="답변 생성 단계">
        {stages.map((item, index) => (
          <li key={item.label}>
            <button
              type="button"
              aria-pressed={stage === index}
              aria-controls={detailId}
              onClick={() => setStage(index)}
            >
              <span className={styles.number}>0{index + 1}</span>
              <strong>{item.label}</strong>
              <span aria-hidden="true">→</span>
            </button>
          </li>
        ))}
      </ol>

      <div
        id={detailId}
        key={stage}
        className={styles.detail}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className={styles.copy}>
          <span className={styles.stepLabel}>{current.label}</span>
          <h4>{current.title}</h4>
          <p>{current.description}</p>
        </div>

        {stage === 0 && (
          <div className={styles.inputExample}>
            <span>사용자의 질문</span>
            <p>“비가 오는 날 외출할 때 무엇을 챙기면 좋을까?”</p>
            <div className={styles.context}>
              모델이 참고하는 맥락: 사용자의 질문 + 앞서 나눈 대화
            </div>
          </div>
        )}

        {stage === 1 && (
          <div className={styles.predictionExample}>
            <p className={styles.prompt}>
              비가 오는 날 외출할 때 무엇을 챙기면 좋을까? →
            </p>
            <ul aria-label="다음에 올 말의 후보 예시">
              {candidates.map(([word, chance], index) => (
                <li key={word} className={index === 0 ? styles.selected : ""}>
                  <span>{word}</span>
                  <span className={styles.bar} aria-hidden="true">
                    <span style={{ width: `${chance}%` }} />
                  </span>
                  <strong>{chance}%</strong>
                </li>
              ))}
            </ul>
          </div>
        )}

        {stage === 2 && (
          <div className={styles.outputExample}>
            <span className={styles.outputLabel}>반복해서 만들어진 답변</span>
            <div className={styles.generatedWords}>
              {["우산을", "챙기면", "좋아요."].map((word, index) => (
                <span
                  key={word}
                  style={{ "--word-index": index } as CSSProperties}
                >
                  {word}
                </span>
              ))}
            </div>
            <p>“우산을 챙기면 좋아요.”</p>
            <div className={styles.loop}>
              예측 → 출력에 추가 → 새 맥락으로 다시 예측
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
