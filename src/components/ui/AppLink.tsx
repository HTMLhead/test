import type { ComponentProps } from "react";
import { Link } from "react-router-dom";

export default function AppLink({ href, ...props }: ComponentProps<"a">) {
  if (
    href &&
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !props.download
  ) {
    return <Link to={href} {...props} />;
  }
  return <a href={href} {...props} />;
}
