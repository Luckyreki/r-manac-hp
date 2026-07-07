import { motion } from "framer-motion";
import { Button } from "./Button.jsx";

export function PhotoHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  primaryAction,
  secondaryAction,
  className = "",
}) {
  return (
    <section
      id="top"
      className={`relative isolate min-h-[calc(100vh-88px)] overflow-hidden bg-[var(--color-paper)] ${className}`}
    >
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/88 to-white/30" />
      <div className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl items-center px-5 py-20 md:px-8">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {eyebrow && (
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              {eyebrow}
            </p>
          )}
          <h1 className="text-5xl font-black leading-none text-[var(--color-ink)] md:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
              {description}
            </p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryAction && (
                <Button href={primaryAction.href}>{primaryAction.label}</Button>
              )}
              {secondaryAction && (
                <Button href={secondaryAction.href} variant="secondary">
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
