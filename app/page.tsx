import Background from "@/components/Background";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      {/* Immersive animated background */}
      <Background />

      {/* Hero content */}
      <Hero />

      {/* Footer */}
      <Footer />
    </main>
  );
}
