import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { HIDDEN_PATHS } from "../i18n/pages";
import { ZbrLogo } from "./ZbrLogo";
import { formatUzPhone, isValidUzPhone, canonicalPhone } from "../lib/phone";
import { submitLead } from "../lib/leads";

type Status = "idle" | "sending" | "done" | "error";

// Live accounts only. X and YouTube used to render here as badges pointing at
// "#", so they are dropped until there is something real to link to.
const SOCIALS = [
  { label: "IG", name: "Instagram", href: "https://www.instagram.com/zbr_uz/" },
  { label: "TG", name: "Telegram", href: "https://t.me/furqaty" },
];

export function Footer({ dark = true }: { dark?: boolean }) {
  const { t, lang } = useI18n();
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  // Destinations sit here rather than in the dictionaries: the labels are
  // translated, the paths are the same in every language. Order matches the
  // label arrays in `translations.ts`.
  const rawCols = [
    { title: t.footer.c1, links: t.footer.c1l, hrefs: ["/about", "/careers", "/press", "/blog"] },
    {
      title: t.footer.c2,
      links: t.footer.c2l,
      hrefs: ["/partner-offer", "/courier-offer", "/for-offices", "/restaurant-dashboard"],
    },
    { title: t.footer.c3, links: t.footer.c3l, hrefs: ["/#faq", "/support", "/safety", "/status"] },
    { title: t.footer.c4, links: t.footer.c4l, hrefs: ["/privacy", "/terms", "/cookies", "/refunds"] },
  ];

  // Pair each label with its destination, then drop the ones not live yet.
  const cols = rawCols.map((col) => ({
    title: col.title,
    entries: col.links
      .map((label, i) => ({ label, href: col.hrefs[i] }))
      .filter((e) => !HIDDEN_PATHS.has(e.href)),
  }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUzPhone(phone)) {
      setErr(t.forms.errPhone);
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErr("");
    try {
      await submitLead({ type: "newsletter", phone: canonicalPhone(phone), lang, source: "footer" });
      setStatus("done");
    } catch {
      setErr(t.forms.errNetwork);
      setStatus("error");
    }
  };

  const lineColor = dark ? "rgba(255,255,255,0.1)" : "var(--line)";

  return (
    <footer
      style={{
        background: dark ? "var(--ink)" : "var(--bg-2)",
        color: dark ? "rgba(255,255,255,0.8)" : "var(--ink)",
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      <div className="container">
        {/* Newsletter */}
        <div
          className="footer-top"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            paddingBottom: 60,
            borderBottom: `1px solid ${lineColor}`,
          }}
        >
          <div>
            <h3
              className="display"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                margin: "0 0 12px",
                color: dark ? "white" : "var(--ink)",
              }}
            >
              {t.footer.newsT}
            </h3>
            <p style={{ fontSize: 16, opacity: 0.75, maxWidth: 460, margin: 0 }}>{t.footer.newsS}</p>
          </div>

          {status === "done" ? (
            <div
              style={{
                alignSelf: "center",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 22px",
                borderRadius: 18,
                background: dark ? "rgba(255,255,255,0.06)" : "white",
                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "var(--line)"}`,
              }}
            >
              <span style={{ fontSize: 22 }}>✅</span>
              <div>
                <div style={{ fontWeight: 700, color: dark ? "white" : "var(--ink)" }}>
                  {t.forms.successT}
                </div>
                <div style={{ fontSize: 14, opacity: 0.75 }}>{t.forms.successD}</div>
              </div>
            </div>
          ) : (
            <div style={{ alignSelf: "center" }}>
              <form
                onSubmit={onSubmit}
                style={{
                  display: "flex",
                  gap: 8,
                  background: dark ? "rgba(255,255,255,0.06)" : "white",
                  padding: 6,
                  borderRadius: 999,
                  border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "var(--line)"}`,
                }}
              >
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatUzPhone(e.target.value))}
                  onFocus={() => {
                    if (!phone) setPhone("+998 ");
                  }}
                  placeholder={t.footer.phonePlaceholder}
                  required
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    padding: "12px 16px",
                    fontSize: 15,
                    color: dark ? "white" : "var(--ink)",
                    outline: "none",
                    fontFamily: "inherit",
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                  style={{ padding: "10px 22px", fontSize: 14, opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "sending" ? t.forms.sending : t.footer.sub}
                </button>
              </form>
              {status === "error" && (
                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: "#ff8a8a" }}>{err}</div>
              )}
            </div>
          )}
        </div>

        {/* Link columns */}
        <div
          className="footer-cols"
          style={{ display: "grid", gridTemplateColumns: "1.2fr repeat(4, 1fr)", gap: 40, padding: "60px 0" }}
        >
          <div>
            <ZbrLogo size={36} dark={dark} />
            <p style={{ fontSize: 14, opacity: 0.6, marginTop: 16, maxWidth: 280 }}>{t.footer.tagline}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    display: "grid",
                    placeItems: "center",
                    background: dark ? "rgba(255,255,255,0.06)" : "white",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    color: dark ? "white" : "var(--ink)",
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  opacity: 0.55,
                  marginBottom: 16,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.entries.map((e) => (
                  <li key={e.href}>
                    <Link to={e.href} style={{ fontSize: 14, opacity: 0.85 }}>
                      {e.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div
          style={{
            paddingTop: 28,
            borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "var(--line)"}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
            opacity: 0.6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span>{t.footer.copy}</span>
            <Link to="/privacy" style={{ opacity: 0.85, textDecoration: "underline" }}>
              {t.footer.privacy}
            </Link>
          </div>
          <div>{t.footer.made}</div>
        </div>
      </div>
    </footer>
  );
}
