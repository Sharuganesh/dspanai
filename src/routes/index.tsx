import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf, Package, Scale, Sparkles } from "lucide-react";
import { Hero3D } from "@/components/hero/Hero3D";
import { Reveal, CountUp } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/Brand";
import { QuantitySelector } from "@/components/QuantitySelector";
import { BRAND, IMAGES, PRODUCT, calculatePrice, formatINR, formatWeight } from "@/lib/product";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D's PANAI | Pure Panangarkandu | பனங்கற்கண்டு" },
      {
        name: "description",
        content:
          "D's PANAI brings traditional Pure Panangarkandu (Palm Candy) from a family tradition to your home, packed in a simple traditional cloth pouch. Shop Panangarkandu online.",
      },
      { property: "og:title", content: "D's PANAI — Pure Panangarkandu" },
      {
        property: "og:description",
        content: "A traditional Tamil sweetness, carried forward through generations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: BRAND.name,
          description: "Traditional Pure Panangarkandu (palm candy) from a Tamil family trade.",
          telephone: BRAND.whatsappNumber,
        }),
      },
    ],
  }),
  component: Home,
});

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-cream)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-0">
        <Hero3D />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto grid max-w-[1240px] items-center gap-10 px-6 pt-14 pb-20 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-28">
        <div className="pointer-events-auto">
          <p
            className="eyebrow font-tamil animate-rise"
            style={{ animationDelay: "80ms" }}
          >
            பனங்கற்கண்டு • Pure Palm Candy
          </p>
          <h1
            className="animate-rise mt-5 font-display text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.98]"
            style={{ animationDelay: "180ms" }}
          >
            A timeless sweetness,
            <br />
            <span className="italic text-palm">carried forward.</span>
          </h1>
          <p
            className="animate-rise mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            Pure Panangarkandu from a family tradition passed down through generations — now
            packed in a simple, traditional cloth pouch and brought to your home.
          </p>
          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "420ms" }}
          >
            <Link
              to="/product/$slug"
              params={{ slug: PRODUCT.slug }}
              className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-all duration-300 hover:shadow-lift"
            >
              Shop Panangarkandu
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/our-story"
              className="inline-flex items-center gap-2 rounded-full border border-forest/25 px-7 py-4 text-sm font-bold tracking-wide text-forest uppercase transition-colors duration-300 hover:border-gold hover:bg-cream"
            >
              Our Story
            </Link>
          </div>
          <p
            className="animate-rise mt-6 text-xs tracking-[0.16em] text-warm uppercase"
            style={{ animationDelay: "540ms" }}
          >
            Drag the crystals · 250 g from {formatINR(PRODUCT.basePrice)}
          </p>
        </div>

        <div className="pointer-events-none relative">
          <div
            className="relative mx-auto max-w-[560px] transition-all duration-[1400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "scale(1)" : "scale(0.96)",
            }}
          >
            <img
              src={IMAGES.hero}
              alt="D's PANAI Panangarkandu cloth pouch beside palm candy crystals on a wooden table"
              width={1376}
              height={768}
              className="w-full rounded-3xl object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 -left-4 rounded-2xl border border-gold/40 bg-ivory/90 px-5 py-3 shadow-soft backdrop-blur md:-left-10">
              <p className="eyebrow">Starting at</p>
              <p className="font-display text-2xl text-forest">
                {formatINR(PRODUCT.basePrice)}{" "}
                <span className="text-sm text-warm">/ 250 g</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  { icon: Leaf, title: "Family Tradition", body: "From our grandfather's generation" },
  { icon: Sparkles, title: "Pure Panangarkandu", body: "Our focus is one traditional product" },
  { icon: Package, title: "Plastic-Free Pouch", body: "Packed in a traditional cloth pouch" },
  { icon: Scale, title: "2,500+ kg / month", body: "Established family supply" },
];

