import Hero from "@/components/home/Hero";
import Ecosystem from "@/components/home/Ecosystem";
import Vision from "@/components/home/Vision";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LatestUpdates from "@/components/home/LatestUpdates";
import Manifesto from "@/components/home/Manifesto";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <Ecosystem />

      <Vision />

      <FeaturedProjects />

      <LatestUpdates />

      <Manifesto />

      <Footer />
    </main>
  );
}