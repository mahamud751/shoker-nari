import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { getProduct } from "./data";
import type { ErrorKey, L } from "./i18n";
import { shippingFee, type Zone } from "./shipping";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: { name: string; phone: string; address: string; zone: Zone; note?: string };
  payment: "cod" | "bkash" | "nagad";
  items: { slug: string; name: L; price: number; qty: number }[];
  subtotal: number;
  shipping: number;
  total: number;
};

const FILE = path.join(process.cwd(), "data", "orders.json");

export async function readOrders(): Promise<Order[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeOrders(orders: Order[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(orders, null, 2));
}

export async function findOrder(id: string) {
  return (await readOrders()).find((o) => o.id === id);
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const orders = await readOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return false;
  order.status = status;
  await writeOrders(orders);
  return true;
}

export type OrderInput = {
  name?: unknown;
  phone?: unknown;
  address?: unknown;
  zone?: unknown;
  note?: unknown;
  payment?: unknown;
  items?: unknown;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function createOrder(input: OrderInput): Promise<{ order?: Order; error?: ErrorKey }> {
  const name = str(input.name);
  const phone = str(input.phone).replace(/[\s-]/g, "");
  const address = str(input.address);
  const zone: Zone = input.zone === "inside" ? "inside" : "outside";
  const payment = input.payment === "bkash" || input.payment === "nagad" ? input.payment : "cod";

  if (name.length < 2) return { error: "name" };
  if (!/^(\+?88)?01[3-9]\d{8}$/.test(phone)) return { error: "phone" };
  if (address.length < 8) return { error: "address" };
  if (!Array.isArray(input.items) || input.items.length === 0) return { error: "empty" };

  // Prices always come from the catalog, never from the client.
  const items: Order["items"] = [];
  for (const raw of input.items as { slug?: unknown; qty?: unknown }[]) {
    const product = getProduct(str(raw?.slug));
    const qty = Math.floor(Number(raw?.qty));
    if (!product || !(qty > 0)) return { error: "invalidItem" };
    if (qty > product.stock) return { error: "stock" };
    items.push({ slug: product.slug, name: product.name, price: product.price, qty });
  }

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const shipping = shippingFee(zone, count);
  const order: Order = {
    id: `KJ${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`,
    createdAt: new Date().toISOString(),
    status: "pending",
    customer: { name, phone, address, zone, note: str(input.note) || undefined },
    payment,
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
  };

  const orders = await readOrders();
  orders.unshift(order);
  await writeOrders(orders);
  return { order };
}
