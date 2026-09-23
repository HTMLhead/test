import { cx } from "@/lib/styles";
import Button from "@/components/ui/Button";
import styles from "./FeatureSection.module.css";
export default function FeatureSection() {
  return (
    <>
      <section
        className={cx(styles, "feature")}
        aria-labelledby="feature-heading"
      >
        <div className={cx(styles, "container feature-inner")}>
          <h2 id="feature-heading">코드스쿼드만의 학습법</h2>
          <div className={cx(styles, "feature-body")}>
            <p
              className={cx(
                styles,
                "typo-bold-md typo-bold-lg-tablet typo-bold-xl-desktop text-wrap-pretty text-grey-4",
              )}
            >
              국내 주요 기업에서 10년간 검증된 교육 방식입니다. 직접 만들며
              익히는 실습 중심 학습과 실전 프로젝트, 협업과 피드백을 통해 현장에
              바로 적용할 수 있는 역량을 기릅니다.
            </p>
            <div className={cx(styles, "feature-action")}>
              <Button
                label="자세히 보기"
                href="/learning-method"
                icon="right"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
