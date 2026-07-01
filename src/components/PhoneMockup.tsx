import type { CSSProperties, ReactNode } from "react";

export function PhoneFrame({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="phone" style={style}>
      <div className="notch" />
      <div className="screen">{children}</div>
    </div>
  );
}

/** The ZBR app home screen, recreated to look like the real product UI. */
export function PhoneHome() {
  const categories = [
    { e: "🍔", l: "Burgers", a: true },
    { e: "🍕", l: "Pizza" },
    { e: "🍣", l: "Sushi" },
    { e: "🥗", l: "Healthy" },
    { e: "🥟", l: "Local" },
  ];
  const featured = [
    {
      name: "Plov Center",
      img: "https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=300&h=200&fit=crop",
      time: "20–30",
      rating: "4.8",
    },
    {
      name: "Burger House",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      time: "15–25",
      rating: "4.7",
    },
  ];
  const tabs = [
    { l: "Home", a: true, i: "🏠" },
    { l: "Orders", i: "🧾" },
    { l: "Cart", i: "🛒" },
    { l: "Profile", i: "👤" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontSize: 11,
      }}
    >
      {/* Status bar */}
      <div
        style={{
          padding: "14px 22px 6px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11,
          fontWeight: 700,
          marginTop: 8,
        }}
      >
        <span>9:41</span>
        <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
          <span
            style={{
              width: 16,
              height: 9,
              border: "1.5px solid #0E0E10",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <span style={{ position: "absolute", inset: 1, background: "#0E0E10", width: "75%", borderRadius: 1 }} />
          </span>
        </span>
      </div>

      {/* Header */}
      <div style={{ padding: "10px 18px 12px" }}>
        <div
          style={{
            fontSize: 9,
            color: "#888",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 600,
          }}
        >
          Deliver to
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Amir Temur St, 24 ▾</span>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "0 16px 10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            background: "#F5F5F2",
            borderRadius: 14,
            fontSize: 11,
            color: "#888",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Search food, restaurants…
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: "flex", gap: 6, padding: "4px 16px 12px", overflowX: "hidden" }}>
        {categories.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "8px 10px",
              borderRadius: 12,
              background: c.a ? "var(--accent)" : "#F5F5F2",
              color: c.a ? "white" : "#0E0E10",
              minWidth: 52,
              fontWeight: 600,
              fontSize: 9,
            }}
          >
            <span style={{ fontSize: 18 }}>{c.e}</span>
            <span>{c.l}</span>
          </div>
        ))}
      </div>

      {/* Featured banner */}
      <div style={{ padding: "0 16px 12px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
            borderRadius: 14,
            padding: "12px 14px",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div>
            <div style={{ fontSize: 9, opacity: 0.9, fontWeight: 600 }}>FREE DELIVERY</div>
            <div style={{ fontSize: 14, fontWeight: 800, marginTop: 2, fontFamily: "Space Grotesk" }}>
              On your first order
            </div>
            <div style={{ fontSize: 9, opacity: 0.95, marginTop: 2 }}>Use code: ZBRFAST</div>
          </div>
          <div style={{ fontSize: 28 }}>⚡</div>
        </div>
      </div>

      {/* Featured restaurants */}
      <div style={{ padding: "4px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "Space Grotesk" }}>Featured</span>
        <span style={{ fontSize: 10, color: "var(--accent)", fontWeight: 600 }}>See all</span>
      </div>

      <div style={{ display: "flex", gap: 10, padding: "0 16px", overflow: "hidden" }}>
        {featured.map((r, i) => (
          <div key={i} style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "16/10",
                borderRadius: 12,
                background: `url(${r.img}) center/cover`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  background: "white",
                  borderRadius: 999,
                  padding: "2px 6px",
                  fontSize: 9,
                  fontWeight: 700,
                }}
              >
                ★ {r.rating}
              </div>
            </div>
            <div style={{ marginTop: 6, fontSize: 11, fontWeight: 700 }}>{r.name}</div>
            <div style={{ fontSize: 9, color: "#888" }}>{r.time} min · Free delivery</div>
          </div>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div
        style={{
          marginTop: "auto",
          borderTop: "1px solid #F0F0EE",
          padding: "8px 0 18px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {tabs.map((tab, i) => (
          <div
            key={i}
            style={{ textAlign: "center", fontSize: 9, color: tab.a ? "var(--accent)" : "#999", fontWeight: 600 }}
          >
            <div style={{ fontSize: 16 }}>{tab.i}</div>
            {tab.l}
          </div>
        ))}
      </div>
    </div>
  );
}
