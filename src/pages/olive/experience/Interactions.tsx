import { useState } from "react";
import styles from "./index.module.css";

export function MediaSlot({
  kind,
  title,
  description,
}: {
  kind: "video" | "image";
  title: string;
  description: string;
}) {
  return (
    <figure
      className={`${styles.media} ${kind === "image" ? styles.mediaImage : ""}`}
    >
      <span>{kind === "video" ? "영상" : "이미지"}</span>
      <strong>{title}</strong>
      <figcaption>{description}</figcaption>
    </figure>
  );
}

const refinements = [
  {
    name: "재료 바꾸기",
    request:
      "닭가슴살은 없고 두부와 달걀이 있어. 이 재료를 쓰는 메뉴로 다시 추천해줘.",
    answer:
      "두부 달걀 덮밥을 추천해요. 두부를 노릇하게 굽고 달걀을 곁들여 밥 위에 올리면 약 25분 안에 만들 수 있어요. 단백질 30g을 맞추려면 두부 한 모와 달걀 두 개를 사용하고, 제품의 영양 정보를 함께 확인해 주세요.",
  },
  {
    name: "조건 더하기",
    request:
      "오늘은 속이 불편해서 맵지 않고 기름기가 적은 한식으로만 다시 골라줘.",
    answer:
      "오늘은 맵지 않은 닭고기 채소죽을 가장 추천해요. 닭가슴살과 달걀을 넣으면 담백하면서도 단백질을 보충할 수 있고, 기름을 거의 쓰지 않아 부담이 적어요. 약 30분 정도 걸리며 예상 단백질 양은 재료의 제품 표시를 확인해 조절해 주세요.",
  },
  {
    name: "비교하기 쉽게",
    request:
      "메뉴 이름, 예상 조리 시간, 예상 단백질 양, 추천 이유를 표로 정리해줘.",
    answer:
      "메뉴 | 조리 시간 | 예상 단백질 | 추천 이유\n닭가슴살 순두부찌개 | 약 25분 | 약 35g | 한식이고 단백질을 챙기기 쉬움\n소고기 청경채 볶음 | 약 20분 | 약 30g | 빠르게 만들 수 있는 중식 스타일\n두부 달걀 덮밥 | 약 25분 | 약 30g | 재료가 단순하고 든든함\n\n단백질 양은 사용한 재료와 양에 따라 달라질 수 있어요.",
  },
];

export function RefinementExample() {
  const [refinement, setRefinement] = useState<number | null>(null);
  const selected = refinement === null ? null : refinements[refinement];
  return (
    <>
      {" "}
      <p className={styles.exampleNote}>
        아래 답변은 학습을 위해 미리 작성한 예시입니다. 실제 AI가 생성한
        결과와는 다른 내용이에요.
      </p>
      <div className={styles.refineGrid}>
        <div className={styles.before}>
          <span className={styles.small}>처음 받은 답변 예시</span>
          <p>
            가장 추천하는 메뉴는 닭가슴살 순두부찌개예요. 한식이면서 조금
            매콤하게 만들 수 있고, 닭가슴살과 순두부를 함께 넣으면 단백질을
            챙기기 좋아요. 약 25분 안에 만들 수 있습니다.
          </p>
        </div>
        <div className={styles.after}>
          <div className={styles.presets} aria-label="후속 요청 선택">
            {refinements.map((item, i) => (
              <button
                type="button"
                key={item.name}
                aria-pressed={refinement === i}
                onClick={() => {
                  setRefinement(i);
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div aria-live="polite">
            {selected ? (
              <>
                <p className={styles.request}>“{selected.request}”</p>
                <p className={styles.answer}>{selected.answer}</p>
              </>
            ) : (
              <p className={styles.empty}>
                어떻게 바꾸고 싶나요?
                <br />
                위에서 요청을 고르면 수정된 예시가 나타납니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
