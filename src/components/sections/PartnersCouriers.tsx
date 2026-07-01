import { useI18n } from "../../i18n";
import { LeadFlow } from "../lead/LeadFlow";

export function PartnersCouriers() {
  const { t } = useI18n();
  return (
    <section id="partners" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div
          className="partners-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}
        >
          {/* Restaurant lead form */}
          <div
            id="partners-card"
            style={{
              position: "relative",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              background: "var(--ink)",
              color: "white",
              padding: "44px 40px",
              display: "flex",
              flexDirection: "column",
              backgroundImage:
                "linear-gradient(180deg, rgba(14,14,16,0.92), rgba(14,14,16,0.97)), url(https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&h=600&fit=crop)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
              <span className="dot" />
              {t.pc.partE}
            </span>
            <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "16px 0 12px" }}>
              {t.pc.partT1}
              <br />
              {t.pc.partT2}
            </h3>
            <p style={{ fontSize: 15.5, opacity: 0.78, maxWidth: 460, margin: "0 0 24px", lineHeight: 1.5 }}>
              {t.pc.partD}
            </p>
            <div style={{ marginTop: "auto" }}>
              <LeadFlow variant="vendor" />
            </div>
          </div>

          {/* Courier lead form */}
          <div
            id="couriers"
            style={{
              position: "relative",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              background: "var(--accent)",
              color: "white",
              padding: "44px 40px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.9)" }}>
              <span className="dot" style={{ background: "white" }} />
              {t.pc.courE}
            </span>
            <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "16px 0 12px" }}>
              {t.pc.courT1}
              <br />
              {t.pc.courT2}
            </h3>
            <p style={{ fontSize: 15.5, opacity: 0.92, maxWidth: 460, margin: "0 0 24px", lineHeight: 1.5 }}>
              {t.pc.courD}
            </p>
            <div style={{ marginTop: "auto" }}>
              <LeadFlow variant="courier" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
