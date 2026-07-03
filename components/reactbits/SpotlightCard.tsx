"use client";

import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
  borderGlowColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(109, 94, 248, 0.12)",
  spotlightRadius = 300,
  borderGlowColor = "rgba(109, 94, 248, 0.35)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/8 bg-[#0F0F0F] transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Background Spotlight Layer */}
      {isFocused && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Border Spotlight Glow Layer */}
      {isFocused && (
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl border transition-all duration-300"
          style={{
            borderColor: "transparent",
            background: `radial-gradient(${spotlightRadius / 1.5}px circle at ${coords.x}px ${coords.y}px, ${borderGlowColor}, transparent 80%)`,
            maskImage: "linear-gradient(black, black) exclude, linear-gradient(black, black)",
            WebkitMaskImage: "linear-gradient(black, black) exclude, linear-gradient(black, black)",
            maskComposite: "exclude",
            WebkitMaskComposite: "destination-out",
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
