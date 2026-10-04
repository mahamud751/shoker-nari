import type { Order } from "@/lib/orders";
import { dictionaries, type Locale } from "@/lib/i18n";
import { money, num } from "@/lib/format";

export function OrderDetails({ order, locale }: { order: Order; locale: Locale }) {
  const t = dictionaries[locale];
  return (
    <div className="summary">
      <div className="summary-line"><span>{t.order.number}</span><strong>{order.id}</strong></div>
      <div className="summary-line">
        <span>{t.order.status}</span>
        <span className={`status status-${order.status}`}>{t.order.statuses[order.status]}</span>
      </div>
      <ul className="summary-items">
        {order.items.map((i) => (
          <li key={i.slug}>
            <span>{i.name[locale]} × {num(i.qty, locale)}</span>
            <span>{money(i.price * i.qty, locale)}</span>
          </li>
        ))}
      </ul>
      <div className="summary-line">
        <span>{t.checkout.shipping}</span>
        <span>{order.shipping === 0 ? t.common.free : money(order.shipping, locale)}</span>
      </div>
      <div className="summary-line summary-total">
        <span>{t.checkout.total}</span>
        <strong>{money(order.total, locale)}</strong>
      </div>
    </div>
  );
}
