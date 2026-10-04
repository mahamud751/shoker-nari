import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, productsByCategory } from "@/lib/data";
import { getI18n } from "@/lib/locale";
import { Listing } from "@/components/Listing";

export async function generateMetadata(props: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const { locale, t } = await getI18n();
  return { title: getCategory(slug)?.name[locale] ?? t.listing.categories };
}

export default async function CategoryPage(props: PageProps<"/categories/[slug]">) {
  const { slug } = await props.params;
  const { sort } = await props.searchParams;
  const { locale, t } = await getI18n();
  const category = getCategory(slug);
  if (!category) notFound();
  return (
    <Listing
      locale={locale}
      title={category.name[locale]}
      subtitle={category.blurb[locale]}
      crumbs={[{ href: "/categories", label: t.listing.categories }, { label: category.name[locale] }]}
      products={productsByCategory(slug)}
      sort={typeof sort === "string" ? sort : undefined}
      basePath={`/categories/${slug}`}
    />
  );
}
