import { BRAND } from "@/lib/product";
import { buildLeadMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Brand";

export function WhatsAppFloat() {
  const href = whatsappUrl(buildLeadMessage("Customer", "Panangarkandu (palm candy) enquiry"));
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with ${BRAND.name} on WhatsApp`}
      className="wa-float group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-forest py-3 pr-4 pl-3 text-primary-foreground shadow-lift transition-transform duration-300 hover:scale-105 md:right-6 md:bottom-6"
    >
      <span className="grid size-8 place-items-center rounded-full bg-gold/90 text-forest">
        <WhatsAppIcon className="size-5" />
      </span>
      <span className="hidden text-left text-xs leading-tight font-bold sm:block">
        Order on WhatsApp
      </span>
    </a>
  );
}
