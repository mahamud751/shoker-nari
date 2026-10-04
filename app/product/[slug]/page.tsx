import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, productsByCategory } from "@/lib/data";
import { discountPercent, num } from "@/lib/format";
import { getI18n } from "@/lib/locale";
import { site } from "@/lib/site";
import { ProductArt } from "@/components/ProductArt";
import { Price } from "@/components/Price";
import { ProductGrid } from "@/components/ProductCard";
import { SectionHead } from "@/components/SectionHead";
import { BuyBox } from "@/components/BuyBox";

export async function generateMetadata(props: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const { locale, t } = await getI18n();
  const p = getProduct(slug);
  return p ? { title: p.name[locale], description: p.summary[locale] } : { title: t.product.notFound };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const { locale, t } = await getI18n();
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const name = product.name[locale];
  const off = discountPercent(product.price, product.compareAt);
  const related = productsByCategory(product.category).filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <div className="container section-tight">
        <nav className="crumbs" aria-label="breadcrumb">
          <Link href="/">{t.common.home}</Link>
          {category && (
            <>
              {" / "}
              <Link href={`/categories/${category.slug}`}>{category.name[locale]}</Link>
            </>
          )}
          {" / "}
          {name}
        </nav>
        <div className="pdp">
          <div className="pdp-media">
            <ProductArt image={product.image} icon={product.icon} tint={product.tint} label={name} size="lg" />
            {off > 0 && (
              <span className="badge-off">
                {num(off, locale)}% {t.common.off}
              </span>
            )}
          </div>
          <div className="pdp-info">
            {category && <span className="card-cat">{category.name[locale]}</span>}
            <h1>{name}</h1>
            <Price price={product.price} compareAt={product.compareAt} from={product.fromPrice} locale={locale} />
            <p className="pdp-summary">{product.summary[locale]}</p>
            <p className={product.stock > 0 ? "stock in" : "stock out"}>
              {product.stock > 0 ? t.product.inStock(num(product.stock, locale)) : t.common.outOfStock}
            </p>
            <BuyBox slug={product.slug} stock={product.stock} />
            <a
              className="btn btn-wa"
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.product.waText(name))}`}
              target="_blank"
              rel="noreferrer"
            >
              {t.product.waOrder}
            </a>
            <ul className="pdp-highlights">
              {product.highlights[locale].map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="pdp-perks">
              {t.product.perks.map((perk) => (
                <span key={perk}>{perk}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead title={t.product.related} href={`/categories/${product.category}`} linkLabel={t.common.seeAll} />
            <ProductGrid products={related} locale={locale} />
          </div>
        </section>
      )}
    </>
  );
}
