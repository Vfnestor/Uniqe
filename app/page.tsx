import Hero from "@/components/home/Hero";
import Ecosystem from "@/components/home/Ecosystem";
import Manifesto from "@/components/home/Manifesto";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ecosystem />
      <Manifesto />
      <Footer />
    </main>
  );
}