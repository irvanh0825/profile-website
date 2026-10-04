export type Language = "id" | "en";

export const LANGUAGES: readonly Language[] = ["en", "id"];

export const LANGUAGE_STORAGE_KEY = "ih-language";

function isLanguage(value: string | null): value is Language {
  return value === "id" || value === "en";
}

/**
 * Initial language priority:
 * 1. Persisted choice in localStorage
 * 2. Browser language (Indonesian if it starts with "id", otherwise English)
 */
export function detectInitialLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(stored)) {
      return stored;
    }
  } catch {
    // localStorage unavailable (e.g. private mode) — fall through
  }

  return navigator.language.toLowerCase().startsWith("id") ? "id" : "en";
}
