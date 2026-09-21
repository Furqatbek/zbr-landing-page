// Common building blocks shared across all 3 ZBR landing variations.
const { useState, useEffect, useRef } = React;

/* ----------------- ZBR LOGO ----------------- */
function ZbrLogo({ size = 32, dark = false, withText = true }) {
  const fg = dark ? "#FFFFFF" : "var(--accent)";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill={fg} />
        {/* speed lines */}
        <rect x="6" y="22" width="10" height="3" rx="1.5" fill="white" opacity="0.55" />
        <rect x="9" y="28" width="8" height="2.5" rx="1.25" fill="white" opacity="0.4" />
        <rect x="6" y="34" width="11" height="3" rx="1.5" fill="white" opacity="0.5" />
        <rect x="10" y="40" width="7" height="2.5" rx="1.25" fill="white" opacity="0.4" />
        {/* ZBR */}
        <text x="40" y="40" fill="white" fontFamily="Space Grotesk, Arial Black" fontSize="20" fontWeight="800" textAnchor="middle" letterSpacing="-1">ZBR</text>
        {/* lightning accent */}
        <path d="M51 16 L48 22 L51 22 L47.5 28 L52 22 L49.5 22 Z" fill="white" opacity="0.9" />
      </svg>
      {withText && (
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: size * 0.7,
          letterSpacing: "-0.05em",
          color: dark ? "white" : "var(--ink)",
          transform: "skewX(-14deg)",
          transformOrigin: "left center",
          display: "inline-block",
          lineHeight: 1,
        }}>ZBR</span>
      )}
    </div>
  );
}

/* ----------------- DEVICE DETECTION ----------------- */
function useDeviceType() {
  const [device, setDevice] = useState(() => {
    if (typeof navigator === "undefined") return "desktop";
    const ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    if (/Android/i.test(ua)) return "android";
    return "desktop";
  });
  return device;
}

/* ----------------- STORE BADGES ----------------- */
/* The live iOS app. The Android build is still on the way, so Play stays a "soon" badge. */
const APP_STORE_URL = "https://apps.apple.com/uz/app/zbr/id6804237658";

function AppStoreBadge({ recommended, dark }) {
  useLang();
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`store-badge${recommended ? " recommended" : ""}`}
      aria-label={`${t("store.iosSmall")} ${t("store.iosBig")}`}
    >
      <svg width="22" height="26" viewBox="0 0 22 26" fill="white" aria-hidden="true">
        <path d="M16.4 13.7c0-2.7 2.2-4 2.3-4-1.3-1.8-3.2-2.1-3.9-2.1-1.6-.2-3.2.9-4 .9-.8 0-2.2-.9-3.6-.9-1.8 0-3.6 1.1-4.5 2.7-1.9 3.4-.5 8.4 1.4 11.1.9 1.3 2 2.8 3.4 2.8 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.1.9 3.6.9 1.5 0 2.4-1.3 3.4-2.6 1-1.5 1.5-3 1.5-3.1-.1 0-3.2-1.2-3.2-4.8zm-2.6-9c.7-.9 1.2-2.1 1.1-3.4-1 .1-2.3.7-3 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.3-.6 3-1.5z" />
      </svg>
      <div>
        <div className="label-small">{t("store.iosSmall")}</div>
        <div className="label-big">{t("store.iosBig")}</div>
      </div>
    </a>
  );
}

/* Not a link yet — rendered inert so it never reads as a broken download. */
function PlayStoreBadge({ dark }) {
  useLang();
  return (
    <span className="store-badge soon" aria-label={`${t("store.playBig")} — ${t("store.playSmall")}`}>
      <svg width="24" height="26" viewBox="0 0 24 26" aria-hidden="true">
        <defs>
          <linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00A0FF"/>
            <stop offset="1" stopColor="#00C4FE"/>
          </linearGradient>
          <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFCE00"/>
            <stop offset="1" stopColor="#FFE100"/>
          </linearGradient>
          <linearGradient id="pg3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF3A44"/>
            <stop offset="1" stopColor="#C31162"/>
          </linearGradient>
          <linearGradient id="pg4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#32A071"/>
            <stop offset="1" stopColor="#2DA771"/>
          </linearGradient>
        </defs>
        <path d="M2 1.4 C1.6 1.8 1.4 2.4 1.4 3.2 v19.6 c0 .8.2 1.4.6 1.8l11-11.4z" fill="url(#pg1)"/>
        <path d="M16.6 16.6 13 13l-11 11.4c.4.4 1.1.5 1.9.1l12.7-7.2z" fill="url(#pg3)"/>
        <path d="M19.6 11.4 16.6 9.4l-3.6 3.6 3.6 3.6 3-2c1.2-.7 1.2-2.6 0-3.2z" fill="url(#pg2)"/>
        <path d="M3.9 1.5c-.8-.4-1.5-.3-1.9.1l11 11 3.6-3.6L3.9 1.5z" fill="url(#pg4)"/>
      </svg>
      <div>
        <div className="label-small">{t("store.playSmall")}</div>
        <div className="label-big">{t("store.playBig")}</div>
      </div>
    </span>
  );
}

/* Store badges. iOS is the only shippable one, so it always leads. */
function StoreButtons({ stack, dark }) {
  const device = useDeviceType();
  return (
    <div style={{
      display: "flex",
      flexDirection: stack ? "column" : "row",
      gap: 12,
      flexWrap: "wrap"
    }}>
      <AppStoreBadge recommended={device === "ios"} dark={dark} />
      <PlayStoreBadge dark={dark} />
    </div>
  );
}

