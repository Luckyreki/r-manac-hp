import { motion } from "framer-motion";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <motion.div
      className={`max-w-2xl ${alignment} ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold leading-tight text-[var(--color-ink)] md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-[var(--color-muted)] md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
