import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery | D's PANAI" },
      {
        name: "description",
        content:
          "How D's PANAI packs and ships Panangarkandu orders across India, and how shipping charges are confirmed.",
      },
      { property: "og:title", content: "Shipping & Delivery — D's PANAI" },
      { property: "og:description", content: "How we pack and ship Panangarkandu orders." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Shipping & Delivery"
      intro="We ship Panangarkandu across India. Shipping is confirmed on WhatsApp for every order."
      sections={[
        {
          heading: "Shipping charges",
          body: [
            "Shipping is not calculated automatically on this website. After you send your order on WhatsApp, we confirm the shipping charge for your pincode along with the final total.",
          ],
        },
        {
          heading: "Packing",
          body: [
            "Your Panangarkandu is packed in a plastic-free primary cloth pouch and then placed in protective outer packaging for transit.",
          ],
        },
        {
          heading: "Dispatch and delivery time",
          body: [
            "We confirm dispatch and expected delivery time for your order on WhatsApp. Delivery timelines depend on the courier and your location.",
          ],
        },
        {
          heading: "Tracking",
          body: [
            "Where the courier provides tracking, we share the tracking details with you on WhatsApp.",
          ],
        },
      ]}
    />
  ),
});
