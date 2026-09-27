import { useCallback, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useI18n } from "../i18n";
import { ZbrLogo } from "../components/ZbrLogo";
import { LangSwitcher } from "../components/LangSwitcher";
import { StoreButtons } from "../components/StoreButtons";
import { RestaurantHeader } from "../components/restaurant/RestaurantHeader";
import { MenuList } from "../components/restaurant/MenuList";
import {
  ApiError,
  fetchRestaurant,
  type Coords,
  type RestaurantPayload,
} from "../lib/restaurant";

/**
 * Deliberately slimmer than the marketing `<Nav>`: someone who just scanned a
 * poster wants the menu and the app, not the section links for the home page.
 */
function SlimNav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}
      >
        <Link to="/" aria-label="ZBR">
          <ZbrLogo size={32} />
        </Link>
        <LangSwitcher />
      </div>
    </nav>
  );
}

/**
 * The download block. Installing from here does not carry the venue into the
 * app — the OS drops no deferred deep link — so the printed promo code is what
 * ties the order back to this restaurant, and it gets real estate to match.
 */
function DownloadCta({ promo }: { promo: string | null }) {
  const { t } = useI18n();
  return (
    <section
      style={{
        background: "var(--ink)",
        color: "white",
        borderRadius: "var(--radius-lg)",
        padding: "40px 32px",
        marginTop: 56,
        textAlign: "center",
      }}
    >
      <h2 className="display" style={{ fontSize: "clamp(26px, 4vw, 38px)", margin: "0 0 10px" }}>
        {t.r.downloadTitle}
      </h2>
      <p style={{ opacity: 0.75, margin: "0 auto 28px", maxWidth: 420, fontSize: 16 }}>
        {t.r.downloadSub}
      </p>

      <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <StoreButtons />
      </div>

      <div
        style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          display: "grid",
          gap: 8,
          justifyItems: "center",
        }}
      >
        <div style={{ fontSize: 13, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {t.r.promoTitle}
        </div>
        {promo ? (
          <div
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "10px 22px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.08)",
              border: "1px dashed rgba(255,255,255,0.25)",
            }}
          >
            {promo}
          </div>
        ) : null}
        <p style={{ opacity: 0.7, margin: 0, maxWidth: 380, fontSize: 14 }}>{t.r.promoSub}</p>
      </div>
    </section>
  );
}

/** A poster outlives the venue it points at, so 404 gets a real page. */
function NotFound() {
  const { t } = useI18n();
  return (
    <div style={{ textAlign: "center", padding: "72px 24px 40px" }}>
      <div style={{ fontSize: 44 }}>🧭</div>
      <h1 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: "16px 0 10px" }}>
        {t.r.notFoundTitle}
      </h1>
      <p style={{ color: "var(--muted)", margin: "0 auto 28px", maxWidth: 420, fontSize: 16 }}>
        {t.r.notFoundSub}
      </p>
      <Link to="/" className="btn btn-primary">
        {t.r.findNearby}
      </Link>
    </div>
  );
}

export function RestaurantPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { t, lang } = useI18n();

  const [data, setData] = useState<RestaurantPayload | null>(null);
  const [error, setError] = useState<ApiError | Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState<Coords | undefined>();
  const [locating, setLocating] = useState(false);
  const [locationFailed, setLocationFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetchRestaurant(slug, lang, coords, ac.signal)
      .then((payload) => {
        setData(payload);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (ac.signal.aborted) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });

    return () => ac.abort();
  }, [slug, lang, coords, reloadKey]);

  // The venue name makes a far better tab and share title than the site default.
  useEffect(() => {
    const previous = document.title;
    if (data?.restaurant.name) document.title = `${data.restaurant.name} — ZBR`;
    return () => {
      document.title = previous;
    };
  }, [data?.restaurant.name]);

  /** Opt-in: asking on load would greet a QR scan with a permission prompt. */
  const locate = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationFailed(true);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocationFailed(true);
        setLocating(false);
      },
      { timeout: 10_000 },
    );
  }, []);

  const promo = searchParams.get("promo");

  let body;
  if (loading && !data) {
    body = (
      <div style={{ textAlign: "center", padding: "96px 24px", color: "var(--muted)" }}>
        {t.r.loading}
      </div>
    );
  } else if (error instanceof ApiError && error.notFound) {
    body = <NotFound />;
  } else if (error && !data) {
    body = (
      <div style={{ textAlign: "center", padding: "72px 24px" }}>
        <h1 className="display" style={{ fontSize: "clamp(26px, 4vw, 36px)", margin: "0 0 10px" }}>
          {t.r.errorTitle}
        </h1>
        {/* The envelope's `message` is written to be displayable; a request that
            never got a reply has none, so it gets translated copy instead. */}
        <p style={{ color: "var(--muted)", margin: "0 auto 24px", maxWidth: 420 }}>
          {error instanceof ApiError && error.isNetwork ? t.r.errNetwork : error.message}
        </p>
        <button type="button" className="btn btn-primary" onClick={() => setReloadKey((k) => k + 1)}>
          {t.r.retry}
        </button>
      </div>
    );
  } else if (data) {
    body = (
      <>
        <RestaurantHeader
          restaurant={data.restaurant}
          onLocate={locate}
          locating={locating}
          locationFailed={locationFailed}
        />
        <div className="container" style={{ maxWidth: 820, paddingTop: 44, paddingBottom: 72 }}>
          <MenuList menu={data.menu} />
          <DownloadCta promo={promo} />
        </div>
      </>
    );
  }

  return (
    <div>
      <SlimNav />
      {body}
      {/* The 404 and error pages still deserve the app, so the CTA rides along. */}
      {!data && !loading ? (
        <div className="container" style={{ maxWidth: 820, paddingBottom: 72 }}>
          <DownloadCta promo={promo} />
        </div>
      ) : null}
    </div>
  );
}
