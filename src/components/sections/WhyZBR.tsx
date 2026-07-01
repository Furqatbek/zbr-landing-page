import { useI18n } from "../../i18n";

export function WhyZBR() {
  const { t } = useI18n();
  const features = [
    { title: t.why.f1t, desc: t.why.f1d, icon: "⚡" },
    { title: t.why.f2t, desc: t.why.f2d, icon: "📍" },
    { title: t.why.f3t, desc: t.why.f3d, icon: "🚲" },
    { title: t.why.f4t, desc: t.why.f4d, icon: "🍽" },
    { title: t.why.f5t, desc: t.why.f5d, icon: "💳" },
    { title: t.why.f6t, desc: t.why.f6d, icon: "💬" },
  ];
  return (
    <section style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="section-head" style={{ maxWidth: 720 }}>
          <span className="eyebrow">
            <span className="dot" />
            {t.why.eyebrow}
          </span>
          <h2 className="section-title">{t.why.title}</h2>
          <p className="section-subtitle">{t.why.sub}</p>
        </div>

        <div
          className="why-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gridAutoRows: "minmax(160px, auto)",
            gap: 16,
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                padding: 28,
                borderRadius: "var(--radius)",
                background: i === 0 ? "var(--ink)" : "white",
                color: i === 0 ? "white" : "var(--ink)",
                gridColumn: i === 0 ? "span 1" : "auto",
                gridRow: i === 0 ? "span 2" : "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: i === 0 ? 336 : "auto",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ fontSize: i === 0 ? 56 : 32, marginBottom: 12 }}>{f.icon}</div>
              <div>
                <h3
                  className="display"
                  style={{ fontSize: i === 0 ? 40 : 20, margin: "0 0 6px", letterSpacing: "-0.03em" }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: i === 0 ? "rgba(255,255,255,0.7)" : "var(--muted)",
                    margin: 0,
                    fontSize: i === 0 ? 16 : 14,
                  }}
                >
                  {f.desc}
                </p>
              </div>
              {i === 0 && (
                <div
                  style={{
                    position: "absolute",
                    right: -40,
                    top: -40,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "color-mix(in oklch, var(--accent) 30%, transparent)",
                    filter: "blur(40px)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
