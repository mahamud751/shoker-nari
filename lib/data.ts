import type { L } from "./i18n";

export type Category = {
  slug: string;
  name: L;
  blurb: L;
  icon: string;
  tint: string;
  image: string;
};

export type Product = {
  slug: string;
  name: L;
  category: string;
  price: number;
  compareAt?: number;
  fromPrice?: boolean;
  icon: string;
  tint: string;
  image: string;
  summary: L;
  highlights: { bn: string[]; en: string[] };
  stock: number;
  tags: ("popular" | "best" | "new" | "offer")[];
  createdAt: string;
};

export const categories: Category[] = [
  {
    slug: "pujo-sets",
    name: { bn: "পূজোর গিফট", en: "Pujo Gifts" },
    blurb: { bn: "শাড়ি, ফুল ও সাজ — এক বক্সে", en: "Saree, flowers and jewellery in one box" },
    icon: "🌼",
    tint: "#f8f1e0",
    image: "/photos/pujo-kumkum.jpg",
  },
  {
    slug: "birthday",
    name: { bn: "জন্মদিনের বক্স", en: "Birthday Boxes" },
    blurb: { bn: "টেডি, গোলাপ আর চকলেটসহ", en: "With a teddy, roses and chocolate" },
    icon: "🎁",
    tint: "#f8efe4",
    image: "/photos/moharani-jamuni.jpg",
  },
  {
    slug: "katan-combo",
    name: { bn: "কাতান কম্বো", en: "Katan Combos" },
    blurb: { bn: "সিল্ক শাড়ি ও ম্যাচিং গয়না", en: "Silk saree with matching jewellery" },
    icon: "✨",
    tint: "#f7f1e8",
    image: "/photos/shondha-maroon.jpg",
  },
  {
    slug: "love-gifts",
    name: { bn: "ভালোবাসার বক্স", en: "Love Boxes" },
    blurb: { bn: "গোলাপ, রিং আর মনের কথা", en: "Roses, a ring and a note" },
    icon: "🌹",
    tint: "#f8efe4",
    image: "/photos/rani-golap.jpg",
  },
];

