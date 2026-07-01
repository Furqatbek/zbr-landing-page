import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { ZbrLogo } from "./ZbrLogo";
import { LangSwitcher } from "./LangSwitcher";

interface NavProps {
  dark?: boolean;
  transparent?: boolean;
}

export function Nav({ dark = false, transparent = false }: NavProps) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.how, hash: "#how" },
    { label: t.nav.restaurants, hash: "#restaurants" },
    { label: t.nav.partners, hash: "#partners" },
    { label: t.nav.couriers, hash: "#couriers" },
  ];

  const bg =
    transparent && !scrolled
      ? "transparent"
      : dark
        ? "rgba(14,14,16,0.85)"
        : "rgba(255,255,255,0.85)";
  const border =
    transparent && !scrolled ? "transparent" : dark ? "rgba(255,255,255,0.08)" : "var(--line)";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: bg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${border}`,
        transition: "all 0.25s ease",
        color: dark ? "white" : "var(--ink)",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}
      >
        <Link to="/" aria-label="ZBR — home">
          <ZbrLogo size={36} dark={dark} />
        </Link>
        <div className="nav-links" style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {navLinks.map((l) => (
            <Link
              key={l.hash}
              to={{ pathname: "/", hash: l.hash }}
              style={{
                padding: "8px 14px",
                fontSize: 14,
                fontWeight: 500,
                color: dark ? "rgba(255,255,255,0.85)" : "var(--ink-2)",
                borderRadius: 999,
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LangSwitcher dark={dark} />
        </div>
      </div>
    </nav>
  );
}
