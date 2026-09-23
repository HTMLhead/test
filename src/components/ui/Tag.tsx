import { cx } from "@/lib/styles";
import styles from "./Tag.module.css";
interface Props {
  label?: string;
  color?: "black" | "green" | "orange" | "grey";
  className?: string;
}
export default function Tag(props: Props) {
  const { label = "Category", color = "black", className } = props;
  const classes = ["ds-tag", `is-${color}`, className];
  return (
    <>
      <span className={cx(styles, [...classes, "typo-bold-xs"])}>{label}</span>
    </>
  );
}
