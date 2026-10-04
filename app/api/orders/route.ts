import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "badRequest" }, { status: 400 });
  }
  const { order, error } = await createOrder((body ?? {}) as Record<string, unknown>);
  if (!order) return NextResponse.json({ error }, { status: 422 });
  return NextResponse.json({ id: order.id, total: order.total }, { status: 201 });
}
