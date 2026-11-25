"use client";

import { useEffect, useRef } from "react";

const ITEMS = ["Websites", "Web apps", "Brand identity", "UI / UX", "Ecommerce", "Landing pages", "Motion"];

/** Service ticker that speeds up and leans with scroll velocity. Hover to pause. */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let lastY = window.scrollY;
    let boost = 0;
    let paused = false;
    let raf = 0;

    const loop = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      boost += (dy - boost) * 0.1;
      const speed = paused ? 0 : 1.2 + Math.min(Math.abs(boost) * 0.6, 14);
      x -= speed * (boost < -0.5 ? -1 : 1);
      const half = track.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      const skew = Math.max(-12, Math.min(12, boost * 0.5));
      track.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const enter = () => (paused = true);
    const leave = () => (paused = false);
    track.addEventListener("pointerenter", enter);
    track.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerenter", enter);
      track.removeEventListener("pointerleave", leave);
    };
  }, []);

  const row = (copy: number) =>
    ITEMS.map((t) => (
    <span key={`${copy}-${t}`} className="cs-mq-item">
      {t}
      <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
        <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6L12 17.2l-6.2 4.5 2.4-7.6L2 9.6h7.6z" fill="currentColor" />
      </svg>
    </span>
    ));

  return (
    <div className="cs-marquee" aria-label="Services: websites, web apps, brand identity, UI and UX, ecommerce, landing pages, motion">
      <div ref={trackRef} className="cs-mq-track" aria-hidden="true">
        {row(1)}
        {row(2)}
      </div>
    </div>
  );
}