export const products: Product[] = [
  {
    slug: "shondha-maroon",
    name: { bn: "সন্ধ্যা মেরুন কাতান কম্বো", en: "Shondha Maroon Katan Combo" },
    category: "katan-combo",
    price: 1780,
    compareAt: 2200,
    icon: "✨",
    tint: "#f7f1e8",
    image: "/photos/shondha-maroon.jpg",
    summary: {
      bn: "মেরুন সফট সিল্ক কাতান, ম্যাচিং ব্লাউজ পিস, গলার হার, দুল, রিং, টিপ, খোঁপার ফুল ও চকলেট — খুলেই দেওয়া যায় এমন একটি বক্স।",
      en: "A maroon soft-silk katan, matching blouse piece, necklace, earrings, ring, tip, hair flowers and chocolate — ready to hand over.",
    },
    highlights: {
      bn: ["১২ হাত সফট সিল্ক কাতান ও ব্লাউজ পিস", "গলার হার, দুল ও রিং", "টিপ, জুঁই ফুল ও চকলেট", "প্রিমিয়াম গিফট বক্স"],
      en: ["12-yard soft-silk katan and blouse piece", "Necklace, earrings and ring", "Tip, jasmine and chocolate", "Premium gift box"],
    },
    stock: 14,
    tags: ["popular", "best", "offer"],
    createdAt: "2026-09-12",
  },
  {
    slug: "pujo-kumkum",
    name: { bn: "কুমকুম পূজো সেট", en: "Kumkum Pujo Set" },
    category: "pujo-sets",
    price: 1980,
    compareAt: 2450,
    icon: "🌼",
    tint: "#f8f1e0",
    image: "/photos/pujo-kumkum.jpg",
    summary: {
      bn: "লাল সিল্ক শাড়ি, সোনালি কাজের গয়না, চুড়ি, জুঁই ও গাঁদা — পূজোর সকালের জন্য সাজানো একটি সম্পূর্ণ সেট।",
      en: "A red silk saree, gold-work jewellery, bangles, jasmine and marigolds — a complete set for pujo morning.",
    },
    highlights: {
      bn: ["লাল সিল্ক শাড়ি, সোনালি পাড়", "হার, ঝুমকা ও চুড়ির সেট", "জুঁই, গাঁদা ও আতর", "রেডি-টু-গিফট বক্স"],
      en: ["Red silk saree with a gold border", "Necklace, jhumkas and bangles", "Jasmine, marigolds and attar", "Ready-to-gift box"],
    },
    stock: 12,
    tags: ["popular", "best"],
    createdAt: "2026-09-18",
  },
  {
    slug: "pujo-shiuli",
    name: { bn: "শিউলি আইভরি সেট", en: "Shiuli Ivory Set" },
    category: "pujo-sets",
    price: 1980,
    compareAt: 2400,
    icon: "🌼",
    tint: "#f7f1e8",
    image: "/photos/pujo-shiuli.jpg",
    summary: {
      bn: "হালকা সোনালি পাড়ের আইভরি সিল্ক, মুক্তোর হার ও দুল, শিউলি ফুল এবং মিষ্টি — শান্ত, উজ্জ্বল একটি পূজো বক্স।",
      en: "Ivory silk with a pale gold border, a pearl necklace and earrings, shiuli flowers and sweets — a quiet, bright pujo box.",
    },
    highlights: {
      bn: ["আইভরি সিল্ক শাড়ি", "মুক্তোর হার ও দুল", "শিউলি ফুল ও মিষ্টি", "ছোট সোনালি সিঁদুরদানি"],
      en: ["Ivory silk saree", "Pearl necklace and earrings", "Shiuli flowers and sweets", "A small gold sindoor box"],
    },
    stock: 10,
    tags: ["popular", "new"],
    createdAt: "2026-09-28",
  },
  {
    slug: "pujo-marigold",
    name: { bn: "গাঁদা সোনালি পূজো সেট", en: "Marigold Gold Pujo Set" },
    category: "pujo-sets",
    price: 1980,
    compareAt: 2380,
    icon: "🌼",
    tint: "#f8f1e0",
    image: "/photos/pujo-marigold.jpg",
    summary: {
      bn: "সোনালি সিল্ক, তাজা গাঁদা, হার, চুড়ি ও সিঁদুর — উৎসবের রঙে সাজানো একটি উষ্ণ গিফট।",
      en: "Gold silk, fresh marigolds, a necklace, bangles and sindoor — a warm gift in festival colours.",
    },
    highlights: {
      bn: ["সোনালি সিল্ক শাড়ি", "তাজা গাঁদা ফুল", "পাথর বসানো হার", "চুড়ি ও সিঁদুরের কৌটো"],
      en: ["Gold silk saree", "Fresh marigolds", "Stone-set necklace", "Bangles and a sindoor box"],
    },
    stock: 11,
    tags: ["best", "offer"],
    createdAt: "2026-09-22",
  },
  {
    slug: "moharani-jamuni",
    name: { bn: "মহারানী জামুনি বক্স", en: "Moharani Jamuni Box" },
    category: "birthday",
    price: 2140,
    compareAt: 2680,
    icon: "🎁",
    tint: "#f4eef6",
    image: "/photos/moharani-jamuni.jpg",
    summary: {
      bn: "জামুনি সিল্ক, টেডি, ল্যাভেন্ডার গোলাপ, গয়না ও হার্ট চকলেট — জন্মদিনের সারপ্রাইজ হিসেবে পুরো একটি বক্স।",
      en: "Jamuni silk, a teddy, lavender roses, jewellery and a heart of chocolates — a whole birthday surprise in one box.",
    },
    highlights: {
      bn: ["জামুনি সিল্ক শাড়ি", "টেডি ও ল্যাভেন্ডার গোলাপ", "হার, দুল ও চুড়ি", "হার্ট শেপ চকলেট বক্স"],
      en: ["Jamuni silk saree", "Teddy and lavender roses", "Necklace, earrings and bangles", "Heart-shaped chocolate box"],
    },
    stock: 9,
    tags: ["popular", "best", "offer"],
    createdAt: "2026-09-08",
  },
  {
    slug: "moharani-golapi",
    name: { bn: "মহারানী গোলাপি বক্স", en: "Moharani Blush Box" },
    category: "birthday",
    price: 2140,
    compareAt: 2680,
    icon: "🎁",
    tint: "#f8efe4",
    image: "/photos/moharani-golapi.jpg",
    summary: {
      bn: "ব্লাশ সিল্ক, ক্রিম টেডি, গোলাপের তোড়া, মুক্তার সেট ও চকলেট — নরম রঙের একটি জন্মদিনের বক্স।",
      en: "Blush silk, a cream teddy, a rose bouquet, a pearl set and chocolate — a birthday box in soft colour.",
    },
    highlights: {
      bn: ["ব্লাশ সিল্ক শাড়ি", "টেডি ও গোলাপের তোড়া", "মুক্তোর হার ও দুল", "রিবন বাঁধা চকলেট বক্স"],
      en: ["Blush silk saree", "Teddy and a rose bouquet", "Pearl necklace and earrings", "Ribboned chocolate box"],
    },
    stock: 13,
    tags: ["popular", "new"],
    createdAt: "2026-10-01",
  },
  {
    slug: "moharani-akash",
    name: { bn: "মহারানী আকাশ বক্স", en: "Moharani Sky Box" },
    category: "birthday",
    price: 2140,
    compareAt: 2580,
    icon: "🎁",
    tint: "#eef4f8",
    image: "/photos/moharani-akash.jpg",
    summary: {
      bn: "আকাশি সিল্ক, সাদা টেডি, সাদা গোলাপ, সিলভার টোনের গয়না ও রঙিন মিষ্টি — হালকা, উজ্জ্বল একটি জন্মদিনের সেট।",
      en: "Sky-blue silk, a white teddy, white roses, silver-tone jewellery and pastel sweets — a light, bright birthday set.",
    },
    highlights: {
      bn: ["আকাশি সিল্ক শাড়ি, সিলভার পাড়", "সাদা টেডি ও সাদা গোলাপ", "নেকলেস ও দুল", "রঙিন মিষ্টি"],
      en: ["Sky-blue silk with a silver border", "White teddy and white roses", "Necklace and earrings", "Pastel sweets"],
    },
    stock: 8,
    tags: ["best"],
    createdAt: "2026-09-15",
  },
  {
    slug: "rani-golap",
    name: { bn: "রানি গোলাপ গিফট বক্স", en: "Rani Rose Gift Box" },
    category: "love-gifts",
    price: 2280,
    compareAt: 2790,
    icon: "🌹",
    tint: "#f8efe4",
    image: "/photos/rani-golap.jpg",
    summary: {
      bn: "গোলাপি সিল্ক, গোলাপের তোড়া, সোনালি চুড়ি, রিং ও একটি খালি শুভেচ্ছা কার্ড — ভালোবাসা বলার জন্য সাজানো।",
      en: "Rose silk, a bouquet, gold bangles, a ring and a blank note card — arranged for saying something kind.",
    },
    highlights: {
      bn: ["গোলাপি সিল্ক শাড়ি", "গোলাপের মিনি বুকে", "মেটাল চুড়ি ও রিং", "লেখা যায় এমন ফুলের কার্ড"],
      en: ["Rose silk saree", "A mini rose bouquet", "Metal bangles and a ring", "A floral card you can write on"],
    },
    stock: 10,
    tags: ["popular", "offer"],
    createdAt: "2026-09-20",
  },
  {
    slug: "chandni",
    name: { bn: "চাঁদনী সিলভার প্যাকেজ", en: "Chandni Silver Package" },
    category: "love-gifts",
    price: 2890,
    compareAt: 3400,
    icon: "🌙",
    tint: "#f4f2f6",
    image: "/photos/chandni.jpg",
    summary: {
      bn: "রূপালি পাড়ের আইভরি সিল্ক, কাঠের আয়না ও চিরুনি, মেহেদি, পারফিউম, মুক্তো ও চকলেট — একটু বেশি যত্নের একটি প্যাকেজ।",
      en: "Ivory silk with a silver border, a wooden mirror and comb, mehndi, perfume, pearls and chocolate — a package with a little extra care.",
    },
    highlights: {
      bn: ["আইভরি সিল্ক, রূপালি পাড়", "কাঠের আয়না ও চিরুনি", "মেহেদির কোন ও পারফিউম", "মুক্তোর মালা ও চকলেট"],
      en: ["Ivory silk with a silver border", "Wooden mirror and comb", "Mehndi cones and perfume", "Pearl strand and chocolate"],
    },
    stock: 6,
    tags: ["best", "new"],
    createdAt: "2026-10-02",
  },
  {
    slug: "nilambori",
    name: { bn: "নীলাম্বরী হাফ সিল্ক", en: "Nilambori Half-Silk" },
    category: "katan-combo",
    price: 2290,
    compareAt: 2750,
    icon: "✨",
    tint: "#eef2f6",
    image: "/photos/nilambori.jpg",
    summary: {
      bn: "ঘন নীল হাফ সিল্ক, মুক্তোর মালা, পারফিউম, চুড়ি, চকলেট ও একটি ফুল-চাপা কার্ড — গভীর রঙের একটি সন্ধ্যা বক্স।",
      en: "Deep navy half-silk, a pearl mala, perfume, bangles, chocolate and a pressed-flower card — an evening box in a deep colour.",
    },
    highlights: {
      bn: ["নীল হাফ সিল্ক শাড়ি, সোনালি পাড়", "মুক্তোর মালা", "পারফিউম ও চুড়ি", "চকলেট ও ফুলের কার্ড"],
      en: ["Navy half-silk with a gold border", "Pearl mala", "Perfume and bangles", "Chocolate and a flower card"],
    },
    stock: 9,
    tags: ["popular"],
    createdAt: "2026-09-25",
  },
  {
    slug: "boishakh-laal",
    name: { bn: "বৈশাখী লাল-সাদা কম্বো", en: "Boishakhi Red & White Combo" },
    category: "katan-combo",
    price: 2680,
    compareAt: 3200,
    icon: "✨",
    tint: "#f8efe4",
    image: "/photos/boishakh.jpg",
    summary: {
      bn: "লাল-সাদা সিল্ক, জুঁইয়ের গাঁজরা, সোনালি হার, লাল চুড়ি, মাটির গাঁদা ও মিষ্টি — বৈশাখের রঙে একটি উৎসব বক্স।",
      en: "Red-and-white silk, a jasmine gajra, a gold necklace, red bangles, marigolds in clay and sweets — a festival box in Boishakh colours.",
    },
    highlights: {
      bn: ["লাল-সাদা সিল্ক শাড়ি", "জুঁইয়ের গাঁজরা ও সোনালি হার", "লাল চুড়ি", "মিষ্টি ও মাটির গাঁদা"],
      en: ["Red-and-white silk saree", "Jasmine gajra and a gold necklace", "Red bangles", "Sweets and marigolds in clay"],
    },
    stock: 7,
    tags: ["best", "offer", "new"],
    createdAt: "2026-09-30",
  },
  {
    slug: "rajkumari",
    name: { bn: "রাজকুমারী রয়্যাল বক্স", en: "Rajkumari Royal Box" },
    category: "katan-combo",
    price: 2550,
    compareAt: 3100,
    icon: "✨",
    tint: "#f6f0e8",
    image: "/photos/rajkumari.jpg",
    summary: {
      bn: "ঘন বেগুনি সিল্ক, ভারী সোনালি হার, পাশা, ঝুমকা, চুড়ি ও চকলেট — অনুষ্ঠানের জন্য সবচেয়ে ভরা একটি বক্স।",
      en: "Deep plum silk, a heavy gold necklace, a passa, jhumkas, bangles and chocolate — the fullest box, for a celebration.",
    },
    highlights: {
      bn: ["বেগুনি সিল্ক শাড়ি, সোনালি পাড়", "ভারী হার, পাশা ও ঝুমকা", "ম্যাচিং চুড়ি", "ডার্ক চকলেট"],
      en: ["Plum silk saree with a gold border", "Heavy necklace, passa and jhumkas", "Matching bangles", "Dark chocolate"],
    },
    stock: 8,
    tags: ["popular", "best"],
    createdAt: "2026-09-05",
  },
];

