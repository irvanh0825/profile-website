import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Copy, Download, Mail } from "lucide-react";
// import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { CV_FILE, EMAIL } from "../data/content";
// GITHUB_URL, LINKEDIN_URL // TODO: enable once real URLs are available
import { useContent } from "../i18n/useLanguage";

export function Contact() {
  const t = useContent();
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore unsupported environments.
    }
  };

  const buttonBase =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors";

  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title} muted>
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{t.contact.headline}</p>
          <p className="mt-4 text-lg text-slate-600">{t.contact.body}</p>

          {/* Email + copy */}
          <div className="mx-auto mt-8 flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 pl-4">
            <Mail className="size-4 text-slate-500" aria-hidden="true" />
            <span className="min-w-0 truncate font-mono text-sm text-slate-700">{EMAIL}</span>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? t.contact.copiedLabel : t.contact.copyLabel}
              className="focus-ring inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-primary"
            >
              {copied ? (
                <Check className="size-3.5 text-success" aria-hidden="true" />
              ) : (
                <Copy className="size-3.5" aria-hidden="true" />
              )}
              {copied ? t.contact.copiedLabel : t.contact.copyLabel}
            </button>
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            <motion.a
              href={`mailto:${EMAIL}`}
              className={`focus-ring ${buttonBase} bg-primary text-white hover:bg-blue-700`}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <Mail className="size-4" aria-hidden="true" />
              {t.contact.emailMeLabel}
            </motion.a>
            {/* TODO: re-enable LinkedIn/GitHub once real URLs are available
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className={`${buttonBase} border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-primary`}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </motion.a>
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className={`${buttonBase} border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-primary`}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <GithubIcon className="size-4" />
              GitHub
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </motion.a>
            */}
            <motion.a
              href={CV_FILE}
              download
              className={`focus-ring ${buttonBase} border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-primary`}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <Download className="size-4" aria-hidden="true" />
              {t.actions.downloadCv}
            </motion.a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
