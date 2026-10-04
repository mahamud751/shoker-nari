"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useI18n } from "@/components/LocaleProvider";
import { ProductArt } from "@/components/ProductArt";
import { money, num } from "@/lib/format";
import { site } from "@/lib/site";

export default function CartPage() {
  const { items, subtotal, count, setQty, remove, ready } = useCart();
  const { locale, t } = useI18n();
  const remaining = site.delivery.freeShippingMinItems - count;

  return (
    <div className="container section-tight">
      <h1 className="page-title">{t.cart.title}</h1>
      {!ready ? null : items.length === 0 ? (
        <div className="empty-box">
          <p>{t.cart.empty}</p>
          <Link href="/shop" className="btn btn-primary">{t.cart.start}</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-list">
            {items.map(({ product, qty }) => (
              <li key={product.slug} className="cart-row">
                <ProductArt image={product.image} icon={product.icon} tint={product.tint} label={product.name[locale]} size="sm" />
                <div className="cart-row-info">
                  <Link href={`/product/${product.slug}`}>{product.name[locale]}</Link>
                  <small>{money(product.price, locale)} × {num(qty, locale)}</small>
                  <button className="link-btn" onClick={() => remove(product.slug)}>{t.cart.remove}</button>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(product.slug, qty - 1)} aria-label={t.common.decrease}>−</button>
                  <span>{num(qty, locale)}</span>
                  <button onClick={() => setQty(product.slug, Math.min(product.stock, qty + 1))} aria-label={t.common.increase}>+</button>
                </div>
                <strong className="cart-row-total">{money(product.price * qty, locale)}</strong>
              </li>
            ))}
          </ul>
          <aside className="summary">
            <h2>{t.cart.summary}</h2>
            <div className="summary-line">
              <span>{t.cart.subtotalItems(num(count, locale))}</span>
              <strong>{money(subtotal, locale)}</strong>
            </div>
            <p className="summary-note">
              {remaining > 0 ? t.cart.freeRemaining(num(remaining, locale)) : t.cart.freeDone}
            </p>
            <Link href="/checkout" className="btn btn-primary btn-block">{t.cart.checkout}</Link>
            <Link href="/shop" className="btn btn-ghost btn-block">{t.cart.continue}</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
