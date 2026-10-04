import { site } from "./site";

export type Zone = "inside" | "outside";

export function shippingFee(zone: Zone, itemCount: number) {
  if (itemCount >= site.delivery.freeShippingMinItems) return 0;
  return zone === "inside" ? site.delivery.insideDhaka : site.delivery.outsideDhaka;
}
