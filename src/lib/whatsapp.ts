import type { CartLine, CustomerDetails } from "./cart";
import { BRAND, PRODUCT, calculatePrice, formatINR, formatWeight } from "./product";

export function buildOrderMessage(lines: CartLine[], details: CustomerDetails): string {
  const productBlock = lines
    .map((l) => {
      const unit = calculatePrice(l.weightGrams);
      return [
        `• ${PRODUCT.name}`,
        `  Weight: ${formatWeight(l.weightGrams)}`,
        `  Quantity: ${l.quantity}`,
        `  Price: ${formatINR(unit * l.quantity)}`,
      ].join("\n");
    })
    .join("\n");

  const subtotal = lines.reduce(
    (sum, l) => sum + calculatePrice(l.weightGrams) * l.quantity,
    0,
  );

  const optional = [
    details.email ? `Email: ${details.email}` : null,
    details.landmark ? `Landmark: ${details.landmark}` : null,
    details.instructions ? `Delivery Instructions: ${details.instructions}` : null,
  ].filter(Boolean);

  return [
    `Hello ${BRAND.name},`,
    "",
    "I would like to place an order.",
    "",
    "PRODUCT",
    `${PRODUCT.name}`,
    `${PRODUCT.tamilName}`,
    "",
    productBlock,
    "",
    "CUSTOMER DETAILS",
    `Name: ${details.fullName}`,
    `Phone: ${details.mobile}`,
    `WhatsApp: ${details.whatsapp || details.mobile}`,
    `Address: ${details.address}`,
    `City: ${details.city}`,
    `State: ${details.state}`,
    `Pincode: ${details.pincode}`,
    ...optional,
    "",
    "ORDER TOTAL",
    `Product Total: ${formatINR(subtotal)}`,
    "Shipping: To be confirmed",
    "",
    "Please confirm availability, shipping charges and final order total.",
    "",
    "Thank you.",
  ].join("\n");
}

export function whatsappUrl(message: string): string {
  return `${BRAND.whatsappLink}?text=${encodeURIComponent(message)}`;
}
