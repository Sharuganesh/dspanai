import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | D's PANAI" },
      {
        name: "description",
        content:
          "How D's PANAI handles the details you enter while placing a Panangarkandu order on WhatsApp.",
      },
      { property: "og:title", content: "Privacy Policy — D's PANAI" },
      { property: "og:description", content: "How we handle your order and contact details." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      intro="We ask for the minimum information needed to deliver your Panangarkandu order."
      sections={[
        {
          heading: "Information you enter",
          body: [
            "The name, phone number and address you type into the order form are stored only in your own browser so you do not have to retype them. They are included in the WhatsApp message that you choose to send us.",
            "We do not run a payment gateway on this website and never ask for card, UPI or bank details on it.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your details to confirm availability, calculate shipping, arrange delivery and reply to your questions on WhatsApp.",
          ],
        },
        {
          heading: "Sharing",
          body: [
            "We share your delivery address with the courier used to ship your order. We do not sell your information or use it for third-party advertising.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You can ask us to delete the order details you shared over WhatsApp at any time by messaging us on the same number.",
          ],
        },
      ]}
    />
  ),
});
