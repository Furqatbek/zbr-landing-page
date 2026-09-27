import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, DEFAULT_LANG, type Lang, type Translation } from "./translations";

const STORAGE_KEY = "zbr_lang";

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in translations) return saved as Lang;
  } catch {
    /* localStorage unavailable — fall through to default */
  }
  return DEFAULT_LANG;
}

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** The active language dictionary — access copy as `t.hero.title1`. */
  t: Translation;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore persistence failure */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Fills `{token}` placeholders in a translated string, so each language keeps
 * its own word order: fill(t.r.openUntil, { time: "23:00" }).
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** The three forms a counted noun needs. See `plural`. */
export interface PluralForms {
  one: string;
  few: string;
  many: string;
}

/**
 * Picks the plural form for a count. Russian inflects — 1 оценка, 2 оценки,
 * 5 оценок — with the familiar teens exception. Uzbek and Karakalpak do not
 * inflect a noun after a numeral, so their three forms are identical and
 * `many` stands in for all of them.
 */
export function plural(lang: Lang, n: number, forms: PluralForms): string {
  if (lang !== "ru") return forms.many;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms.one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms.few;
  return forms.many;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}

export { LANGS } from "./translations";
export type { Lang, Translation };
