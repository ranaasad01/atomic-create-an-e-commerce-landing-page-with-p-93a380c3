"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Sparkles, Heart, ChevronRight } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, PRIMARY_CTA } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const products = [
  {
    id: "p1",
    name: "Aura Ceramic Vase",
    price: 89,
    originalPrice: 120,
    rating: 4.8,
    reviewCount: 214,
    image: "https://ta-daan.com/cdn/shop/products/SchneidStudio_AuraVase2_rust_2.jpg?v=1650968462&width=1080",
    category: "Home Decor",
    badge: "Sale" as const,
    description: "Hand-thrown stoneware with a matte glaze finish. Each piece is unique.",
  },
  {
    id: "p2",
    name: "Linen Throw Blanket",
    price: 135,
    rating: 4.9,
    reviewCount: 389,
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    category: "Textiles",
    badge: "Bestseller" as const,
    description: "Woven from 100% European flax. Softens beautifully with every wash.",
  },
  {
    id: "p3",
    name: "Walnut Serving Board",
    price: 64,
    rating: 4.7,
    reviewCount: 156,
    image: "https://grainwoods.com/cdn/shop/files/GAI_0208-01.jpg?v=1706457204&width=3779",
    category: "Kitchen",
    badge: "New" as const,
    description: "Solid American walnut with a food-safe oil finish. Built to last decades.",
  },
  {
    id: "p4",
    name: "Brass Table Lamp",
    price: 198,
    originalPrice: 240,
    rating: 4.6,
    reviewCount: 97,
    image: "https://www.ironaccents.com/cdn/shop/files/19-NDE1372_1200x.jpg?v=1719424145",
    category: "Lighting",
    badge: "Sale" as const,
    description: "Brushed brass body with a linen shade. Warm, diffused ambient light.",
  },
  {
    id: "p5",
    name: "Merino Wool Cushion",
    price: 78,
    rating: 4.8,
    reviewCount: 203,
    image: "https://cb2.scene7.com/is/image/CB2/AdleyChcGyMrnWlPllwCvr20SHF25?$web_pdp_main_carousel_med$",
    category: "Textiles",
    description: "Extra-fine merino fill with a woven cover. Plush and temperature-regulating.",
  },
  {
    id: "p6",
    name: "Smoked Glass Carafe",
    price: 52,
    rating: 4.5,
    reviewCount: 118,
    image: "http://casaamarosa.com/cdn/shop/files/3f6048d6-ac65-4c50-bc1f-1e7cb07563f8.webp?v=1739945721&width=2048",
    category: "Kitchen",
    badge: "New" as const,
    description: "Mouth-blown borosilicate glass with a cork stopper. Elegant on any table.",
  },
];

