"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { num } from "@/lib/format";
import { useCart } from "./CartProvider";
import { useI18n } from "./LocaleProvider";

export function BuyBox({ slug, stock }: { slug: string; stock: number }) {
  const { add } = useCart();
  const { locale, t } = useI18n();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const disabled = stock === 0;

  return (
    <div className="buybox">
      <div className="qty" aria-label={t.common.quantity}>
        <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label={t.common.decrease}>−</button>
        <span>{num(qty, locale)}</span>
        <button type="button" onClick={() => setQty((q) => Math.min(stock, q + 1))} aria-label={t.common.increase}>+</button>
      </div>
      <button type="button" className="btn btn-ghost" disabled={disabled} onClick={() => add(slug, qty)}>
        {t.common.addToCart}
      </button>
      <button
        type="button"
        className="btn btn-primary"
        disabled={disabled}
        onClick={() => {
          add(slug, qty);
          router.push("/checkout");
        }}
      >
        {t.product.buyNow}
      </button>
    </div>
  );
}
