import { useEffect, useState } from "react";

// Keep practice notes through task navigation and reloads in the current tab.
export function useDraft<T extends Record<string, string>>(
  key: string,
  initial: T,
) {
  const storageKey = `olive-experience:${key}`;
  const [draft, setDraft] = useState<T>(() => {
    try {
      const stored: unknown = JSON.parse(
        sessionStorage.getItem(storageKey) ?? "null",
      );
      if (stored && typeof stored === "object" && !Array.isArray(stored)) {
        return Object.fromEntries(
          Object.entries(initial).map(([field, fallback]) => [
            field,
            typeof (stored as Record<string, unknown>)[field] === "string"
              ? (stored as Record<string, string>)[field]
              : fallback,
          ]),
        ) as T;
      }
    } catch {
      /* Storage is optional; the form also works without it. */
    }
    return initial;
  });
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(draft));
    } catch {
      /* Keep the in-memory draft when storage is unavailable. */
    }
  }, [draft, storageKey]);
  return [draft, setDraft] as const;
}
