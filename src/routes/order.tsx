import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { WhatsAppIcon } from "@/components/Brand";
import { EMPTY_DETAILS, useCart, type CustomerDetails } from "@/lib/cart";
import { IMAGES, PRODUCT, calculatePrice, formatINR, formatWeight } from "@/lib/product";
import { buildOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Review & Order on WhatsApp | D's PANAI" },
      {
        name: "description",
        content:
          "Enter your delivery details, review your Panangarkandu order and send it to D's PANAI on WhatsApp for confirmation.",
      },
      { property: "og:title", content: "Order Panangarkandu on WhatsApp — D's PANAI" },
      {
        property: "og:description",
        content: "Review your order and send it to us on WhatsApp. No online payment required.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderPage,
});

const REQUIRED: (keyof CustomerDetails)[] = [
  "fullName",
  "mobile",
  "address",
  "city",
  "state",
  "pincode",
];

type FieldDef = {
  key: keyof CustomerDetails;
  label: string;
  type?: string;
  span?: boolean;
  textarea?: boolean;
  optional?: boolean;
};

const FIELDS: FieldDef[] = [
  { key: "fullName", label: "Full name" },
  { key: "mobile", label: "Mobile number", type: "tel" },
  { key: "whatsapp", label: "WhatsApp number (if different)", type: "tel", optional: true },
  { key: "email", label: "Email", type: "email", optional: true },
  { key: "address", label: "Address", span: true, textarea: true },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "pincode", label: "Pincode", type: "text" },
  { key: "landmark", label: "Landmark", optional: true },
  { key: "instructions", label: "Delivery instructions", span: true, textarea: true, optional: true },
];

