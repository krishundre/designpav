"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Mail, ArrowRight, Compass } from "lucide-react";
import Badge from "./Badge";
import Glow from "./Glow";
import AnimatedButton from "./AnimatedButton";
import BlurText from "./reactbits/BlurText";

/* ── Animation variants ─────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

export default function Hero() {
  const shouldReduce = useReducedMotion();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="main-content"
      aria-label="DesignPav Introduction"
      className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 min-h-screen"
    >
      <motion.div
        className="flex flex-col items-center text-center gap-8 w-full"
        style={{ maxWidth: 800 }}
        variants={containerVariants}
        initial={shouldReduce ? "visible" : "hidden"}
        animate="visible"
      >
        {/* ── Logo ──────────────────────────────────────────────────── */}
        <motion.div
          variants={logoVariants}
          className="relative"
        >
          {/* Halo ring around logo */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(109,94,248,0.18) 0%, transparent 70%)",
              filter: "blur(25px)",
              transform: "scale(1.5)",
            }}
            animate={
              shouldReduce
                ? {}
                : { opacity: [0.5, 1, 0.5], scale: [1.4, 1.6, 1.4] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating logo */}
          <motion.div
            animate={
              shouldReduce
                ? {}
                : {
                    y: [0, -8, -3, -6, 0],
                    rotate: [0, 1, -0.5, 0.5, 0],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <Image
              src="/logo.png"
              alt="DesignPav Logo"
              width={140}
              height={140}
              priority
              style={{
                objectFit: "contain",
                width: "140px",
                height: "auto",
                filter: "drop-shadow(0 0 24px rgba(109,94,248,0.35)) drop-shadow(0 0 48px rgba(109,94,248,0.15))",
              }}
            />
          </motion.div>
        </motion.div>

        {/* ── Badge ─────────────────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <Badge />
        </motion.div>

        {/* ── Heading + glow ────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col items-center w-full"
        >
          {/* Glow behind heading */}
          <Glow />

          <h1
            className="relative font-bold leading-tight tracking-tight max-w-3xl"
            style={{
              fontSize: "clamp(2.25rem, 6.2vw, 3.85rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            We Design & Build <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #6D5EF8 0%, #8A7CFF 40%, #c1ef18 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block",
              }}
            >
              Premium Digital Experiences
            </span>
          </h1>
        </motion.div>

        {/* ── Description ───────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <p
            className="leading-relaxed mx-auto"
            style={{
              fontSize: "clamp(0.95rem, 2.2vw, 1.08rem)",
              color: "#A1A1AA",
              maxWidth: 580,
              lineHeight: 1.75,
            }}
          >
            DesignPav is a premium creative studio crafting bespoke websites, scalable web applications, and powerful digital brand assets for forward-thinking brands.
          </p>
        </motion.div>

        {/* ── CTA Buttons ───────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full"
          role="group"
          aria-label="Action buttons"
        >
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="w-full sm:w-auto"
          >
            <AnimatedButton
              id="start-project-btn"
              variant="primary"
              icon={<ArrowRight size={15} aria-hidden="true" />}
            >
              Start Project
            </AnimatedButton>
          </a>

          <a
            href="#work"
            onClick={(e) => handleScrollTo(e, "#work")}
            className="w-full sm:w-auto"
          >
            <AnimatedButton
              id="view-work-btn"
              variant="secondary"
              icon={<Compass size={15} aria-hidden="true" />}
            >
              View Work
            </AnimatedButton>
          </a>
        </motion.div>

        {/* ── Subtle scroll indicator ───────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 pt-6"
          aria-hidden="true"
        >
          <div
            className="w-px h-12 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(109,94,248,0.6), transparent)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
