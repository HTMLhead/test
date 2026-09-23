import { cx } from "@/lib/styles";
import Image from "@/components/ui/Image";
import aboutHero from "@/assets/img/illusts/hero/about.png";
import homeHero from "@/assets/img/illusts/hero/home.png";
import learningHero from "@/assets/img/illusts/hero/learning-method.png";
import oliveHero from "@/assets/img/illusts/hero/olive.png";
import lcHero from "@/assets/img/illusts/hero/lc.png";
import mastersHero from "@/assets/img/illusts/hero/masters.png";
import styles from "./HeroLogoBackground.module.css";
interface Props {
  variant?: "home" | "about" | "learning" | "olive" | "lc" | "masters";
  className?: string;
}
export default function HeroLogoBackground(props: Props) {
  const { variant = "home", className } = props;
  const heroImage = {
    home: homeHero,
    about: aboutHero,
    learning: learningHero,
    olive: oliveHero,
    lc: lcHero,
    masters: mastersHero,
  }[variant];
  return (
    <>
      <div
        className={cx(styles, ["hero-logo-background", className])}
        aria-hidden="true"
      >
        <Image src={heroImage} alt="" loading="eager" />
      </div>
    </>
  );
}
