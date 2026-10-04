import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, FlaskConical, Loader2 } from "lucide-react";
import { Badge } from "./ui/Badge";
import { useContent } from "../i18n/useLanguage";

const INTRO_SEEN_KEY = "ih-intro-seen";

/** True when the intro already ran this browser session. */
export function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // sessionStorage unavailable — the intro simply shows again next session
  }
}

interface IntroProps {
  /** Called when the sequence finishes or Skip is pressed; the parent then unmounts the overlay. */
  onComplete: () => void;
}

/* Sequence timeline (~3s visible + exit) */
const FIRST_LINE_AT_MS = 500;
const LINE_STAGGER_MS = 450;
const CHECK_AFTER_MS = 350;
const PASSED_EXTRA_MS = 150;
const HOLD_MS = 550;

/**
 * Full-screen "test runner" intro: a small mono card runs four checks,
 * fills a progress bar, pops an "All tests passed" badge, then slides up.
 * The parent (App) controls when it mounts — once per session, never for reduced motion.
 */
export function Intro({ onComplete }: IntroProps) {
  const t = useContent();
  const reduceMotion = useReducedMotion();
  const checks = t.intro.checks;
  const total = checks.length;

  const [visibleLines, setVisibleLines] = useState(reduceMotion ? total : 0);
  const [resolvedLines, setResolvedLines] = useState(reduceMotion ? total : 0);
  const [showPassed, setShowPassed] = useState(reduceMotion ? true : false);
  const timers = useRef<number[]>([]);

  // Lock body scroll while the overlay is mounted (restored after the exit animation).
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Drive the line-by-line sequence. Unmounting (skip/finish) clears pending timers.
  useEffect(() => {
    if (reduceMotion) {
      const id = window.setTimeout(onComplete, HOLD_MS);
      return () => window.clearTimeout(id);
    }

    const schedule = (fn: () => void, at: number) => {
      timers.current.push(window.setTimeout(fn, at));
    };

    for (let i = 0; i < total; i += 1) {
      const lineAt = FIRST_LINE_AT_MS + i * LINE_STAGGER_MS;
      schedule(() => setVisibleLines(i + 1), lineAt);
      schedule(() => setResolvedLines(i + 1), lineAt + CHECK_AFTER_MS);
    }

    const lastCheckAt = FIRST_LINE_AT_MS + (total - 1) * LINE_STAGGER_MS + CHECK_AFTER_MS;
    schedule(() => setShowPassed(true), lastCheckAt + PASSED_EXTRA_MS);
    schedule(onComplete, lastCheckAt + PASSED_EXTRA_MS + HOLD_MS);

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, [onComplete, total, reduceMotion]);

  const progress = (resolvedLines / total) * 100;
  const finished = resolvedLines === total;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white px-4"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0.5 }}
      transition={{ duration: 0.45, ease: "easeIn" }}
    >
      <motion.div
        className="w-[90vw] max-w-[420px] rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-xs text-slate-500">
          <span className="inline-flex items-center gap-2">
            <FlaskConical className="size-3.5 text-primary" aria-hidden="true" />
            {t.intro.header}
          </span>
          <span className="tabular-nums">
            {resolvedLines}/{total}
          </span>
        </div>

        {/* Check lines */}
        <ul className="mt-4 space-y-2.5">
          {checks.map((label, index) => {
            const visible = index < visibleLines;
            const resolved = index < resolvedLines;
            return (
              <li
                key={label}
                className={`flex h-6 items-center gap-2.5 font-mono text-sm transition-opacity duration-200 ${
                  visible ? "opacity-100" : "opacity-0"
                } ${resolved ? "text-slate-700" : "text-slate-500"}`}
              >
                <span className="flex size-4 items-center justify-center">
                  {resolved ? (
                    <motion.span
                      className="flex"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <Check className="size-4 text-success" aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <Loader2 className="size-4 animate-spin text-slate-500" aria-hidden="true" />
                  )}
                </span>
                {label}
              </li>
            );
          })}
        </ul>

        {/* Progress bar — steps land in sync with each checkmark */}
        <div
          className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label={t.intro.progressAria}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <motion.div
            className={`h-full rounded-full transition-colors duration-300 ${
              finished ? "bg-success" : "bg-primary"
            }`}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Final result */}
        <div className="mt-5 flex h-7 items-center">
          {showPassed ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Badge variant="success" withCheck>
                {t.intro.passed}
              </Badge>
            </motion.div>
          ) : null}
        </div>
      </motion.div>

      {/* Skip */}
          <button
            type="button"
            onClick={onComplete}
            className="focus-ring absolute bottom-6 right-6 min-h-10 rounded-full border border-slate-200 bg-white px-4 py-2 font-mono text-xs text-slate-500 transition-colors hover:border-blue-300 hover:text-primary"
          >
            {t.intro.skip}
          </button>
    </motion.div>
  );
}
