import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BRAND, IMAGES, formatINR, PRODUCT } from "@/lib/product";
import { buildLeadMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Brand";
import { cn } from "@/lib/utils";

const KEY = "dspanai_lead_popup_v1";

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(KEY)) return;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setOpen(true);
      window.localStorage.setItem(KEY, "shown");
    };

    const onScroll = () => {
      const scrolled =
        window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (scrolled > 0.35) show();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const valid = name.trim().length > 1 && phone.replace(/\D/g, "").length >= 10;
  const href = whatsappUrl(
    buildLeadMessage(
      name.trim() || "Customer",
      `Panangarkandu price list · my number is ${phone.trim()}`,
    ),
  );

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center p-4 transition-opacity duration-400 sm:items-center",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Get the Panangarkandu price list on WhatsApp"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
      />
      <div
        className={cn(
          "surface-card relative z-10 w-full max-w-[760px] overflow-hidden p-0 transition-transform duration-500",
          open ? "translate-y-0" : "translate-y-6",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close popup"
          className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-ivory/90 text-forest"
        >
          <X className="size-4" />
        </button>
        <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
          <img
            src={IMAGES.macro}
            alt="Close-up of Panangarkandu palm candy crystals"
            className="hidden h-full w-full object-cover sm:block"
            loading="lazy"
          />
          <div className="p-7">
            <p className="eyebrow">First order offer</p>
            <h2 className="mt-3 font-display text-3xl leading-tight">
              Get our palm candy price list on WhatsApp
            </h2>
            <p className="font-tamil mt-2 text-sm text-warm" lang="ta">
              பனங்கற்கண்டு விலை பட்டியலை வாட்ஸ்அப்பில் பெறுங்கள்
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Share your name and WhatsApp number — we send weights, prices from{" "}
              {formatINR(PRODUCT.basePrice)} / 250 g, and current availability. Shipping across
              India {formatINR(BRAND.shippingIndia)}, worldwide{" "}
              {formatINR(BRAND.shippingInternational)}.
            </p>
            <div className="mt-5 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name / உங்கள் பெயர்"
                className="w-full rounded-xl border border-input bg-ivory px-4 py-3 text-sm outline-none focus:border-gold"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                placeholder="WhatsApp number / வாட்ஸ்அப் எண்"
                className="w-full rounded-xl border border-input bg-ivory px-4 py-3 text-sm outline-none focus:border-gold"
              />
              <a
                href={valid ? href : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!valid}
                onClick={() => valid && setOpen(false)}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-primary-foreground transition-opacity",
                  !valid && "pointer-events-none opacity-40",
                )}
              >
                <WhatsAppIcon className="size-4" />
                Send me the price list
              </a>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              We only use your number to reply about your order. / உங்கள் எண் ஆர்டர்
              தொடர்பாக மட்டுமே பயன்படுகிறது.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
