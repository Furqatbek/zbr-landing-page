import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PhoneLead, type LeadVariant } from "./lead/PhoneLead";

/** Long-form persuasion page: hook → pain → agitate → painkiller → offer → steps → form → CTA. */
export function PitchPage({ variant }: { variant: LeadVariant }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const p = variant === "vendor" ? t.vpitch : t.cpitch;
  const formDark = variant === "vendor";

  const goHome = () => navigate("/");
  const toForm = () => document.getElementById("pitch-form")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div>
      <Nav dark={false} transparent={false} />

      {/* HERO */}
      <section style={{ background: "var(--bg)", paddingTop: 56, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 1440 700"
            style={{ position: "absolute", inset: 0 }}
          >
            <g stroke="var(--accent)" strokeLinecap="round" opacity="0.12">
              <line x1="1080" y1="120" x2="1460" y2="120" strokeWidth="8" />
              <line x1="1160" y1="180" x2="1460" y2="180" strokeWidth="6" />
              <line x1="1100" y1="240" x2="1460" y2="240" strokeWidth="7" />
            </g>
          </svg>
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <button
            onClick={goHome}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--muted)",
              padding: "4px 0",
              marginBottom: 28,
            }}
          >
            ← {t.pitchHome}
          </button>
          <div style={{ maxWidth: 860 }}>
            <span className="eyebrow">
              <span className="dot" />
              {p.heroEyebrow}
            </span>
            <h1
              className="display"
              style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.98, letterSpacing: "-0.04em", margin: "18px 0 22px" }}
            >
              {p.heroTitle}
            </h1>
            <p style={{ fontSize: "clamp(17px, 1.8vw, 21px)", color: "var(--muted)", maxWidth: 640, lineHeight: 1.5, margin: "0 0 30px" }}>
              {p.heroSub}
            </p>
            <button onClick={toForm} className="btn btn-primary" style={{ fontSize: 16, padding: "15px 32px" }}>
              {p.heroCta}
            </button>
          </div>
        </div>
      </section>

      {/* PAINS */}
      <section style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div className="section-head" style={{ maxWidth: 760 }}>
            <span className="eyebrow">
              <span className="dot" />
              {p.painEyebrow}
            </span>
            <h2 className="section-title">{p.painTitle}</h2>
            <p className="section-subtitle">{p.painSub}</p>
          </div>
          <div className="pitch-pains" style={{ borderTop: "1px solid var(--line)" }}>
            {p.pains.map((pain, i) => (
              <div
                key={i}
                className="pitch-pain-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "clamp(20px, 4vw, 56px)",
                  alignItems: "baseline",
                  padding: "30px 0",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div
                  className="display"
                  style={{ fontSize: "clamp(34px, 4.5vw, 58px)", lineHeight: 0.9, color: "rgba(14,14,16,0.13)", fontWeight: 700 }}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <div style={{ maxWidth: 640 }}>
                  <h3 className="display" style={{ fontSize: "clamp(21px, 2.4vw, 29px)", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
                    {pain.t}
                  </h3>
                  <p style={{ color: "var(--muted)", margin: 0, fontSize: 16, lineHeight: 1.6 }}>{pain.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGITATE */}
      <section style={{ background: "var(--ink)", color: "white", padding: "84px 0" }}>
        <div className="container" style={{ maxWidth: 900, textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(30px, 4.5vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            {p.agitateTitle}
          </h2>
          <p style={{ fontSize: 18, opacity: 0.72, maxWidth: 640, margin: "0 auto", lineHeight: 1.55 }}>{p.agitateSub}</p>
        </div>
      </section>

      {/* KILLS (painkiller) */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-head" style={{ maxWidth: 760 }}>
            <span className="eyebrow">
              <span className="dot" />
              {p.killEyebrow}
            </span>
            <h2 className="section-title">{p.killTitle}</h2>
          </div>
          <div className="pitch-kills" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 56 }}>
            {p.kills.map((k, i) => (
              <div
                key={i}
                className="pitch-kill-row"
                style={{ padding: "26px 0", borderTop: "1px solid var(--line)", display: "flex", gap: 14, alignItems: "flex-start" }}
              >
                <span style={{ color: "var(--accent)", fontSize: 17, fontWeight: 800, lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                <div>
                  <h3 className="display" style={{ fontSize: "clamp(19px, 2vw, 24px)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                    {k.t}
                  </h3>
                  <p style={{ color: "var(--muted)", margin: 0, fontSize: 15.5, lineHeight: 1.6 }}>{k.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section style={{ background: "var(--accent)", color: "white", padding: "84px 0" }}>
        <div className="container">
          <div className="pitch-offer" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <h2 className="display" style={{ fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 14px" }}>
                {p.offerTitle}
              </h2>
              <p style={{ fontSize: 18, opacity: 0.92, margin: "0 0 26px", lineHeight: 1.5 }}>{p.offerSub}</p>
              <button onClick={toForm} className="btn" style={{ background: "white", color: "var(--accent)", fontSize: 16, padding: "15px 32px" }}>
                {p.heroCta}
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {p.offerBullets.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 20px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  <span style={{ fontSize: 18 }}>✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-head center">
            <h2 className="section-title" style={{ textAlign: "center" }}>
              {p.stepsTitle}
            </h2>
          </div>
          <div className="pitch-steps" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {p.steps.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0 12px" }}>
                <div
                  className="display"
                  style={{ fontSize: 56, color: "transparent", WebkitTextStroke: "1.5px var(--accent)", lineHeight: 1, marginBottom: 14 }}
                >
                  {i + 1}
                </div>
                <h3 className="display" style={{ fontSize: 22, margin: "0 0 8px" }}>
                  {s.t}
                </h3>
                <p style={{ color: "var(--muted)", margin: 0, fontSize: 15, lineHeight: 1.5 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="pitch-form" style={{ background: "var(--bg-2)", paddingBottom: 96 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div
            style={{
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              background: formDark ? "var(--ink)" : "var(--accent)",
              color: "white",
              padding: "48px 44px",
              ...(formDark
                ? {
                    backgroundImage:
                      "linear-gradient(180deg, rgba(14,14,16,0.93), rgba(14,14,16,0.98)), url(https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&h=700&fit=crop)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}),
            }}
          >
            <h2 className="display" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", margin: "0 0 10px" }}>
              {p.formTitle}
            </h2>
            <p style={{ fontSize: 16, opacity: 0.85, margin: "0 0 14px", lineHeight: 1.5 }}>{p.formSub}</p>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 6 }}>
              {p.reassure.map((r, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, opacity: 0.92 }}>
                  <span style={{ color: formDark ? "var(--accent)" : "white" }}>✓</span>
                  {r}
                </span>
              ))}
            </div>
            <PhoneLead variant={variant} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "var(--accent)", color: "white", padding: "90px 0", textAlign: "center" }}>
        <div className="container">
          <h2 className="display" style={{ fontSize: "clamp(34px, 6vw, 76px)", margin: "0 0 18px", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
            {p.finalTitle}
          </h2>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 560, margin: "0 auto 32px" }}>{p.finalSub}</p>
          <button onClick={toForm} className="btn" style={{ background: "white", color: "var(--accent)", fontSize: 16, padding: "16px 34px" }}>
            {p.heroCta}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
