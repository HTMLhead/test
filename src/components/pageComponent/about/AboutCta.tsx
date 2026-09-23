import { cx } from "@/lib/styles";
import Button from "@/components/ui/Button";
import SectionLogoBackground from "@/components/ui/SectionLogoBackground";
import { links } from "@/data/home";
import styles from "./AboutCta.module.css";
export default function AboutCta() {
  return (
    <>
      <section
        className={cx(styles, "about-cta")}
        aria-labelledby="about-cta-heading"
      >
        <SectionLogoBackground position="right" variant="about" size="32rem" />
        <div className={cx(styles, "container about-cta-inner")}>
          <h2
            id="about-cta-heading"
            className={cx(styles, "typo-display-md text-wrap-pretty")}
          >
            함께 성장하는 교육을 고민하고 계신가요?
          </h2>
          <p className={cx(styles, "typo-body-lg text-wrap-pretty")}>
            조직의 목표와 학습자의 수준에 맞춰 미션, 리뷰, 협업 중심의 교육
            경험을 함께 설계합니다.
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
