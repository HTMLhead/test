import { cx } from "@/lib/styles";
import { Button } from "@/components/ui";
import HeroLogoBackground from "@/components/ui/HeroLogoBackground";
import { links } from "@/data/home";
import styles from "./LcHero.module.css";
export default function LcHero() {
  return (
    <>
      <section
        className={cx(styles, "lc-hero")}
        aria-labelledby="lc-hero-heading"
      >
        <HeroLogoBackground variant="lc" />
        <div className={cx(styles, "container lc-hero-inner")}>
          <div className={cx(styles, "lc-hero-copy")}>
            <h1
              id="lc-hero-heading"
              className={cx(styles, "typo-display-lg text-wrap-pretty")}
            >
              Agent 개발방법을 배우고, 실무에 적용하는
              <br />
              LC - Learning Consulting
            </h1>
            <p className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
              만들어도, 배워도 AI는 막상 실무에서 멈추기 쉽습니다.
              <br />
              LC - Learning Consulting 은 개발 방식과 학습 방식을 함께 설계해 그
              간극을 좁힙니다.
            </p>
          </div>
          <Button
            label="도입 문의"
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
