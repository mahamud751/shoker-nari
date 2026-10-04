import Link from "next/link";

export function Logo({ light, label }: { light?: boolean; label: string }) {
  return (
    <Link href="/" className={`logo${light ? " logo-light" : ""}`} aria-label={label}>
      <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden>
        <rect width="40" height="40" rx="10" fill="var(--green)" />
        <rect x="9" y="17.5" width="22" height="13.5" rx="1.6" fill="none" stroke="#fff" strokeWidth="1.7" />
        <path d="M9 23h22" stroke="#fff" strokeWidth="1.7" />
        <path d="M20 17.5v13.5" stroke="#f3d7a1" strokeWidth="1.7" />
        <path d="M20 17.5c0 0-1.1-5-4.4-5-2 0-3 1.5-2.3 2.9.6 1.2 3.2 2.1 6.7 2.1z" fill="#f3d7a1" />
        <path d="M20 17.5c0 0 1.1-5 4.4-5 2 0 3 1.5 2.3 2.9-.6 1.2-3.2 2.1-6.7 2.1z" fill="#f3d7a1" />
      </svg>
      <span className="logo-text">
        Korbo<b>joy</b>
      </span>
    </Link>
  );
}
