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

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}

export { LANGS } from "./translations";
export type { Lang, Translation };
