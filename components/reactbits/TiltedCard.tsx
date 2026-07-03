"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotate?: number;
  scaleOnHover?: number;
}

export default function TiltedCard({
  children,
  className = "",
  maxRotate = 12,
  scaleOnHover = 1.02,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  // Framer Motion values for 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out mouse tracking with springs
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxRotate, -maxRotate]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxRotate, maxRotate]), {
    damping: 20,
    stiffness: 150,
  });

  const scale = useSpring(1, { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduce) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card center normalized between -0.5 and 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    if (shouldReduce) return;
    scale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    if (shouldReduce) return;
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        style={{
          rotateX: shouldReduce ? 0 : rotateX,
          rotateY: shouldReduce ? 0 : rotateY,
          scale: shouldReduce ? 1 : scale,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
