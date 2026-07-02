"use client";

import { useReducedMotion } from "framer-motion";
import Particles from "./Particles";

export default function Background() {
  const shouldReduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0"
      style={{ zIndex: 0, background: "#050505", pointerEvents: "none" }}
    >
      {/* Full-viewport Particles — pointer-events: auto so hover interaction works */}
      <div className="absolute inset-0" style={{ pointerEvents: "auto" }}>
        <Particles
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleColors={["#6D5EF8", "#8A7CFF", "#A89FFF", "#c1ef18", "#ffffff"]}
          moveParticlesOnHover={true}
          particleHoverFactor={1}
          alphaParticles={true}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={shouldReduce ?? false}
          pixelRatio={1}
        />
      </div>
    </div>
  );
}
