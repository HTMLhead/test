import { cx } from "@/lib/styles";
import styles from "./MastersAudience.module.css";
export default function MastersAudience() {
  const recommended = [
    "Java 또는 다른 언어를 조금 배웠지만, 실제 서비스를 어떻게 만드는지 막막한 분",
    "백엔드 개발자로 성장하고 싶은데 CS, DB, 인프라까지 함께 다지고 싶은 분",
    "AI 도구를 쓰고 있지만 결과를 검증하는 힘이 부족하다고 느끼는 분",
    "혼자 공부하는 데 한계를 느끼고, 동료 및 멘토와 함께 학습이 필요한 분",
    "컴퓨터 공학을 졸업하고 부트캠프를 수료했지만 아직 부족하다고 느끼는 분",
    "단기 취업 스킬보다 오래가는 개발 역량을 쌓고 싶은 분",
  ];
  const reconsider = [
    "짧은 기간 안에 취업 공식만 배우고 싶은 분",
    "강의를 듣는 것만으로 학습을 끝내고 싶은 분",
    "미션 수행, 코드 리뷰, 회고에 시간을 쓰기 어려운 분",
    "AI가 만들어 준 코드를 이해하지 않고 결과만 얻고 싶은 분",
  ];
  return (
    <>
      <section
        className={cx(styles, "masters-audience")}
        aria-labelledby="masters-audience-heading"
      >
        <div className={cx(styles, "container masters-audience-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="masters-audience-heading"
              className={cx(styles, "typo-display-md")}
            >
              추천 대상
            </h2>
            <p className={cx(styles, "typo-body-lg")}>
              마스터즈는 오래가는 개발 역량을 동료와 함께 쌓고 싶은 분에게
              적합합니다.
            </p>
          </div>

          <div className={cx(styles, "audience-grid")}>
            <section
              className={cx(styles, "audience-card is-recommended")}
              aria-labelledby="masters-recommended-heading"
            >
              <h3
                id="masters-recommended-heading"
                className={cx(styles, "typo-bold-xl")}
              >
                이런 분에게 추천합니다
              </h3>
              <ul>
                {recommended.map((item, itemIndex) => (
                  <li className={cx(styles, "typo-body-md")} key={itemIndex}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section
              className={cx(styles, "audience-card is-reconsider")}
              aria-labelledby="masters-reconsider-heading"
            >
              <h3
                id="masters-reconsider-heading"
                className={cx(styles, "typo-bold-xl")}
              >
                다시 한 번 고민해 주세요
              </h3>
              <ul>
                {reconsider.map((item, itemIndex) => (
                  <li className={cx(styles, "typo-body-md")} key={itemIndex}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
