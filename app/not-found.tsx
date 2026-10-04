import Link from "next/link";
import { getI18n } from "@/lib/locale";

export default async function NotFound() {
  const { t } = await getI18n();
  return (
    <div className="container section-tight narrow center">
      <h1 className="page-title">{t.notFound.title}</h1>
      <p>{t.notFound.text}</p>
      <div className="center-actions">
        <Link href="/" className="btn btn-primary">{t.notFound.home}</Link>
      </div>
    </div>
  );
}
