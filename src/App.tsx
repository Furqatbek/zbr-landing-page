import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Home } from "./pages/Home";
import { PitchPage } from "./components/PitchPage";
import { InfoPage } from "./components/InfoPage";
import { RestaurantPage } from "./pages/RestaurantPage";
import { HIDDEN_PATHS, type PageKey } from "./i18n/pages";

/** Footer-linked secondary pages: URL path → copy key in `i18n/pages.ts`. */
const INFO_ROUTES: Record<string, PageKey> = {
  "/privacy": "privacy",
  "/about": "about",
  "/careers": "careers",
  "/press": "press",
  "/blog": "blog",
  "/for-offices": "offices",
  "/restaurant-dashboard": "dashboard",
  "/support": "support",
  "/safety": "safety",
  "/status": "status",
  "/terms": "terms",
  "/cookies": "cookies",
  "/refunds": "refunds",
};

/**
 * On route change: scroll to the hash target (nav section links), retrying a few
 * frames in case the target mounts asynchronously; otherwise scroll to top.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries++ < 10) {
          requestAnimationFrame(tryScroll);
        }
      };
      requestAnimationFrame(tryScroll);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

/**
 * QR codes generated against the original `/r/{slug}` path still work: they
 * redirect to the root-level slug, keeping any `?promo=` on the URL. Cheap
 * insurance against posters that are already printed.
 */
function LegacyQrRedirect() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { search } = useLocation();
  return <Navigate to={`/${slug}${search}`} replace />;
}

export function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner-offer" element={<PitchPage variant="vendor" />} />
        <Route path="/courier-offer" element={<PitchPage variant="courier" />} />
        {Object.entries(INFO_ROUTES)
          .filter(([path]) => !HIDDEN_PATHS.has(path))
          .map(([path, key]) => (
            <Route key={path} path={path} element={<InfoPage page={key} />} />
          ))}
        {/* Not live yet, but still ours: without these the slug route below
            would swallow them, and a future /terms page could be shadowed by
            a venue that happens to be called "terms". */}
        {[...HIDDEN_PATHS].map((path) => (
          <Route key={path} path={path} element={<Navigate to="/" replace />} />
        ))}
        <Route path="/r/:slug" element={<LegacyQrRedirect />} />
        {/* Posters point at the bare slug: app.zbrr.uz/{slug} (or /{id} when a
            code went to print before anyone agreed a slug). This is last on
            purpose — every static path above outranks it in React Router's
            matcher, so the marketing pages keep their URLs. Any top-level path
            listed above is therefore reserved and must not be used as a slug. */}
        <Route path="/:slug" element={<RestaurantPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
