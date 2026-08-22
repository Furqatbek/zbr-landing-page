import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Privacy } from "./pages/Privacy";
import { PitchPage } from "./components/PitchPage";
import { InfoPage } from "./components/InfoPage";
import type { PageKey } from "./i18n/pages";

/** Footer-linked secondary pages: URL path → copy key in `i18n/pages.ts`. */
const INFO_ROUTES: Record<string, PageKey> = {
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

export function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner-offer" element={<PitchPage variant="vendor" />} />
        <Route path="/courier-offer" element={<PitchPage variant="courier" />} />
        <Route path="/privacy" element={<Privacy />} />
        {Object.entries(INFO_ROUTES).map(([path, key]) => (
          <Route key={path} path={path} element={<InfoPage page={key} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
