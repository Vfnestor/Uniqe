import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/home/Hero";
import Ecosystem from "@/components/home/Ecosystem";
import Manifesto from "@/components/home/Manifesto";
import Footer from "@/components/home/Footer";

import "@/components/navigation/navbar.css";
import "@/components/home/hero.css";
import "@/components/home/ecosystem.css";
import "@/components/home/manifesto.css";
import "@/components/home/footer.css";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="site-main">
        <Hero />
        <Ecosystem />
        <Manifesto />
      </main>

      <Footer />
    </>
  );
}