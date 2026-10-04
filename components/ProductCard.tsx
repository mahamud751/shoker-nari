import Link from "next/link";
import { getCategory, type Product } from "@/lib/data";
import { dictionaries, type Locale } from "@/lib/i18n";
import { discountPercent, num } from "@/lib/format";
import { ProductArt } from "./ProductArt";
import { Price } from "./Price";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const t = dictionaries[locale];
  const off = discountPercent(product.price, product.compareAt);
  const category = getCategory(product.category);
  const name = product.name[locale];
  return (
    <article className="card">
      <Link href={`/product/${product.slug}`} className="card-media">
        <ProductArt image={product.image} icon={product.icon} tint={product.tint} label={name} />
        {off > 0 && (
          <span className="badge-off">
            {num(off, locale)}% {t.common.off}
          </span>
        )}
      </Link>
      <div className="card-body">
        {category && <span className="card-cat">{category.name[locale]}</span>}
        <Link href={`/product/${product.slug}`} className="card-title">
          {name}
        </Link>
        <Price price={product.price} compareAt={product.compareAt} from={product.fromPrice} locale={locale} />
        <AddToCartButton slug={product.slug} disabled={product.stock === 0} compact />
      </div>
    </article>
  );
}

export function ProductGrid({ products, locale }: { products: Product[]; locale: Locale }) {
  if (products.length === 0) {
    return <p className="empty">{dictionaries[locale].common.noProducts}</p>;
  }
  return (
    <div className="grid-products">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} locale={locale} />
      ))}
    </div>
  );
}
