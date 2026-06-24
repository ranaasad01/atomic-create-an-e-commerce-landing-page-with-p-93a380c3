export type NavLink = {
  label: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  badge?: "New" | "Sale" | "Bestseller" | "Limited";
  description: string;
};

export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Curated for modern living";
export const PRIMARY_CTA = { label: "Shop Now", href: "#products" };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Newsletter", href: "#newsletter" },
];