const categories = [
  {
    id: "c1",
    name: "Home Decor",
    count: 48,
    image: "https://i.etsystatic.com/25023670/r/il/5927f8/5287041275/il_fullxfull.5287041275_p0jl.jpg",
    color: "from-amber-50 to-orange-50",
  },
  {
    id: "c2",
    name: "Textiles",
    count: 36,
    image: "https://i.etsystatic.com/25023670/r/il/5927f8/5287041275/il_fullxfull.5287041275_p0jl.jpg",
    color: "from-sky-50 to-indigo-50",
  },
  {
    id: "c3",
    name: "Kitchen",
    count: 52,
    image: "https://assets.vogue.com/photos/6837010b912fb6fc4a21a186/4:3/w_2776,h_2082,c_limit/Vintage%20Guatemalan%20Textiles%202%20Molly%20Berry.jpg",
    color: "from-emerald-50 to-teal-50",
  },
  {
    id: "c4",
    name: "Lighting",
    count: 24,
    image: "https://hips.hearstapps.com/hmg-prod/images/bcacfded-198f-4492-899c-da0e4457a247.jpg",
    color: "from-violet-50 to-purple-50",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Mara Jensen",
    location: "Copenhagen",
    avatar: "https://www.rmcad.edu/wp-content/uploads/2024/07/shutterstock_600343619-scaled.jpg",
    rating: 5,
    text: "Every piece I have ordered from Lumière has exceeded my expectations. The ceramic vase is a centerpiece in my living room and I get compliments every week.",
  },
  {
    id: "t2",
    name: "Oliver Reyes",
    location: "Barcelona",
    avatar: "https://www.myprivia.com/sites/default/files/2025-04/flsp_Oliver_Reyes.jpg",
    rating: 5,
    text: "The quality is genuinely exceptional. I bought the walnut serving board as a gift and the recipient was blown away. Packaging was beautiful too.",
  },
  {
    id: "t3",
    name: "Suki Tanaka",
    location: "Tokyo",
    avatar: "https://covers.libro.fm/9781792227080_1120.jpg",
    rating: 5,
    text: "Lumière has completely transformed how I think about my home. The curation is impeccable — everything works together without feeling matchy.",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on all orders over $75, worldwide.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not in love? Return anything within 30 days, no questions asked.",
  },
  {
    icon: Shield,
    title: "Lifetime Guarantee",
    description: "We stand behind every product we sell. Quality is our promise.",
  },
  {
    icon: Sparkles,
    title: "Expert Curation",
    description: "Every item is hand-selected by our team of design specialists.",
  },
];

