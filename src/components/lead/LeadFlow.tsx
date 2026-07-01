import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n";
import { PhoneLead, type LeadVariant } from "./PhoneLead";

const PITCH_PATH: Record<LeadVariant, string> = {
  vendor: "/partner-offer",
  courier: "/courier-offer",
};

/**
 * In-card lead flow: choose between "show me the full offer" (routes to the
 * dedicated warm-up pitch page) and "just leave your number" (inline form).
 */
export function LeadFlow({ variant }: { variant: LeadVariant }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const dark = variant === "vendor";
  const [mode, setMode] = useState<"choose" | "form">("choose");

  if (mode === "form") {
    return <PhoneLead variant={variant} onBack={() => setMode("choose")} />;
  }

  const solidStyle: CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "15px 20px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    background: dark ? "var(--accent)" : "white",
    color: dark ? "white" : "var(--accent)",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  };
  const ghostStyle: CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "15px 20px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    background: "transparent",
    color: "white",
    border: dark ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,255,255,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    transition: "background 0.15s ease",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <button
        type="button"
        onClick={() => navigate(PITCH_PATH[variant])}
        style={solidStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = dark ? "brightness(1.08)" : "brightness(0.96)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = "none";
        }}
      >
        <span>{t.flow.offerCta}</span>
        <span aria-hidden style={{ opacity: 0.85 }}>
          →
        </span>
      </button>
      <button
        type="button"
        onClick={() => setMode("form")}
        style={ghostStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.14)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <span>{t.flow.straightCta}</span>
        <span aria-hidden style={{ opacity: 0.7 }}>
          ›
        </span>
      </button>
    </div>
  );
}
