import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { NAME } from "../data/content";
import { useContent } from "../i18n/useLanguage";

export function Footer() {
  const t = useContent();
  const reduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-site flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-slate-900">{NAME}</p>
          <p className="text-sm text-slate-500">{t.hero.role}</p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="focus-ring inline-flex min-h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-primary"
        >
          <ArrowUp className="size-3.5" aria-hidden="true" />
          {t.footer.backToTop}
        </button>

        <p className="font-mono text-xs text-slate-500">
          © {year} {NAME}
        </p>
      </div>
    </footer>
  );
}
