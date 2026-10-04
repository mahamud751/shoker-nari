import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getI18n } from "@/lib/locale";
import { site } from "@/lib/site";
import { money, num } from "@/lib/format";

type Policy = { title: string; sections: { h: string; p: string }[] };

function getPolicies(locale: Locale): Record<string, Policy> {
  const { insideDhaka, outsideDhaka, freeShippingMinItems } = site.delivery;
  const inside = money(insideDhaka, locale);
  const outside = money(outsideDhaka, locale);
  const minItems = num(freeShippingMinItems, locale);

  if (locale === "en") {
    return {
      delivery: {
        title: "Delivery information",
        sections: [
          { h: "Delivery time", p: "Orders usually arrive within 1–2 working days inside Dhaka and 2–4 working days elsewhere. Natural disasters or public holidays may cause short delays." },
          { h: "Delivery charge", p: `${inside} inside Dhaka and ${outside} outside Dhaka. Delivery is free when you order ${minItems} or more items in one order.` },
          { h: "Order confirmation", p: "Before shipping, a team member calls you to confirm your address and products." },
        ],
      },
      returns: {
        title: "Returns & refunds",
        sections: [
          { h: "When you can return", p: "If you receive a wrong, broken or defective item, let us know within 72 hours of delivery with a photo or video." },
          { h: "How returns work", p: "The item must be unused and in its original packaging. After checking, we'll replace it with the same item or refund you." },
          { h: "Refund time", p: "Approved refunds are sent within 3–7 working days via bKash, Nagad or bank transfer." },
        ],
      },
      privacy: {
        title: "Privacy policy",
        sections: [
          { h: "What we collect", p: "We collect your name, phone number and address to process your order." },
          { h: "How we use it", p: "This information is used only to confirm and deliver your order and to support you. It is not shared with anyone except our delivery partners." },
          { h: "Contact", p: `To have your information deleted, email ${site.email}.` },
        ],
      },
      terms: {
        title: "Terms of use",
        sections: [
          { h: "Prices & availability", p: "Prices and stock shown on the website may change at any time. The price at the time of order confirmation is final." },
          { h: "Order cancellation", p: "Korbojoy may cancel an order if details are incorrect, an item is out of stock, or we can't reach you." },
          { h: "Product images", p: "Product colours and designs may look slightly different depending on your screen." },
        ],
      },
    };
  }

  return {
    delivery: {
      title: "ডেলিভারি তথ্য",
      sections: [
        { h: "ডেলিভারি সময়", p: "ঢাকা শহরের ভিতরে সাধারণত ১–২ কার্যদিবস এবং ঢাকার বাইরে ২–৪ কার্যদিবসের মধ্যে পণ্য পৌঁছে দেওয়া হয়। প্রাকৃতিক দুর্যোগ বা সরকারি ছুটিতে সময় কিছুটা বাড়তে পারে।" },
        { h: "ডেলিভারি চার্জ", p: `ঢাকার ভিতরে ${inside} এবং ঢাকার বাইরে ${outside}। এক অর্ডারে ${minItems}টি বা তার বেশি পণ্য নিলে ডেলিভারি চার্জ লাগবে না।` },
        { h: "অর্ডার কনফার্মেশন", p: "প্রতিটি অর্ডার পাঠানোর আগে আমাদের প্রতিনিধি ফোনে যোগাযোগ করে ঠিকানা ও পণ্য নিশ্চিত করেন।" },
      ],
    },
    returns: {
      title: "রিটার্ন ও রিফান্ড নীতি",
      sections: [
        { h: "কখন রিটার্ন করা যাবে", p: "ভুল, ভাঙা বা ত্রুটিপূর্ণ পণ্য পেলে ডেলিভারির ৭২ ঘণ্টার মধ্যে ছবি/ভিডিওসহ আমাদের জানান।" },
        { h: "যেভাবে রিটার্ন হবে", p: "পণ্যটি মূল প্যাকেটে, অব্যবহৃত অবস্থায় ফেরত দিতে হবে। যাচাইয়ের পর একই পণ্য বদলে দেওয়া হবে অথবা টাকা ফেরত দেওয়া হবে।" },
        { h: "রিফান্ড সময়", p: "রিফান্ড অনুমোদনের পর ৩–৭ কার্যদিবসের মধ্যে bKash/Nagad বা ব্যাংকের মাধ্যমে টাকা ফেরত দেওয়া হয়।" },
      ],
    },
    privacy: {
      title: "গোপনীয়তা নীতি",
      sections: [
        { h: "আমরা কী তথ্য নিই", p: "অর্ডার প্রক্রিয়ার জন্য আপনার নাম, ফোন নম্বর ও ঠিকানা সংগ্রহ করা হয়।" },
        { h: "তথ্যের ব্যবহার", p: "এই তথ্য শুধু অর্ডার কনফার্ম, ডেলিভারি ও গ্রাহক সহায়তার কাজে ব্যবহৃত হয়। ডেলিভারি পার্টনার ছাড়া অন্য কারো সঙ্গে শেয়ার করা হয় না।" },
        { h: "যোগাযোগ", p: `আপনার তথ্য মুছে ফেলতে চাইলে ${site.email} ঠিকানায় ইমেইল করুন।` },
      ],
    },
    terms: {
      title: "ব্যবহারের শর্তাবলি",
      sections: [
        { h: "মূল্য ও প্রাপ্যতা", p: "ওয়েবসাইটে প্রদর্শিত মূল্য ও স্টক যেকোনো সময় পরিবর্তন হতে পারে। অর্ডার কনফার্মেশনের সময়কার মূল্যই চূড়ান্ত।" },
        { h: "অর্ডার বাতিল", p: "ভুল তথ্য, স্টক না থাকা বা যোগাযোগ করা না গেলে Korbojoy অর্ডার বাতিল করার অধিকার রাখে।" },
        { h: "পণ্যের ছবি", p: "পণ্যের রং ও ডিজাইন স্ক্রিনভেদে সামান্য ভিন্ন দেখাতে পারে।" },
      ],
    },
  };
}

export async function generateMetadata(props: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const { locale } = await getI18n();
  return { title: getPolicies(locale)[slug]?.title };
}

export default async function PolicyPage(props: PageProps<"/policies/[slug]">) {
  const { slug } = await props.params;
  const { locale, t } = await getI18n();
  const policy = getPolicies(locale)[slug];
  if (!policy) notFound();
  return (
    <>
      <div className="page-head">
        <div className="container">
          <nav className="crumbs"><Link href="/">{t.common.home}</Link> / {policy.title}</nav>
          <h1>{policy.title}</h1>
        </div>
      </div>
      <div className="container section-tight narrow prose">
        {policy.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
      </div>
    </>
  );
}
