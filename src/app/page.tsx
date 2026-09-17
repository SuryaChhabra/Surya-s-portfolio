import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { Work } from "@/components/Work";
import { Events } from "@/components/Events";
import { Timeline } from "@/components/Timeline";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <Events />
        <Timeline />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
