import { createFileRoute, Link } from "@tanstack/react-router";
import { CountUp, Reveal } from "@/components/Reveal";
import { BRAND, IMAGES, PRODUCT } from "@/lib/product";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story | D's PANAI Panangarkandu" },
      {
        name: "description",
        content:
          "D's PANAI is built on a family tradition of selling Panangarkandu that began with our grandfather and continues today at 2,500+ kg a month.",
      },
      { property: "og:title", content: "A family tradition, carried forward — D's PANAI" },
      {
        property: "og:description",
        content: "The story of a Tamil family trade in Panangarkandu, brought to homes across India.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurStory,
});

const TIMELINE = [
  { label: "Then", body: "Grandfather's generation begins trading Panangarkandu." },
  { label: "Over the years", body: "The family trade continues, quietly and consistently." },
  { label: "Today", body: "2,500+ kg of Panangarkandu handled every month." },
  { label: "Next", body: "D's PANAI brings it directly to homes across India." },
];

function OurStory() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={IMAGES.heritage}
          alt=""
          aria-hidden="true"
          className="animate-drift absolute inset-0 size-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-[1240px] px-6 py-24 md:px-8 md:py-32">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.02]">
            A family tradition, carried forward.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-12 px-6 py-20 md:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted-foreground">
            D's PANAI is built on a family tradition of selling Panangarkandu that began with our
            grandfather. What started as a family trade continues today with the same respect for
            the product, while we bring it to a new generation through modern packaging and a
            direct-to-home experience.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            The name joins our founder Divya's initial with{" "}
            <span className="text-gold">Panai</span> — the palmyra palm at the heart of
            everything we sell.
          </p>
          <div className="mt-10">
            <p className="font-display text-6xl text-forest tabular-nums">
              <CountUp to={BRAND.monthlyVolumeKg} suffix="+" />
            </p>
            <p className="eyebrow mt-2">kg of Panangarkandu handled per month</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <img
            src={IMAGES.lifestyle}
            alt="Panangarkandu served in a traditional Tamil home"
            loading="lazy"
            className="w-full rounded-3xl object-cover shadow-soft"
          />
        </Reveal>
      </section>

      <section className="border-y border-border bg-cream/50">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-8">
          <h2 className="font-display text-3xl">How it has moved forward</h2>
          <ol className="mt-10 space-y-2">
            {TIMELINE.map((step, i) => (
              <Reveal as="li" key={step.label} delay={i * 110}>
                <div className="flex gap-6 border-t border-border py-7">
                  <span className="font-display text-2xl text-gold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl">{step.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-20 text-center md:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)]">
            From our family to your home.
          </h2>
          <Link
            to="/product/$slug"
            params={{ slug: PRODUCT.slug }}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-all hover:shadow-lift"
          >
            Shop Panangarkandu
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
