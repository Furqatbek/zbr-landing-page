import { useI18n } from "../i18n";
import { useDeviceType } from "../lib/device";

function AppStoreBadge({ recommended }: { recommended?: boolean }) {
  const { t } = useI18n();
  return (
    <a href="#" className={`store-badge${recommended ? " recommended" : ""}`} aria-label="App Store">
      <svg width="22" height="26" viewBox="0 0 22 26" fill="white" aria-hidden="true">
        <path d="M16.4 13.7c0-2.7 2.2-4 2.3-4-1.3-1.8-3.2-2.1-3.9-2.1-1.6-.2-3.2.9-4 .9-.8 0-2.2-.9-3.6-.9-1.8 0-3.6 1.1-4.5 2.7-1.9 3.4-.5 8.4 1.4 11.1.9 1.3 2 2.8 3.4 2.8 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.1.9 3.6.9 1.5 0 2.4-1.3 3.4-2.6 1-1.5 1.5-3 1.5-3.1-.1 0-3.2-1.2-3.2-4.8zm-2.6-9c.7-.9 1.2-2.1 1.1-3.4-1 .1-2.3.7-3 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.3-.6 3-1.5z" />
      </svg>
      <div>
        <div className="label-small">{t.store.iosSmall}</div>
        <div className="label-big">{t.store.iosBig}</div>
      </div>
    </a>
  );
}

function PlayStoreBadge({ recommended }: { recommended?: boolean }) {
  const { t } = useI18n();
  return (
    <a href="#" className={`store-badge${recommended ? " recommended" : ""}`} aria-label="Google Play">
      <svg width="24" height="26" viewBox="0 0 24 26" aria-hidden="true">
        <defs>
          <linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00A0FF" />
            <stop offset="1" stopColor="#00C4FE" />
          </linearGradient>
          <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFCE00" />
            <stop offset="1" stopColor="#FFE100" />
          </linearGradient>
          <linearGradient id="pg3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id="pg4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#32A071" />
            <stop offset="1" stopColor="#2DA771" />
          </linearGradient>
        </defs>
        <path d="M2 1.4 C1.6 1.8 1.4 2.4 1.4 3.2 v19.6 c0 .8.2 1.4.6 1.8l11-11.4z" fill="url(#pg1)" />
        <path d="M16.6 16.6 13 13l-11 11.4c.4.4 1.1.5 1.9.1l12.7-7.2z" fill="url(#pg3)" />
        <path d="M19.6 11.4 16.6 9.4l-3.6 3.6 3.6 3.6 3-2c1.2-.7 1.2-2.6 0-3.2z" fill="url(#pg2)" />
        <path d="M3.9 1.5c-.8-.4-1.5-.3-1.9.1l11 11 3.6-3.6L3.9 1.5z" fill="url(#pg4)" />
      </svg>
      <div>
        <div className="label-small">{t.store.playSmall}</div>
        <div className="label-big">{t.store.playBig}</div>
      </div>
    </a>
  );
}

/** Store badges, ordered so the visitor's own platform comes first + highlighted. */
export function StoreButtons({ stack = false }: { stack?: boolean }) {
  const device = useDeviceType();
  const iosRecommended = device === "ios";
  const androidRecommended = device === "android";
  const iosFirst = !androidRecommended;
  return (
    <div style={{ display: "flex", flexDirection: stack ? "column" : "row", gap: 12, flexWrap: "wrap" }}>
      {iosFirst ? (
        <>
          <AppStoreBadge recommended={iosRecommended} />
          <PlayStoreBadge recommended={androidRecommended} />
        </>
      ) : (
        <>
          <PlayStoreBadge recommended={androidRecommended} />
          <AppStoreBadge recommended={iosRecommended} />
        </>
      )}
    </div>
  );
}
