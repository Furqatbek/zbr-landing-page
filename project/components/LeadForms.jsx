// Lead-capture — restaurant (vendor) + courier.
// Flow: CHOOSE → (straight: FORM) or (offer: PAIN→PAINKILLER → FORM).
const { useState: useLeadState } = React;

/* Format Uzbek phone: +998 (XX) XXX-XX-XX */
function formatUzPhone(v) {
  let d = (v || "").replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  let out = "+998";
  if (d.length > 0) out += " (" + d.slice(0, 2);
  if (d.length >= 2) out += ")";
  if (d.length > 2) out += " " + d.slice(2, 5);
  if (d.length > 5) out += "-" + d.slice(5, 7);
  if (d.length > 7) out += "-" + d.slice(7, 9);
  return out;
}
function phoneDigits(v) {
  let d = (v || "").replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  return d.slice(0, 9);
}

function persistLead(lead) {
  try {
    const arr = JSON.parse(localStorage.getItem("zbr_leads") || "[]");
    arr.push({ ...lead, ts: Date.now() });
    localStorage.setItem("zbr_leads", JSON.stringify(arr));
  } catch (e) {}
}

function Field({ label, children, dark }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{
        display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6,
        color: dark ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.9)",
        textTransform: "uppercase", letterSpacing: "0.05em",
      }}>{label}</span>
      {children}
    </label>
  );
}

function BackLink({ onClick, dark }) {
  return (
    <button type="button" onClick={onClick} style={{
      alignSelf: "flex-start", background: "none", border: "none", cursor: "pointer",
      fontSize: 13, fontWeight: 600, padding: "4px 0",
      color: dark ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.85)",
    }}>← {t("flow.back")}</button>
  );
}

/* ---- The phone form itself ---- */
function PhoneLead({ variant, onBack }) {
  const lang = useLang();
  const dark = variant === "vendor";
  const [org, setOrg] = useLeadState("");
  const [name, setName] = useLeadState("");
  const [phone, setPhone] = useLeadState("+998 ");
  const [transport, setTransport] = useLeadState("tBike");
  const [err, setErr] = useLeadState("");
  const [done, setDone] = useLeadState(false);

  const inputBg = dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.16)";
  const inputBorder = dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.28)";
  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    padding: "13px 14px", borderRadius: 12,
    background: inputBg, border: inputBorder,
    color: "white", fontSize: 15, fontFamily: "inherit", outline: "none",
  };

  const submit = (e) => {
    e.preventDefault();
    if (variant === "vendor" && !org.trim()) { setErr(t("forms.errOrg")); return; }
    if (!name.trim()) { setErr(t("forms.errName")); return; }
    if (phoneDigits(phone).length !== 9) { setErr(t("forms.errPhone")); return; }
    persistLead({
      type: variant,
      org: org.trim() || null,
      name: name.trim(),
      phone: "+998" + phoneDigits(phone),
      transport: variant === "courier" ? transport.replace("t", "").toLowerCase() : null,
      lang,
    });
    setErr("");
    setDone(true);
  };

  if (done) {
    return (
      <div style={{
        padding: "28px 24px", borderRadius: "var(--radius)",
        background: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.16)",
        border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.28)",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
        <div className="display" style={{ fontSize: 22, color: "white", marginBottom: 6 }}>{t("forms.successT")}</div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", margin: "0 0 16px" }}>{t("forms.successD")}</p>
        <button onClick={() => { setDone(false); setOrg(""); setName(""); setPhone("+998 "); }}
          style={{
            fontSize: 13, fontWeight: 600, color: "white",
            textDecoration: "underline", textUnderlineOffset: 3,
            background: "none", border: "none", cursor: "pointer",
          }}>{t("forms.again")}</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {onBack && <BackLink onClick={onBack} dark={dark} />}
      {variant === "vendor" && (
        <Field label={t("forms.orgLabel")} dark={dark}>
          <input value={org} onChange={e => setOrg(e.target.value)} placeholder={t("forms.orgPh")} style={inputStyle} />
        </Field>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="lead-row">
        <Field label={t("forms.nameLabel")} dark={dark}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder={t("forms.namePh")} style={inputStyle} />
        </Field>
        <Field label={t("forms.phoneLabel")} dark={dark}>
          <input
            value={phone}
            onChange={e => setPhone(formatUzPhone(e.target.value))}
            onFocus={() => { if (!phone.trim() || phone === "+998 ") setPhone("+998 "); }}
            inputMode="tel"
            placeholder="+998 (90) 123-45-67"
            style={inputStyle}
          />
        </Field>
      </div>

      {variant === "courier" && (
        <Field label={t("forms.transportLabel")} dark={dark}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["tBike", "tScooter", "tCar", "tFoot"].map(opt => (
              <button type="button" key={opt} onClick={() => setTransport(opt)} style={{
                flex: "1 1 auto", padding: "10px 12px", borderRadius: 10,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                background: transport === opt ? "white" : "rgba(255,255,255,0.16)",
                color: transport === opt ? "var(--accent)" : "white",
                border: "1px solid rgba(255,255,255,0.28)",
                transition: "all 0.15s ease",
              }}>{t("forms." + opt)}</button>
            ))}
          </div>
        </Field>
      )}

      {err && (
        <div style={{
          fontSize: 13, fontWeight: 600, padding: "8px 12px", borderRadius: 8,
          background: "rgba(255,80,80,0.18)", color: dark ? "#ffd0d0" : "white",
          border: "1px solid rgba(255,120,120,0.4)",
        }}>{err}</div>
      )}

      <button type="submit" className="btn" style={{
        background: dark ? "var(--accent)" : "white",
        color: dark ? "white" : "var(--accent)",
        fontSize: 15, padding: "14px 26px", marginTop: 4,
      }}>
        {variant === "vendor" ? t("forms.vendorCta") : t("forms.courierCta")}
      </button>
      <span style={{ fontSize: 12.5, color: dark ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.85)" }}>
        {t("forms.note")}
      </span>

      <style>{`@media (max-width: 460px){ .lead-row{ grid-template-columns: 1fr !important; } }`}</style>
    </form>
  );
}

/* ---- Pain → Painkiller offer ---- */
function OfferPitch({ variant, onContinue, onBack }) {
  useLang();
  const dark = variant === "vendor";
  const pairs = t(variant === "vendor" ? "flow.vPairs" : "flow.cPairs") || [];
  const painColor = dark ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.78)";
  const rowBg = dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)";
  const rowBorder = dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.22)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <BackLink onClick={onBack} dark={dark} />
      <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.02em", color: dark ? "white" : "white" }}>
        {t("flow.offerHead")}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {pairs.map((pk, i) => (
          <div key={i} style={{ padding: "14px 16px", borderRadius: 14, background: rowBg, border: rowBorder }}>
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 8,
              fontSize: 13.5, color: painColor, textDecoration: "line-through",
              textDecorationColor: dark ? "rgba(255,120,120,0.7)" : "rgba(255,255,255,0.5)",
              marginBottom: 6,
            }}>
              <span style={{ textDecoration: "none" }}>✕</span>
              <span>{pk.p}</span>
            </div>
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 8,
              fontSize: 15, fontWeight: 700, color: "white",
            }}>
              <span style={{ color: dark ? "var(--accent)" : "white" }}>✓</span>
              <span>{pk.k}</span>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={onContinue} className="btn" style={{
        background: dark ? "var(--accent)" : "white",
        color: dark ? "white" : "var(--accent)",
        fontSize: 15, padding: "14px 26px", marginTop: 2,
      }}>
        {t("flow.toForm")}
      </button>
    </div>
  );
}

