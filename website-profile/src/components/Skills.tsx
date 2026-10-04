import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bot, CodeXml, Database, FlaskConical, Users, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { getSkillGroups } from "../data/content";
import type { SkillGroupKey } from "../data/content";
import { useContent, useLanguage } from "../i18n/useLanguage";

type FilterKey = "all" | "soft" | SkillGroupKey;

const GROUP_ICONS: Record<SkillGroupKey, LucideIcon> = {
  testing: FlaskConical,
  automation: Bot,
  apiDatabase: Database,
  programming: CodeXml,
  tools: Wrench,
};

const SOFT_KEY: FilterKey = "soft";

interface SkillPill {
  key: string;
  group: FilterKey;
  name: string;
  icon: LucideIcon;
  learning?: boolean;
  note?: string;
}

export function Skills() {
  const t = useContent();
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<FilterKey>("all");

  const groups = useMemo(() => getSkillGroups(language), [language]);

  const filters = useMemo(
    () => [
      { key: "all" as FilterKey, label: t.skills.filters.all },
      ...groups.map((group) => ({ key: group.key as FilterKey, label: group.label })),
      { key: SOFT_KEY, label: t.skills.softSkills.label },
    ],
    [groups, t],
  );

  const pills = useMemo<SkillPill[]>(() => {
    const hard: SkillPill[] = groups.flatMap((group) =>
      group.items.map((item) => ({
        key: `${group.key}:${item.name}`,
        group: group.key as FilterKey,
        name: item.name,
        icon: GROUP_ICONS[group.key],
        learning: item.learning,
        note: item.note,
      })),
    );
    const soft: SkillPill[] = t.skills.softSkills.items.map((name) => ({
      key: `soft:${name}`,
      group: SOFT_KEY,
      name,
      icon: Users,
    }));
    return [...hard, ...soft];
  }, [groups, t]);

  const visiblePills = filter === "all" ? pills : pills.filter((pill) => pill.group === filter);

  return (
    <Section id="skills" eyebrow={t.skills.eyebrow} title={t.skills.title}>
      <Reveal>
        {/* Filter chips */}
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.skills.title}>
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              aria-pressed={filter === item.key}
              className={`focus-ring inline-flex min-h-10 items-center rounded-full border px-4 py-2 font-mono text-xs font-medium transition-colors ${
                filter === item.key
                  ? "border-primary bg-primary text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Skill pills — layout-animated on filter (initial={false}: visible on mount) */}
        <div className="mt-6 flex flex-wrap gap-2.5" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {visiblePills.map((pill) => (
              <motion.span
                key={pill.key}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-700 shadow-[0_1px_2px_rgb(15_23_42/0.04)]"
              >
                <pill.icon className="size-3.5 shrink-0 text-slate-500" aria-hidden="true" />
                {pill.name}
                {pill.learning ? (
                  <Badge variant="warning" size="sm">
                    {t.skills.learningLabel}
                  </Badge>
                ) : null}
                {pill.note ? (
                  <span className="font-mono text-[11px] text-slate-500">· {pill.note}</span>
                ) : null}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
