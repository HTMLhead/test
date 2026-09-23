import { cx } from "@/lib/styles";
import { Button } from "@/components/ui";
import SectionLogoBackground from "@/components/ui/SectionLogoBackground";
import { links } from "@/data/home";
import styles from "./MastersCta.module.css";
export default function MastersCta() {
  return (
    <>
      <section
        className={cx(styles, "masters-cta")}
        aria-labelledby="masters-cta-heading"
      >
        <SectionLogoBackground
          position="center"
          variant="masters"
          size="32rem"
          opacity={0.14}
        />
        <div className={cx(styles, "container masters-cta-inner")}>
          <h2
            id="masters-cta-heading"
            className={cx(styles, "typo-display-md")}
          >
            고민하고 계신가요?
          </h2>
          <p className={cx(styles, "typo-body-lg")}>
            모집 일정, 준비 수준, 과정 운영 방식이 궁금하다면 문의를 남겨주세요.
            <br />
            현재 상황에 맞춰 필요한 정보를 안내해드립니다.
          </p>
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
