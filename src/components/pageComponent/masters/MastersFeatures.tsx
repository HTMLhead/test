import { cx } from "@/lib/styles";
import Image from "@/components/ui/Image";
import masters1 from "@/assets/img/illusts/masters/masters1.png";
import masters2 from "@/assets/img/illusts/masters/masters2.png";
import masters3 from "@/assets/img/illusts/masters/masters3.png";
import masters4 from "@/assets/img/illusts/masters/masters4.png";
import styles from "./MastersFeatures.module.css";
export default function MastersFeatures() {
  const features = [
    {
      title: "미션과 협력 중심의 학습",
      description:
        "다양한 미션을 자기주도적으로 해결하면서 필요한 지식을 본인의 것으로 만듭니다. 그 과정에서 동료와 학습하고 협력하며 함께 성장합니다.",
      image: masters1,
    },
    {
      title: "기초부터 실전까지 아우르는 커리큘럼",
      description:
        "CS, 분야별 학습, 그룹 프로젝트로 이어지는 단계를 경험합니다. 모든 미션과 프로젝트는 현업 개발자의 지속적인 조언을 바탕으로 구성합니다.",
      image: masters2,
    },
    {
      title: "실제 서비스와 유사한 그룹 프로젝트",
      description:
        "AI를 적극적으로 활용하며 서비스를 만들고, 계획, 배포 일정, 협업 커뮤니케이션을 반복적으로 경험합니다.",
      image: masters3,
    },
    {
      title: "코드스쿼드 커뮤니티",
      description:
        "마스터즈는 2016년부터 이어져 왔습니다. 과정 수료 이후에도 코드스쿼드 멤버로 지속적인 소통이 가능합니다.",
      image: masters4,
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "masters-features")}
        aria-labelledby="masters-features-heading"
      >
        <div className={cx(styles, "container masters-features-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="masters-features-heading"
              className={cx(styles, "typo-display-md text-wrap-pretty")}
            >
              마스터즈 코스의 교육 특징
            </h2>
            <p className={cx(styles, "typo-body-lg text-wrap-pretty")}>
              강의를 따라가는 방식보다, 미션과 리뷰, 협력 속에서 개발자로
              성장하는 방식을 훈련합니다.
            </p>
          </div>

          <ul className={cx(styles, "feature-grid")}>
            {features.map((feature, itemIndex) => (
              <li key={itemIndex}>
                <div className={cx(styles, "feature-image-wrap")}>
                  <Image
                    src={feature.image}
                    alt=""
                    className={cx(styles, "feature-image")}
                    aria-hidden="true"
                    loading="lazy"
                  />
                </div>
                <div className={cx(styles, "feature-copy")}>
                  <h3 className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
                    {feature.title}
                  </h3>
                  <p className={cx(styles, "typo-body-md text-wrap-pretty")}>
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
