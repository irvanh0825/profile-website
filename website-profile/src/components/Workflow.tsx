import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { useContent } from "../i18n/useLanguage";

const AUTOPLAY_MS = 2000;

type StepState = "active" | "passed" | "upcoming";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function circleClass(state: StepState): string {
  const base =
    "focus-ring flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-sm transition-colors";
  if (state === "active") {
    return `${base} border-primary bg-primary text-white ring-4 ring-blue-600/15`;
  }
  if (state === "passed") {
    return `${base} border-emerald-200 bg-success-soft text-emerald-600`;
  }
  return `${base} border-slate-200 bg-white text-slate-500`;
}

function labelClass(state: StepState): string {
  const base = "text-sm transition-colors";
  if (state === "active") {
    return `${base} font-semibold text-slate-900`;
  }
  if (state === "passed") {
    return `${base} text-slate-600`;
  }
  return `${base} text-slate-500`;
}

export function Workflow() {
  const t = useContent();
  const reduceMotion = useReducedMotion();
  const steps = t.workflow.steps;
  const lastIndex = steps.length - 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pauseZoneActive, setPauseZoneActive] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Autoplay — advances while playing, unless hovered/focused or reduced motion.
  useEffect(() => {
    if (!isPlaying || pauseZoneActive || reduceMotion) {
      return;
    }
    const id = window.setInterval(() => {
      setActiveIndex((current) => Math.min(current + 1, lastIndex));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPlaying, pauseZoneActive, reduceMotion, lastIndex]);

  // Stop autoplay at the last step.
  useEffect(() => {
    if (activeIndex === lastIndex) {
      setIsPlaying(false);
    }
  }, [activeIndex, lastIndex]);

  const selectStep = useCallback((index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
  }, []);

  const focusAndSelect = useCallback(
    (index: number) => {
      selectStep(index);
      tabRefs.current[index]?.focus();
    },
    [selectStep],
  );

  // Tabs-pattern keyboard navigation (selection follows focus).
  const onTablistKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = Math.min(activeIndex + 1, lastIndex);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = Math.max(activeIndex - 1, 0);
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = lastIndex;
    }
    if (next !== null) {
      event.preventDefault();
      focusAndSelect(next);
    }
  };

  const togglePlay = () => {
    if (reduceMotion) {
      return;
    }
    if (!isPlaying && activeIndex === lastIndex) {
      setActiveIndex(0); // replay from the start
    }
    setIsPlaying((playing) => !playing);
  };

  const activeStep = steps[activeIndex];
  const fillDuration = reduceMotion ? 0 : 0.3;

  return (
    <Section id="workflow" eyebrow={t.workflow.eyebrow} title={t.workflow.title} muted>
      <Reveal>
        <p className="font-mono text-sm font-medium text-primary">{t.workflow.stepperLabel}</p>

        <div className="mt-6 md:mt-8">
          {/* Pause zone: hovering or focusing inside pauses autoplay (controls excluded) */}
          <div
            onMouseEnter={() => setPauseZoneActive(true)}
            onMouseLeave={() => setPauseZoneActive(false)}
            onFocus={() => setPauseZoneActive(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setPauseZoneActive(false);
              }
            }}
          >
            {/* Stepper */}
            <ol
              role="tablist"
              aria-label={t.workflow.stepListAria}
              onKeyDown={onTablistKeyDown}
              className="flex flex-col gap-6 md:flex-row md:gap-0"
            >
              {steps.map((step, index) => {
                const state: StepState =
                  index === activeIndex ? "active" : index < activeIndex ? "passed" : "upcoming";
                return (
                  <li key={step.key} role="none" className="relative md:flex-1">
                    {index < lastIndex ? (
                      <>
                        {/* Desktop connector: this circle center → next circle center */}
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-5 hidden h-0.5 w-full overflow-hidden bg-slate-200 md:block"
                        >
                          <motion.span
                            className="block h-full w-full origin-left bg-primary"
                            initial={false}
                            animate={{ scaleX: index < activeIndex ? 1 : 0 }}
                            transition={{ duration: fillDuration, ease: "easeOut" }}
                          />
                        </span>
                        {/* Mobile connector: vertical, spans the gap to the next row */}
                        <span
                          aria-hidden="true"
                          className="absolute left-5 top-1/2 block h-[calc(100%+1.5rem)] w-0.5 overflow-hidden bg-slate-200 md:hidden"
                        >
                          <motion.span
                            className="block h-full w-full origin-top bg-primary"
                            initial={false}
                            animate={{ scaleY: index < activeIndex ? 1 : 0 }}
                            transition={{ duration: fillDuration, ease: "easeOut" }}
                          />
                        </span>
                      </>
                    ) : null}

                    <button
                      type="button"
                      role="tab"
                      id={`workflow-tab-${step.key}`}
                      aria-controls="workflow-panel"
                      aria-selected={index === activeIndex}
                      tabIndex={index === activeIndex ? 0 : -1}
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      onClick={() => selectStep(index)}
                      className="relative flex items-center gap-3 text-left md:w-full md:flex-col md:gap-2 md:text-center"
                    >
                      <span className={circleClass(state)}>
                        {state === "passed" ? (
                          <Check className="size-4" aria-hidden="true" />
                        ) : (
                          pad(index + 1)
                        )}
                      </span>
                      <span className={labelClass(state)}>{step.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Detail panel */}
            <div
              role="tabpanel"
              id="workflow-panel"
              aria-labelledby={`workflow-tab-${activeStep.key}`}
              className="mt-8 min-h-[13rem] sm:min-h-[11rem] md:mt-10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6"
                >
                  <p className="font-mono text-xs text-slate-500">
                    {pad(activeIndex + 1)} / {pad(steps.length)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{activeStep.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {activeStep.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeStep.tags.map((tag) => (
                      <Badge key={tag} variant="primary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls (outside the pause zone so the focused Play button keeps playing) */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => selectStep(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="focus-ring inline-flex min-h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition-colors enabled:hover:border-blue-300 enabled:hover:text-primary disabled:opacity-40"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
                {t.workflow.controls.previous}
              </button>
              <button
                type="button"
                onClick={() => selectStep(activeIndex + 1)}
                disabled={activeIndex === lastIndex}
                className="focus-ring inline-flex min-h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition-colors enabled:hover:border-blue-300 enabled:hover:text-primary disabled:opacity-40"
              >
                {t.workflow.controls.next}
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>

            {reduceMotion ? null : (
              <button
                type="button"
                onClick={togglePlay}
                aria-pressed={isPlaying}
                className="focus-ring inline-flex min-h-10 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                {isPlaying ? (
                  <>
                    <Pause className="size-4" aria-hidden="true" />
                    {t.workflow.controls.pause}
                  </>
                ) : (
                  <>
                    <Play className="size-4" aria-hidden="true" />
                    {t.workflow.controls.play}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
