import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/Brand";
import { Reveal } from "@/components/Reveal";
import { BRAND, IMAGES } from "@/lib/product";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact D's PANAI | Panangarkandu Orders" },
      {
        name: "description",
        content:
          "Talk to D's PANAI on WhatsApp at +91 96778 92457 for Panangarkandu orders, bulk quantities and delivery questions.",
      },
      { property: "og:title", content: "Contact D's PANAI" },
      {
        property: "og:description",
        content: "WhatsApp us for Panangarkandu orders, bulk quantities and delivery questions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-20 md:px-8 lg:grid-cols-2 lg:items-center">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 font-display text-[clamp(2.25rem,5.5vw,3.75rem)] leading-tight">
          We reply on WhatsApp.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
          Orders, bulk quantities, delivery timelines or a question about the product — send us a
          message and we will get back to you personally.
        </p>

        <div className="mt-10 space-y-3">
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="surface-card flex items-center gap-4 p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
          >
            <WhatsAppIcon className="size-6 text-palm" />
            <div>
              <p className="text-sm font-bold text-forest">{BRAND.whatsappNumber}</p>
              <p className="text-xs text-muted-foreground">WhatsApp — fastest reply</p>
            </div>
          </a>
          <a
            href={`mailto:${BRAND.email}`}
            className="surface-card flex items-center gap-4 p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
          >
            <Mail className="size-6 text-palm" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-bold text-forest">{BRAND.email}</p>
              <p className="text-xs text-muted-foreground">Email us</p>
            </div>
          </a>
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="surface-card flex items-center gap-4 p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
          >
            <MessageCircle className="size-6 text-palm" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-bold text-forest">Instagram {BRAND.instagramHandle}</p>
              <p className="text-xs text-muted-foreground">Follow the journey</p>
            </div>
          </a>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <img
          src={IMAGES.brand}
          alt="D's PANAI Panangarkandu presented in its traditional cloth pouch"
          loading="lazy"
          className="w-full rounded-3xl object-cover shadow-lift"
        />
      </Reveal>
    </div>
  );
}
