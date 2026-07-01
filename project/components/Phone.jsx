// PhoneMockup — renders real-looking ZBR app UI inside a phone frame.
// Multiple "screens": home, tracking, restaurant.

const { useState: usePhoneState } = React;

function PhoneFrame({ children, scale = 1, style }) {
  return (
    <div className="phone" style={{ transform: `scale(${scale})`, transformOrigin: "center", ...style }}>
      <div className="notch" />
      <div className="screen">{children}</div>
    </div>
  );
}

/* ZBR HOME SCREEN — recreates the look-and-feel from the actual app */
function PhoneHome() {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#FFFFFF",
      display: "flex", flexDirection: "column", overflow: "hidden",
      fontSize: 11,
    }}>
      {/* Status bar */}
      <div style={{
        padding: "14px 22px 6px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 11, fontWeight: 700, marginTop: 8,
      }}>
        <span>9:41</span>
        <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
          <span style={{ width: 16, height: 9, border: "1.5px solid #0E0E10", borderRadius: 2, position: "relative" }}>
            <span style={{ position: "absolute", inset: 1, background: "#0E0E10", width: "75%", borderRadius: 1 }} />
          </span>
        </span>
      </div>

      {/* Header */}
      <div style={{ padding: "10px 18px 12px" }}>
        <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Deliver to</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Amir Temur St, 24 ▾</span>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "0 16px 10px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", background: "#F5F5F2", borderRadius: 14,
          fontSize: 11, color: "#888",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          Search food, restaurants…
        </div>
      </div>

      {/* Categories chips */}
      <div style={{ display: "flex", gap: 6, padding: "4px 16px 12px", overflowX: "hidden" }}>
        {[
          { e: "🍔", l: "Burgers", a: true },
          { e: "🍕", l: "Pizza" },
          { e: "🍣", l: "Sushi" },
          { e: "🥗", l: "Healthy" },
          { e: "🥟", l: "Local" },
        ].map((c, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "8px 10px", borderRadius: 12,
            background: c.a ? "var(--accent)" : "#F5F5F2",
            color: c.a ? "white" : "#0E0E10",
            minWidth: 52, fontWeight: 600, fontSize: 9,
          }}>
            <span style={{ fontSize: 18 }}>{c.e}</span>
            <span>{c.l}</span>
          </div>
        ))}
      </div>

      {/* Featured banner */}
      <div style={{ padding: "0 16px 12px" }}>
        <div style={{
          background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
          borderRadius: 14, padding: "12px 14px",
          color: "white", display: "flex", justifyContent: "space-between", alignItems: "center",
          overflow: "hidden", position: "relative",
        }}>
          <div>
            <div style={{ fontSize: 9, opacity: 0.9, fontWeight: 600 }}>FREE DELIVERY</div>
            <div style={{ fontSize: 14, fontWeight: 800, marginTop: 2, fontFamily: "Space Grotesk" }}>On your first order</div>
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
        {[
          { name: "Plov Center", img: "https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=300&h=200&fit=crop", time: "20–30", rating: "4.8" },
          { name: "Burger House", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop", time: "15–25", rating: "4.7" },
        ].map((r, i) => (
          <div key={i} style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              width: "100%", aspectRatio: "16/10", borderRadius: 12,
              background: `url(${r.img}) center/cover`, position: "relative",
            }}>
              <div style={{
                position: "absolute", top: 6, left: 6,
                background: "white", borderRadius: 999, padding: "2px 6px",
                fontSize: 9, fontWeight: 700,
              }}>★ {r.rating}</div>
            </div>
            <div style={{ marginTop: 6, fontSize: 11, fontWeight: 700 }}>{r.name}</div>
            <div style={{ fontSize: 9, color: "#888" }}>{r.time} min · Free delivery</div>
          </div>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div style={{ marginTop: "auto", borderTop: "1px solid #F0F0EE", padding: "8px 0 18px",
        display: "flex", justifyContent: "space-around" }}>
        {[
          { l: "Home", a: true, i: "🏠" },
          { l: "Orders", i: "🧾" },
          { l: "Cart", i: "🛒" },
          { l: "Profile", i: "👤" },
        ].map((t, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 9,
            color: t.a ? "var(--accent)" : "#999", fontWeight: 600 }}>
            <div style={{ fontSize: 16 }}>{t.i}</div>
            {t.l}
          </div>
        ))}
      </div>
    </div>
  );
}

