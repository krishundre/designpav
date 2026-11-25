"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide pointer effects:
 * - custom cursor (dot + ring that grows over interactive things) on mouse/trackpad devices
 * - magnetic pull on [data-magnetic]
 * - 3D tilt on [data-tilt]
 * - scroll reveal on [data-reveal]
 */
export default function Effects() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".cs-root");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // Scroll reveal: anything whose top has entered the viewport (or been scrolled past) appears.
    root.classList.add("cs-js");
    let pending = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    let revealRaf = 0;
    const reveal = () => {
      revealRaf = 0;
      const limit = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (reduce || el.getBoundingClientRect().top < limit) {
          el.classList.add("is-in");
          return false;
        }
        return true;
      });
    };
    const queueReveal = () => {
      if (!revealRaf) revealRaf = requestAnimationFrame(reveal);
    };
    reveal();
    window.addEventListener("scroll", queueReveal, { passive: true });
    window.addEventListener("resize", queueReveal);
    cleanups.push(() => {
      cancelAnimationFrame(revealRaf);
      window.removeEventListener("scroll", queueReveal);
      window.removeEventListener("resize", queueReveal);
    });

    if (!reduce && fine) {
      // Magnetic buttons (delegated so new buttons work too)
      let magnet: HTMLElement | null = null;
      const onMove = (e: PointerEvent) => {
        const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
        if (magnet && magnet !== target) {
          magnet.style.transform = "";
          magnet = null;
        }
        if (target) {
          magnet = target;
          const r = target.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          target.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
        }

        // Tilt cards
        const tilt = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-tilt]");
        root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
          if (el !== tilt) el.style.transform = "";
        });
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          tilt.style.transform = `perspective(900px) rotateX(${-py * 5}deg) rotateY(${px * 6}deg)`;
          tilt.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
          tilt.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
        }
      };
      const onLeave = () => {
        if (magnet) magnet.style.transform = "";
        root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => (el.style.transform = ""));
      };
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
      });

      // Custom cursor
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        root.classList.add("cs-has-cursor");
        let mx = -100;
        let my = -100;
        let rx = -100;
        let ry = -100;
        let raf = 0;
        const move = (e: PointerEvent) => {
          mx = e.clientX;
          my = e.clientY;
          const hot = (e.target as HTMLElement | null)?.closest("a, button, input, label, canvas, [data-tilt]");
          ring.classList.toggle("is-hot", !!hot);
        };
        const down = () => ring.classList.add("is-down");
        const up = () => ring.classList.remove("is-down");
        const loop = () => {
          rx += (mx - rx) * 0.18;
          ry += (my - ry) * 0.18;
          dot.style.transform = `translate(${mx}px, ${my}px)`;
          ring.style.transform = `translate(${rx}px, ${ry}px)`;
          raf = requestAnimationFrame(loop);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerdown", down);
        window.addEventListener("pointerup", up);
        raf = requestAnimationFrame(loop);
        cleanups.push(() => {
          cancelAnimationFrame(raf);
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerdown", down);
          window.removeEventListener("pointerup", up);
          root.classList.remove("cs-has-cursor");
        });
      }
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <>
      <div ref={dotRef} className="cs-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cs-cursor-ring" aria-hidden="true" />
    </>
  );
}
