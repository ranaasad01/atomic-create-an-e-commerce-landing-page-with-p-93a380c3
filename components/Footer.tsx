"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Mail, ArrowRight } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "#products" },
    { label: "Bestsellers", href: "#products" },
    { label: "Sale", href: "#products" },
    { label: "All Products", href: "#products" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Sustainability", href: "#about" },
    { label: "Press", href: "#about" },
    { label: "Careers", href: "#about" },
  ],
  Support: [
    { label: "FAQ", href: "#newsletter" },
    { label: "Shipping & Returns", href: "#newsletter" },
    { label: "Track Order", href: "#newsletter" },
    { label: "Contact Us", href: "#newsletter" },
  ],
};

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg"
            >
              <span className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </span>
              <span className="font-playfair text-xl font-bold text-white tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
              {APP_TAGLINE}. We source the finest products from around the world
              so you can live beautifully, every day.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={fadeInUp}>
              <h3 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Privacy Policy</span>
            <span className="w-px h-3 bg-white/10" />
            <span>Terms of Service</span>
            <span className="w-px h-3 bg-white/10" />
            <span>Cookie Settings</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}