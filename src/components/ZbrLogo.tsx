interface ZbrLogoProps {
  size?: number;
  dark?: boolean;
  withText?: boolean;
}

/** The ZBR mark: a speed-lined tile + hard-italic skewed wordmark (mid-sprint). */
export function ZbrLogo({ size = 32, dark = false, withText = true }: ZbrLogoProps) {
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
        <text
          x="40"
          y="40"
          fill="white"
          fontFamily="Space Grotesk, Arial Black"
          fontSize="20"
          fontWeight="800"
          textAnchor="middle"
          letterSpacing="-1"
        >
          ZBR
        </text>
        {/* lightning accent */}
        <path d="M51 16 L48 22 L51 22 L47.5 28 L52 22 L49.5 22 Z" fill="white" opacity="0.9" />
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
