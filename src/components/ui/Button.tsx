import type { MouseEventHandler } from "react";
import AppLink from "@/components/ui/AppLink";
import { cx, inlineStyle } from "@/lib/styles";
import icons from "@/assets/img/icons";
import styles from "./Button.module.css";
interface Props {
  label?: string;
  href?: string;
  icon?: "left" | "none" | "right";
  marginTop?: "none" | "sm" | "md";
  size?: "md" | "lg";
  status?: "default" | "hover" | "disabled" | "accent";
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  tabIndex?: number;
  ariaLabel?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}
export default function Button(props: Props) {
  const {
    label = "Button",
    href,
    icon = "none",
    marginTop = "none",
    size = "md",
    status = "default",
    type = "button",
    target,
    rel,
    tabIndex,
    ariaLabel,
    className,
    onClick,
  } = props;
  const isDisabled = status === "disabled";
  const isExternal = href ? /^https?:\/\//.test(href) : false;
  const linkRel =
    rel ?? (isExternal ? "noopener noreferrer nofollow" : undefined);
  const classes = [
    "ds-button",
    size === "lg" ? "typo-bold-lg" : "typo-bold-md",
    `is-${status}`,
    `is-size-${size}`,
    `has-icon-${icon}`,
    `has-margin-top-${marginTop}`,
    className,
  ];
  const getAssetUrl = (
    asset:
      | string
      | {
          src: string;
        },
  ) => (typeof asset === "string" ? asset : asset.src);
  const iconSrc =
    icon === "left"
      ? getAssetUrl(icons.plus)
      : icon === "right"
        ? getAssetUrl(icons.chevronRight)
        : undefined;
  const iconStyle = iconSrc ? `--button-icon: url("${iconSrc}")` : undefined;
  return (
    <>
      {href ? (
        <AppLink
          className={cx(styles, classes)}
          href={isDisabled ? undefined : href}
          aria-label={ariaLabel}
          aria-disabled={isDisabled ? "true" : undefined}
          tabIndex={isDisabled ? -1 : tabIndex}
          target={target}
          rel={linkRel}
          onClick={isDisabled ? undefined : onClick}
        >
          {icon === "left" && iconSrc && (
            <span
              className={cx(styles, "ds-button-icon")}
              style={inlineStyle(iconStyle)}
              aria-hidden="true"
            ></span>
          )}
          <span className={cx(styles, "ds-button-label")}>{label}</span>
          {icon === "right" && iconSrc && (
            <span
              className={cx(styles, "ds-button-icon")}
              style={inlineStyle(iconStyle)}
              aria-hidden="true"
            ></span>
          )}
        </AppLink>
      ) : (
        <button
          className={cx(styles, classes)}
          type={type}
          aria-label={ariaLabel}
          disabled={isDisabled}
          onClick={onClick}
          tabIndex={tabIndex}
        >
          {icon === "left" && iconSrc && (
            <span
              className={cx(styles, "ds-button-icon")}
              style={inlineStyle(iconStyle)}
              aria-hidden="true"
            ></span>
          )}
          <span className={cx(styles, "ds-button-label")}>{label}</span>
          {icon === "right" && iconSrc && (
            <span
              className={cx(styles, "ds-button-icon")}
              style={inlineStyle(iconStyle)}
              aria-hidden="true"
            ></span>
          )}
        </button>
      )}
    </>
  );
}
