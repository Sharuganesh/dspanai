import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { IMAGES, PRODUCT } from "@/lib/product";

export const Route = createFileRoute("/purity")({
  head: () => ({
    meta: [
      { title: "Purity & Packaging | D's PANAI Panangarkandu" },
      {
        name: "description",
        content:
          "One product, one promise: how D's PANAI selects Panangarkandu and packs it in a plastic-free primary cloth pouch.",
      },
      { property: "og:title", content: "One product. One promise. — D's PANAI" },
      {
        property: "og:description",
        content: "Our approach to sourcing, selection and plastic-free cloth pouch packaging.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Purity,
});

const PILLARS = [
  {
    title: "One product only",
    body: "We specialise in Panangarkandu. We do not stock a wide catalogue, so all of our attention goes into a single traditional product.",
  },
  {
    title: "Family experience",
    body: "Our family has traded this product across generations. That experience is what guides how we buy and select it.",
  },
  {
    title: "Careful selection",
    body: "Every batch is checked before it is packed, so what reaches you is the same quality we would keep for our own home.",
  },
  {
    title: "Traditional cloth pouch",
    body: "Packed in a plastic-free primary cloth pouch with a drawstring, rather than a printed plastic package.",
  },
  {
    title: "Direct ordering",
    body: "You order directly with us on WhatsApp. No marketplace layer, no unclear seller in between.",
  },
  {
    title: "Transparent information",
    body: "We describe exactly what the product is and what it is not. We make no medical or health claims.",
  },
];

function Purity() {
  return (
    <div>
      <section className="mx-auto max-w-[1240px] px-6 pt-20 pb-10 md:px-8">
        <p className="eyebrow">Purity</p>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.02]">
          One product. One promise.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Panangarkandu is a traditional palm sweetener. We keep our claims simple and factual, and
          let the product speak for itself.
        </p>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="surface-card p-7">
              <span className="font-display text-2xl text-gold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-xl">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-10 border-y border-border bg-cream/50">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-20 md:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <img
              src={IMAGES.macro}
              alt="Macro view of naturally formed Panangarkandu crystals"
              loading="lazy"
              className="w-full rounded-3xl object-cover shadow-soft"
            />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-tight">
              What we will never say
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Panangarkandu is a natural sweetener with a long tradition of use in Tamil homes. It
              is not a medicine. We do not describe it as curing anything, as diabetes-safe, as
              zero-calorie or as doctor recommended, and we do not use certification words we have
              not earned.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Our packaging claim is equally precise: it is packed in a plastic-free primary cloth
              pouch. Outer shipping materials may vary by courier.
            </p>
            <Link
              to="/product/$slug"
              params={{ slug: PRODUCT.slug }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase"
            >
              See the product →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
