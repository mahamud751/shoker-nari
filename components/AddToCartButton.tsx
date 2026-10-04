"use client";

import { useCart } from "./CartProvider";
import { useI18n } from "./LocaleProvider";

export function AddToCartButton({ slug, disabled, compact }: { slug: string; disabled?: boolean; compact?: boolean }) {
  const { add } = useCart();
  const { t } = useI18n();
  return (
    <button
      type="button"
      className={compact ? "btn btn-cart" : "btn btn-primary"}
      disabled={disabled}
      onClick={() => add(slug)}
    >
      {disabled ? t.common.outOfStock : t.common.addToCart}
    </button>
  );
}
