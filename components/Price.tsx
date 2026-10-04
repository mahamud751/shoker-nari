import type { Locale } from "@/lib/i18n";
import { dictionaries } from "@/lib/i18n";
import { money } from "@/lib/format";

type Props = { price: number; compareAt?: number; from?: boolean; locale: Locale };

export function Price({ price, compareAt, from, locale }: Props) {
  return (
    <div className="price">
      {from && <small className="price-from">{dictionaries[locale].common.from}</small>}
      <strong>{money(price, locale)}</strong>
      {compareAt && compareAt > price && <del>{money(compareAt, locale)}</del>}
    </div>
  );
}
