import { cx } from "@/lib/styles";
import Image from "@/components/ui/Image";
import method1 from "@/assets/img/illusts/studyMethod/method1.png";
import method2 from "@/assets/img/illusts/studyMethod/method2.png";
import method3 from "@/assets/img/illusts/studyMethod/method3.png";
import method4 from "@/assets/img/illusts/studyMethod/method4.png";
import { learningMethods } from "@/data/learningMethod";
import styles from "./LearningMethodList.module.css";
export default function LearningMethodList() {
  const methodImages = [method1, method2, method3, method4];
  return (
    <>
      <section
        className={cx(styles, "method-list-section")}
        aria-labelledby="method-list-heading"
      >
        <div className={cx(styles, "container method-list-inner")}>
          <div className={cx(styles, "method-list-header")}>
            <h2
              id="method-list-heading"
              className={cx(styles, "typo-display-lg text-wrap-pretty")}
            >
              코드스쿼드 학습 설계 방식
            </h2>
          </div>

          <ol className={cx(styles, "method-list")}>
            {learningMethods.map((method, index) => (
              <li
                className={cx(styles, [
                  "method-item",
                  index % 2 === 1 && "is-reversed",
                ])}
                key={index}
              >
                <div className={cx(styles, "method-visual")} aria-hidden="true">
                  <Image
                    src={methodImages[index]}
                    alt=""
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className={cx(styles, "method-copy")}>
                  <h3
                    className={cx(styles, "typo-display-sm text-wrap-pretty")}
                  >
                    {method.title}
                  </h3>
                  <p className={cx(styles, "typo-body-lg text-wrap-pretty")}>
                    {method.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
