import { cx } from "@/lib/styles";
import HeroLogoBackground from "@/components/ui/HeroLogoBackground";
import styles from "./LearningMethodHero.module.css";
export default function LearningMethodHero() {
  return (
    <>
      <section
        className={cx(styles, "learning-hero")}
        aria-labelledby="learning-heading"
      >
        <HeroLogoBackground variant="learning" />
        <div className={cx(styles, "container learning-hero-inner")}>
          <h1
            id="learning-heading"
            className={cx(styles, "typo-display-lg text-wrap-pretty")}
          >
            강의보다 깊게,
            <br />
            경험으로 구조화하는 학습법
          </h1>
          <p className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
            코드스쿼드는 전문가의 설계, PBL 미션, 근거기반 교육공학, CS와 AI까지
            연결되는 지식 구조를 하나의 학습 경험으로 만듭니다.
          </p>
        </div>
      </section>
    </>
  );
}
