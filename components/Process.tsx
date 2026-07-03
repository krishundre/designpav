"use client";

import { motion } from "framer-motion";
import SpotlightCard from "./reactbits/SpotlightCard";
import BlurText from "./reactbits/BlurText";

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    description:
      "We dive deep into your brand, target audience, and business goals to map out a clear project outline and timeline.",
  },
  {
    num: "02",
    title: "Design & Prototyping",
    description:
      "We build pixel-perfect user interfaces and interactive prototypes, refining every micro-interaction and element.",
  },
  {
    num: "03",
    title: "Engineering & Motion",
    description:
      "We transform the designs into robust, responsive codebases utilizing Next.js, Framer Motion, and top-tier SEO standards.",
  },
  {
    num: "04",
    title: "Launch & Optimization",
    description:
      "We launch your digital product on high-speed servers, complete performance profiling, and implement analytics integrations.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 px-6 overflow-hidden">
      {/* Visual background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex justify-around">
        <div className="w-px h-full bg-white" />
        <div className="w-px h-full bg-white hidden sm:block" />
        <div className="w-px h-full bg-white hidden md:block" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6D5EF8] px-3 py-1 rounded-full bg-[#6D5EF8]/10 border border-[#6D5EF8]/20">
            Our Method
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
            <BlurText text="A structured, collaborative approach to your project." animateBy="words" />
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-lg leading-relaxed">
            From initial research and wireframing all the way to launch, we keep you aligned and engaged at every step.
          </p>
        </div>

        {/* Timeline cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <SpotlightCard className="h-full p-6 flex flex-col gap-4 border border-white/5 bg-[#0F0F0F]/40 backdrop-blur-sm">
                  {/* Step Number */}
                  <span
                    className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-[#6D5EF8] to-[#c1ef18] bg-clip-text text-transparent select-none"
                    style={{ lineHeight: 1 }}
                  >
                    {step.num}
                  </span>

                  {/* Title & Desc */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">{step.title}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">{step.description}</p>
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
