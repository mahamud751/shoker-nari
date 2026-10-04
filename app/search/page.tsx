import type { Metadata } from "next";
import { searchProducts } from "@/lib/data";
import { getI18n } from "@/lib/locale";
import { Listing } from "@/components/Listing";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.listing.search };
}

export default async function SearchPage(props: PageProps<"/search">) {
  const { q, sort } = await props.searchParams;
  const { locale, t } = await getI18n();
  const term = typeof q === "string" ? q : "";
  return (
    <Listing
      locale={locale}
      title={term ? t.listing.searchResults(term) : t.listing.searchTitle}
      crumbs={[{ label: t.listing.search }]}
      products={searchProducts(term)}
      sort={typeof sort === "string" ? sort : undefined}
      basePath="/search"
      extraQuery={{ q: term }}
    />
  );
}
