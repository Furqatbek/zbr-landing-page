import { useI18n } from "../../i18n";

export function Restaurants() {
  const { t } = useI18n();
  const cuisines = [
    { name: t.rest.c1, img: "https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=600&h=400&fit=crop", desc: t.rest.sp1 },
    { name: t.rest.c2, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop", desc: t.rest.sp2 },
    { name: t.rest.c3, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop", desc: t.rest.sp3 },
    { name: t.rest.c4, img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop", desc: t.rest.sp4 },
    { name: t.rest.c5, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop", desc: t.rest.sp5 },
    { name: t.rest.c6, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop", desc: t.rest.sp6 },
  ];
  return (
    <section id="restaurants" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div
          className="section-head"
          style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}
        >
          <div style={{ maxWidth: 600 }}>
            <span className="eyebrow">
              <span className="dot" />
              {t.rest.eyebrow}
            </span>
            <h2 className="section-title" style={{ marginTop: 14 }}>
              {t.rest.title}
            </h2>
            <p className="section-subtitle" style={{ marginTop: 8 }}>
              {t.rest.sub}
            </p>
          </div>
          <a href="#partners" className="btn btn-ghost" style={{ border: "1px solid var(--line)" }}>
            {t.rest.cta}
          </a>
        </div>
        <div className="cuisine-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {cuisines.map((c) => (
            <div
              key={c.name}
              style={{
                position: "relative",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                aspectRatio: "4 / 3",
                background: `url(${c.img}) center/cover`,
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  background: "var(--accent)",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  padding: "5px 11px",
                  borderRadius: 999,
                  textTransform: "uppercase",
                }}
              >
                {t.rest.soon}
              </span>
              <div style={{ position: "absolute", left: 20, bottom: 18, color: "white" }}>
                <div className="display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
