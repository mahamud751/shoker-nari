import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findOrder } from "@/lib/orders";
import { getI18n } from "@/lib/locale";
import { OrderDetails } from "@/components/OrderDetails";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.order.metaTitle, robots: { index: false } };
}

export default async function OrderPage(props: PageProps<"/order/[id]">) {
  const { id } = await props.params;
  const { locale, t } = await getI18n();
  const order = await findOrder(id);
  if (!order) notFound();
  return (
    <div className="container section-tight narrow">
      <div className="success-head">
        <span className="success-icon">✓</span>
        <h1>{t.order.thanks(order.customer.name)}</h1>
        <p>{t.order.received(order.customer.phone)}</p>
      </div>
      <OrderDetails order={order} locale={locale} />
      <div className="center-actions">
        <Link href="/shop" className="btn btn-primary">{t.order.shopMore}</Link>
      </div>
    </div>
  );
}
