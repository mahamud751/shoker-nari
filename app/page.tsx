import Link from "next/link";
import { categories, getProduct, productsByCategory, productsByTag } from "@/lib/data";
import { num } from "@/lib/format";
import { getI18n } from "@/lib/locale";
import { ProductGrid } from "@/components/ProductCard";
import { Price } from "@/components/Price";
import { SectionHead } from "@/components/SectionHead";

const guideLinks = ["/categories/pujo-sets", "/categories/birthday", "/categories/katan-combo"];

export default async function Home() {
  const { locale, t } = await getI18n();
  const h = t.home;
  const picks = productsByTag("best");
  const featured = getProduct("rajkumari");

  return (
    <>
      <section className="hero">
        <img className="hero-bg" src="/photos/hero.jpg" alt="" />
        <div className="hero-shade" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill pill-light">{h.hero.pill}</span>
            <h1>
              {h.hero.line1}
              <br />
              <span>{h.hero.line2}</span>
            </h1>
            <p>{h.hero.text}</p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-accent btn-lg">
                {h.hero.shop}
              </Link>
              <Link href="/categories/pujo-sets" className="btn btn-ghost btn-lg btn-on-dark">
                {h.hero.offers}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="perks">
        <div className="container perks-grid">
          {h.perks.map((p) => (
            <div key={p.title} className="perk">
              <span className="perk-icon">{p.icon}</span>
              <div>
                <strong>{p.title}</strong>
                <small>{p.text}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={h.cats.eyebrow} title={h.cats.title} subtitle={h.cats.subtitle} href="/categories" linkLabel={h.cats.link} />
          <div className="occasion-grid">
            {categories.map((c) => (
              <Link key={c.slug} href={`/categories/${c.slug}`} className="occasion-card">
                <img src={c.image} alt="" />
                <span>
                  <small>{t.common.products(num(productsByCategory(c.slug).length, locale))}</small>
                  <strong>{c.name[locale]}</strong>
                  <em>{c.blurb[locale]}</em>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHead eyebrow={h.rows.best.eyebrow} title={h.rows.best.title} subtitle={h.rows.best.subtitle} href="/collections/best-sellers" linkLabel={t.common.seeAll} />
          <ProductGrid products={picks} locale={locale} />
        </div>
      </section>

      {featured && (
        <section className="section">
          <div className="container feature">
            <Link href={`/product/${featured.slug}`} className="feature-media">
              <img src={featured.image} alt={featured.name[locale]} />
            </Link>
            <div>
              <span className="eyebrow">{h.feature.eyebrow}</span>
              <h2>{featured.name[locale]}</h2>
              <p className="feature-lead">{featured.summary[locale]}</p>
              <Price price={featured.price} compareAt={featured.compareAt} locale={locale} />
              <ul className="feature-list">
                {featured.highlights[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={`/product/${featured.slug}`} className="btn btn-primary btn-lg">
                {h.feature.button}
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section section-soft">
        <div className="container story">
          <img src="/photos/story.jpg" alt="" />
          <div>
            <span className="eyebrow">{h.story.eyebrow}</span>
            <h2>{h.story.title}</h2>
            <p>{h.story.text}</p>
            <ul className="feature-list">
              {h.story.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={h.inside.eyebrow} title={h.inside.title} subtitle={h.inside.subtitle} />
          <div className="inside-grid">
            {h.inside.items.map((item) => (
              <article key={item.title} className="inside-card">
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>
              {h.cta.line1}
              <br />
              {h.cta.line2}
            </h2>
            <p>{h.cta.text}</p>
          </div>
          <Link href="/shop" className="btn btn-accent btn-lg">
            {h.cta.button}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container why">
          <div>
            <span className="eyebrow">{h.why.eyebrow}</span>
            <h2>{h.why.title}</h2>
            <p className="why-lead">{h.why.lead}</p>
          </div>
          <ol className="steps">
            {h.why.steps.map((s, i) => (
              <li key={s.title}>
                <span className="step-num">{num(String(i + 1).padStart(2, "0"), locale)}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHead eyebrow={h.guides.eyebrow} title={h.guides.title} subtitle={h.guides.subtitle} />
          <div className="grid-guides">
            {h.guides.items.map((g, i) => (
              <article key={g.title} className="guide">
                <div className="guide-top">
                  <span className="step-num">{num(String(i + 1).padStart(2, "0"), locale)}</span>
                  <small>{g.tag}</small>
                </div>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                <ul>
                  {g.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <Link href={guideLinks[i]} className="link-more">
                  {t.common.viewProducts} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
