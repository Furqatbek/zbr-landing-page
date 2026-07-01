import { useState, type CSSProperties, type ReactNode } from "react";
import { useI18n } from "../../i18n";
import { formatUzPhone, isValidUzPhone, canonicalPhone } from "../../lib/phone";
import { submitLead, type LeadType } from "../../lib/leads";

export type LeadVariant = "vendor" | "courier";

function Field({ label, dark, children }: { label: string; dark: boolean; children: ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 6,
          color: dark ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.9)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

export function BackLink({ onClick, dark }: { onClick: () => void; dark: boolean }) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        alignSelf: "flex-start",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
        padding: "4px 0",
        color: dark ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.85)",
      }}
    >
      ← {t.flow.back}
    </button>
  );
}

const TRANSPORTS = ["tBike", "tScooter", "tCar", "tFoot"] as const;
type TransportKey = (typeof TRANSPORTS)[number];

export function PhoneLead({ variant, onBack }: { variant: LeadVariant; onBack?: () => void }) {
  const { t, lang } = useI18n();
  const dark = variant === "vendor";
  const [org, setOrg] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [transport, setTransport] = useState<TransportKey>("tBike");
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const inputStyle: CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    borderRadius: 12,
    background: dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.16)",
    border: dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.28)",
    color: "white",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
  };

  const reset = () => {
    setDone(false);
    setOrg("");
    setName("");
    setPhone("+998 ");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (variant === "vendor" && !org.trim()) {
      setErr(t.forms.errOrg);
      return;
    }
    if (!name.trim()) {
      setErr(t.forms.errName);
      return;
    }
    if (!isValidUzPhone(phone)) {
      setErr(t.forms.errPhone);
      return;
    }
    setErr("");
    setSending(true);
    try {
      await submitLead({
        type: variant as LeadType,
        org: org.trim() || null,
        name: name.trim(),
        phone: canonicalPhone(phone),
        transport: variant === "courier" ? transport.replace("t", "").toLowerCase() : null,
        lang,
      });
      setDone(true);
    } catch {
      setErr(t.forms.errNetwork);
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div
        style={{
          padding: "28px 24px",
          borderRadius: "var(--radius)",
          background: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.16)",
          border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.28)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
        <div className="display" style={{ fontSize: 22, color: "white", marginBottom: 6 }}>
          {t.forms.successT}
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", margin: "0 0 16px" }}>{t.forms.successD}</p>
        <button
          onClick={reset}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "white",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {t.forms.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {onBack && <BackLink onClick={onBack} dark={dark} />}
      {variant === "vendor" && (
        <Field label={t.forms.orgLabel} dark={dark}>
          <input value={org} onChange={(e) => setOrg(e.target.value)} placeholder={t.forms.orgPh} style={inputStyle} />
        </Field>
      )}
      <div className="lead-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label={t.forms.nameLabel} dark={dark}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.forms.namePh} style={inputStyle} />
        </Field>
        <Field label={t.forms.phoneLabel} dark={dark}>
          <input
            value={phone}
            onChange={(e) => setPhone(formatUzPhone(e.target.value))}
            onFocus={() => {
              if (!phone.trim() || phone === "+998 ") setPhone("+998 ");
            }}
            inputMode="tel"
            placeholder="+998 (90) 123-45-67"
            style={inputStyle}
          />
        </Field>
      </div>

      {variant === "courier" && (
        <Field label={t.forms.transportLabel} dark={dark}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {TRANSPORTS.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setTransport(opt)}
                style={{
                  flex: "1 1 auto",
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: transport === opt ? "white" : "rgba(255,255,255,0.16)",
                  color: transport === opt ? "var(--accent)" : "white",
                  border: "1px solid rgba(255,255,255,0.28)",
                  transition: "all 0.15s ease",
                }}
              >
                {t.forms[opt]}
              </button>
            ))}
          </div>
        </Field>
      )}

      {err && (
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: "8px 12px",
            borderRadius: 8,
            background: "rgba(255,80,80,0.18)",
            color: dark ? "#ffd0d0" : "white",
            border: "1px solid rgba(255,120,120,0.4)",
          }}
        >
          {err}
        </div>
      )}

      <button
        type="submit"
        className="btn"
        disabled={sending}
        style={{
          background: dark ? "var(--accent)" : "white",
          color: dark ? "white" : "var(--accent)",
          fontSize: 15,
          padding: "14px 26px",
          marginTop: 4,
          opacity: sending ? 0.75 : 1,
        }}
      >
        {sending ? t.forms.sending : variant === "vendor" ? t.forms.vendorCta : t.forms.courierCta}
      </button>
      <span style={{ fontSize: 12.5, color: dark ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.85)" }}>
        {t.forms.note}
      </span>
    </form>
  );
}
