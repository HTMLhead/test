import { cx } from "@/lib/styles";
import Button from "@/components/ui/Button";
import HeroLogoBackground from "@/components/ui/HeroLogoBackground";
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
              AI를 직접 써보며,
              <br />내 일의 가능성을 넓혀보세요.
            </h1>
            <p className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
              첫 대화를 연습하는 짧은 체험부터, 함께 배우는 올리브 코스까지.
              <br />
              나에게 맞는 시작점을 찾아 AI를 일상과 업무에 써보세요.
            </p>
            <div className={cx(styles, "olive-actions")}>
              <Button
                label="먼저 AI 체험하기"
                href="#ai-experience"
                status="accent"
                icon="right"
                size="lg"
              />
              <Button
                label="올리브 코스 보기"
                href="#olive-courses"
                size="lg"
                icon="right"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
