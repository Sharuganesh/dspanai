import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/product";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/logo-mark.png";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label={`${BRAND.name} home`} className="inline-flex items-center">
      <img
        src={logoMark}
        alt={`${BRAND.name} — Pure Panangarkandu palm candy`}
        width={594}
        height={805}
        className={cn("h-14 w-auto md:h-[74px]", className)}
      />
    </Link>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.79.96-.97 1.16-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.47.13-.62.15-.15.35-.4.52-.6.13-.15.2-.28.3-.47.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.71 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path
        fillRule="evenodd"
        d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.93L2 22l5.37-1.4a9.83 9.83 0 0 0 4.67 1.19h.01c5.44 0 9.86-4.42 9.86-9.86C21.91 6.42 17.48 2 12.04 2Zm0 17.93a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.05.8.81-2.97-.19-.31a8.05 8.05 0 0 1-1.24-4.29c0-4.52 3.68-8.2 8.2-8.2 4.51 0 8.19 3.68 8.19 8.2s-3.68 8.07-8.3 8.07Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** Traditional kolam-inspired divider used between sections. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
      <svg viewBox="0 0 24 24" className="size-4 text-gold" fill="currentColor">
        <path d="M12 2c1.6 3.2 3.2 4.8 6.4 6.4-3.2 1.6-4.8 3.2-6.4 6.4-1.6-3.2-3.2-4.8-6.4-6.4C8.8 6.8 10.4 5.2 12 2Z" />
        <circle cx="12" cy="19" r="1.6" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}
