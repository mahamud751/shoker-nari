import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { defaultLocale, dictionaries, isLocale, LOCALE_COOKIE, type Locale } from "./i18n";

export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
});

export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}
