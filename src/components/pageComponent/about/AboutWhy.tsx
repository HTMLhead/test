import { cx, inlineStyle } from "@/lib/styles";
import place1Image from "@/assets/img/picture/place1.png";
import styles from "./AboutWhy.module.css";
export default function AboutWhy() {
  return (
    <>
      <section
        className={cx(styles, "about-why")}
        style={inlineStyle(`--about-why-background: url("${place1Image}")`)}
        aria-labelledby="about-why-heading"
      >
        <div className={cx(styles, "container about-why-inner")}>
          <h2
            id="about-why-heading"
            className={cx(styles, "typo-display-lg text-wrap-pretty")}
          >
            개발 교육과 현장 사이의 간극을 줄입니다
          </h2>
          <p className={cx(styles, "typo-body-xl text-wrap-pretty")}>
            코드스쿼드의 창립 멤버들은 네이버가 설립한 소프트웨어 전문 교육기관
            NHN NEXT 의 교수진이었습니다. 대학 교육과 현장이 점점 멀어지는 것을
            보며, 그 간극을 직접 줄여보기로 했습니다.
          </p>
          <p className={cx(styles, "typo-body-xl text-wrap-pretty")}>
            강의를 듣는 것만으로는 개발자가 되기 어렵습니다. 직접 문제를
            마주하고, 코드를 짜고, 리뷰를 받고, 다시 개선하는 과정을 교육에
            녹여내려고 노력했습니다.
          </p>
        </div>
      </section>
    </>
  );
}
