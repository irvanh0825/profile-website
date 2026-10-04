import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { content } from "../data/content";
import { detectInitialLanguage, LANGUAGE_STORAGE_KEY } from "./language";
import type { Language } from "./language";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    const t = content[language].seo;
    document.title = t.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.description);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // localStorage unavailable — language still works for this session
    }
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === "id" ? "en" : "id"));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
