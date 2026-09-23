import { cx } from "@/lib/styles";
import { Button, SectionLogoBackground } from "@/components/ui";
import { links } from "@/data/home";
import styles from "./LcCta.module.css";
export default function LcCta() {
  return (
    <>
      <section
        className={cx(styles, "lc-cta")}
        aria-labelledby="lc-cta-heading"
      >
        <SectionLogoBackground
          position="center"
          variant="lc"
          size="32rem"
          opacity={0.14}
        />
        <div className={cx(styles, "container lc-cta-inner")}>
          <h2 id="lc-cta-heading" className={cx(styles, "typo-display-md")}>
            도입을 검토하고 계신가요?
          </h2>
          <p className={cx(styles, "typo-body-lg")}>
            LC - Learning Consulting은 기업 현장 또는 코드스쿼드 교육장에서
            진행할 수 있습니다. 문의를 남겨주시면 팀 상황에 맞는 과정과 운영
            방식을 자세히 안내해드립니다.
          </p>
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
