import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Simple focus trap for modals/dialogs.
 * When active, focus moves to the first focusable element on mount,
 * Tab cycles within the container, and focus returns to the previously
 * focused element on unmount.
 */
export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const selector =
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

    const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(selector));

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const first = getFocusable()[0];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }
      const focusable = getFocusable();
      if (focusable.length === 0) {
        return;
      }
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [active, containerRef]);
}
