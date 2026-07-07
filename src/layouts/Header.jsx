import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { navigationItems } from "../data/navigation.js";
import { routeHref } from "../utils/routing.js";

export function Header({
  logoSrc = "/assets/logo.png",
  logoAlt = "R-MANAC",
  items = navigationItems,
  activePath = "/",
}) {
  const [open, setOpen] = useState(false);
  const isActive = (href) => href === activePath;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-white/92 backdrop-blur">
      <div className="mx-auto flex min-h-[88px] max-w-6xl items-center justify-between px-5 md:min-h-[118px] md:px-8">
        <a href={routeHref("/")} className="flex items-center gap-3" aria-label="Top">
          <img
            src={logoSrc}
            alt={logoAlt}
            className="h-[62px] w-auto md:h-[78px]"
          />
        </a>

        <nav className="hidden items-center justify-end gap-8 md:flex" aria-label="Main">
          {items.map((item) => (
            <a
              key={item.href}
              href={routeHref(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative py-2 text-sm font-semibold tracking-wide transition-colors hover:text-[var(--color-accent-dark)] ${
                isActive(item.href)
                  ? "text-[var(--color-accent)] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[var(--color-accent)]"
                  : "text-[var(--color-ink)]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-line)] text-[var(--color-ink)] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <motion.nav
          className="border-t border-[var(--color-line)] bg-white px-5 py-4 md:hidden"
          aria-label="Mobile"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="mx-auto grid max-w-6xl gap-2">
            {items.map((item) => (
              <a
                key={item.href}
                href={routeHref(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-md px-3 py-3 text-sm font-semibold hover:bg-[var(--color-paper)] hover:text-[var(--color-accent-dark)] ${
                  isActive(item.href)
                    ? "text-[var(--color-accent)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4"
                    : "text-[var(--color-ink)]"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </header>
  );
}
