// 3 distinct hero variations for the ZBR landing.

/* ===== VARIATION A — BOLD/ENERGETIC (speed-first, stadium-poster) ===== */
function HeroA() {
  useLang();
  return (
    <section style={{
      position: "relative",
      paddingTop: 80, paddingBottom: 120,
      overflow: "hidden",
      background: `
        radial-gradient(ellipse at 80% -10%, color-mix(in oklch, var(--accent) 22%, transparent), transparent 60%),
        var(--bg)
      `,
    }}>
      {/* Speed-line decorations */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1440 800" style={{ position: "absolute", inset: 0 }}>
          <g stroke="var(--accent)" strokeLinecap="round" opacity="0.16">
            <line x1="-20" y1="200" x2="180" y2="200" strokeWidth="6"/>
            <line x1="-20" y1="240" x2="120" y2="240" strokeWidth="4"/>
            <line x1="-20" y1="280" x2="200" y2="280" strokeWidth="5"/>
            <line x1="-20" y1="320" x2="80" y2="320" strokeWidth="3"/>
            <line x1="-20" y1="360" x2="160" y2="360" strokeWidth="5"/>
          </g>
        </svg>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 60, alignItems: "center",
        }}>
          {/* Left: massive type */}
          <div>
            <h1 className="display" style={{
              fontSize: "clamp(56px, 9vw, 128px)",
              lineHeight: 0.92,
              margin: "0 0 24px",
              letterSpacing: "-0.05em",
            }}>
              {t("hero.title1")}<br/>
              <span style={{
                background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>{t("hero.title2")}</span>
              {t("hero.title3") ? <><br/>{t("hero.title3")}</> : null}
            </h1>

            <p style={{
              fontSize: "clamp(17px, 1.6vw, 20px)",
              color: "var(--muted)",
              maxWidth: 480, margin: "0 0 32px", lineHeight: 1.5,
            }}>
              {t("hero.sub")}
            </p>

            <div id="download" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <StoreButtons />
              <div style={{ fontSize: 13, color: "var(--muted)", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--accent)", fontWeight: 600 }}>★★★★★</span>
                {t("hero.stars")}
              </div>
            </div>
          </div>

          {/* Right: phone with motion accents */}
          <div style={{ position: "relative", display: "grid", placeItems: "center", minHeight: 600 }}>
            {/* Background blob */}
            <div style={{
              position: "absolute", inset: 40,
              background: "var(--accent)", borderRadius: "50%",
              filter: "blur(80px)", opacity: 0.25,
            }} />
            {/* Floating order badge */}
            <div style={{
              position: "absolute", top: 40, left: -20, zIndex: 3,
              background: "white", padding: "12px 16px", borderRadius: 16,
              boxShadow: "var(--shadow-md)",
              display: "flex", alignItems: "center", gap: 10,
              animation: "float 4s ease-in-out infinite",
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "color-mix(in oklch, var(--accent) 15%, transparent)", display: "grid", placeItems: "center", fontSize: 20 }}>⚡</div>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>{t("hero.floatOrder")}</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t("hero.floatEta")}</div>
              </div>
            </div>
            <div style={{
              position: "absolute", bottom: 60, right: -10, zIndex: 3,
              background: "var(--ink)", color: "white", padding: "12px 16px", borderRadius: 16,
              boxShadow: "var(--shadow-md)",
              animation: "float 5s ease-in-out infinite 1s",
            }}>
              <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 500 }}>{t("hero.floatToday")}</div>
              <div style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }}></span>
                {t("hero.floatDelivered")}
              </div>
            </div>
            <PhoneFrame style={{ position: "relative", zIndex: 2 }}>
              <PhoneHome />
            </PhoneFrame>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { HeroA });
