import { cx } from "@/lib/styles";
import Image from "@/components/ui/Image";
import aboutHero from "@/assets/img/illusts/hero/about.png";
import homeHero from "@/assets/img/illusts/hero/home.png";
import lcHero from "@/assets/img/illusts/hero/lc.png";
import learningHero from "@/assets/img/illusts/hero/learning-method.png";
import mastersHero from "@/assets/img/illusts/hero/masters.png";
import oliveHero from "@/assets/img/illusts/hero/olive.png";
import styles from "./SectionLogoBackground.module.css";
type Variant = "home" | "about" | "learning" | "olive" | "lc" | "masters";
type Position = "left" | "right" | "center";
interface Props {
  variant?: Variant;
  position?: Position;
  size?: string;
  opacity?: number;
  className?: string;
}
export default function SectionLogoBackground(props: Props) {
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
        className={cx(styles, ["section-logo-background", className])}
        aria-hidden="true"
      >
        <Image src={heroImage} alt="" loading="lazy" />
      </div>
    </>
  );
}
