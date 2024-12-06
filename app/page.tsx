import { HeroSection } from "@/components/sections/hero";
import { LogoSection } from "@/components/sections/logos";
import { FeaturesSection } from "@/components/sections/features";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LogoSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}