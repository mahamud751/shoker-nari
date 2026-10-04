import type { Metadata } from "next";
import Link from "next/link";
import { categories, productsByCategory } from "@/lib/data";
import { num } from "@/lib/format";
import { getI18n } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.listing.categories };
}

export default async function CategoriesPage() {
  const { locale, t } = await getI18n();
  return (
    <>
      <div className="page-head">
        <div className="container">
          <nav className="crumbs"><Link href="/">{t.common.home}</Link> / {t.listing.categories}</nav>
          <h1>{t.listing.categoriesTitle}</h1>
          <p>{t.listing.categoriesSubtitle}</p>
        </div>
      </div>
      <div className="container section-tight">
        <div className="grid-cats grid-cats-lg">
          {categories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="cat-card cat-photo">
              <img src={c.image} alt="" />
              <div className="cat-photo-body">
                <strong>{c.name[locale]}</strong>
                <small>{c.blurb[locale]}</small>
                <small>{t.common.products(num(productsByCategory(c.slug).length, locale))}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
