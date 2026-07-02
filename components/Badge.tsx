"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Badge() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2"
      aria-label="Creative Digital Studio"
    >
      <span
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
        style={{
          background: "rgba(109,94,248,0.12)",
          border: "1px solid rgba(109,94,248,0.30)",
          color: "#A1A1AA",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          letterSpacing: "0.12em",
        }}
      >
        {/* Shimmer dot */}
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #6D5EF8, #c1ef18)",
            boxShadow: "0 0 6px rgba(109,94,248,0.8)",
          }}
          aria-hidden="true"
        />
        Creative Digital Studio
      </span>
    </motion.div>
  );
}
