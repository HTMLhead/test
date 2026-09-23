import { cx } from "@/lib/styles";
import { SectionLogoBackground } from "@/components/ui";
import Button from "@/components/ui/Button";
import { links } from "@/data/home";
import styles from "./LearningMethodCta.module.css";
export default function LearningMethodCta() {
  return (
    <>
      <section
        className={cx(styles, "learning-cta")}
        aria-labelledby="learning-cta-heading"
      >
        <SectionLogoBackground
          position="center"
          variant="learning"
          size="32rem"
          opacity={0.14}
        />
        <div className={cx(styles, "container learning-cta-inner")}>
          <h2
            id="learning-cta-heading"
            className={cx(styles, "typo-display-md text-wrap-pretty")}
          >
            교육 목표에 맞는 학습 경험을 함께 설계합니다
          </h2>
          <p className={cx(styles, "typo-body-lg text-wrap-pretty")}>
            기업 교육, 부트캠프, 재직자 교육까지 목표와 대상에 맞춰 지식, 미션,
            활동, 피드백 흐름을 구성합니다.
          </p>
          <Button
            label="문의하기"
            href={links.email}
            status="accent"
            icon="right"
            size="lg"
            marginTop="md"
          />
        </div>
      </section>
    </>
  );
}
