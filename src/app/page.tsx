import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import ProductGallery from "@/components/sections/ProductGallery";
import SpecialOffers from "@/components/sections/SpecialOffers";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductGallery />
        <SpecialOffers />
        <ContactForm />
      </main>


      <footer className="bg-secondary text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} SK Traders. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

