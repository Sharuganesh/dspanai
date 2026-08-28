import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Cancellation & Refund Policy | D's PANAI" },
      {
        name: "description",
        content:
          "How cancellations, damaged parcels and refunds are handled for D's PANAI Panangarkandu orders.",
      },
      { property: "og:title", content: "Cancellation & Refunds — D's PANAI" },
      { property: "og:description", content: "How cancellations and refunds are handled." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Cancellation & Refund Policy"
      intro="Because every order is confirmed personally on WhatsApp, cancellations and issues are handled directly with us."
      sections={[
        {
          heading: "Cancellation",
          body: [
            "You can cancel your order on WhatsApp any time before it is dispatched. Once a parcel has been handed to the courier, it can no longer be cancelled.",
          ],
        },
        {
          heading: "Damaged or incorrect orders",
          body: [
            "If your parcel arrives damaged, or the weight or item is not what was confirmed, message us on WhatsApp within 48 hours of delivery with photographs of the parcel and pouch.",
          ],
        },
        {
          heading: "Food product limitation",
          body: [
            "As Panangarkandu is a food product, we cannot accept returns of opened pouches for hygiene reasons.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "Where a refund is agreed, it is processed to the same method you used to pay, and the timeline depends on your bank or payment provider.",
          ],
        },
      ]}
    />
  ),
});
