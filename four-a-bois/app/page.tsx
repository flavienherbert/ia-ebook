import Hero from "@/components/Hero";
import Spirit from "@/components/Spirit";
import MenuSection from "@/components/menu/MenuSection";
import DrinksSection from "@/components/DrinksSection";
import PracticalInfo from "@/components/PracticalInfo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";

export default function Home() {
  return (
    <>
      <main className="pb-16 sm:pb-0">
        <Hero />
        <Spirit />
        <MenuSection />
        <DrinksSection />
        <PracticalInfo />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
