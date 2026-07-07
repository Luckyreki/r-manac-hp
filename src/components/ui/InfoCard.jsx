import { motion } from "framer-motion";

export function InfoCard({
  eyebrow,
  title,
  children,
  image,
  action,
  className = "",
}) {
  return (
    <motion.article
      className={`overflow-hidden rounded-lg border border-[var(--color-line)] bg-white shadow-[var(--shadow-soft)] ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="h-56 w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="p-6">
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {eyebrow}
          </p>
        )}
        {title && (
          <h3 className="text-xl font-bold text-[var(--color-ink)]">{title}</h3>
        )}
        {children && (
          <div className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            {children}
          </div>
        )}
        {action && <div className="mt-5">{action}</div>}
      </div>
    </motion.article>
  );
}
