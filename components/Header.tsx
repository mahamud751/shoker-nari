"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import { num } from "@/lib/format";
import { useCart } from "./CartProvider";
import { Logo } from "./Logo";
import { LangSwitch } from "./LangSwitch";
import { useI18n } from "./LocaleProvider";

export function Header() {
  const { count, ready } = useCart();
  const { locale, t } = useI18n();
  const nav = [
    { href: "/shop", label: t.header.nav.shop },
    { href: "/categories", label: t.header.nav.categories },
    { href: "/collections/new-arrivals", label: t.header.nav.newArrivals },
    { href: "/collections/offers", label: t.header.nav.offers },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <>
      <div className="announce">
        {t.header.announce} <b>{t.header.announceBold}</b>
      </div>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>{t.header.topbar}</span>
          <a href={`tel:${site.phone}`}>
            {t.header.helpline}: {num(site.phoneDisplay, locale)}
          </a>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <button
            className="icon-btn menu-btn"
            aria-label={t.header.menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            ☰
          </button>
          <Logo label={t.header.home} />
          <nav className={`nav${menuOpen ? " nav-open" : ""}`} onClick={() => setMenuOpen(false)}>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={pathname.startsWith(n.href) ? "active" : ""}>
                {n.label}
              </Link>
            ))}
          </nav>
          <form className="search" onSubmit={onSearch} role="search">
            <input
              type="search"
              placeholder={t.header.searchPlaceholder}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label={t.header.searchPlaceholder}
            />
            <button type="submit" aria-label={t.header.search}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </form>
          <LangSwitch />
          <Link href="/cart" className="cart-link" aria-label={t.header.cart}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
              <circle cx="10" cy="20" r="1.4" />
              <circle cx="17" cy="20" r="1.4" />
            </svg>
            {ready && count > 0 && <span className="cart-count">{num(count, locale)}</span>}
          </Link>
        </div>
      </header>
    </>
  );
}
