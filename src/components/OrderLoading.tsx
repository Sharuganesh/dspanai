import { LoaderCircle } from "lucide-react";

export function OrderLoading({ label }: { label: string }) {
  return (
    <div className="order-loading" role="status" aria-live="polite">
      <div className="order-loading__orbit" aria-hidden="true">
        <span className="order-loading__leaf order-loading__leaf--one" />
        <span className="order-loading__leaf order-loading__leaf--two" />
        <span className="order-loading__candy">✦</span>
      </div>
      <LoaderCircle className="mt-4 size-4 animate-spin text-gold" aria-hidden="true" />
      <p className="mt-2 text-sm font-semibold text-forest">{label}</p>
      <p className="mt-1 text-xs text-warm">A little sweetness is on its way</p>
    </div>
  );
}
