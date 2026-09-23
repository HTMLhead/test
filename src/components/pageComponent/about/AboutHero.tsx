import { cx } from "@/lib/styles";
import HeroLogoBackground from "@/components/ui/HeroLogoBackground";
import styles from "./AboutHero.module.css";
export default function AboutHero() {
  return (
    <>
      <section
        className={cx(styles, "about-hero")}
        aria-labelledby="about-heading"
      >
        <HeroLogoBackground variant="about" />
        <div className={cx(styles, "container about-hero-inner")}>
          <div className={cx(styles, "about-hero-copy")}>
            <h1
              id="about-heading"
              className={cx(styles, "typo-display-lg text-wrap-pretty")}
            >
              우리는 문제로 배웁니다.
              <br />
              우리는 함께 성장합니다.
              <br />
              우리는 AI 시대에 도전합니다.
            </h1>
            <p className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
              코드스쿼드는 미션과 프로젝트, 코드 리뷰와 협업을 통해 개발자가
              현업의 방식으로 성장하는 학습 경험을 설계하는 소프트웨어 교육
              회사입니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
