"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { getProduct, type Product } from "@/lib/data";
import { useI18n } from "./LocaleProvider";

export type CartLine = { slug: string; qty: number };
type CartItem = CartLine & { product: Product };

type CartContextValue = {
  lines: CartLine[];
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  toast: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "korbojoy-cart";
const EMPTY: CartLine[] = [];

// Cart lines live in a tiny external store backed by localStorage, so every
// tab and component reads the same snapshot without effect-driven syncing.
let snapshot: CartLine[] | null = null;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  if (snapshot) return snapshot;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    snapshot = raw ? (JSON.parse(raw) as CartLine[]) : EMPTY;
  } catch {
    snapshot = EMPTY;
  }
  return snapshot;
}

function write(next: CartLine[]) {
  snapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    snapshot = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const subscribeNoop = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, read, () => EMPTY);
  const ready = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [toast, setToast] = useState<string | null>(null);
  const { locale, t } = useI18n();

  const setLines = useCallback((update: (prev: CartLine[]) => CartLine[]) => write(update(read())), []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((slug: string, qty = 1) => {
    const product = getProduct(slug);
    if (!product) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug ? { ...l, qty: Math.min(l.qty + qty, product.stock) } : l,
        );
      }
      return [...prev, { slug, qty: Math.min(qty, product.stock) }];
    });
    setToast(t.common.addedToCart(product.name[locale]));
  }, [setLines, locale, t]);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, [setLines]);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, [setLines]);

  const clear = useCallback(() => setLines(() => []), [setLines]);

  const value = useMemo(() => {
    const items = lines
      .map((l) => ({ ...l, product: getProduct(l.slug) }))
      .filter((i): i is CartItem => Boolean(i.product));
    return {
      lines,
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.product.price, 0),
      ready,
      add,
      setQty,
      remove,
      clear,
      toast,
    };
  }, [lines, ready, add, setQty, remove, clear, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
