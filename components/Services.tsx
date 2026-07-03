"use client";

import { motion } from "framer-motion";
import { Paintbrush, Code2, Sparkles, LayoutGrid } from "lucide-react";
import SpotlightCard from "./reactbits/SpotlightCard";
import BlurText from "./reactbits/BlurText";

const services = [
  {
    icon: Paintbrush,
    title: "Premium Web Design",
    description:
      "Stunning layouts that capture attention. We build tailored, conversion-focused user interfaces with dark mode capabilities and rich animations.",
    color: "#6D5EF8",
  },
  {
    icon: Code2,
    title: "Web & App Development",
    description:
      "High-performance Next.js, React, and Tailwind CSS development. Clean, type-safe code architectures optimized for speed, SEO, and scalability.",
    color: "#c1ef18",
  },
  {
    icon: Sparkles,
    title: "Brand Strategy & Design",
    description:
      "Memorable brand identities, logos, custom iconography, design systems, and visual guidelines that align your business with top-tier aesthetics.",
    color: "#8A7CFF",
  },
  {
    icon: LayoutGrid,
    title: "SaaS & Product Design",
    description:
      "User-friendly software dashboards and mobile app mockups. We streamline complex workflows into elegant, intuitive digital products.",
    color: "#A89FFF",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden">
      {/* Subtle Background Glows */}
      <div
        className="absolute top-1/4 left-0 w-72 h-72 rounded-full pointer-events-none opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #6D5EF8 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full pointer-events-none opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #c1ef18 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6D5EF8] px-3 py-1 rounded-full bg-[#6D5EF8]/10 border border-[#6D5EF8]/20">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
            <BlurText text="Crafting digital products that elevate your business." animateBy="words" />
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-lg leading-relaxed">
            We merge premium design aesthetics with cutting-edge front-end engineering to deliver exceptional web experiences.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <SpotlightCard className="h-full p-8 flex flex-col gap-5 border border-white/5 bg-zinc-950/60 backdrop-blur-sm">
                  {/* Icon Frame */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300"
                    style={{
                      background: `rgba(255, 255, 255, 0.02)`,
                      borderColor: "rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <IconComponent
                      size={22}
                      style={{ color: service.color }}
                      className="filter drop-shadow-[0_0_8px_rgba(109,94,248,0.3)]"
                    />
                  </div>

                  {/* Title & Desc */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-400">{service.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
