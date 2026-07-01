// Shared content sections for ZBR landing — used by all 3 variants.
const { useState: useSecState, useEffect: useSecEffect, useRef: useSecRef } = React;

/* ----------------- HOW IT WORKS ----------------- */
function HowItWorks() {
  useLang();
  const steps = [
    { num: "01", title: t("how.s1t"), desc: t("how.s1d"), icon: "📍" },
    { num: "02", title: t("how.s2t"), desc: t("how.s2d"), icon: "🛒" },
    { num: "03", title: t("how.s3t"), desc: t("how.s3d"), icon: "⚡" },
  ];
  return (
    <section id="how" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="section-head" style={{ maxWidth: 720 }}>
          <span className="eyebrow"><span className="dot"></span>{t("how.eyebrow")}</span>
          <h2 className="section-title">{t("how.title")}</h2>
          <p className="section-subtitle">{t("how.sub")}</p>
        </div>

        <div className="how-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{
              padding: 32,
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-2)",
              position: "relative",
              overflow: "hidden",
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <div style={{
                fontSize: 64, fontWeight: 700,
                fontFamily: "Space Grotesk",
                color: "transparent",
                WebkitTextStroke: "1.5px var(--accent)",
                lineHeight: 1,
                opacity: 0.9,
              }}>{s.num}</div>
              <div>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{s.icon}</div>
                <h3 className="display" style={{ fontSize: 24, margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ color: "var(--muted)", margin: 0, fontSize: 15 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .how-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ----------------- WHY ZBR (features) ----------------- */
function WhyZBR() {
  useLang();
  const features = [
    { title: t("why.f1t"), desc: t("why.f1d"), icon: "⚡", big: true },
    { title: t("why.f2t"), desc: t("why.f2d"), icon: "📍" },
    { title: t("why.f3t"), desc: t("why.f3d"), icon: "🚲" },
    { title: t("why.f4t"), desc: t("why.f4d"), icon: "🍽" },
    { title: t("why.f5t"), desc: t("why.f5d"), icon: "💳" },
    { title: t("why.f6t"), desc: t("why.f6d"), icon: "💬" },
  ];
  return (
    <section style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="section-head" style={{ maxWidth: 720 }}>
          <span className="eyebrow"><span className="dot"></span>{t("why.eyebrow")}</span>
          <h2 className="section-title">{t("why.title")}</h2>
          <p className="section-subtitle">{t("why.sub")}</p>
        </div>

        <div className="why-grid" style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gridAutoRows: "minmax(160px, auto)",
          gap: 16,
        }}>
          {features.map((f, i) => (
            <div key={f.title} style={{
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
            }}>
              <div style={{ fontSize: i === 0 ? 56 : 32, marginBottom: 12 }}>{f.icon}</div>
              <div>
                <h3 className="display" style={{
                  fontSize: i === 0 ? 40 : 20,
                  margin: "0 0 6px",
                  letterSpacing: "-0.03em",
                }}>{f.title}</h3>
                <p style={{
                  color: i === 0 ? "rgba(255,255,255,0.7)" : "var(--muted)",
                  margin: 0,
                  fontSize: i === 0 ? 16 : 14,
                }}>{f.desc}</p>
              </div>
              {i === 0 && (
                <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "color-mix(in oklch, var(--accent) 30%, transparent)", filter: "blur(40px)" }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .why-grid > div:first-child {
            grid-column: span 2 !important;
            grid-row: auto !important;
            min-height: 220px !important;
          }
        }
        @media (max-width: 540px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .why-grid > div:first-child { grid-column: auto !important; }
        }
      `}</style>
    </section>
  );
}

/* ----------------- LAUNCH / DEMAND BAND (replaces fake stats) ----------------- */
function LaunchBand() {
  useLang();
  const items = [
    { v: t("launch.i1t"), l: t("launch.i1d") },
    { v: t("launch.i2t"), l: t("launch.i2d") },
    { v: t("launch.i3t"), l: t("launch.i3d") },
  ];
  return (
    <section style={{ background: "var(--accent)", color: "white", padding: "80px 0", position: "relative", overflow: "hidden" }}>
      {/* speed-line texture */}
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }}>
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1440 400">
          <g stroke="white" strokeLinecap="round">
            <line x1="-20" y1="80" x2="240" y2="80" strokeWidth="8"/>
            <line x1="-20" y1="140" x2="160" y2="140" strokeWidth="6"/>
            <line x1="-20" y1="320" x2="200" y2="320" strokeWidth="7"/>
            <line x1="1200" y1="200" x2="1460" y2="200" strokeWidth="8"/>
            <line x1="1280" y1="260" x2="1460" y2="260" strokeWidth="6"/>
          </g>
        </svg>
      </div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="launch-grid" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>
              <span className="dot" style={{ background: "white" }}></span>{t("launch.eyebrow")}
            </span>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4.5vw, 60px)", margin: "16px 0 16px", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
              {t("launch.title")}
            </h2>
            <p style={{ fontSize: 18, opacity: 0.92, maxWidth: 520, margin: "0 0 28px", lineHeight: 1.5 }}>
              {t("launch.sub")}
            </p>
            <a href="#partners" className="btn" style={{ background: "white", color: "var(--accent)", fontSize: 15, padding: "14px 26px" }}>
              {t("launch.cta")}
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {items.map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "baseline", gap: 16,
                padding: "18px 22px", borderRadius: "var(--radius)",
                background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.22)",
              }}>
                <div className="display" style={{ fontSize: 26, fontWeight: 700, whiteSpace: "nowrap" }}>{s.v}</div>
                <div style={{ fontSize: 15, opacity: 0.9 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) { .launch-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
      `}</style>
    </section>
  );
}

/* ----------------- FEATURED RESTAURANTS / CUISINE CAROUSEL ----------------- */
function Restaurants() {
  useLang();
  const cuisines = [
    { name: t("rest.c1"), img: "https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=600&h=400&fit=crop", desc: t("rest.sp1") },
    { name: t("rest.c2"), img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop", desc: t("rest.sp2") },
    { name: t("rest.c3"), img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop", desc: t("rest.sp3") },
    { name: t("rest.c4"), img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop", desc: t("rest.sp4") },
    { name: t("rest.c5"), img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop", desc: t("rest.sp5") },
    { name: t("rest.c6"), img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop", desc: t("rest.sp6") },
  ];
  return (
    <section id="restaurants" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="section-head" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div style={{ maxWidth: 600 }}>
            <span className="eyebrow"><span className="dot"></span>{t("rest.eyebrow")}</span>
            <h2 className="section-title" style={{ marginTop: 14 }}>{t("rest.title")}</h2>
            <p className="section-subtitle" style={{ marginTop: 8 }}>{t("rest.sub")}</p>
          </div>
          <a href="#partners" className="btn btn-ghost" style={{ border: "1px solid var(--line)" }}>{t("rest.cta")}</a>
        </div>
        <div className="cuisine-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}>
          {cuisines.map(c => (
            <div key={c.name} style={{
              position: "relative",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              aspectRatio: "4 / 3",
              background: `url(${c.img}) center/cover`,
              transition: "transform 0.3s ease",
            }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)",
              }} />
              <span style={{
                position: "absolute", top: 14, right: 14,
                background: "var(--accent)", color: "white",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
                padding: "5px 11px", borderRadius: 999, textTransform: "uppercase",
              }}>{t("rest.soon")}</span>
              <div style={{ position: "absolute", left: 20, bottom: 18, color: "white" }}>
                <div className="display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .cuisine-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .cuisine-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ----------------- FOUNDING PERKS (replaces fake testimonials) ----------------- */
function FoundingPerks() {
  useLang();
  const perks = [
    { e: t("perks.p1e"), title: t("perks.p1t"), desc: t("perks.p1d"), icon: "🍽", href: null },
    { e: t("perks.p2e"), title: t("perks.p2t"), desc: t("perks.p2d"), icon: "🏪", href: "#partners" },
    { e: t("perks.p3e"), title: t("perks.p3t"), desc: t("perks.p3d"), icon: "🛵", href: "#couriers" },
  ];
  return (
    <section style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="section-head" style={{ maxWidth: 720 }}>
          <span className="eyebrow"><span className="dot"></span>{t("perks.eyebrow")}</span>
          <h2 className="section-title">{t("perks.title")}</h2>
          <p className="section-subtitle">{t("perks.sub")}</p>
        </div>

        <div className="perks-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}>
          {perks.map((p, i) => (
            <div key={i} style={{
              background: "white",
              padding: 32,
              borderRadius: "var(--radius-lg)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              minHeight: 280,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: "color-mix(in oklch, var(--accent) 12%, transparent)",
                display: "grid", placeItems: "center", fontSize: 28,
              }}>{p.icon}</div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>{p.e}</span>
              <h3 className="display" style={{ fontSize: 26, margin: 0, letterSpacing: "-0.02em" }}>{p.title}</h3>
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
      <style>{`
        @media (max-width: 900px) { .perks-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ----------------- FAQ ----------------- */
function FAQ() {
  useLang();
  const [open, setOpen] = useSecState(0);
  const faqs = [
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
  ];
  return (
    <section style={{ background: "var(--bg)" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-head center">
          <span className="eyebrow"><span className="dot"></span>{t("faq.eyebrow")}</span>
          <h2 className="section-title" style={{ textAlign: "center" }}>{t("faq.title")}</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              background: open === i ? "var(--bg-2)" : "white",
              transition: "background 0.2s ease",
            }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "100%", padding: "20px 24px",
                fontSize: 17, fontWeight: 600, textAlign: "left",
                color: "var(--ink)",
              }}>
                {f.q}
                <span style={{
                  fontSize: 22, lineHeight: 1, color: "var(--accent)",
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 22px", color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- PARTNERS / COURIERS — LEAD FORMS ----------------- */
function PartnersCouriers() {
  useLang();
  return (
    <section id="partners" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="partners-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>
          {/* Restaurant lead form */}
          <div id="partners-card" style={{
            position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden",
            background: "var(--ink)", color: "white",
            padding: "44px 40px",
            display: "flex", flexDirection: "column",
            backgroundImage: "linear-gradient(180deg, rgba(14,14,16,0.92), rgba(14,14,16,0.97)), url(https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&h=600&fit=crop)",
            backgroundSize: "cover", backgroundPosition: "center",
          }}>
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
              <span className="dot"></span>{t("pc.partE")}
            </span>
            <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "16px 0 12px" }}>
              {t("pc.partT1")}<br/>{t("pc.partT2")}
            </h3>
            <p style={{ fontSize: 15.5, opacity: 0.78, maxWidth: 460, margin: "0 0 24px", lineHeight: 1.5 }}>
              {t("pc.partD")}
            </p>
            <div style={{ marginTop: "auto" }}>
              <LeadFlow variant="vendor" />
            </div>
          </div>

          {/* Courier lead form */}
          <div id="couriers" style={{
            position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden",
            background: "var(--accent)", color: "white",
            padding: "44px 40px",
            display: "flex", flexDirection: "column",
          }}>
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.9)" }}>
              <span className="dot" style={{ background: "white" }}></span>{t("pc.courE")}
            </span>
            <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "16px 0 12px" }}>
              {t("pc.courT1")}<br/>{t("pc.courT2")}
            </h3>
            <p style={{ fontSize: 15.5, opacity: 0.92, maxWidth: 460, margin: "0 0 24px", lineHeight: 1.5 }}>
              {t("pc.courD")}
            </p>
            <div style={{ marginTop: "auto" }}>
              <LeadFlow variant="courier" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) { .partners-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

Object.assign(window, {
  HowItWorks, WhyZBR, LaunchBand, Restaurants, FoundingPerks, FAQ, PartnersCouriers,
});
