import { useCallback, useEffect, useRef, useState } from "react";
import { fill, useI18n } from "../../i18n";
import { formatMoney, type MenuCategory, type MenuItem } from "../../lib/restaurant";

function Price({ item }: { item: MenuItem }) {
  const { t } = useI18n();
  // `effectivePrice` is what the customer is actually charged. `price` is the
  // menu price and is only worth showing when it is the higher, struck-through one.
  const discounted = item.onSale && item.price > item.effectivePrice;

  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
      <span style={{ fontWeight: 700, fontSize: 16 }}>
        {formatMoney(item.effectivePrice)} {t.r.currency}
      </span>
      {discounted ? (
        <span style={{ color: "var(--muted)", textDecoration: "line-through", fontSize: 14 }}>
          {formatMoney(item.price)} {t.r.currency}
        </span>
      ) : null}
      {discounted && item.discountPercentage != null ? (
        <span className="pill tag-accent" style={{ fontSize: 11, padding: "3px 8px", fontWeight: 700 }}>
          {fill(t.r.saleBadge, { n: Math.round(item.discountPercentage) })}
        </span>
      ) : null}
    </div>
  );
}

function Item({ item }: { item: MenuItem }) {
  const { t } = useI18n();
  // `orderable` is `inStock` AND a size being available — the stricter of the
  // two, so it is the one that decides whether the row is greyed out.
  const available = item.orderable !== false;

  const tags = [
    item.vegetarian ? t.r.vegetarian : null,
    item.spicy ? t.r.spicy : null,
  ].filter(Boolean) as string[];

  return (
    <li
      style={{
        display: "flex",
        gap: 16,
        padding: "16px 0",
        borderTop: "1px solid var(--line)",
        opacity: available ? 1 : 0.5,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</div>
        {item.description ? (
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 14,
              color: "var(--muted)",
              lineHeight: 1.45,
            }}
          >
            {item.description}
          </p>
        ) : null}

        <div style={{ marginTop: 10 }}>
          <Price item={item} />
        </div>

        {(tags.length > 0 || !available || item.prepTimeMinutes != null) && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
            {!available ? (
              <span className="pill" style={{ fontSize: 11, padding: "3px 8px", fontWeight: 600 }}>
                {t.r.unavailable}
              </span>
            ) : null}
            {item.prepTimeMinutes != null ? (
              <span className="pill" style={{ fontSize: 11, padding: "3px 8px" }}>
                {fill(t.r.minutes, { n: item.prepTimeMinutes })}
              </span>
            ) : null}
            {tags.map((tag) => (
              <span key={tag} className="pill" style={{ fontSize: 11, padding: "3px 8px" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt=""
          loading="lazy"
          width={96}
          height={96}
          style={{ width: 96, height: 96, borderRadius: 14, objectFit: "cover", flexShrink: 0 }}
        />
      ) : null}
    </li>
  );
}

/**
 * Orders categories the way the venue arranged them, falling back to id — the
 * same tiebreak the API applies (`mc.sortOrder, mc.id`).
 *
 * Ties are common: L‘Amoura has two categories at 1 and most items at 0. With
 * no second key the database was free to return a different order per request,
 * so the same menu could reshuffle between page loads. Sorting here keeps the
 * page stable whatever reaches it, including from a cached response.
 */
function sortCategories(rows: MenuCategory[]): MenuCategory[] {
  return [...rows].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.id - b.id);
}

/** Dishes, by the API's own tiebreak (`mi.sortOrder, mi.name`). */
function sortItems(rows: MenuItem[]): MenuItem[] {
  return [...rows].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name),
  );
}

/**
 * Horizontal category rail above the menu. Tapping a chip jumps to that
 * section, and the chip for whatever section you have scrolled to highlights
 * itself and slides into view — so the rail always says where you are.
 *
 * Only worth rendering with something to choose between, so callers check the
 * count first.
 */
function CategoryRail({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState<number | null>(categories[0]?.id ?? null);
  const railRef = useRef<HTMLDivElement>(null);
  const chips = useRef(new Map<number, HTMLButtonElement>());

  // Highlight whichever section sits just below the sticky nav and rail. The
  // bottom margin keeps a section from staying "active" once it has mostly
  // scrolled past.
  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(`cat-${c.id}`))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const topmost = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topmost) setActive(Number(topmost.target.id.slice("cat-".length)));
      },
      { rootMargin: "-140px 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  // Centre the active chip by moving the rail itself. `scrollIntoView` here
  // could scroll the page as well, which would fight the user.
  useEffect(() => {
    if (active === null) return;
    const chip = chips.current.get(active);
    const rail = railRef.current;
    if (!chip || !rail) return;
    const centred = chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, centred), behavior: "smooth" });
  }, [active]);

  const jumpTo = useCallback((id: number) => {
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="cat-bar">
      <div className="cat-rail" ref={railRef}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            ref={(el) => {
              if (el) chips.current.set(cat.id, el);
              else chips.current.delete(cat.id);
            }}
            className={`pill cat-chip${active === cat.id ? " active" : ""}`}
            aria-current={active === cat.id ? "true" : undefined}
            onClick={() => jumpTo(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MenuList({ menu }: { menu: MenuCategory[] }) {
  const { t } = useI18n();

  // An empty menu is a real state — a venue can be live before its dishes are
  // loaded — so it gets a designed answer rather than a blank page.
  if (menu.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "56px 24px",
          background: "var(--bg-2)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div style={{ fontSize: 34 }}>🍳</div>
        <h2 className="display" style={{ fontSize: 24, margin: "12px 0 8px" }}>
          {t.r.menuEmptyTitle}
        </h2>
        <p style={{ color: "var(--muted)", margin: "0 auto", maxWidth: 380, fontSize: 15 }}>
          {t.r.menuEmptySub}
        </p>
      </div>
    );
  }

  const categories = sortCategories(menu);

  return (
    <div>
      {categories.length > 1 ? <CategoryRail categories={categories} /> : null}
      <div style={{ display: "grid", gap: 44, paddingTop: categories.length > 1 ? 32 : 0 }}>
        {categories.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="menu-cat" style={{ padding: 0 }}>
            <h2 className="display" style={{ fontSize: "clamp(22px, 3vw, 30px)", margin: "0 0 4px" }}>
              {cat.name}
            </h2>
            {cat.description ? (
              <p style={{ color: "var(--muted)", margin: "0 0 8px", fontSize: 15 }}>{cat.description}</p>
            ) : null}
            <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0" }}>
              {sortItems(cat.items ?? []).map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
