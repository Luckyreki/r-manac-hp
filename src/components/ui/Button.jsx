import { motion } from "framer-motion";
import { routeHref } from "../../utils/routing.js";

const variants = {
  primary:
    "bg-[var(--color-accent)] text-white border-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] hover:border-[var(--color-accent-dark)]",
  secondary:
    "bg-white text-[var(--color-ink)] border-[var(--color-line)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-dark)]",
  ghost:
    "bg-transparent text-[var(--color-ink)] border-transparent hover:text-[var(--color-accent-dark)]",
};

export function Button({
  as = "a",
  children,
  className = "",
  variant = "primary",
  href,
  ...props
}) {
  const MotionComponent = as === "button" ? motion.button : motion.a;

  return (
    <MotionComponent
      type={as === "button" ? "button" : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${variants[variant]} ${className}`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      href={href ? routeHref(href) : undefined}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