export const collections = {
  popular: { title: { bn: "জনপ্রিয় পণ্য", en: "Popular products" }, subtitle: { bn: "এই মুহূর্তে সবচেয়ে বেশি খোঁজা হচ্ছে", en: "Most looked at right now" }, tag: "popular" },
  "best-sellers": { title: { bn: "বেস্ট সেলার", en: "Best sellers" }, subtitle: { bn: "বারবার অর্ডার হওয়া বক্স", en: "The boxes people order again" }, tag: "best" },
  "new-arrivals": { title: { bn: "নতুন এসেছে", en: "New arrivals" }, subtitle: { bn: "এই সিজনের নতুন সেট", en: "New sets this season" }, tag: "new" },
  offers: { title: { bn: "চলতি অফার", en: "Current offers" }, subtitle: { bn: "সীমিত সময়ের বিশেষ দামে", en: "Special prices for a limited time" }, tag: "offer" },
} as const;

export type CollectionSlug = keyof typeof collections;

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function productsByTag(tag: Product["tags"][number]) {
  return products.filter((p) => p.tags.includes(tag));
}

export function searchProducts(q: string) {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter((p) => {
    const category = getCategory(p.category);
    return [p.slug, p.name.bn, p.name.en, p.summary.bn, p.summary.en, category?.name.bn ?? "", category?.name.en ?? ""].some(
      (f) => f.toLowerCase().includes(term),
    );
  });
}

export type SortKey = "new" | "price-asc" | "price-desc" | "discount";

export function sortProducts(list: Product[], sort: SortKey = "new") {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "discount":
      return copy.sort(
        (a, b) => (b.compareAt ?? b.price) / b.price - (a.compareAt ?? a.price) / a.price,
      );
    default:
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}
