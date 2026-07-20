import Loader from "@/components/sections/Loader";
import Hero from "@/components/sections/Hero";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Manifesto from "@/components/sections/Manifesto";
import Books from "@/components/sections/Books";
import Stats from "@/components/sections/Stats";
import WhatYouBuild from "@/components/sections/WhatYouBuild";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <main>
        <Hero />
        <MarqueeSection />
        <Manifesto />
        <Books />
        <Stats />
        <WhatYouBuild />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