/* ----------------- LANGUAGE SWITCHER ----------------- */
function LangSwitcher({ dark }) {
  const lang = useLang();
  const langs = [
    { code: "ru", label: "RU" },
    { code: "uz", label: "UZ" },
    { code: "kk", label: "KK" },
  ];
  return (
    <div style={{
      display: "inline-flex",
      gap: 2,
      padding: 3,
      borderRadius: 999,
      background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
    }}>
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-label={l.label}
          style={{
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 999,
            background: lang === l.code ? (dark ? "white" : "var(--ink)") : "transparent",
            color: lang === l.code ? (dark ? "var(--ink)" : "white") : (dark ? "rgba(255,255,255,0.7)" : "var(--ink)"),
            transition: "all 0.2s ease",
          }}>
          {l.label}
        </button>
      ))}
    </div>
  );
}

/* ----------------- NAVIGATION ----------------- */
function Nav({ dark, transparent }) {
  useLang();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("nav.how"), href: "#how" },
    { label: t("nav.restaurants"), href: "#restaurants" },
    { label: t("nav.partners"), href: "#partners" },
    { label: t("nav.couriers"), href: "#couriers" },
  ];

  const bg = transparent && !scrolled
    ? "transparent"
    : (dark ? "rgba(14,14,16,0.85)" : "rgba(255,255,255,0.85)");
  const border = (transparent && !scrolled) ? "transparent" : (dark ? "rgba(255,255,255,0.08)" : "var(--line)");

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: bg,
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: `1px solid ${border}`,
      transition: "all 0.25s ease",
      color: dark ? "white" : "var(--ink)",
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 72,
      }}>
        <ZbrLogo size={36} dark={dark} />
        <div className="nav-links" style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} style={{
              padding: "8px 14px",
              fontSize: 14,
              fontWeight: 500,
              color: dark ? "rgba(255,255,255,0.85)" : "var(--ink-2)",
              borderRadius: 999,
            }}>{l.label}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LangSwitcher dark={dark} />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

/* ----------------- FOOTER ----------------- */
/* Live accounts only. X and YouTube used to render here as badges pointing at
   "#", so they are dropped until there is something real to link to. */
const SOCIALS = [
  { label: "IG", name: "Instagram", href: "https://www.instagram.com/zbr_uz/" },
  { label: "TG", name: "Telegram", href: "https://t.me/furqaty" },
];

function Footer({ dark = true }) {
  useLang();
  const cols = [
    { title: t("footer.c1"), links: t("footer.c1l") || [] },
    { title: t("footer.c2"), links: t("footer.c2l") || [] },
    { title: t("footer.c3"), links: t("footer.c3l") || [] },
    { title: t("footer.c4"), links: t("footer.c4l") || [] },
  ];
  return (
    <footer style={{
      background: dark ? "var(--ink)" : "var(--bg-2)",
      color: dark ? "rgba(255,255,255,0.8)" : "var(--ink)",
      paddingTop: 80,
      paddingBottom: 40,
    }}>
      <div className="container">
        {/* Newsletter */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          paddingBottom: 60,
          borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "var(--line)"}`,
        }} className="footer-top">
          <div>
            <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "0 0 12px", color: dark ? "white" : "var(--ink)" }}>
              {t("footer.newsT")}
            </h3>
            <p style={{ fontSize: 16, opacity: 0.75, maxWidth: 460, margin: 0 }}>
              {t("footer.newsS")}
            </p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed (demo)"); }} style={{
            display: "flex",
            gap: 8,
            alignSelf: "center",
            background: dark ? "rgba(255,255,255,0.06)" : "white",
            padding: 6,
            borderRadius: 999,
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "var(--line)"}`,
          }}>
            <input type="tel" inputMode="tel" autoComplete="tel" placeholder={t("footer.phonePlaceholder")} required style={{
              flex: 1,
              border: "none",
              background: "transparent",
              padding: "12px 16px",
              fontSize: 15,
              color: dark ? "white" : "var(--ink)",
              outline: "none",
              fontFamily: "inherit",
              minWidth: 0,
            }} />
            <button type="submit" className="btn btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
              {t("footer.sub")}
            </button>
          </form>
        </div>

        {/* Link columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr repeat(4, 1fr)",
          gap: 40,
          padding: "60px 0",
        }} className="footer-cols">
          <div>
            <ZbrLogo size={36} dark={dark} />
            <p style={{ fontSize: 14, opacity: 0.6, marginTop: 16, maxWidth: 280 }}>
              {t("footer.tagline")}
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                   aria-label={s.name} style={{
                  width: 36, height: 36, borderRadius: 12,
                  display: "grid", placeItems: "center",
                  background: dark ? "rgba(255,255,255,0.06)" : "white",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
                  color: dark ? "white" : "var(--ink)",
                }}>{s.label}</a>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.55, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>{col.title}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <li key={l}><a href="#" style={{ fontSize: 14, opacity: 0.85 }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div style={{
          paddingTop: 28,
          borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "var(--line)"}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
          fontSize: 13, opacity: 0.6,
        }}>
          <div>{t("footer.copy")}</div>
          <div>{t("footer.made")}</div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr !important; }
          .footer-cols { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

Object.assign(window, {
  ZbrLogo, useDeviceType, AppStoreBadge, PlayStoreBadge, StoreButtons,
  LangSwitcher, Nav, Footer,
});
