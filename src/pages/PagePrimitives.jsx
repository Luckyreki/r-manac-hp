import { motion } from "framer-motion";
import { routeHref } from "../utils/routing.js";

export function PageShell({ children }) {
  return <main className="bg-[var(--color-paper)] text-[var(--color-ink)]">{children}</main>;
}

export function HeroBand({ label, title, body, image, imageClass = "" }) {
  return (
    <section className="relative isolate min-h-[500px] overflow-hidden">
      <img
        src={image}
        alt=""
        className={`absolute right-0 top-0 -z-10 h-full w-[64%] object-cover ${imageClass}`}
      />
      <div className="absolute inset-y-0 right-[28%] -z-10 w-[42%] bg-gradient-to-r from-[var(--color-paper)] via-[var(--color-paper)] to-transparent" />
      <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-10 md:py-36">
        <motion.div
          className="max-w-xl"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {label}
          </p>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">{title}</h1>
          {body && <p className="mt-8 whitespace-pre-line text-xl leading-9 text-[#2a2a2a]">{body}</p>}
          <div className="mt-9 h-1 w-14 bg-[var(--color-accent)]" />
        </motion.div>
      </div>
    </section>
  );
}

export function ButtonLink({ href = "#", children, filled = true, className = "", ...props }) {
  return (
    <a
      href={routeHref(href)}
      {...props}
      className={`inline-flex h-12 items-center justify-center rounded-md px-7 text-sm font-bold transition ${
        filled
          ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]"
          : "border border-[var(--color-accent)] text-[var(--color-accent-dark)] hover:bg-white"
      } ${className}`}
    >
      {children}
    </a>
  );
}

export function SectionHeading({ title, body }) {
  return (
    <div>
      <h2 className="text-4xl font-black leading-tight md:text-5xl">{title}</h2>
      <div className="mt-4 h-1 w-12 bg-[var(--color-accent)]" />
      {body && <p className="mt-7 whitespace-pre-line text-lg leading-8 text-[#2a2a2a]">{body}</p>}
    </div>
  );
}

export const reveal = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45, ease: "easeOut" },
};
