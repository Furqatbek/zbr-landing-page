import { useState } from "react";
import { useI18n } from "../../i18n";

export function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
  ];
  return (
    <section style={{ background: "var(--bg)" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-head center">
          <span className="eyebrow">
            <span className="dot" />
            {t.faq.eyebrow}
          </span>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            {t.faq.title}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((f, i) => (
            <div
              key={i}
              style={{
                border: "1px solid var(--line)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                background: open === i ? "var(--bg-2)" : "white",
                transition: "background 0.2s ease",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "20px 24px",
                  fontSize: 17,
                  fontWeight: 600,
                  textAlign: "left",
                  color: "var(--ink)",
                }}
              >
                {f.q}
                <span
                  style={{
                    fontSize: 22,
                    lineHeight: 1,
                    color: "var(--accent)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 22px", color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
