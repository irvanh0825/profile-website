import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { Check, ChevronDown, Download, Mail } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import {
  CV_FILE,
  EMAIL,
  // GITHUB_URL, // TODO: enable once real URL is available
  // LINKEDIN_URL,
  MONOGRAM,
  PROFILE_PHOTO,
} from "../data/content";
import { useContent } from "../i18n/useLanguage";

interface HeroProps {
  /** Starts the entrance animation — true once the intro is done or skipped. */
  active: boolean;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const iconLinkClass =
  "focus-ring flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-blue-300 hover:text-primary";

export function Hero({ active }: HeroProps) {
  const t = useContent();
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion;
  const [photoError, setPhotoError] = useState(false);

  /*
   * The tree uses motion elements with variants but no own initial/animate:
   * under the animated parent they inherit the stagger; under the plain
   * parent (reduced motion) they simply render static.
   */
  const body = (
    <>
      {/* Left column — text */}
      <div>
        <motion.p variants={fadeUp} className="font-mono text-sm font-medium text-primary">
          {t.hero.eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          {t.hero.name}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-prose text-base leading-relaxed text-slate-600 sm:text-lg"
        >
          {t.hero.valueProposition}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={CV_FILE}
            download
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Download className="size-4" aria-hidden="true" />
            {t.actions.downloadCv}
          </a>
          <a
            href="#contact"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-primary"
          >
            {t.actions.contactMe}
            <ChevronDown className="size-4" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 flex items-center gap-2">
          <a href={`mailto:${EMAIL}`} aria-label={t.contact.emailLabel} className={iconLinkClass}>
            <Mail className="size-4" aria-hidden="true" />
          </a>
          {/* TODO: re-enable LinkedIn/GitHub once real URLs are available
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={t.social.linkedinAria}
            className={iconLinkClass}
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={t.social.githubAria}
            className={iconLinkClass}
          >
            <GithubIcon className="size-4" />
          </a>
          */}
        </motion.div>
      </div>

      {/* Right column — test report card */}
      <motion.div variants={slideIn} className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
        <motion.div
          animate={animated ? { y: [0, -6, 0] } : undefined}
          transition={animated ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              {photoError ? (
                <span className="flex size-16 items-center justify-center rounded-xl bg-primary font-mono text-lg font-semibold text-white sm:size-20">
                  {MONOGRAM}
                </span>
              ) : (
                <img
                  src={PROFILE_PHOTO}
                  alt={t.hero.report.photoAlt}
                  onError={() => setPhotoError(true)}
                  className="size-16 rounded-xl border border-slate-200 object-cover sm:size-20"
                />
              )}
              <Badge variant="success" withCheck>
                {t.hero.report.passedLabel}
              </Badge>
            </div>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-mono text-3xl font-semibold text-slate-900">
                {t.hero.report.experienceValue}
              </span>
              <span className="text-sm text-slate-500">{t.hero.report.experienceLabel}</span>
            </div>

            <p className="mt-5 font-mono text-xs font-medium uppercase tracking-wide text-slate-500">
              {t.hero.report.areasTitle}
            </p>
            <ul className="mt-2 space-y-2">
              {t.hero.report.areas.map((area) => (
                <li key={area} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
                  {area}
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-slate-100 pt-4 font-mono text-xs">
              <span className="text-slate-500">{t.hero.report.learningLabel}: </span>
              <span className="font-medium text-slate-700">{t.hero.report.learningValue}</span>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );

  const gridClass = "grid items-center gap-12 lg:grid-cols-2";

  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden="true" className="hero-pattern pointer-events-none absolute inset-0" />
      <div className="container-site relative flex min-h-[calc(100svh-4rem)] flex-col justify-center py-14 lg:py-20">
        {animated ? (
          <motion.div
            className={gridClass}
            variants={container}
            initial="hidden"
            animate={active ? "show" : "hidden"}
          >
            {body}
          </motion.div>
        ) : (
          <div className={gridClass}>{body}</div>
        )}
      </div>

      {/* Scroll-down indicator */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
        <motion.a
          href="#about"
          className="focus-ring pointer-events-auto flex flex-col items-center gap-1 rounded-md font-mono text-xs text-slate-500 transition-colors hover:text-primary"
          animate={animated ? { y: [0, 6, 0] } : undefined}
          transition={animated ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          {t.hero.scrollLabel}
          <ChevronDown className="size-4" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}
