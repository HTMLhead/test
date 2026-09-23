import { cx } from "@/lib/styles";
import { Button } from "@/components/ui";
import { links } from "@/data/home";
import styles from "./MastersOperation.module.css";
export default function MastersOperation() {
  const operationInfo = [
    {
      label: "시작 일자",
      value: "미정",
    },
    {
      label: "기간",
      value: "24주",
    },
    {
      label: "방식",
      value: "온라인 중심 + 오프라인 집중",
    },
    {
      label: "오프라인 장소",
      value: "코드스쿼드 강의장, 서울 강남구 역삼동",
    },
    {
      label: "학습 방식",
      value: "미션, 코드 리뷰, 동료 학습, 팀 프로젝트",
    },
    {
      label: "중심 기술",
      value: "Java, Spring, MySQL, Cloud, React, AI 도구",
    },
    {
      label: "수강료",
      value: "월 50만 원 예정",
    },
    {
      label: "대상",
      value: "개발 기본기를 갖추고 장기적으로 성장하고 싶은 예비 개발자",
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "masters-operation")}
        aria-labelledby="masters-operation-heading"
      >
        <div className={cx(styles, "container masters-operation-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="masters-operation-heading"
              className={cx(styles, "typo-display-md")}
            >
              운영 정보
            </h2>
            <p className={cx(styles, "typo-body-lg")}>
              마스터즈 2027은 24주 동안 미션과 리뷰, 프로젝트로 이어집니다.
            </p>
          </div>

          <div
            className={cx(styles, "operation-table")}
            aria-label="마스터즈 운영 정보"
          >
            <dl className={cx(styles, "operation-list")}>
              {operationInfo.map((item, itemIndex) => (
                <div className={cx(styles, "operation-row")} key={itemIndex}>
                  <dt className={cx(styles, "typo-bold-lg")}>{item.label}</dt>
                  <dd className={cx(styles, "typo-body-lg")}>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={cx(styles, "operation-cta")}>
            <Button
              label="대기자 신청"
              href={links.waitlistForm}
              target="_blank"
              status="accent"
              icon="right"
              size="lg"
              marginTop="md"
            />
          </div>
        </div>
      </section>
    </>
  );
}
