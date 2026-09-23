import "./Badge.css";

type BadgeColor = "black" | "green" | "orange" | "grey";

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  className?: string;
}

export default function Badge({
  label,
  color = "black",
  className,
}: BadgeProps) {
  const classes = ["ds-badge", `is-${color}`, "typo-bold-xs", className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{label}</span>;
}
