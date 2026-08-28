import { BRAND } from "@/lib/product";

export type LegalSection = { heading: string; body: string[] };

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="mx-auto max-w-[820px] px-6 py-16 md:px-8 md:py-24">
      <p className="eyebrow">{BRAND.name}</p>
      <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-tight">{title}</h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">{intro}</p>
      <div className="mt-4 rounded-xl border border-gold/40 bg-cream/60 px-4 py-3">
        <p className="text-xs text-warm">
          This is placeholder policy copy prepared for review. Please confirm and edit it before
          launch.
        </p>
      </div>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-2xl">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
      <p className="mt-12 text-xs text-muted-foreground">
        Questions about this policy? WhatsApp us at {BRAND.whatsappNumber}.
      </p>
    </div>
  );
}
