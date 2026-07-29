// src/pages/Home.jsx

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import FloatingMenu from "../components/FloatingMenu";

function Home() {
  return (
    <div className="bg-slate-50 text-slate-900 overflow-x-hidden">

      <Navbar />

      <main className="flex flex-col">

        {/* HERO SECTION */}
        <section className="pt-20">
          <HeroSection />
        </section>

        {/* DIVIDER */}
        <div className="max-w-7xl mx-auto w-full px-8">
          <hr className="border-slate-200" />
        </div>

        {/* FEATURES SECTION */}
        <section className="py-24">
          <FeaturesSection />
        </section>

        {/* DIVIDER */}
        <div className="max-w-7xl mx-auto w-full px-8">
          <hr className="border-slate-200" />
        </div>

        {/* ABOUT SECTION */}
        <section className="py-24">
          <AboutSection />
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-white mt-16">
          <Footer />
        </footer>

      </main>

      <FloatingMenu />

    </div>
  );
}

export default Home;