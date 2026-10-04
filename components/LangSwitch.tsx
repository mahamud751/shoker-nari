"use client";

import { useTransition } from "react";
import type { Locale } from "@/lib/i18n";
import { setLocale } from "@/lib/locale-actions";
import { useI18n } from "./LocaleProvider";

const OPTIONS: { value: Locale; label: string; title: string }[] = [
  { value: "bn", label: "বাং", title: "বাংলা" },
  { value: "en", label: "EN", title: "English" },
];

export function LangSwitch() {
  const { locale } = useI18n();
  const [pending, startTransition] = useTransition();

  function choose(next: Locale) {
    if (next === locale) return;
    // Setting a cookie in a Server Function re-renders the current route.
    startTransition(() => setLocale(next));
  }

  return (
    <div className={`lang-toggle${pending ? " is-pending" : ""}`} role="group" aria-label="Language / ভাষা">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          lang={o.value}
          title={o.title}
          aria-pressed={locale === o.value}
          className={locale === o.value ? "active" : ""}
          onClick={() => choose(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
