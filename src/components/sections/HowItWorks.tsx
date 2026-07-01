import { useI18n } from "../../i18n";

export function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { num: "01", title: t.how.s1t, desc: t.how.s1d, icon: "📍" },
    { num: "02", title: t.how.s2t, desc: t.how.s2d, icon: "🛒" },
    { num: "03", title: t.how.s3t, desc: t.how.s3d, icon: "⚡" },
  ];
  return (
    <section id="how" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="section-head" style={{ maxWidth: 720 }}>
          <span className="eyebrow">
            <span className="dot" />
            {t.how.eyebrow}
          </span>
          <h2 className="section-title">{t.how.title}</h2>
          <p className="section-subtitle">{t.how.sub}</p>
        </div>

        <div className="how-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {steps.map((s) => (
            <div
              key={s.num}
              style={{
                padding: 32,
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-2)",
                position: "relative",
                overflow: "hidden",
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  fontFamily: "Space Grotesk",
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--accent)",
                  lineHeight: 1,
                  opacity: 0.9,
                }}
              >
                {s.num}
              </div>
              <div>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{s.icon}</div>
                <h3 className="display" style={{ fontSize: 24, margin: "0 0 8px" }}>
                  {s.title}
                </h3>
                <p style={{ color: "var(--muted)", margin: 0, fontSize: 15 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
