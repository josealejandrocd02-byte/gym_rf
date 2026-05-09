import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type Promotion = {
  id: string;
  name: string;
  price: number;
  duration: string;
  expiresAt: string;
  image: string;
};

const initialProducts: Product[] = [
  { id: "p1", name: "Proteína Whey Premium", price: 350, image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80" },
  { id: "p2", name: "Creatina Monohidratada", price: 220, image: "https://images.unsplash.com/photo-1579722821273-0f6c1b1d2b1d?w=800&q=80" },
  { id: "p3", name: "Guantes Fitness Pro", price: 120, image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" },
  { id: "p4", name: "Botella Deportiva 1L", price: 80, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80" },
  { id: "p5", name: "Polera Gym RF", price: 150, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80" },
  { id: "p6", name: "Cinturón de Fuerza", price: 280, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80" },
];

const initialPromotions: Promotion[] = [
  { id: "pr1", name: "Plan 1 Mes", price: 250, duration: "30 días", expiresAt: "2026-06-30", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80" },
  { id: "pr2", name: "Plan 3 Meses + Regalo", price: 650, duration: "90 días", expiresAt: "2026-06-30", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80" },
  { id: "pr3", name: "Plan 6 Meses + 2 Gratis", price: 1100, duration: "8 meses", expiresAt: "2026-07-31", image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=1200&q=80" },
];

type StoreCtx = {
  products: Product[];
  promotions: Promotion[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  addPromotion: (p: Omit<Promotion, "id">) => void;
  updatePromotion: (p: Promotion) => void;
  deletePromotion: (id: string) => void;
  isAuthed: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = localStorage.getItem("rf_products");
    const pr = localStorage.getItem("rf_promotions");
    const a = localStorage.getItem("rf_auth");
    if (p) setProducts(JSON.parse(p));
    if (pr) setPromotions(JSON.parse(pr));
    if (a === "1") setIsAuthed(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("rf_products", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("rf_promotions", JSON.stringify(promotions));
  }, [promotions]);

  const value: StoreCtx = {
    products,
    promotions,
    addProduct: (p) => setProducts((s) => [...s, { ...p, id: crypto.randomUUID() }]),
    updateProduct: (p) => setProducts((s) => s.map((x) => (x.id === p.id ? p : x))),
    deleteProduct: (id) => setProducts((s) => s.filter((x) => x.id !== id)),
    addPromotion: (p) => setPromotions((s) => [...s, { ...p, id: crypto.randomUUID() }]),
    updatePromotion: (p) => setPromotions((s) => s.map((x) => (x.id === p.id ? p : x))),
    deletePromotion: (id) => setPromotions((s) => s.filter((x) => x.id !== id)),
    isAuthed,
    login: (u, p) => {
      const ok = u === "admin" && p === "123456";
      if (ok) {
        setIsAuthed(true);
        if (typeof window !== "undefined") localStorage.setItem("rf_auth", "1");
      }
      return ok;
    },
    logout: () => {
      setIsAuthed(false);
      if (typeof window !== "undefined") localStorage.removeItem("rf_auth");
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used within StoreProvider");
  return c;
}

export const WHATSAPP_NUMBER = "59171234567";
export const GYM_EMAIL = "contacto@rfgym.com";
export const GYM_ADDRESS = "Av. Principal #123, Santa Cruz, Bolivia";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
