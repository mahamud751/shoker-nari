import type { Metadata } from "next";
import { products } from "@/lib/data";
import { getI18n } from "@/lib/locale";
import { Listing } from "@/components/Listing";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.listing.shopTitle };
}

export default async function ShopPage(props: PageProps<"/shop">) {
  const { sort } = await props.searchParams;
  const { locale, t } = await getI18n();
  return (
    <Listing
      locale={locale}
      title={t.listing.shopTitle}
      subtitle={t.listing.shopSubtitle}
      crumbs={[{ label: t.listing.shopTitle }]}
      products={products}
      sort={typeof sort === "string" ? sort : undefined}
      basePath="/shop"
    />
  );
}
