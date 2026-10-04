"use server";

import { revalidatePath } from "next/cache";
import { updateOrderStatus, type OrderStatus } from "@/lib/orders";

const STATUSES: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export async function setStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;
  if (!id || !STATUSES.includes(status)) return;
  await updateOrderStatus(id, status);
  revalidatePath("/admin/orders");
}
