import { navigationItems } from "../data/navigation.js";
import { routeHref } from "../utils/routing.js";

export function Footer({
  logoSrc = "/assets/logo.png",
  logoAlt = "R-MANAC",
  items = navigationItems,
  copyright = `© ${new Date().getFullYear()} R-MANAC`,
  dark = true,
}) {
  const tone = dark
    ? {
        footer: "border-white/10 bg-[var(--color-footer)] text-white",
        text: "text-white/68",
        link: "text-white/72 hover:text-[var(--color-accent)]",
      }
    : {
        footer: "border-[var(--color-line)] bg-white text-[var(--color-ink)]",
        text: "text-[var(--color-muted)]",
        link: "text-[var(--color-muted)] hover:text-[var(--color-accent-dark)]",
      };

  return (
    <footer className={`border-t ${tone.footer}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt={logoAlt}
            className={`h-12 w-auto ${dark ? "invert" : ""}`}
          />
          <p className={`text-sm ${tone.text}`}>{copyright}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
          {items.map((item) => (
            <a
              key={item.href}
              href={routeHref(item.href)}
              className={`text-sm font-semibold transition-colors ${tone.link}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
