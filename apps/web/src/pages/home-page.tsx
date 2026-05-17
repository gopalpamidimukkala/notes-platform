import { Navbar } from "@/components/layout/navbar";

import { HeroSection } from "@/components/home/hero-section";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <HeroSection />
    </div>
  );
}