/* TRACKING SCREEN */
function PhoneTracking() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#FFFFFF", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* status bar */}
      <div style={{ padding: "14px 22px 6px", display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, marginTop: 8 }}>
        <span>9:41</span>
        <span style={{ width: 16, height: 9, border: "1.5px solid #0E0E10", borderRadius: 2, position: "relative" }}>
          <span style={{ position: "absolute", inset: 1, background: "#0E0E10", width: "75%", borderRadius: 1 }} />
        </span>
      </div>

      {/* Map */}
      <div style={{
        flex: 1,
        background: `
          radial-gradient(circle at 60% 40%, #FFE3CC 0%, transparent 35%),
          linear-gradient(180deg, #EAF2E8 0%, #DDE8DD 100%)
        `,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* roads */}
        <svg viewBox="0 0 280 380" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <path d="M-20 280 Q60 240 130 220 T 320 100" stroke="white" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M-20 280 Q60 240 130 220 T 320 100" stroke="#F5F5F2" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M40 -10 Q70 100 90 160 T 160 380" stroke="white" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M40 -10 Q70 100 90 160 T 160 380" stroke="#F5F5F2" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* dotted route */}
          <path d="M 200 100 Q 150 180 130 220" stroke="var(--accent)" strokeWidth="3" fill="none" strokeDasharray="2 5" strokeLinecap="round" />

          {/* destination */}
          <circle cx="130" cy="220" r="9" fill="var(--accent)" />
          <circle cx="130" cy="220" r="4" fill="white" />

          {/* courier marker (animated pulse) */}
          <circle cx="200" cy="100" r="14" fill="var(--accent)" opacity="0.2">
            <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="200" cy="100" r="11" fill="white" />
          <circle cx="200" cy="100" r="8" fill="var(--ink)" />
          <text x="200" y="103" fill="white" fontSize="10" textAnchor="middle">🛵</text>
        </svg>
      </div>

      {/* Bottom card */}
      <div style={{
        background: "white",
        borderTopLeftRadius: 18, borderTopRightRadius: 18,
        padding: "14px 16px 18px",
        marginTop: -10, position: "relative", zIndex: 2,
        boxShadow: "0 -8px 24px -8px rgba(0,0,0,0.12)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 9, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Arriving in</div>
            <div className="display" style={{ fontSize: 28, fontWeight: 700 }}>8 min</div>
          </div>
          <span style={{
            background: "color-mix(in oklch, var(--accent) 15%, transparent)",
            color: "var(--accent)", fontSize: 9, fontWeight: 700,
            padding: "4px 8px", borderRadius: 999,
          }}>ON THE WAY</span>
        </div>

        {/* progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
          {[true, true, true, false].map((done, i, arr) => (
            <React.Fragment key={i}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: done ? "var(--accent)" : "#E5E5E0",
              }} />
              {i < arr.length - 1 && (
                <div style={{ flex: 1, height: 2, background: done ? "var(--accent)" : "#E5E5E0" }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Courier */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 0", borderTop: "1px solid #F0F0EE",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "url(https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face) center/cover",
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700 }}>Otabek K.</div>
            <div style={{ fontSize: 9, color: "#888" }}>Your courier · ★ 4.9</div>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--accent)", display: "grid", placeItems: "center",
          }}>📞</div>
        </div>
      </div>
    </div>
  );
}

/* RESTAURANT/ORDER SCREEN */
function PhoneRestaurant() {
  return (
    <div style={{ width: "100%", height: "100%", background: "white", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* hero image */}
      <div style={{
        height: "32%",
        background: "url(https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop) center/cover",
        position: "relative",
      }}>
        <div style={{ position: "absolute", top: 50, left: 14, width: 32, height: 32, borderRadius: "50%", background: "white", display: "grid", placeItems: "center", fontSize: 14 }}>←</div>
      </div>

      {/* Restaurant info */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0EE" }}>
        <div className="display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Plov Center</div>
        <div style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>Uzbek · Local · ★ 4.8 (2.3k)</div>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 999, background: "color-mix(in oklch, var(--accent) 15%, transparent)", color: "var(--accent)", fontWeight: 600 }}>20-30 min</span>
          <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 999, background: "#F0F8F0", color: "var(--green)", fontWeight: 600 }}>Free delivery</span>
        </div>
      </div>

      {/* menu items */}
      <div style={{ flex: 1, overflow: "hidden", padding: "10px 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8, fontFamily: "Space Grotesk" }}>Popular</div>
        {[
          { n: "Beef Plov", p: "45,000", img: "https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=120&h=120&fit=crop" },
          { n: "Lagman Soup", p: "38,000", img: "https://images.unsplash.com/photo-1547928576-b822bc410bdf?w=120&h=120&fit=crop" },
          { n: "Samsa", p: "12,000", img: "https://images.unsplash.com/photo-1601314002592-b8734bca6604?w=120&h=120&fit=crop" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid #F5F5F2" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>{item.n}</div>
              <div style={{ fontSize: 9, color: "#888", marginTop: 2 }}>Authentic, family recipe</div>
              <div style={{ fontSize: 10, fontWeight: 700, marginTop: 4 }}>{item.p} UZS</div>
            </div>
            <div style={{
              width: 56, height: 56, borderRadius: 10,
              background: `url(${item.img}) center/cover`, position: "relative",
            }}>
              <div style={{
                position: "absolute", bottom: -6, right: -6,
                width: 22, height: 22, borderRadius: "50%",
                background: "var(--accent)", color: "white",
                fontSize: 14, fontWeight: 700, display: "grid", placeItems: "center",
                boxShadow: "0 4px 8px rgba(255,107,0,0.4)",
              }}>+</div>
            </div>
          </div>
        ))}
      </div>

      {/* sticky cart */}
      <div style={{ padding: "10px 16px 18px" }}>
        <div style={{
          background: "var(--ink)", color: "white",
          borderRadius: 14, padding: "10px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: 11, fontWeight: 700,
        }}>
          <span>2 items in cart</span>
          <span>View cart · 95,000 UZS</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PhoneFrame, PhoneHome, PhoneTracking, PhoneRestaurant });
