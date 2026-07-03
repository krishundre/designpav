"use client";

import { motion, useReducedMotion } from "framer-motion";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  duration?: number;
}

export default function BlurText({
  text,
  delay = 0,
  className = "",
  animateBy = "words",
  duration = 0.6,
}: BlurTextProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <span className={className}>{text}</span>;
  }

  const items = animateBy === "words" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animateBy === "words" ? 0.08 : 0.02,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 10,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {items.map((item, idx) => (
        <motion.span
          key={idx}
          variants={itemVariants}
          className="inline-block"
          style={{
            marginRight: animateBy === "words" ? "0.25em" : "0.01em",
            whiteSpace: "pre",
          }}
        >
          {item}
        </motion.span>
      ))}
    </motion.span>
  );
}
