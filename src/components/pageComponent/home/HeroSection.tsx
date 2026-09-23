import { cx } from "@/lib/styles";
import HeroCarousel from "@/components/pageComponent/home/HeroCarousel/HeroCarousel";
import HeroLogoBackground from "@/components/ui/HeroLogoBackground";
import b2bAiImage from "@/assets/img/picture/B2BAI.png";
import oliveImage from "@/assets/img/picture/Olive.png";
import { links } from "@/data/home";
import styles from "./HeroSection.module.css";
export default function HeroSection() {
  const getAssetUrl = (
    asset:
      | string
      | {
          src: string;
        },
  ) => (typeof asset === "string" ? asset : asset.src);
  const carouselItems = [
    {
      title: "함께 배우는 AI, Olive",
      description: "미션을 따라가며 누구나 AI 활용을 익힙니다",
      href: links.olive,
      linkLabel: "자세히 보기",
      backgroundImage: `url("${getAssetUrl(oliveImage)}")`,
    },
    {
      title: "현업에 바로 적용하는 AI·AX 교육",
      description: "실제 업무에 적용하며 배우는 기업 맞춤 교육.",
      href: links.partners,
      linkLabel: "자세히 보기",
      backgroundImage: `url("${getAssetUrl(b2bAiImage)}")`,
    },
  ];
  return (
    <>
      <section className={cx(styles, "hero")} aria-label="코드스쿼드 소개">
        <HeroLogoBackground variant="home" />

        <div className={cx(styles, "hero-panel hero-intro")}>
          <div className={cx(styles, "hero-content")}>
            <h1 className={cx(styles, "hero-title typo-display-lg")}>
              전문가와 함께 AI를 배우는
              <br />
              고품질 교육기관
            </h1>
            <p className={cx(styles, "hero-description typo-bold-xl")}>
              개인 학습자를 위한 마스터즈, 함께 배우는 Olive, 기업을 위한 AI
              교육까지
            </p>
          </div>
        </div>

        <div className={cx(styles, "hero-panel hero-carousel")}>
          <HeroCarousel items={carouselItems} />
        </div>
      </section>
    </>
  );
}
