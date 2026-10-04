import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingUI } from "@/components/FloatingUI";
import { getI18n } from "@/lib/locale";
import { site } from "@/lib/site";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    title: {
      default: `${site.name} — ${t.meta.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: t.meta.description,
  };
}

export const viewport: Viewport = {
  themeColor: "#7a2438",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale } = await getI18n();
  return (
    <html lang={locale} className={`${hind.variable} ${inter.variable}`}>
      <body className={`lang-${locale}`}>
        <LocaleProvider locale={locale}>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer locale={locale} />
            <FloatingUI />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
