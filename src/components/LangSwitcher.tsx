import { useI18n, LANGS } from "../i18n";

/** RU / UZ / KK pill switcher. Choice persists via the i18n provider. */
export function LangSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useI18n();
  return (
    <div
      style={{
        display: "inline-flex",
        gap: 2,
        padding: 3,
        borderRadius: 999,
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
      }}
    >
      {LANGS.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            aria-label={l.label}
            aria-pressed={active}
            style={{
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 999,
              background: active ? (dark ? "white" : "var(--ink)") : "transparent",
              color: active
                ? dark
                  ? "var(--ink)"
                  : "white"
                : dark
                  ? "rgba(255,255,255,0.7)"
                  : "var(--ink)",
              transition: "all 0.2s ease",
            }}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
