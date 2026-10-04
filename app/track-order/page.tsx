import type { Metadata } from "next";
import { findOrder } from "@/lib/orders";
import { getI18n } from "@/lib/locale";
import { OrderDetails } from "@/components/OrderDetails";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.track.title };
}

export default async function TrackOrderPage(props: PageProps<"/track-order">) {
  const { id, phone } = await props.searchParams;
  const { locale, t } = await getI18n();
  const orderId = typeof id === "string" ? id.trim().toUpperCase() : "";
  const phoneNo = typeof phone === "string" ? phone.replace(/[\s-]/g, "") : "";
  const order = orderId && phoneNo ? await findOrder(orderId) : undefined;
  const match = order && order.customer.phone.endsWith(phoneNo.slice(-10)) ? order : undefined;

  return (
    <div className="container section-tight narrow">
      <h1 className="page-title">{t.track.title}</h1>
      <form className="form-card track-form">
        <label>
          {t.track.number}
          <input name="id" defaultValue={orderId} required placeholder="KJ…" />
        </label>
        <label>
          {t.track.phone}
          <input name="phone" defaultValue={phoneNo} required inputMode="tel" />
        </label>
        <button className="btn btn-primary">{t.track.find}</button>
      </form>
      {orderId &&
        phoneNo &&
        (match ? <OrderDetails order={match} locale={locale} /> : <p className="form-error">{t.track.notFound}</p>)}
    </div>
  );
}
