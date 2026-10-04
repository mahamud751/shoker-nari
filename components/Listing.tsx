import Link from "next/link";
import { sortProducts, type Product, type SortKey } from "@/lib/data";
import { dictionaries, type Locale } from "@/lib/i18n";
import { num } from "@/lib/format";
import { ProductGrid } from "./ProductCard";

const SORT_KEYS: SortKey[] = ["new", "price-asc", "price-desc", "discount"];

type Props = {
  locale: Locale;
  title: string;
  subtitle?: string;
  crumbs: { href?: string; label: string }[];
  products: Product[];
  sort?: string;
  basePath: string;
  extraQuery?: Record<string, string>;
};

export function Listing({ locale, title, subtitle, crumbs, products, sort, basePath, extraQuery = {} }: Props) {
  const t = dictionaries[locale];
  const active = SORT_KEYS.find((k) => k === sort) ?? "new";
  const sorted = sortProducts(products, active);
  return (
    <>
      <div className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="breadcrumb">
            <Link href="/">{t.common.home}</Link>
            {crumbs.map((c) => (
              <span key={c.label}>
                {" / "}
                {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
              </span>
            ))}
          </nav>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <div className="container section-tight">
        <div className="toolbar">
          <span>{t.common.products(num(sorted.length, locale))}</span>
          <div className="sorts">
            {SORT_KEYS.map((key) => (
              <Link
                key={key}
                href={{ pathname: basePath, query: { ...extraQuery, sort: key } }}
                className={key === active ? "chip chip-active" : "chip"}
                scroll={false}
              >
                {t.listing.sorts[key]}
              </Link>
            ))}
          </div>
        </div>
        <ProductGrid products={sorted} locale={locale} />
      </div>
    </>
  );
}
