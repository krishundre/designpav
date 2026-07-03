"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TiltedCard from "./reactbits/TiltedCard";
import BlurText from "./reactbits/BlurText";

const projects = [
  {
    title: "Aether Dashboard",
    category: "SaaS Product Design",
    description: "A minimalist telemetry dashboard with glowing data visualizers and sleek high-fidelity analytics widgets.",
    image: "/aether_mockup.png",
    link: "#",
    tags: ["UI/UX", "Next.js", "WebGL"],
  },
  {
    title: "Helix Apparel",
    category: "Luxury E-Commerce",
    description: "An immersive digital catalog featuring streetwear items, modern micro-interactions, and flawless checkout systems.",
    image: "/helix_mockup.png",
    link: "#",
    tags: ["Branding", "React", "Tailwind"],
  },
  {
    title: "Zenith Web3 Hub",
    category: "Marketing Landing Page",
    description: "A futuristic promotional website utilizing 3D render designs and vibrant neon components for a blockchain platform.",
    image: "/zenith_mockup.png",
    link: "#",
    tags: ["Creative Dev", "Framer Motion"],
  },
];

export default function Work() {
  return (
    <section id="work" className="relative py-24 px-6 bg-zinc-950/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="flex flex-col gap-4 max-w-lg">
            <span className="self-start text-xs font-semibold uppercase tracking-widest text-[#6D5EF8] px-3 py-1 rounded-full bg-[#6D5EF8]/10 border border-[#6D5EF8]/20">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              <BlurText text="Selected projects crafted with pixel-perfect details." animateBy="words" />
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm sm:text-base leading-relaxed">
            Take a look at how we combine creative brand concepts with robust code systems to deliver results.
          </p>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-16">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Left: Tilted Image Card */}
                <div className="w-full lg:w-3/5">
                  <TiltedCard maxRotate={6} scaleOnHover={1.01}>
                    <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                      {/* Interactive overlay hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />
                      <div className="absolute inset-0 bg-[#6D5EF8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </TiltedCard>
                </div>

                {/* Right: Project Info */}
                <div className="w-full lg:w-2/5 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#c1ef18]">
                      {project.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full border border-white/5 bg-white/5 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link Button */}
                  <div className="pt-2">
                    <a
                      href={project.link}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#6D5EF8] transition-colors"
                    >
                      Explore Project
                      <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#6D5EF8] group-hover:bg-[#6D5EF8]/5 transition-all">
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
