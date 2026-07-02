"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Glow() {
  const shouldReduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        width: 600,
        height: 300,
      }}
    >
      {/* Outer diffuse glow */}
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(109,94,248,0.28) 0%, rgba(109,94,248,0.10) 45%, transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={
          shouldReduce
            ? {}
            : {
                opacity: [0.6, 1, 0.6],
                scaleX: [1, 1.12, 1],
                scaleY: [1, 0.92, 1],
              }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner bright core */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 220,
          height: 110,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(138,124,255,0.50) 0%, transparent 65%)",
          filter: "blur(28px)",
          transform: "translate(-50%, -50%)",
        }}
        animate={
          shouldReduce
            ? {}
            : {
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.18, 1],
              }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}
