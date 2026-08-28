import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";

/**
 * Bilingual block: English line on top, Tamil line directly under it.
 * Used site-wide so Tamil readers can follow every English line.
 */
export function Bi({
  en,
  ta,
  as = "div",
  className,
  taClassName,
}: {
  en: ReactNode;
  ta: ReactNode;
  as?: Tag;
  className?: string;
  taClassName?: string;
}) {
  const El = as as "div";
  return (
    <div>
      <El className={className}>{en}</El>
      <p className={cn("font-tamil mt-1.5 text-warm", taClassName)} lang="ta">
        {ta}
      </p>
    </div>
  );
}

export function Ta({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-tamil text-warm", className)} lang="ta">
      {children}
    </span>
  );
}
