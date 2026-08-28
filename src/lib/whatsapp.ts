import type { CartLine, CustomerDetails } from "./cart";
import { BRAND, IMAGES, PRODUCT, calculatePrice, formatINR, formatWeight } from "./product";

/** Absolute URL of the product photo so WhatsApp shows an image preview in the order message. */
export function productImageUrl(): string {
  // Always the canonical public origin so the URL works inside WhatsApp
  // and stays identical between server render and client hydration.
  return `${BRAND.siteUrl}${IMAGES.product}`;
}

export function buildOrderMessage(lines: CartLine[], details: CustomerDetails): string {
  const productBlock = lines
    .map((l) => {
      const unit = calculatePrice(l.weightGrams);
      return [
        `• ${PRODUCT.name}`,
        `  Weight / எடை: ${formatWeight(l.weightGrams)}`,
        `  Quantity / எண்ணிக்கை: ${l.quantity}`,
        `  Price / விலை: ${formatINR(unit * l.quantity)}`,
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
    productImageUrl(),
    "",
    `Hello ${BRAND.name},`,
    "வணக்கம்!",
    "",
    "I would like to place an order. / நான் ஆர்டர் செய்ய விரும்புகிறேன்.",
    "",
    "PRODUCT / பொருள்",
    `${PRODUCT.name}`,
    `${PRODUCT.tamilName} (Palm Candy)`,
    "",
    productBlock,
    "",
    "CUSTOMER DETAILS / வாடிக்கையாளர் விவரம்",
    `Name / பெயர்: ${details.fullName}`,
    `Phone / தொலைபேசி: ${details.mobile}`,
    `WhatsApp: ${details.whatsapp || details.mobile}`,
    `Address / முகவரி: ${details.address}`,
    `City / ஊர்: ${details.city}`,
    `State / மாநிலம்: ${details.state}`,
    `Pincode / அஞ்சல் குறியீடு: ${details.pincode}`,
    ...optional,
    "",
    "ORDER TOTAL / மொத்தம்",
    `Product Total: ${formatINR(subtotal)}`,
    `Shipping (India): ${formatINR(BRAND.shippingIndia)} · International: ${formatINR(BRAND.shippingInternational)}`,
    "",
    "Please confirm availability and the final order total.",
    "கிடைக்கும் தன்மையையும் இறுதி தொகையையும் உறுதிபடுத்துங்கள்.",
    "",
    "Thank you / நன்றி.",
  ].join("\n");
}

export function whatsappUrl(message: string): string {
  return `${BRAND.whatsappLink}?text=${encodeURIComponent(message)}`;
}

/** Short enquiry message used by lead-capture blocks. */
export function buildLeadMessage(name: string, interest: string): string {
  return [
    productImageUrl(),
    "",
    `Hello ${BRAND.name},`,
    "வணக்கம்!",
    "",
    `My name is ${name}. / என் பெயர் ${name}.`,
    `I am interested in: ${interest}`,
    "",
    "Please send me the Panangarkandu (palm candy) price list and availability.",
    "பனங்கற்கண்டு விலை பட்டியலை அனுப்புங்கள்.",
  ].join("\n");
}
