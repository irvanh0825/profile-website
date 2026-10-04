import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { getProjects } from "../data/content";
import type { ProjectEntry, RoleType } from "../data/content";
import type { BadgeVariant } from "./ui/Badge";
import { useContent, useLanguage } from "../i18n/useLanguage";
import { useFocusTrap } from "../hooks/useFocusTrap";

const ROLE_VARIANT: Record<RoleType, BadgeVariant> = {
  qa: "primary",
  pm: "default",
  analyst: "success",
  developer: "default",
};

const ROLE_ORDER: RoleType[] = ["qa", "pm", "analyst", "developer"];

interface ProjectModalProps {
  project: ProjectEntry;
  typeLabels: Record<RoleType, string>;
  roleLabel: string;
  closeLabel: string;
  modalAria: string;
  onClose: () => void;
}

function ProjectModal({
  project,
  typeLabels,
  roleLabel,
  closeLabel,
  modalAria,
  onClose,
}: ProjectModalProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true);

  // Close on Esc and lock body scroll while open.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? {} : { opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={modalAria}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? {} : { opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={ROLE_VARIANT[project.roleType]}>
                {typeLabels[project.roleType]}
              </Badge>
              <span className="font-mono text-xs text-slate-500">{project.periodLabel}</span>
            </div>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">{project.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-blue-300 hover:text-primary"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="primary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="font-mono text-xs text-slate-500">{roleLabel}</p>
          <p className="mt-0.5 text-sm font-medium text-slate-700">{project.role}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function filterChipClass(active: boolean): string {
  const base =
    "focus-ring inline-flex min-h-10 items-center rounded-full border px-4 py-2 font-mono text-xs font-medium transition-colors";
  return active
    ? `${base} border-primary bg-primary text-white`
    : `${base} border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-primary`;
}

export function Projects() {
  const t = useContent();
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const allProjects = getProjects(language);

  const [filter, setFilter] = useState<"all" | RoleType>("all");
  const [modalProject, setModalProject] = useState<ProjectEntry | null>(null);

  const filtered =
    filter === "all" ? allProjects : allProjects.filter((project) => project.roleType === filter);

  const typeLabels = t.projects.typeLabels;

  return (
    <Section id="projects" eyebrow={t.projects.eyebrow} title={t.projects.title} muted>
      <Reveal>
        {/* Role filters */}
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.projects.title}>
          <button
            type="button"
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={filterChipClass(filter === "all")}
          >
            {t.projects.filters.all}
          </button>
          {ROLE_ORDER.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setFilter(role)}
              aria-pressed={filter === role}
              className={filterChipClass(filter === role)}
            >
              {typeLabels[role]}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {filtered.map((project) => (
            <motion.div
              key={project.key}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={project.key === "mykiara" ? "md:col-span-2" : ""}
            >
              <button
                type="button"
                aria-label={`${t.projects.viewDetailsLabel}: ${project.name}`}
                onClick={() => setModalProject(project)}
                className="focus-ring h-full rounded-2xl text-left"
              >
                <Card className="group h-full transition-shadow duration-300 hover:shadow-card-hover">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-primary">
                      {project.name}
                    </h3>
                    <span className="font-mono text-xs text-slate-500">{project.periodLabel}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant={ROLE_VARIANT[project.roleType]}>
                      {typeLabels[project.roleType]}
                    </Badge>
                    <span className="font-mono text-xs text-slate-500">{project.role}</span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm text-slate-600">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="primary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="mt-4 font-mono text-xs text-primary">{t.projects.viewDetailsLabel}</p>
                </Card>
              </button>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {modalProject ? (
          <ProjectModal
            key="project-modal"
            project={modalProject}
            typeLabels={typeLabels}
            roleLabel={t.projects.roleLabel}
            closeLabel={t.projects.closeLabel}
            modalAria={t.projects.modalAria}
            onClose={() => setModalProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
