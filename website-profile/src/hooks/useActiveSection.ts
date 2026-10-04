import { useEffect, useState } from "react";

/**
 * Tracks which section currently crosses the middle of the viewport,
 * using IntersectionObserver. Used by the navbar for active-link highlighting.
 *
 * Pass a stable list of ids (e.g. memoized); the observer is rebuilt when they change.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const sections = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      // Active = the section crossing a band around the viewport middle.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
