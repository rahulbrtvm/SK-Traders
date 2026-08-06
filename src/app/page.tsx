import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ProductGallery from "@/components/sections/ProductGallery";
import SpecialOffers from "@/components/sections/SpecialOffers";
import ContactForm from "@/components/sections/ContactForm";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <ProductGallery />
        <SpecialOffers />
        <ContactForm />
      </main>

      <footer className="bg-secondary text-white py-8 border-t border-white/5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} SK Traders. All rights reserved.
          </p>
          <Link
            href="/admin/login"
            className="text-white/20 hover:text-white/50 transition-colors p-1.5 rounded-full hover:bg-white/5"
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <Lock size={14} />
          </Link>
        </div>
      </footer>
    </div>
  );
}


