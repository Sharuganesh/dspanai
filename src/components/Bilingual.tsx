import type { ReactNode } from "react";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";

/**
 * The site is English-only. This helper keeps a single text block API:
 * the English line is rendered, secondary-language props are ignored.
 */
export function Bi({
  en,
  as = "div",
  className,
}: {
  en: ReactNode;
  ta?: ReactNode;
  as?: Tag;
  className?: string;
  taClassName?: string;
}) {
  const El = as as "div";
  return <El className={className}>{en}</El>;
}

/** Tamil product name, used sparingly (once, beside the product name). */
export function Ta({ children, className }: { children: ReactNode; className?: string }) {
  return (
  );
}
