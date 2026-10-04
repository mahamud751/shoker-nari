import type { Locale } from "./i18n";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function num(value: number | string, locale: Locale): string {
  const s = String(value);
  return locale === "bn" ? s.replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : s;
}

export function money(amount: number, locale: Locale): string {
  return `৳${num(amount.toLocaleString("en-IN"), locale)}`;
}

export function discountPercent(price: number, compareAt?: number): number {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
