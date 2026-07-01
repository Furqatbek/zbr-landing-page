// Main App — Bold variant only.
const { useState: useAppState, useEffect: useAppEffect } = window.React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FF6B00"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = [
  { name: "Signal Orange", value: "#FF6B00" },
  { name: "Electric Lime", value: "#C8FF3D" },
  { name: "Hot Pink", value: "#FF2E7E" },
  { name: "Ultra Violet", value: "#7C5CFF" },
  { name: "Mint Rush", value: "#00D6A4" },
  { name: "Cyber Yellow", value: "#FFD60A" },
];

function hashToRoute() {
  const h = (location.hash || "").toLowerCase();
  if (h.indexOf("partner-offer") >= 0) return "vendorPitch";
  if (h.indexOf("courier-offer") >= 0) return "courierPitch";
  return "home";
}

function App() {
  const [tweaks, setTweaks] = useAppState(TWEAK_DEFAULTS);
  const [editMode, setEditMode] = useAppState(false);
  useLang();
  const [route, setRoute] = useAppState(hashToRoute);

  useAppEffect(() => {
    const onRoute = (e) => {
      const r = e.detail || "home";
      setRoute(r);
      window.scrollTo(0, 0);
      const h = r === "vendorPitch" ? "#partner-offer" : r === "courierPitch" ? "#courier-offer" : "#";
      try { history.pushState(null, "", h); } catch (_) { location.hash = h; }
    };
    const onPop = () => setRoute(hashToRoute());
    window.addEventListener("zbr-route", onRoute);
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("zbr-route", onRoute);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  useAppEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
    const lighten = (hex, amt) => {
      const c = hex.replace("#", "");
      const r = parseInt(c.substr(0, 2), 16);
      const g = parseInt(c.substr(2, 2), 16);
      const b = parseInt(c.substr(4, 2), 16);
      const lr = Math.min(255, r + amt);
      const lg = Math.min(255, g + amt);
      const lb = Math.min(255, b + amt);
      return `#${[lr, lg, lb].map(x => x.toString(16).padStart(2, "0")).join("")}`;
    };
    document.documentElement.style.setProperty("--accent-2", lighten(tweaks.accent, 30));
    document.documentElement.style.setProperty("--accent-soft", lighten(tweaks.accent, 180));
  }, [tweaks.accent]);

  useAppEffect(() => {
    const onMsg = (e) => {
      const t = e.data?.type;
      if (t === "__activate_edit_mode") setEditMode(true);
      if (t === "__deactivate_edit_mode") setEditMode(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const setKey = (key, value) => {
    setTweaks(t => ({ ...t, [key]: value }));
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: value } }, "*");
  };

  const isPitch = route === "vendorPitch" || route === "courierPitch";

  return (
    <div>
      {isPitch ? (
        <PitchPage variant={route === "vendorPitch" ? "vendor" : "courier"} />
      ) : (
      <React.Fragment>
      <Nav dark={false} transparent={false} />
      <HeroA />
      <HowItWorks />
      <Restaurants />
      <WhyZBR />
      <FoundingPerks />
      <PartnersCouriers />
      <FAQ />

      <section style={{
        background: "var(--accent)", color: "white",
        padding: "100px 0", textAlign: "center",
      }}>
        <div className="container">
          <h2 className="display" style={{ fontSize: "clamp(40px, 7vw, 96px)", margin: "0 0 20px", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            {t("finalCta.title")}
          </h2>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 540, margin: "0 auto 36px" }}>
            {t("finalCta.sub")}
          </p>
          <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <StoreButtons />
          </div>
        </div>
      </section>

      <Footer />
      </React.Fragment>
      )}

      {editMode && (
        <div style={{
          position: "fixed", top: 90, right: 24, zIndex: 200,
          background: "white", borderRadius: 16, padding: 20,
          boxShadow: "0 20px 60px -10px rgba(0,0,0,0.3)",
          border: "1px solid var(--line)",
          width: 280,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Tweaks</span>
            <button onClick={() => {
              setEditMode(false);
              window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
            }} style={{ fontSize: 18, color: "var(--muted)" }}>×</button>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Accent color</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
            {ACCENT_PRESETS.map(p => (
              <button key={p.value} onClick={() => setKey("accent", p.value)} style={{
                padding: 8, borderRadius: 10,
                border: tweaks.accent === p.value ? "2px solid var(--ink)" : "2px solid transparent",
                background: "var(--bg-2)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}>
                <span style={{ width: 24, height: 24, borderRadius: 6, background: p.value }} />
                <span style={{ fontSize: 10, fontWeight: 500 }}>{p.name}</span>
              </button>
            ))}
          </div>
          <input type="color" value={tweaks.accent} onChange={(e) => setKey("accent", e.target.value)} style={{ width: "100%", height: 36, borderRadius: 8, border: "1px solid var(--line)" }} />
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
