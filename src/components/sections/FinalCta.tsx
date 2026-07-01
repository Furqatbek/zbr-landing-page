import { useI18n } from "../../i18n";
import { StoreButtons } from "../StoreButtons";

export function FinalCta() {
  const { t } = useI18n();
  return (
    <section style={{ background: "var(--accent)", color: "white", padding: "100px 0", textAlign: "center" }}>
      <div className="container">
        <h2
          className="display"
          style={{ fontSize: "clamp(40px, 7vw, 96px)", margin: "0 0 20px", lineHeight: 0.95, letterSpacing: "-0.04em" }}
        >
          {t.finalCta.title}
        </h2>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 540, margin: "0 auto 36px" }}>{t.finalCta.sub}</p>
        <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <StoreButtons />
        </div>
      </div>
    </section>
  );
}
