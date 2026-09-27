// Client for the public restaurant endpoint behind the QR posters:
//   GET /api/v1/public/r/{slugOrId}
// No auth, no key. Everything is wrapped in the platform envelope, so the
// payload lives under `data` — never read the root.
//
// Two conventions from the API docs drive the types below:
//   * A null field is omitted from the JSON entirely — not `null`, not `""`.
//     So everything optional is `?:` and every read needs optional chaining.
//   * `isCurrentlyOpen` is the flag to read. The API docs say `isOpen` is never
//     sent, but live responses do carry it — it is the owner's switch alone,
//     while `isCurrentlyOpen` also accounts for the clock. So `isOpen` stays out
//     of these types deliberately, to keep it from being reached for by mistake.

import type { Lang } from "../i18n";

/**
 * The API speaks uz | ru | en and defaults to uz. The site also offers
 * Karakalpak, which the API does not serve, so `kk` asks for Uzbek.
 */
const API_LANG: Record<Lang, string> = { ru: "ru", uz: "uz", kk: "uz" };

/**
 * Only `https://app.zbrr.uz` is on the API's CORS allow list, so a browser on
 * any other origin is blocked. In dev, `vite.config.ts` proxies `/api/v1` to
 * the API host to make the request same-origin; in production we call the host
 * directly. Override with `VITE_API_BASE` to point at a staging backend.
 */
const API_BASE =
  import.meta.env.VITE_API_BASE ?? (import.meta.env.DEV ? "" : "https://zbrr.uz");

export interface Cuisine {
  id: number;
  slug?: string;
  name: string;
  imageUrl?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  /** Menu price. Struck through when `onSale`; otherwise equal to effectivePrice. */
  price: number;
  /** What the customer is actually charged — render this one. */
  effectivePrice: number;
  onSale?: boolean;
  discountPercentage?: number;
  imageUrl?: string;
  /** `inStock` AND at least one size available. Use this to grey an item out. */
  orderable?: boolean;
  /** The venue's switch for the dish. Narrower than `orderable` — prefer that. */
  inStock?: boolean;
  prepTimeMinutes?: number;
  vegetarian?: boolean;
  spicy?: boolean;
  /** The venue's ordering within its category. Ties are common (often all 0). */
  sortOrder?: number;
  /** Sizes and add-ons. Empty on every live item today; ignored by this page. */
  variants?: unknown[];
  options?: unknown[];
}

export interface MenuCategory {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  sortOrder?: number;
  items?: MenuItem[];
}

export interface Restaurant {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  /** Ready to display. `addressLine1` / `city` are the same thing in parts. */
  fullAddress?: string;
  addressLine1?: string;
  city?: string;
  phone?: string;
  averageRating?: number;
  totalRatings?: number;
  minimumOrder?: number;
  deliveryFee?: number;
  /** Kitchen time only — does not include delivery. */
  averagePrepTimeMinutes?: number;
  /** Whether it is taking orders right now. The only open flag the API sends. */
  isCurrentlyOpen?: boolean;
  /** Local wall clock, `"09:00:00"`. */
  opensAt?: string;
  closesAt?: string;
  acceptsDelivery?: boolean;
  acceptsTakeaway?: boolean;
  acceptsDineIn?: boolean;
  category?: Cuisine;
  /** Kilometres. Only present when lat/lng were sent. */
  distanceKm?: number;
  etaMinutesMin?: number;
  etaMinutesMax?: number;
  latitude?: number;
  longitude?: number;
}

export interface RestaurantPayload {
  restaurant: Restaurant;
  /** Can be `[]` — a venue with no menu loaded yet is a real state, not an error. */
  menu: MenuCategory[];
}

interface Envelope<T> {
  success: boolean;
  message: string | null;
  timestamp?: string;
  data?: T;
}

export interface Coords {
  lat: number;
  lng: number;
}

/** An API failure carrying the envelope's `message`, which is displayable. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }

  /** A printed poster can outlive the venue, so 404 is a designed-for state. */
  get notFound(): boolean {
    return this.status === 404;
  }

  /**
   * The request never got a reply — offline, DNS, or a CORS rejection. The
   * browser deliberately hides which, so there is no status to report and the
   * page shows a translated message rather than fetch's raw "Failed to fetch".
   */
  get isNetwork(): boolean {
    return this.status === 0;
  }
}

/**
 * Fetches one venue and its menu. `slugOrId` is whatever the poster carries —
 * a slug survives the venue being renamed, a numeric id lets a code go to print
 * before anyone agrees a slug.
 *
 * `coords` are optional: pass them only when the visitor has actually shared a
 * location, and the response gains `distanceKm` and an ETA range.
 */
export async function fetchRestaurant(
  slugOrId: string,
  lang: Lang,
  coords?: Coords,
  signal?: AbortSignal,
): Promise<RestaurantPayload> {
  const query = coords ? `?lat=${coords.lat}&lng=${coords.lng}` : "";
  const url = `${API_BASE}/api/v1/public/r/${encodeURIComponent(slugOrId)}${query}`;

  // No `cache` override: the response carries `max-age=60, public` and a poster
  // gets scanned in bursts, so let the browser and any CDN honour it.
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "Accept-Language": API_LANG[lang] },
      signal,
    });
  } catch (err) {
    // An abort is the caller's own doing, so let it through untouched.
    if (signal?.aborted) throw err;
    throw new ApiError("", 0);
  }

  let body: Envelope<RestaurantPayload> | undefined;
  try {
    body = (await res.json()) as Envelope<RestaurantPayload>;
  } catch {
    /* Non-JSON body (a gateway error page, say) — fall through to the status. */
  }

  // `data.restaurant` is checked, not just `data`: a success envelope carrying an
  // empty object would otherwise reach the page and crash it on the first read.
  // Better a handled error state than a blank screen on a poster.
  if (!res.ok || !body?.success || !body.data?.restaurant) {
    throw new ApiError(body?.message || `Request failed (${res.status})`, res.status);
  }

  return { restaurant: body.data.restaurant, menu: body.data.menu ?? [] };
}

/**
 * Money is a JSON number with decimals (`15000.00`) in decimal so'm — no minor
 * units. Render it grouped and without decimals: `15 000`. The currency word
 * itself is translated, so callers append it.
 */
export function formatMoney(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** `"09:00:00"` → `"09:00"`. Already local wall clock, so no parsing needed. */
export function formatTime(value?: string): string | undefined {
  return value?.slice(0, 5);
}

/** `1.4` → `"1,4"` for the distance chip; one decimal is enough on foot. */
export function formatDistance(km: number): string {
  return km.toFixed(1).replace(".", ",");
}
