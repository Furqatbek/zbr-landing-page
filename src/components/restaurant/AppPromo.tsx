import { useEffect, useRef, useState } from "react";
import { fill, useI18n } from "../../i18n";
import { StoreButtons } from "../StoreButtons";

/** How long a visitor has to stay before the poster is worth showing. */
const DELAY_MS = 15_000;

/** Remembers a dismissal so the poster never nags the same visitor twice. */
const STORAGE_KEY = "zbr_promo_seen";

function alreadySeen(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Private mode, blocked site data — treat as unseen and simply don't persist.
    return false;
  }
}

function remember(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* Nothing to do — the poster just may reappear on a later visit. */
  }
}

/**
 * The app poster: after the visitor has spent {@link DELAY_MS} actually looking
 * at the menu, offer the app with free delivery on a first order.
 *
 * Only time with the tab in front counts. Someone who opens the page and
 * switches away has not "stayed", and should not come back to a dialog they
 * never saw appear.
 */
export function AppPromo({ restaurantName }: { restaurantName: string }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (alreadySeen()) return;

    let visibleMs = 0;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") visibleMs += 1000;
      if (visibleMs >= DELAY_MS) {
        window.clearInterval(id);
        setOpen(true);
      }
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  // While it is up it owns the screen: no scrolling behind it, Escape closes it,
  // and focus starts on the close button so it can be dismissed from a keyboard.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
    remember();
  }

  if (!open) return null;

  return (
    <div
      className="promo-backdrop"
      // A click that starts and ends on the backdrop itself, not on the card.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="promo-card on-dark" role="dialog" aria-modal="true" aria-labelledby="promo-title">
        <button ref={closeRef} type="button" className="promo-close" aria-label={t.r.bonusClose} onClick={dismiss}>
          ✕
        </button>

        <span className="promo-badge">{t.r.bonusBadge}</span>

        <h2
          id="promo-title"
          className="display"
          style={{ fontSize: "clamp(24px, 6vw, 30px)", lineHeight: 1.1, margin: "16px 0 10px" }}
        >
          {t.r.bonusTitle}
        </h2>

        <p style={{ opacity: 0.75, fontSize: 15, lineHeight: 1.5, margin: "0 0 24px" }}>
          {fill(t.r.bonusSub, { name: restaurantName })}
        </p>

        <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <StoreButtons />
        </div>

        <div>
          <button type="button" className="promo-later" onClick={dismiss}>
            {t.r.bonusLater}
          </button>
        </div>
      </div>
    </div>
  );
}