function OrderPage() {
  const { lines, subtotal, details, setDetails } = useCart();
  const [step, setStep] = useState<"details" | "review">("details");
  const [confirmed, setConfirmed] = useState(false);
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [opened, setOpened] = useState(false);

  const message = useMemo(() => buildOrderMessage(lines, details), [lines, details]);
  const missing = REQUIRED.filter((k) => !details[k].trim());
  const canContinue = missing.length === 0 && confirmed;

  const update = (key: keyof CustomerDetails, value: string) =>
    setDetails({ ...(details ?? EMPTY_DETAILS), [key]: value });

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:px-8">
        <h1 className="font-display text-3xl">Nothing to order yet</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add a pouch of Panangarkandu and your order details will appear here.
        </p>
        <Link
          to="/product/$slug"
          params={{ slug: PRODUCT.slug }}
          className="mt-8 inline-flex rounded-full bg-forest px-7 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase"
        >
          Shop Panangarkandu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-8 md:py-20">
      <ol className="flex items-center gap-3 text-xs font-semibold tracking-wide uppercase">
        {(["details", "review"] as const).map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-7 place-items-center rounded-full border text-[11px]",
                step === s || (s === "details" && step === "review")
                  ? "border-forest bg-forest text-primary-foreground"
                  : "border-border text-warm",
              )}
            >
              {i + 1}
            </span>
            <span className={step === s ? "text-forest" : "text-warm"}>
              {s === "details" ? "Customer details" : "Review & WhatsApp"}
            </span>
            {i === 0 && <span className="text-border">———</span>}
          </li>
        ))}
      </ol>

      <h1 className="mt-8 font-display text-[clamp(2rem,5vw,3.25rem)]">
        {step === "details" ? "Where should we deliver?" : "Your order"}
      </h1>

      {step === "details" ? (
        <form
          className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start"
          onSubmit={(e) => {
            e.preventDefault();
            setTouched(true);
            if (canContinue) setStep("review");
          }}
        >
          <div className="surface-card grid gap-5 p-6 sm:grid-cols-2">
            {FIELDS.map((f) => {
              const invalid = touched && !f.optional && !details[f.key].trim();
              return (
                <div key={f.key} className={cn(f.span && "sm:col-span-2")}>
                  <label
                    htmlFor={f.key}
                    className="block text-xs font-semibold tracking-wide text-forest"
                  >
                    {f.label}
                    {!f.optional && <span className="text-destructive"> *</span>}
                  </label>
                  {f.textarea ? (
                    <textarea
                      id={f.key}
                      rows={3}
                      value={details[f.key]}
                      onChange={(e) => update(f.key, e.target.value)}
                      className={cn(
                        "mt-2 w-full rounded-lg border bg-card px-3 py-2.5 text-sm",
                        invalid ? "border-destructive" : "border-input",
                      )}
                    />
                  ) : (
                    <input
                      id={f.key}
                      type={f.type ?? "text"}
                      value={details[f.key]}
                      onChange={(e) => update(f.key, e.target.value)}
                      className={cn(
                        "mt-2 w-full rounded-lg border bg-card px-3 py-2.5 text-sm",
                        invalid ? "border-destructive" : "border-input",
                      )}
                    />
                  )}
                  {invalid && (
                    <p className="mt-1 text-xs text-destructive">{f.label} is required.</p>
                  )}
                </div>
              );
            })}

            <label className="flex items-start gap-3 sm:col-span-2">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 size-4 accent-[var(--forest)]"
              />
              <span className="text-sm text-muted-foreground">
                I confirm that the above details are correct.
              </span>
            </label>
          </div>

          <aside className="surface-card p-6 lg:sticky lg:top-28">
            <OrderSummary />
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-forest px-6 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-transform hover:scale-[1.02]"
            >
              Review order
            </button>
            {touched && !canContinue && (
              <p className="mt-3 text-xs text-destructive">
                Please complete the required fields and confirm your details.
              </p>
            )}
          </aside>
        </form>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="space-y-6">
            <div className="surface-card p-6">
              <h2 className="font-display text-xl">Product</h2>
              <ul className="mt-4 space-y-4">
                {lines.map((l) => (
                  <li key={l.lineId} className="flex gap-4">
                    <img
                      src={IMAGES.product}
                      alt={PRODUCT.name}
                      loading="lazy"
                      className="size-20 rounded-lg object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-forest">{PRODUCT.name}</p>
                      <p className="font-tamil text-xs text-warm">{PRODUCT.tamilName}</p>
                      <p className="mt-1 text-muted-foreground">
                        {formatWeight(l.weightGrams)} · Qty {l.quantity}
                      </p>
                      <p className="font-bold text-forest tabular-nums">
                        {formatINR(calculatePrice(l.weightGrams) * l.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href={IMAGES.product}
                download
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-warm uppercase hover:text-forest"
              >
                <Download className="size-3.5" />
                Save product image
              </a>
            </div>

            <div className="surface-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl">Customer</h2>
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-xs font-semibold tracking-wide text-warm uppercase hover:text-forest"
                >
                  Edit details
                </button>
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                {(
                  [
                    ["Name", details.fullName],
                    ["Phone", details.mobile],
                    ["WhatsApp", details.whatsapp || details.mobile],
                    ["Email", details.email],
                    ["Address", details.address],
                    ["City", details.city],
                    ["State", details.state],
                    ["Pincode", details.pincode],
                    ["Landmark", details.landmark],
                    ["Instructions", details.instructions],
                  ] as const
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs tracking-wide text-warm uppercase">{k}</dt>
                      <dd className="text-forest">{v}</dd>
                    </div>
                  ))}
              </dl>
            </div>

            {opened && (
              <div className="rounded-2xl border border-gold/50 bg-cream p-6">
                <p className="flex items-center gap-2 font-display text-lg text-forest">
                  <Check className="size-5 text-palm" /> WhatsApp opened
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your order details have been prepared. Please send the message in WhatsApp to
                  complete your order.
                </p>
                <p className="mt-4 text-sm font-semibold text-forest">Unable to open WhatsApp?</p>
                <p className="text-sm text-muted-foreground">Copy your order message below.</p>
                <pre className="mt-3 max-h-48 overflow-auto rounded-lg border border-border bg-ivory p-4 text-xs whitespace-pre-wrap text-forest">
                  {message}
                </pre>
              </div>
            )}
          </div>

          <aside className="surface-card p-6 lg:sticky lg:top-28">
            <OrderSummary />
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpened(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon className="size-5" />
              Order on WhatsApp
            </a>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(message);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2500);
                } catch {
                  setOpened(true);
                }
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-forest/25 px-6 py-3.5 text-xs font-bold tracking-wide text-forest uppercase hover:bg-cream"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy order details"}
            </button>
            <p className="mt-4 text-xs text-muted-foreground">
              Your details stay in your browser until you send them yourself on WhatsApp. You can
              also attach the product image if needed.
            </p>
          </aside>
        </div>
      )}
    </div>
  );

  function OrderSummary() {
    return (
      <>
        <h2 className="font-display text-xl">Order summary</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Product total</dt>
            <dd className="font-bold tabular-nums text-forest">{formatINR(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="text-right text-xs text-warm">To be confirmed</dd>
          </div>
        </dl>
        <div className="my-5 rule-gold" />
        <div className="flex items-baseline justify-between">
          <span className="eyebrow">Total</span>
          <span className="font-display text-3xl text-forest tabular-nums">
            {formatINR(subtotal)}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">+ applicable shipping</p>
      </>
    );
  }
}
