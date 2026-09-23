import { cx } from "@/lib/styles";
import { Button } from "@/components/ui";
import HeroLogoBackground from "@/components/ui/HeroLogoBackground";
import { links } from "@/data/home";
import styles from "./MastersHero.module.css";
export default function MastersHero() {
  return (
    <>
      <section
        className={cx(styles, "masters-hero")}
        aria-labelledby="masters-hero-heading"
      >
        <HeroLogoBackground variant="masters" />
        <div className={cx(styles, "masters-hero-inner")}>
          <div className={cx(styles, "masters-hero-copy")}>
            <h1
              id="masters-hero-heading"
              className={cx(styles, "typo-display-lg")}
            >
              AI 시대의
              <br />
              자바 백엔드 기반 풀스택 과정
            </h1>
            <p className={cx(styles, "typo-bold-xl")}>
              정답을 배우는 곳이 아니라, 개발자로 성장하는 방식을 훈련하는
              곳입니다.
            </p>
          </div>
          <Button
            label="과정 문의"
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
