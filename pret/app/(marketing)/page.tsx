import Nav from "./_components/Nav";
import Hero from "./_components/Hero";
import Problem from "./_components/Problem";
import HowItWorks from "./_components/HowItWorks";
import Features from "./_components/Features";
import AnomalyShowcase from "./_components/AnomalyShowcase";
import Pricing from "./_components/Pricing";
import Faq from "./_components/Faq";
import Footer from "./_components/Footer";

export default function MarketingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <AnomalyShowcase />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
