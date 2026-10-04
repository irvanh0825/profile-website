import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";
import type { LanguageContextValue } from "./LanguageProvider";
import { content } from "../data/content";
import type { Content } from "../data/content";

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

/** Typed content for the active language. */
export function useContent(): Content {
  const { language } = useLanguage();
  return content[language];
}
