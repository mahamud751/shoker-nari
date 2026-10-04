import type { Metadata } from "next";
import { readOrders } from "@/lib/orders";
import { money, num } from "@/lib/format";
import { getI18n } from "@/lib/locale";
import { setStatus } from "./actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminOrders() {
  const { locale, t } = await getI18n();
  const a = t.admin;
  const orders = await readOrders();
  const revenue = orders.filter((o) => o.status !== "cancelled").reduce((n, o) => n + o.total, 0);

  return (
    <div className="container section-tight">
      <h1 className="page-title">{a.title}</h1>
      <div className="admin-stats">
        <div><small>{a.totalOrders}</small><strong>{num(orders.length, locale)}</strong></div>
        <div><small>{a.pending}</small><strong>{num(orders.filter((o) => o.status === "pending").length, locale)}</strong></div>
        <div><small>{a.revenue}</small><strong>{money(revenue, locale)}</strong></div>
      </div>
      {orders.length === 0 ? (
        <p className="empty">{a.none}</p>
      ) : (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>{a.cols.order}</th><th>{a.cols.customer}</th><th>{a.cols.items}</th><th>{a.cols.total}</th><th>{a.cols.status}</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <strong>{o.id}</strong>
                    <br />
                    <small>{new Date(o.createdAt).toLocaleString(locale === "bn" ? "bn-BD" : "en-GB")}</small>
                  </td>
                  <td>
                    {o.customer.name}
                    <br />
                    <a href={`tel:${o.customer.phone}`}>{o.customer.phone}</a>
                    <br />
                    <small>{o.customer.address} ({o.customer.zone === "inside" ? a.dhaka : a.outsideDhaka})</small>
                    {o.customer.note && <><br /><small>{a.note}: {o.customer.note}</small></>}
                  </td>
                  <td>
                    {o.items.map((i) => (
                      <div key={i.slug}><small>{i.name[locale]} × {num(i.qty, locale)}</small></div>
                    ))}
                  </td>
                  <td>{money(o.total, locale)}<br /><small>{o.payment.toUpperCase()}</small></td>
                  <td>
                    <form action={setStatus} className="status-form">
                      <input type="hidden" name="id" value={o.id} />
                      <select name="status" defaultValue={o.status}>
                        {Object.entries(t.order.statuses).map(([k, v]) => (
                          <option key={k} value={k}>{v}</option>
                        ))}
                      </select>
                      <button className="btn btn-cart">{a.save}</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
