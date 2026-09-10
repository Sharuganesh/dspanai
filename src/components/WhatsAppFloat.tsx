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
      className="wa-float group fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full border-2 border-gold/70 bg-forest text-primary-foreground shadow-lift transition-transform duration-300 hover:scale-110 md:right-6 md:bottom-6 md:size-16"
    >
      <span className="grid size-10 place-items-center rounded-full bg-gold text-forest transition-transform duration-300 group-hover:rotate-6 md:size-11">
        <WhatsAppIcon className="size-6 md:size-7" />
      </span>
    </a>
  );
}
