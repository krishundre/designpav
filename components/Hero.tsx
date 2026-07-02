"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import Badge from "./Badge";
import Glow from "./Glow";
import AnimatedButton from "./AnimatedButton";

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

  return (
    <section
      id="main-content"
      aria-label="DesignPav Coming Soon"
      className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 min-h-screen"
    >
      <motion.div
        className="flex flex-col items-center text-center gap-8 w-full"
        style={{ maxWidth: 700 }}
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
                    y: [0, -10, -4, -8, 0],
                    rotate: [0, 1.5, -0.5, 1, 0],
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
              alt="DesignPav logo — Creative Digital Studio"
              width={160}
              height={160}
              priority
              style={{
                objectFit: "contain",
                width: "160px",
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
          className="relative flex flex-col items-center"
        >
          {/* Glow behind heading */}
          <Glow />

          <h1
            className="relative font-bold leading-tight tracking-tight"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 3.25rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            {/* Gradient text for 'Exceptional' */}
            We&apos;re Building Something{" "}
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
              Exceptional.
            </span>
          </h1>
        </motion.div>

        {/* ── Description ───────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <p
            className="leading-relaxed"
            style={{
              fontSize: "clamp(0.95rem, 2.2vw, 1.08rem)",
              color: "#A1A1AA",
              maxWidth: 560,
              lineHeight: 1.75,
            }}
          >
            DesignPav is crafting a premium digital experience focused on
            designing modern websites, scalable web applications, and powerful
            online brands.
          </p>
          <p
            className="leading-relaxed"
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
              color: "#71717A",
            }}
          >
            We&apos;re currently putting the finishing touches on our new home.
          </p>
        </motion.div>

        {/* ── CTA Buttons ───────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          role="group"
          aria-label="Call to action buttons"
        >
          <AnimatedButton
            id="contact-us-btn"
            variant="primary"
            href="mailto:chef@designpav.in"
            icon={<Mail size={15} aria-hidden="true" />}
          >
            Contact Us
          </AnimatedButton>

          <AnimatedButton
            id="view-portfolio-btn"
            variant="secondary"
            disabled
            tooltip="Launching Soon"
            icon={<ExternalLink size={15} aria-hidden="true" />}
          >
            View Portfolio
          </AnimatedButton>
        </motion.div>

        {/* ── Subtle scroll indicator ───────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 pt-4"
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
