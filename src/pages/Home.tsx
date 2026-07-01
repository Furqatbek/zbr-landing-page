import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Restaurants } from "../components/sections/Restaurants";
import { WhyZBR } from "../components/sections/WhyZBR";
import { FoundingPerks } from "../components/sections/FoundingPerks";
import { PartnersCouriers } from "../components/sections/PartnersCouriers";
import { FAQ } from "../components/sections/FAQ";
import { FinalCta } from "../components/sections/FinalCta";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Nav dark={false} transparent={false} />
      <Hero />
      <HowItWorks />
      <Restaurants />
      <WhyZBR />
      <FoundingPerks />
      <PartnersCouriers />
      <FAQ />
      <FinalCta />
      <Footer />
    </>
  );
}
