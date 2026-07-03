import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      {/* Dynamic noise and animated background */}
      <div className="noise-overlay" aria-hidden="true" />
      <Background />

      {/* Floating navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <Hero />

        {/* Services / Expertise */}
        <Services />

        {/* Portfolio Showcase */}
        <Work />

        {/* Step-by-Step Process */}
        <Process />

        {/* Conversational Contact Form */}
        <ContactForm />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
