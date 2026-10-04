import Link from "next/link";

type Props = { eyebrow?: string; title: string; subtitle?: string; href?: string; linkLabel?: string };

export function SectionHead({ eyebrow, title, subtitle, href, linkLabel }: Props) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <Link href={href} className="link-more">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