/* ---- Flow controller: choose → straight form OR offer → form ---- */
function LeadFlow({ variant }) {
  useLang();
  const dark = variant === "vendor";
  const [mode, setMode] = useLeadState("choose"); // choose | offer | form

  if (mode === "form") {
    return <PhoneLead variant={variant} onBack={() => setMode("choose")} />;
  }
  if (mode === "offer") {
    return <OfferPitch variant={variant} onBack={() => setMode("choose")} onContinue={() => setMode("form")} />;
  }

  // choose
  const ghostStyle = {
    width: "100%", boxSizing: "border-box",
    padding: "15px 20px", borderRadius: 14,
    fontSize: 15, fontWeight: 600, cursor: "pointer",
    background: "transparent",
    color: "white",
    border: dark ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,255,255,0.45)",
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
    transition: "background 0.15s ease",
  };
  const solidStyle = {
    width: "100%", boxSizing: "border-box",
    padding: "15px 20px", borderRadius: 14,
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    background: dark ? "var(--accent)" : "white",
    color: dark ? "white" : "var(--accent)",
    border: "none",
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("zbr-route", { detail: variant === "vendor" ? "vendorPitch" : "courierPitch" }))} style={solidStyle}
        onMouseEnter={e => { if (dark) e.currentTarget.style.filter = "brightness(1.08)"; else e.currentTarget.style.filter = "brightness(0.96)"; }}
        onMouseLeave={e => e.currentTarget.style.filter = "none"}>
        <span>{t("flow.offerCta")}</span>
        <span aria-hidden style={{ opacity: 0.85 }}>→</span>
      </button>
      <button type="button" onClick={() => setMode("form")} style={ghostStyle}
        onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.14)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
        <span>{t("flow.straightCta")}</span>
        <span aria-hidden style={{ opacity: 0.7 }}>›</span>
      </button>
    </div>
  );
}

Object.assign(window, { PhoneLead, LeadFlow, OfferPitch, formatUzPhone, phoneDigits });