function TrustStrip() {
  return (
    <section className="border-y border-border bg-cream/50">
      <div className="mx-auto grid max-w-[1240px] gap-4 px-6 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        {TRUST.map((item, i) => (
          <Reveal key={item.title} delay={i * 90} className="surface-card p-6">
            <item.icon className="size-6 text-palm" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeaturedProduct() {
  const { addLine } = useCart();
  const [weight, setWeight] = useState(PRODUCT.baseWeightGrams);
  const [qty, setQty] = useState(1);

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-20 md:px-8 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">The product</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-tight">
          One pouch. One tradition.
        </h2>
      </Reveal>

      <Reveal delay={120} className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <img
            src={IMAGES.product}
            alt="D's PANAI Pure Panangarkandu in its signature cloth pouch"
            width={1024}
            height={1024}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
          />
          <span className="absolute top-5 left-5 rounded-full bg-ivory/90 px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-forest uppercase backdrop-blur">
            Signature cloth pouch
          </span>
        </div>

        <div>
          <h3 className="font-display text-3xl md:text-4xl">{PRODUCT.name}</h3>
          <p className="font-tamil mt-1 text-lg text-warm">{PRODUCT.tamilName}</p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {PRODUCT.description}
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
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-all duration-300 hover:shadow-lift"
            >
              Add to cart
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <Link
              to="/product/$slug"
              params={{ slug: PRODUCT.slug }}
              className="inline-flex items-center justify-center rounded-full border border-forest/25 px-7 py-4 text-sm font-bold tracking-wide text-forest uppercase transition-colors hover:border-gold hover:bg-cream"
            >
              View details
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PackagingStory() {
  return (
    <section className="relative overflow-hidden bg-forest text-primary-foreground">
      <img
        src={IMAGES.pouch}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="animate-drift absolute inset-0 size-full object-cover opacity-25"
      />
      <div className="relative mx-auto max-w-[1240px] px-6 py-24 md:px-8 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold">Why a cloth pouch?</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-tight text-primary-foreground">
            A little closer to the way things were carried before plastic.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            Our packaging takes inspiration from traditional ways of storing and carrying everyday
            goods — using a simple cloth pouch instead of making the package the focus.
          </p>
          <Link
            to="/purity"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-4 text-sm font-bold tracking-wide text-gold uppercase transition-colors hover:bg-gold/10"
          >
            Our purity promise →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function HeritageScale() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-20 md:px-8 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <img
            src={IMAGES.heritage}
            alt="A multigenerational Tamil family continuing a traditional palm candy trade"
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full rounded-3xl object-cover shadow-soft"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Our scale today</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-tight">
            A family trade, still running.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            D's PANAI is not a new brand pretending to be traditional. It is a modern
            consumer-facing brand built on an existing family trade — the same product our
            grandfather sold, brought directly to your home.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6">
            <div>
              <p className="font-display text-5xl text-forest tabular-nums">
                <CountUp to={BRAND.monthlyVolumeKg} suffix="+" />
              </p>
              <p className="eyebrow mt-2">kg handled per month</p>
            </div>
            <div>
              <p className="font-display text-5xl text-forest">01</p>
              <p className="eyebrow mt-2">Product we specialise in</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PriceLadder() {
  const { addLine } = useCart();
  return (
    <section className="border-y border-border bg-cream/50">
      <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Simple, honest pricing</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.75rem)]">
              {formatWeight(PRODUCT.baseWeightGrams)} = {formatINR(PRODUCT.basePrice)}
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Order any quantity from 250 g upwards in 50 g steps. Shipping is confirmed on WhatsApp
            before you pay.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[250, 500, 1000, 2000].map((w, i) => (
            <Reveal key={w} delay={i * 80}>
              <div className="surface-card group flex items-center justify-between p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div>
                  <p className="font-display text-2xl text-forest">{formatWeight(w)}</p>
                  <p className="mt-1 text-sm font-semibold text-gold">
                    {formatINR(calculatePrice(w))}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addLine(w, 1)}
                  aria-label={`Add ${formatWeight(w)} pouch to cart`}
                  className="grid size-10 place-items-center rounded-full border border-forest/20 text-forest transition-colors group-hover:border-forest group-hover:bg-forest group-hover:text-primary-foreground"
                >
                  +
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  const shots = [IMAGES.macro, IMAGES.lifestyle, IMAGES.collection, IMAGES.brand];
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-20 md:px-8">
      <Reveal className="text-center">
        <p className="eyebrow">Follow the journey</p>
        <h2 className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.75rem)]">
          Inside the tradition
        </h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {shots.map((src, i) => (
          <Reveal key={src} delay={i * 80}>
            <div className="group overflow-hidden rounded-2xl border border-border">
              <img
                src={src}
                alt="D's PANAI Panangarkandu"
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href={BRAND.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-forest/25 px-7 py-4 text-sm font-bold tracking-wide text-forest uppercase transition-colors hover:border-gold hover:bg-cream"
        >
          Follow {BRAND.instagramHandle}
        </a>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-8 md:px-8">
      <Reveal className="surface-card mx-auto max-w-3xl p-10 text-center">
        <h2 className="font-display text-3xl">Your experience matters.</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          We are collecting our first verified customer reviews. Ordered from us? Share your
          experience on WhatsApp and we will feature it here.
        </p>
        <a
          href={BRAND.whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          <WhatsAppIcon className="size-4" />
          Share your experience
        </a>
      </Reveal>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedProduct />
      <PackagingStory />
      <HeritageScale />
      <PriceLadder />
      <InstagramSection />
      <ReviewsSection />
    </>
  );
}
