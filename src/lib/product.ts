import heroAsset from "@/assets/hero.png.asset.json";
import productAsset from "@/assets/product.png.asset.json";
import macroAsset from "@/assets/macro.png.asset.json";
import lifestyleAsset from "@/assets/lifestyle.png.asset.json";
import heritageAsset from "@/assets/heritage.png.asset.json";
import pouchAsset from "@/assets/pouch-detail.png.asset.json";
import brandAsset from "@/assets/brand.png.asset.json";
import collectionAsset from "@/assets/collection.png.asset.json";
import logoAsset from "@/assets/logo.png.asset.json";

export const IMAGES = {
  logo: logoAsset.url,
  hero: heroAsset.url,
  product: productAsset.url,
  macro: macroAsset.url,
  lifestyle: lifestyleAsset.url,
  heritage: heritageAsset.url,
  pouch: pouchAsset.url,
  brand: brandAsset.url,
  collection: collectionAsset.url,
};

export const BRAND = {
  name: "D's PANAI",
  tamilName: "D's பனை",
  whatsappNumber: "+91 96778 92457",
  whatsappLink: "https://wa.me/919677892457",
  instagramHandle: "@dspanai",
  instagramUrl: "https://instagram.com/",
  email: "hello@dspanai.com",
  monthlyVolumeKg: 2500,
};

export const PRODUCT = {
  id: "panangarkandu",
  slug: "panangarkandu",
  name: "D's PANAI Pure Panangarkandu",
  shortName: "Pure Panangarkandu",
  tamilName: "பனங்கற்கண்டு",
  category: "Palm Candy",
  basePrice: 300,
  baseWeightGrams: 250,
  minWeightGrams: 250,
  maxWeightGrams: 20000,
  weightIncrementGrams: 50,
  currency: "INR",
  description:
    "Traditional palm candy with naturally formed crystals, packed in our signature cloth pouch.",
  longDescription:
    "Traditional palm candy, carefully selected and packed in a natural cloth pouch inspired by the way traditional goods were carried and stored.",
  quickWeights: [250, 500, 750, 1000, 2000, 5000],
  allWeights: [250, 500, 750, 1000, 1250, 1500, 2000, 2500, 3000, 5000, 10000],
  gallery: [
    { src: IMAGES.hero, alt: "D's PANAI Panangarkandu cloth pouch on a wooden surface" },
    { src: IMAGES.product, alt: "Close-up of the D's PANAI Panangarkandu cloth pouch" },
    { src: IMAGES.macro, alt: "Macro photograph of Panangarkandu palm candy crystals" },
    { src: IMAGES.pouch, alt: "Detail of the traditional woven cloth pouch and drawstring" },
    { src: IMAGES.lifestyle, alt: "Panangarkandu served with traditional filter coffee" },
    { src: IMAGES.collection, alt: "The D's PANAI Panangarkandu pouch range" },
  ],
};

export function calculatePrice(weightGrams: number): number {
  return Math.round((weightGrams / PRODUCT.baseWeightGrams) * PRODUCT.basePrice);
}

export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    return `${Number.isInteger(kg) ? kg : kg.toFixed(2).replace(/0$/, "")} kg`;
  }
  return `${grams} g`;
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
