import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { MONOGRAM, NAME } from "../data/content";
import { useContent, useLanguage } from "../i18n/useLanguage";
import { useActiveSection } from "../hooks/useActiveSection";
import { useFocusTrap } from "../hooks/useFocusTrap";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = useContent();
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  useFocusTrap(mobileNavRef, menuOpen);

  const sectionIds = useMemo(() => t.nav.items.map((item) => item.id), [t]);
  const activeId = useActiveSection(sectionIds);

  // Send focus into the mobile menu when it opens.
  useEffect(() => {
    if (menuOpen) {
      firstLinkRef.current?.focus();
    }
  }, [menuOpen]);

  // Thin bottom border appears only after scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and when resizing up to desktop.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (desktop.matches) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const desktopLinkClass = (id: string) =>
    `text-sm transition-colors ${
      activeId === id ? "font-medium text-primary" : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/80 backdrop-blur transition-colors ${
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

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t.nav.menuCloseAria : t.nav.menuOpenAria}
            aria-expanded={menuOpen}
            className="focus-ring flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:text-slate-900 lg:hidden"
          >
            {menuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            ref={mobileNavRef}
            key="mobile-menu"
            aria-label="Mobile"
            className="overflow-hidden border-b border-slate-200 bg-white lg:hidden"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="container-site flex flex-col py-3">
              {t.nav.items.map((item, index) => (
                <a
                  key={item.id}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}`}
                  onClick={closeMenu}
                  className={`focus-ring rounded-lg px-3 py-3 text-sm transition-colors ${
                    activeId === item.id
                      ? "bg-primary-soft font-medium text-primary"
                      : "text-slate-600 hover:bg-surface hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
