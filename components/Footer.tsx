import Link from "next/link";
import { categories } from "@/lib/data";
import { dictionaries, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { num } from "@/lib/format";
import { Logo } from "./Logo";

export function Footer({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const f = t.footer;
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo light label={t.header.home} />
          <p className="footer-about">{f.about}</p>
        </div>
        <div>
          <h4>{f.shopping}</h4>
          <ul>
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`}>{c.name[locale]}</Link>
              </li>
            ))}
            <li>
              <Link href="/shop">{t.header.nav.shop}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>{f.policies}</h4>
          <ul>
            <li><Link href="/policies/delivery">{f.links.delivery}</Link></li>
            <li><Link href="/policies/returns">{f.links.returns}</Link></li>
            <li><Link href="/policies/privacy">{f.links.privacy}</Link></li>
            <li><Link href="/policies/terms">{f.links.terms}</Link></li>
            <li><Link href="/track-order">{f.links.track}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{f.contact}</h4>
          <ul>
            <li><a href={`tel:${site.phone}`}>{num(site.phoneDisplay, locale)}</a></li>
            <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">{f.whatsapp}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.address[locale]}</li>
          </ul>
          <div className="pay-badges" aria-label={f.payments}>
            <span>{f.cod}</span>
            <span>bKash</span>
            <span>Nagad</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {num(new Date().getFullYear(), locale)} Korbojoy. {f.rights}</span>
          <span>
            <Link href="/policies/privacy">Privacy</Link> · <Link href="/policies/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
