import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { getExperience } from "../data/content";
import type { ExperienceEntry, RoleType } from "../data/content";
import type { BadgeVariant } from "./ui/Badge";
import { useContent, useLanguage } from "../i18n/useLanguage";

const ROLE_VARIANT: Record<RoleType, BadgeVariant> = {
  qa: "primary",
  pm: "default",
  analyst: "success",
  developer: "default",
};

interface TimelineItemProps {
  item: ExperienceEntry;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  labels: {
    expand: string;
    collapse: string;
    current: string;
    typeLabels: Record<RoleType, string>;
  };
}

function TimelineItem({ item, index, expanded, onToggle, labels }: TimelineItemProps) {
  const isCurrent = item.period.end === null;
  const isFirst = index === 0;
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative pl-12">
      {/* Timeline dot */}
      <span
        className={`absolute left-4 top-1.5 rounded-full ${
          isFirst
            ? "size-5 bg-primary ring-4 ring-blue-100"
            : "size-3.5 bg-slate-300"
        }`}
        aria-hidden="true"
      />

      <Card className={`relative ${isFirst ? "border-l-4 border-l-primary shadow-card-hover" : ""}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={ROLE_VARIANT[item.roleType]}>
                {labels.typeLabels[item.roleType]}
              </Badge>
              {isCurrent ? <Badge variant="primary">{labels.current}</Badge> : null}
            </div>
            <h3 className={`mt-2 font-semibold text-slate-900 ${isFirst ? "text-xl" : "text-lg"}`}>
              {item.role}
            </h3>
            <p className="text-sm text-slate-600">
              {item.company} · {item.location}
            </p>
            <p className="mt-0.5 font-mono text-xs text-slate-500">{item.periodLabel}</p>
          </div>

          {!isFirst ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={`exp-${item.key}`}
            className="focus-ring inline-flex min-h-10 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-primary"
          >
              {expanded ? labels.collapse : labels.expand}
              {expanded ? (
                <ChevronUp className="size-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="size-3.5" aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>

        <AnimatePresence initial={false}>
          {(isFirst || expanded) && (
            <motion.div
              id={`exp-${item.key}`}
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}

export function Experience() {
  const t = useContent();
  const { language } = useLanguage();
  const items = getExperience(language);

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach((item, index) => {
      initial[item.key] = index === 0;
    });
    return initial;
  });

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const labels = {
    expand: t.experience.expandLabel,
    collapse: t.experience.collapseLabel,
    current: t.experience.currentLabel,
    typeLabels: t.experience.typeLabels,
  };

  return (
    <Section id="experience" eyebrow={t.experience.eyebrow} title={t.experience.title}>
      <div className="relative">
        {/* Timeline track */}
        <div
          className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"
          aria-hidden="true"
        />

        <div className="space-y-8 md:space-y-10">
          {items.map((item, index) => (
            <Reveal key={item.key} delay={index * 0.08}>
              <TimelineItem
                item={item}
                index={index}
                expanded={expanded[item.key] ?? false}
                onToggle={() => toggle(item.key)}
                labels={labels}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
