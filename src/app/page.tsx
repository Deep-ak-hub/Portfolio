import Header from "@/components/Header";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#121212] select-none">
      <Header />
      <ScrollyCanvas />
      {/* Overlap hero sentinel so Projects enters as the canvas handoff finishes */}
      <Projects className="-mt-[120svh]" />
      <Footer />
    </main>
  );
}