const badgeStyles: Record<string, string> = {
  New: "bg-emerald-100 text-emerald-700",
  Sale: "bg-rose-100 text-rose-700",
  Bestseller: "bg-amber-100 text-amber-700",
  Limited: "bg-violet-100 text-violet-700",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">({count})</span>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3C/svg%3E";
          }}
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeStyles[product.badge] ?? ""}`}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-rose-500 text-rose-500" : "text-slate-500"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed flex-1">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice != null && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="bg-[#FAFAF8] overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center">
        {/* Background texture */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-[#FAFAF8] to-amber-50/40 pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-100/30 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Summer Collection 2025
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight text-balance"
            >
              Objects worth
              <br />
              <span className="text-indigo-600">living with.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 leading-relaxed max-w-md text-pretty"
            >
              {APP_TAGLINE}. We source artisan-crafted homeware, textiles, and
              kitchen essentials that bring quiet beauty to everyday life.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap">
              <Link
                href={PRIMARY_CTA.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-[0_4px_14px_rgba(99,102,241,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {PRIMARY_CTA.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-300 hover:bg-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Our Story
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-6 pt-2"
            >
              {[
                { value: "4,800+", label: "Happy customers" },
                { value: "98%", label: "5-star reviews" },
                { value: "120+", label: "Curated products" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-slate-900 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right image collage */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg ml-auto">
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.04),0_20px_60px_-12px_rgba(0,0,0,0.18)]">
                <img
                  src="https://www.mythirdandmain.com/cdn/shop/files/about_curated_home_decor_collections.jpg?v=1769810794&width=320"
                  alt="Curated homeware collection"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23e2e8f0'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-4 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.14)] border border-black/5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">Trusted by thousands</p>
                  <p className="text-xs text-slate-500">4.9 average rating</p>
                </div>
              </motion.div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4, ease: "easeOut" }}
                className="absolute -top-4 -right-4 bg-indigo-600 text-white rounded-2xl px-4 py-2.5 shadow-lg"
              >
                <p className="text-xs font-bold">New arrivals</p>
                <p className="text-xs opacity-80">Every week</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ───────────────────────────────────────────────────── */}
      <section className="border-y border-black/5 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {valueProps.map((vp) => {
            const Icon = vp.icon;
            return (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                className="flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4.5 h-4.5 text-indigo-600 w-[18px] h-[18px]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{vp.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    {vp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                  Browse by category
                </p>
                <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight text-balance">
                  Find your aesthetic
                </h2>
              </div>
              <Link
                href="#products"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
              >
                All products <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Asymmetric grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <motion.a
                  key={cat.id}
                  href="#products"
                  variants={scaleIn}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className={`group relative rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] cursor-pointer ${
                    i === 0 ? "lg:row-span-2 aspect-[3/4] lg:aspect-auto" : "aspect-[4/3]"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm">{cat.name}</p>
                    <p className="text-white/70 text-xs">{cat.count} products</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section id="products" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-xl mx-auto">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                Featured products
              </p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight text-balance mb-4">
                Pieces we love right now
              </h2>
              <p className="text-slate-500 leading-relaxed text-pretty">
                A rotating selection of our team's current favorites. Thoughtfully made,
                built to last, and beautiful in any home.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold text-sm hover:bg-indigo-600 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                View all 120+ products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── About / Brand Story ───────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_2px_4px_rgba(0,0,0,0.2),0_24px_64px_-12px_rgba(0,0,0,0.5)]">
                <img
                  src="https://blooloop.com/media-library/atelier-des-lumieres-japan-waves.jpg?id=56454334&width=1245&height=700&coordinates=0%2C88%2C0%2C89"
                  alt="Lumière atelier and curation process"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='625' viewBox='0 0 500 625'%3E%3Crect width='500' height='625' fill='%231e293b'/%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              {/* Floating stat */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-6 top-1/3 bg-indigo-600 rounded-2xl p-5 shadow-xl"
              >
                <p className="text-3xl font-bold text-white">12+</p>
                <p className="text-indigo-200 text-xs mt-0.5">Countries sourced</p>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-indigo-400 uppercase tracking-widest"
              >
                Our story
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight text-balance"
              >
                Beauty in the details, always.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed text-pretty"
              >
                Lumière was founded in 2019 by a team of designers and makers who believed
                that the objects we surround ourselves with shape how we feel. We travel to
                artisan workshops across Europe, Japan, and Scandinavia to find pieces made
                with genuine craft and intention.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed text-pretty"
              >
                Every product in our collection is tested in our own homes before it reaches
                yours. We ask one question: does this make daily life more beautiful? If the
                answer is yes, it earns a place in the Lumière edit.
              </motion.p>
              <motion.ul variants={staggerContainer} className="flex flex-col gap-3 mt-2">
                {[
                  "Sourced from independent artisan makers",
                  "Sustainable materials and ethical production",
                  "Designed to last a lifetime, not a season",
                ].map((point) => (
                  <motion.li
                    key={point}
                    variants={fadeInUp}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-indigo-400" />
                    </span>
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-indigo-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-lg mx-auto">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                Customer love
              </p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight text-balance">
                What our customers say
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`bg-white rounded-2xl p-6 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] flex flex-col gap-4 ${
                    i === 1 ? "md:-mt-4 md:mb-4" : ""
                  }`}
                >
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed flex-1 text-pretty">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover border border-black/5"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Crect width='36' height='36' fill='%23e2e8f0' rx='18'/%3E%3C/svg%3E";
                      }}
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl overflow-hidden bg-indigo-600 px-8 py-16 md:px-16 md:py-20 text-center"
          >
            {/* Background glow */}
            <div
              aria-hidden
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 rounded-full blur-3xl pointer-events-none"
            />
            <div className="relative flex flex-col items-center gap-6 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Join the Lumière community
              </span>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white tracking-tight text-balance">
                First to know. First to shop.
              </h2>
              <p className="text-indigo-200 leading-relaxed text-pretty">
                Subscribe for early access to new arrivals, exclusive member discounts,
                and design inspiration delivered to your inbox.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-indigo-700 font-semibold text-sm"
                >
                  <Check className="w-4 h-4" />
                  You&apos;re on the list. Welcome!
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-indigo-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15 transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600 whitespace-nowrap"
                  >
                    Subscribe free
                  </button>
                </form>
              )}

              <p className="text-indigo-300 text-xs">
                No spam, ever. Unsubscribe in one click.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}