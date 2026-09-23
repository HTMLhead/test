import { cx } from "@/lib/styles";
import Button from "@/components/ui/Button";
import HeroLogoBackground from "@/components/ui/HeroLogoBackground";
import { links } from "@/data/home";
import styles from "./OliveHero.module.css";
export default function OliveHero() {
  return (
    <>
      <section
        className={cx(styles, "olive-hero")}
        aria-labelledby="olive-heading"
      >
        <HeroLogoBackground variant="olive" />
        <div className={cx(styles, "container olive-hero-inner")}>
          <div className={cx(styles, "olive-hero-copy")}>
            <h1
              id="olive-heading"
              className={cx(styles, "typo-display-lg text-wrap-pretty")}
            >
              미션을 해결하며 동료와 함께
              <br />
              AI 활용법을 익히는 실전형 학습 플랫폼
            </h1>
            <p className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
              혼자 듣고 끝나는 강의가 아니라, 미션을 수행하고 피드백을 나누며
              <br />
              AI를 내 학습과 문제 해결에 적용해 봅니다.
            </p>
            <div className={cx(styles, "olive-actions")}>
              <Button
                label="지금 열린 코스 보기"
                href="https://olive.codesquad.kr"
                status="accent"
                icon="right"
                size="lg"
                marginTop="md"
              />
              {/* <Button label="지금 열린 코스 보기" href="https://olive.codesquad.kr" status="accent" icon="right" /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
