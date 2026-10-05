import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FolderOpen,
  ListOrdered,
  Mail,
  User,
  Wrench,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { MONOGRAM, NAME } from "../data/content";
import { useContent, useLanguage } from "../i18n/useLanguage";
import { useActiveSection } from "../hooks/useActiveSection";

const ICONS: Record<string, LucideIcon> = {
  about: User,
  skills: Wrench,
  workflow: ListOrdered,
  experience: Briefcase,
  projects: FolderOpen,
  contact: Mail,
};

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = useContent();
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const sectionIds = useMemo(() => t.nav.items.map((item) => item.id), [t]);
  const activeId = useActiveSection(sectionIds);

  // Keep the active mobile tab centered in the bottom nav.
  useEffect(() => {
    if (activeId && tabRefs.current[activeId]) {
      tabRefs.current[activeId]?.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  }, [activeId, reduceMotion]);

  // Thin bottom border appears only after scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopLinkClass = (id: string) =>
    `text-sm transition-colors ${
      activeId === id ? "font-medium text-primary" : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b bg-white/80 backdrop-blur transition-colors ${
          scrolled ? "border-slate-200" : "border-transparent"
        }`}
      >
        <div className="container-site flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a href="#top" aria-label={t.nav.brand} className="focus-ring flex items-center gap-2.5 rounded-lg">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-mono text-xs font-semibold text-white">
              {MONOGRAM}
            </span>
            <span className="text-sm font-semibold text-slate-900 sm:text-base">{NAME}</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {t.nav.items.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={`focus-ring rounded-md ${desktopLinkClass(item.id)}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Segmented language toggle — always visible */}
            <div
              role="group"
              aria-label={t.nav.languageAria}
              className="flex rounded-full border border-slate-200 bg-white p-0.5 font-mono text-xs"
            >
              {(["id", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  aria-pressed={language === lang}
                  className={`focus-ring rounded-full px-3 py-2 transition-colors min-h-10 min-w-10 ${
                    language === lang
                      ? "bg-primary text-white"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {t.nav.languageOptions[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom tab nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden"
        aria-label="Mobile"
      >
        <div className="no-scrollbar flex items-center justify-center gap-1 overflow-x-auto px-2 py-2">
          {t.nav.items.map((item) => {
            const Icon = ICONS[item.id];
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                ref={(el) => {
                  tabRefs.current[item.id] = el;
                }}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`focus-ring flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-slate-500 hover:bg-surface hover:text-slate-900"
                }`}
              >
                <Icon className="size-5" aria-hidden="true" />
                {isActive ? <span className="whitespace-nowrap">{item.label}</span> : null}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
