"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useI18n } from "@/components/LocaleProvider";
import { money, num } from "@/lib/format";
import { isErrorKey } from "@/lib/i18n";
import { shippingFee, type Zone } from "@/lib/shipping";
import { site } from "@/lib/site";

export default function CheckoutPage() {
  const { items, subtotal, count, clear, ready } = useCart();
  const { locale, t } = useI18n();
  const c = t.checkout;
  const router = useRouter();
  const [zone, setZone] = useState<Zone>("inside");
  const [payment, setPayment] = useState("cod");
  const [error, setError] = useState<string | null>(null);
  const fee = (n: number) => (n === 0 ? t.common.free : money(n, locale));
  const [submitting, setSubmitting] = useState(false);

  const shipping = shippingFee(zone, count);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          address: form.get("address"),
          note: form.get("note"),
          zone,
          payment,
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
        }),
      });
      const data: { id?: string; error?: unknown } = await res.json();
      if (!res.ok) throw new Error(isErrorKey(data.error) ? t.errors[data.error] : t.errors.generic);
      clear();
      router.push(`/order/${data.id}`);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : t.errors.generic);
      setSubmitting(false);
    }
  }

  if (!ready) return null;

  if (items.length === 0) {
    return (
      <div className="container section-tight">
        <div className="empty-box">
          <p>{c.empty}</p>
          <Link href="/shop" className="btn btn-primary">{t.common.viewProducts}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-tight">
      <h1 className="page-title">{c.title}</h1>
      <form className="cart-layout" onSubmit={onSubmit}>
        <div className="form-card">
          <h2>{c.deliveryInfo}</h2>
          <label>
            {c.name}
            <input name="name" required minLength={2} autoComplete="name" />
          </label>
          <label>
            {c.phone}
            <input name="phone" required inputMode="tel" placeholder="01XXXXXXXXX" autoComplete="tel" />
          </label>
          <label>
            {c.address}
            <textarea name="address" required minLength={8} rows={3} placeholder={c.addressPlaceholder} />
          </label>
          <fieldset>
            <legend>{c.zone}</legend>
            <label className="radio">
              <input type="radio" checked={zone === "inside"} onChange={() => setZone("inside")} />
              {c.inside} — {money(site.delivery.insideDhaka, locale)}
            </label>
            <label className="radio">
              <input type="radio" checked={zone === "outside"} onChange={() => setZone("outside")} />
              {c.outside} — {money(site.delivery.outsideDhaka, locale)}
            </label>
          </fieldset>
          <fieldset>
            <legend>{c.payment}</legend>
            {(Object.entries(c.methods) as [string, string][]).map(([value, label]) => (
              <label key={value} className="radio">
                <input type="radio" checked={payment === value} onChange={() => setPayment(value)} />
                {label}
              </label>
            ))}
          </fieldset>
          <label>
            {c.note}
            <textarea name="note" rows={2} />
          </label>
        </div>
        <aside className="summary">
          <h2>{c.yourOrder}</h2>
          <ul className="summary-items">
            {items.map(({ product, qty }) => (
              <li key={product.slug}>
                <span>{product.name[locale]} × {num(qty, locale)}</span>
                <span>{money(product.price * qty, locale)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-line"><span>{c.subtotal}</span><span>{money(subtotal, locale)}</span></div>
          <div className="summary-line"><span>{c.shipping}</span><span>{fee(shipping)}</span></div>
          <div className="summary-line summary-total"><span>{c.total}</span><strong>{money(subtotal + shipping, locale)}</strong></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="btn btn-primary btn-block btn-lg" disabled={submitting}>
            {submitting ? c.placing : c.confirm}
          </button>
          <p className="summary-note">{c.afterNote}</p>
        </aside>
      </form>
    </div>
  );
}
