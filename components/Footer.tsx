"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Footer() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.footer
      initial={shouldReduce ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.4 }}
      className="relative z-10 pb-8 pt-4"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Separator line */}
      <div
        className="max-w-2xl mx-auto mb-6 px-6"
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Copyright */}
        <p
          className="text-sm"
          style={{ color: "#52525B" }}
        >
          © 2026 DesignPav. All Rights Reserved.
        </p>

        {/* Email link */}
        <a
          href="mailto:chef@designpav.in"
          aria-label="Send email to chef@designpav.in"
          className="group inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
          style={{ color: "#71717A" }}
        >
          <Mail
            size={13}
            aria-hidden="true"
            className="transition-colors duration-200"
            style={{ color: "#6D5EF8" }}
          />
          <span className="group-hover:text-white transition-colors duration-200">
            chef@designpav.in
          </span>
        </a>
      </div>
    </motion.footer>
  );
}
