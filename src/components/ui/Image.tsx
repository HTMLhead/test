import type { ComponentProps } from "react";
import { imageSizes } from "@/data/imageSizes";

export default function Image({
  src,
  width,
  height,
  ...props
}: ComponentProps<"img">) {
  const size = src ? imageSizes[src] : undefined;
  return (
    <img
      src={src}
      width={width ?? size?.width}
      height={height ?? size?.height}
      decoding="async"
      {...props}
    />
  );
}
