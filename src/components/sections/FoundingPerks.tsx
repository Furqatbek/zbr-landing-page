import { useI18n } from "../../i18n";

export function FoundingPerks() {
  const { t } = useI18n();
  const perks = [
    { e: t.perks.p1e, title: t.perks.p1t, desc: t.perks.p1d, icon: "🍽", href: null as string | null },
    { e: t.perks.p2e, title: t.perks.p2t, desc: t.perks.p2d, icon: "🏪", href: "#partners" },
    { e: t.perks.p3e, title: t.perks.p3t, desc: t.perks.p3d, icon: "🛵", href: "#couriers" },
  ];
  return (
    <section style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="section-head" style={{ maxWidth: 720 }}>
          <span className="eyebrow">
            <span className="dot" />
            {t.perks.eyebrow}
          </span>
          <h2 className="section-title">{t.perks.title}</h2>
          <p className="section-subtitle">{t.perks.sub}</p>
        </div>

        <div className="perks-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {perks.map((p, i) => (
            <div
              key={i}
              style={{
                background: "white",
                padding: 32,
                borderRadius: "var(--radius-lg)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                minHeight: 280,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: "color-mix(in oklch, var(--accent) 12%, transparent)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 28,
                }}
              >
                {p.icon}
              </div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>
                {p.e}
              </span>
              <h3 className="display" style={{ fontSize: 26, margin: 0, letterSpacing: "-0.02em" }}>
                {p.title}
              </h3>
              <p style={{ color: "var(--muted)", margin: 0, fontSize: 15, lineHeight: 1.5 }}>{p.desc}</p>
              {p.href && (
                <a href={p.href} style={{ marginTop: "auto", fontSize: 14, fontWeight: 600, color: "var(--accent)" }}>
                  →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
