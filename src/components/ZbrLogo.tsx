interface ZbrLogoProps {
  size?: number;
  dark?: boolean;
  withText?: boolean;
}

/** The ZBR mark: an orange tile with a white speed-cut "Z" (top bar, blade, bottom bar). */
export function ZbrLogo({ size = 32, dark = false, withText = true }: ZbrLogoProps) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 512 512" role="img" aria-label="ZBR">
        <rect width="512" height="512" rx="44" fill="var(--accent)" />
        {/* top bar */}
        <polygon points="120,108 452,138 452,180 120,150" fill="#fff" />
        {/* diagonal blade (top-right → bottom-left) */}
        <polygon points="452,208 452,246 150,350 150,312" fill="#fff" />
        {/* bottom bar */}
        <polygon points="92,332 400,360 400,402 92,374" fill="#fff" />
      </svg>
      {withText && (
        <span
          style={{
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
          }}
        >
          ZBR
        </span>
      )}
    </div>
  );
}
