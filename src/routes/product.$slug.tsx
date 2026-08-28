import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/Brand";
import { QuantitySelector } from "@/components/QuantitySelector";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/lib/cart";
import { BRAND, PRODUCT, calculatePrice, formatINR, formatWeight } from "@/lib/product";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    if (params.slug !== PRODUCT.slug) throw notFound();
    return null;
  },
  head: () => ({
    meta: [
      { title: "Pure Panangarkandu | D's PANAI" },
      {
        name: "description",
        content:
          "Shop D's PANAI Pure Panangarkandu (Palm Candy) in a traditional cloth pouch. Starting at 250g for ₹300.",
      },
      { property: "og:title", content: "Pure Panangarkandu — D's PANAI" },
      {
        property: "og:description",
        content:
          "Traditional palm candy with naturally formed crystals, packed in our signature cloth pouch.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: PRODUCT.name,
          category: PRODUCT.category,
          brand: { "@type": "Brand", name: BRAND.name },
          description: PRODUCT.description,
          offers: {
            "@type": "Offer",
            price: PRODUCT.basePrice,
            priceCurrency: PRODUCT.currency,
            availability: "https://schema.org/InStock",
          },
        }),
      },
    ],
  }),
  component: ProductPage,
});

const DETAIL_SECTIONS = [
  {
    title: "What is Panangarkandu?",
    body: "Panangarkandu, or palm candy, is made from the sap of the palmyra palm. The sap is collected, cooked down and left to form solid crystals. It is a traditional sweetener used across Tamil homes, valued for its distinct caramel-like taste.",
  },
  {
    title: "Our packaging",
    body: "Each order is packed in a plastic-free primary cloth pouch with a drawstring, inspired by the way traditional goods were carried and stored. The pouch keeps the focus on the product rather than on the package.",
  },
  {
    title: "Our tradition",
    body: "Our family has sold Panangarkandu since our grandfather's generation. D's PANAI brings that same product to homes across India with modern packaging and direct ordering.",
  },
  {
    title: "How to use",
    body: "Use it the way it has always been used — in traditional beverages, with milk, in coffee and tea, or in cooking where a natural palm sweetness works well.",
  },
];

function ProductPage() {
  const { addLine } = useCart();
  const [weight, setWeight] = useState(PRODUCT.baseWeightGrams);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const gallery = PRODUCT.gallery;
  const current = gallery[active]!;

  return (
    <div className="pb-28 md:pb-16">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1240px] px-6 pt-8 md:px-8">
        <ol className="flex gap-2 text-xs text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-forest">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/shop" className="hover:text-forest">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-forest">Pure Panangarkandu</li>
        </ol>
      </nav>

      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-10 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="min-w-0">
          <div
            onClick={() => setZoom((v) => !v)}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
          >
            <img
              src={current.src}
              alt={current.alt}
              className={cn(
                "aspect-square w-full cursor-zoom-in object-cover transition-transform duration-[900ms]",
                zoom && "scale-150 cursor-zoom-out",
              )}
            />
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {gallery.map((img, i) => (
              <button
                key={img.src + i}
                type="button"
                onClick={() => {
                  setActive(i);
                  setZoom(false);
                }}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "size-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                  i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <img src={img.src} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-tight">
            {PRODUCT.name}
          </h1>
          <p className="font-tamil mt-2 text-xl text-warm">{PRODUCT.tamilName}</p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {PRODUCT.longDescription}
          </p>

          <div className="my-8 rule-gold" />

          <QuantitySelector
            weightGrams={weight}
            onWeightChange={setWeight}
            quantity={qty}
            onQuantityChange={setQty}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addLine(weight, qty)}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-all hover:shadow-lift"
            >
              Add to cart
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/25 px-6 py-4 text-sm font-bold tracking-wide text-forest uppercase transition-colors hover:border-gold hover:bg-cream"
            >
              <WhatsAppIcon className="size-4" />
              Ask us
            </a>
          </div>

          <dl className="mt-10 divide-y divide-border border-y border-border">
            {DETAIL_SECTIONS.map((s) => (
              <div key={s.title} className="py-5">
                <dt className="font-display text-xl">{s.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        <Reveal className="surface-card p-8 text-center">
          <h2 className="font-display text-2xl">Need a bulk quantity?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We handle {BRAND.monthlyVolumeKg.toLocaleString("en-IN")}+ kg every month. Message us
            for larger orders and we will confirm availability.
          </p>
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-primary-foreground"
          >
            <WhatsAppIcon className="size-4" />
            Talk to us on WhatsApp
          </a>
        </Reveal>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-ivory/95 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <p className="text-[11px] font-semibold text-warm">
              {formatWeight(weight)} × {qty}
            </p>
            <p className="font-display text-xl leading-none text-forest tabular-nums">
              {formatINR(calculatePrice(weight) * qty)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => addLine(weight, qty)}
            className="flex-1 rounded-full bg-forest px-5 py-3.5 text-sm font-bold tracking-wide text-primary-foreground uppercase"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
