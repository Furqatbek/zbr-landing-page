import { fill, plural, useI18n } from "../../i18n";
import { formatDistance, formatMoney, formatTime, type Restaurant } from "../../lib/restaurant";

/** One labelled figure in the strip under the venue name. */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{value}</div>
    </div>
  );
}

interface Props {
  restaurant: Restaurant;
  /** Rendered only when the visitor has actually shared a location. */
  onLocate: () => void;
  locating: boolean;
  locationFailed: boolean;
}

export function RestaurantHeader({ restaurant: r, onLocate, locating, locationFailed }: Props) {
  const { t, lang } = useI18n();

  const closes = formatTime(r.closesAt);
  const opens = formatTime(r.opensAt);
  // `isCurrentlyOpen` is the only open flag the API sends — it already folds in
  // both the owner's switch and the clock, so never derive this from the hours.
  const openLabel = r.isCurrentlyOpen
    ? closes
      ? fill(t.r.openUntil, { time: closes })
      : t.r.open
    : opens
      ? fill(t.r.closedOpensAt, { time: opens })
      : t.r.closed;

  const services = [
    r.acceptsDelivery ? t.r.delivery : null,
    r.acceptsTakeaway ? t.r.takeaway : null,
    r.acceptsDineIn ? t.r.dineIn : null,
  ].filter(Boolean) as string[];

  return (
    <header>
      {/* Cover — falls back to the brand gradient when the venue has no image. */}
      <div
        style={{
          height: 220,
          background: r.coverImageUrl
            ? `center / cover no-repeat url("${r.coverImageUrl}")`
            : "linear-gradient(120deg, var(--accent) 0%, var(--accent-2) 100%)",
        }}
      />

      <div className="container" style={{ maxWidth: 820 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end", marginTop: r.logoUrl ? -44 : 16 }}>
          {r.logoUrl ? (
            <img
              src={r.logoUrl}
              alt=""
              width={88}
              height={88}
              style={{
                width: 88,
                height: 88,
                borderRadius: 22,
                objectFit: "cover",
                border: "4px solid var(--bg)",
                background: "var(--bg)",
                boxShadow: "var(--shadow-md)",
              }}
            />
          ) : null}
          <span
            className={`pill${r.isCurrentlyOpen ? " r-open" : ""}`}
            style={{ marginBottom: 8, fontWeight: 600 }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: r.isCurrentlyOpen ? "var(--green)" : "var(--muted)",
              }}
            />
            {openLabel}
          </span>
        </div>

        <h1
          className="display"
          style={{ fontSize: "clamp(30px, 5vw, 46px)", letterSpacing: "-0.03em", margin: "18px 0 8px" }}
        >
          {r.name}
        </h1>

        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            flexWrap: "wrap",
            color: "var(--muted)",
            fontSize: 15,
          }}
        >
          {r.category?.name ? <span>{r.category.name}</span> : null}
          {r.averageRating != null ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--ink)" }}>
              <span style={{ color: "var(--accent)" }}>★</span>
              <strong>{r.averageRating.toFixed(1)}</strong>
              {r.totalRatings != null ? (
                <span style={{ color: "var(--muted)", fontWeight: 400 }}>
                  {fill(plural(lang, r.totalRatings, t.r.ratingsCount), { n: r.totalRatings })}
                </span>
              ) : null}
            </span>
          ) : null}
          {r.distanceKm != null ? (
            <span>{fill(t.r.distanceAway, { km: formatDistance(r.distanceKm) })}</span>
          ) : null}
          {r.etaMinutesMin != null && r.etaMinutesMax != null ? (
            <span>{fill(t.r.etaRange, { min: r.etaMinutesMin, max: r.etaMinutesMax })}</span>
          ) : null}
        </div>

        {r.description ? (
          <p style={{ fontSize: 16, lineHeight: 1.5, color: "var(--ink-2)", margin: "16px 0 0", maxWidth: 620 }}>
            {r.description}
          </p>
        ) : null}

        {services.length > 0 ? (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
            {services.map((s) => (
              <span key={s} className="pill">
                {s}
              </span>
            ))}
          </div>
        ) : null}

        {/* Distance is opt-in: a QR scan should not open with a location prompt. */}
        {r.distanceKm == null ? (
          <div style={{ marginTop: 16 }}>
            {locationFailed ? (
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{t.r.locationFailed}</span>
            ) : (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onLocate}
                disabled={locating}
                style={{ fontSize: 14, padding: "8px 16px", border: "1px solid var(--line)" }}
              >
                {locating ? t.r.locating : t.r.showDistance}
              </button>
            )}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            gap: 28,
            flexWrap: "wrap",
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid var(--line)",
          }}
        >
          {r.minimumOrder != null ? (
            <Stat label={t.r.minOrder} value={`${formatMoney(r.minimumOrder)} ${t.r.currency}`} />
          ) : null}
          {r.deliveryFee != null ? (
            <Stat
              label={t.r.deliveryFee}
              value={
                r.deliveryFee === 0
                  ? t.r.freeDelivery
                  : `${formatMoney(r.deliveryFee)} ${t.r.currency}`
              }
            />
          ) : null}
          {/* Kitchen time only — it does not include delivery, so it is labelled
              as prep rather than presented as an arrival estimate. */}
          {r.averagePrepTimeMinutes != null ? (
            <Stat label={t.r.prepLabel} value={fill(t.r.minutes, { n: r.averagePrepTimeMinutes })} />
          ) : null}
        </div>

        {(r.fullAddress || r.phone) && (
          <div style={{ marginTop: 18, fontSize: 15, color: "var(--ink-2)", display: "grid", gap: 6 }}>
            {r.fullAddress ? <div>{r.fullAddress}</div> : null}
            {r.phone ? (
              <a href={`tel:${r.phone.replace(/\s/g, "")}`} style={{ fontWeight: 600 }}>
                {r.phone}
              </a>
            ) : null}
          </div>
        )}
      </div>
    </header>
  );
}
