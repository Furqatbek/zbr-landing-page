import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { pages, type PageKey } from "../i18n/pages";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Renders one of the secondary pages linked from the footer (about, terms,
 * support, …). All copy lives in `i18n/pages.ts`, keyed by language, so these
 * pages follow the language switcher like the rest of the site.
 */
export function InfoPage({ page }: { page: PageKey }) {
  const { t, lang } = useI18n();
  const p = pages[lang][page];

  return (
    <div>
      <Nav dark={false} transparent={false} />

      {/* HEADER */}
      <section style={{ background: "var(--bg-2)", paddingTop: 48, paddingBottom: 56 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ marginBottom: 24 }}>
            <Link to="/" style={{ fontSize: 14, fontWeight: 600, color: "var(--muted)" }}>
              ← {t.pitchHome}
            </Link>
          </div>
          <span className="eyebrow">
            <span className="dot" />
            {p.eyebrow}
          </span>
          <h1
            className="display"
            style={{
              fontSize: "clamp(34px, 5vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: "16px 0 14px",
            }}
          >
            {p.title}
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.5, margin: 0, maxWidth: 640 }}>{p.sub}</p>
          {p.updated && (
            <p style={{ color: "var(--muted)", fontSize: 14, margin: "18px 0 0" }}>{p.updated}</p>
          )}
        </div>
      </section>

      {/* BODY */}
      <section style={{ background: "var(--bg)", paddingTop: 8, paddingBottom: 88 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          {p.sections.map((s, i) => (
            <div key={i} style={{ marginTop: i === 0 ? 40 : 36 }}>
              {s.h && (
                <h2
                  className="display"
                  style={{ fontSize: "clamp(21px, 2.5vw, 28px)", letterSpacing: "-0.02em", margin: "0 0 12px" }}
                >
                  {s.h}
                </h2>
              )}
              {s.p && (
                <p style={{ color: "var(--ink-2)", fontSize: 16.5, lineHeight: 1.7, margin: 0 }}>{s.p}</p>
              )}
              {s.items && (
                <ul
                  style={{
                    color: "var(--ink-2)",
                    fontSize: 16.5,
                    lineHeight: 1.7,
                    margin: s.p ? "14px 0 0" : 0,
                    paddingLeft: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {s.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--accent)", fontWeight: 800, lineHeight: 1.7, flexShrink: 0 }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {p.cta && (
            <div style={{ marginTop: 44 }}>
              <Link to={p.cta.to} className="btn btn-primary" style={{ fontSize: 16, padding: "15px 32px" }}>
                {p.cta.label}
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
