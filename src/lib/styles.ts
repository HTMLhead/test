import type { CSSProperties } from "react";

type ClassValue =
  string | false | null | undefined | ClassValue[] | Record<string, unknown>;

// Keep public class names for shared typography and parent/child selectors,
// while CSS Modules isolate each component's original Astro styles.
export function cx(styles: Record<string, string>, value: ClassValue): string {
  const flatten = (entry: ClassValue): string[] => {
    if (!entry) return [];
    if (typeof entry === "string") return entry.split(/\s+/).filter(Boolean);
    if (Array.isArray(entry)) return entry.flatMap(flatten);
    return Object.entries(entry)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name);
  };
  return [
    ...new Set(
      flatten(value).flatMap((name) => [name, styles[name]].filter(Boolean)),
    ),
  ].join(" ");
}

export function inlineStyle(
  value: string | undefined,
): CSSProperties | undefined {
  if (!value) return undefined;
  return Object.fromEntries(
    value
      .split(";")
      .filter(Boolean)
      .map((declaration) => {
        const separator = declaration.indexOf(":");
        const name = declaration.slice(0, separator).trim();
        return [
          name.startsWith("--")
            ? name
            : name.replace(/-([a-z])/g, (_, letter: string) =>
                letter.toUpperCase(),
              ),
          declaration.slice(separator + 1).trim(),
        ];
      }),
  ) as CSSProperties;
}
