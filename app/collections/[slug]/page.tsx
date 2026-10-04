import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, productsByTag, type CollectionSlug } from "@/lib/data";
import { getI18n } from "@/lib/locale";
import { Listing } from "@/components/Listing";

function getCollection(slug: string) {
  return slug in collections ? collections[slug as CollectionSlug] : undefined;
}

export async function generateMetadata(props: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const { locale } = await getI18n();
  return { title: getCollection(slug)?.title[locale] };
}

export default async function CollectionPage(props: PageProps<"/collections/[slug]">) {
  const { slug } = await props.params;
  const { sort } = await props.searchParams;
  const { locale, t } = await getI18n();
  const collection = getCollection(slug);
  if (!collection) notFound();
  return (
    <Listing
      locale={locale}
      title={collection.title[locale]}
      subtitle={collection.subtitle[locale]}
      crumbs={[{ href: "/shop", label: t.listing.shop }, { label: collection.title[locale] }]}
      products={productsByTag(collection.tag)}
      sort={typeof sort === "string" ? sort : undefined}
      basePath={`/collections/${slug}`}
    />
  );
}
