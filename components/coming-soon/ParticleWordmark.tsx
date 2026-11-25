"use client";

import { useEffect, useRef } from "react";

export type Spice = { name: string; radius: number; force: number; jitter: number };

export const SPICE_LEVELS: Spice[] = [
  { name: "Mild", radius: 70, force: 0.6, jitter: 0 },
  { name: "Medium", radius: 110, force: 1, jitter: 0.15 },
  { name: "Hot", radius: 150, force: 1.6, jitter: 0.5 },
  { name: "Extra hot", radius: 200, force: 2.4, jitter: 1.2 },
];

/** Fired by other components (e.g. the pav builder) to throw chillies onto the canvas. */
export const CHILLI_EVENT = "designpav:chillies";


type Particle = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; s: number; c: string };
type Chilli = { x: number; y: number; vx: number; vy: number; r: number; vr: number; s: number; life: number };

export default function ParticleWordmark({ spice, colours }: { spice: Spice; colours: readonly string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spiceRef = useRef(spice);
  const coloursRef = useRef(colours);
  const recolourRef = useRef<() => void>(() => {});

  useEffect(() => {
    spiceRef.current = spice;
  }, [spice]);

  useEffect(() => {
    coloursRef.current = colours;
    recolourRef.current();
  }, [colours]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!wrap || !cv || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let parts: Particle[] = [];
    let chillies: Chilli[] = [];
    let mouse = { x: -999, y: -999 };
    let raf = 0;

    const pick = () => {
      const c = coloursRef.current;
      return c[Math.floor(Math.random() * c.length)];
    };
    recolourRef.current = () => {
      for (const p of parts) p.c = pick();
      if (reduce) drawStatic();
    };

    const fontFamily = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--font-unbounded").trim() || "sans-serif";

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d");
      if (!o) return;
      const words = W < 560 ? ["DESIGN", "PAV"] : ["DESIGNPAV"];
      let fs = Math.min(W / (words[0].length * 0.78), H / (words.length * 1.25));
      o.font = `800 ${fs}px ${fontFamily()}`;
      // Shrink to fit: wide display fonts can overflow the estimate above.
      const widest = Math.max(...words.map((w) => o.measureText(w).width));
      if (widest > W * 0.92) {
        fs *= (W * 0.92) / widest;
        o.font = `800 ${fs}px ${fontFamily()}`;
      }
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillStyle = "#fff";
      words.forEach((w, i) => o.fillText(w, W / 2, H / 2 + (i - (words.length - 1) / 2) * fs * 1.05));

      const data = o.getImageData(0, 0, W, H).data;
      const step = Math.max(4, Math.round(W / 170));
      const old = parts;
      parts = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 128) {
            const prev = old[parts.length];
            parts.push({
              hx: x,
              hy: y,
              x: prev ? prev.x : Math.random() * W,
              y: prev ? prev.y : Math.random() * H,
              vx: 0,
              vy: 0,
              s: step * 0.42 + Math.random() * step * 0.25,
              c: pick(),
            });
          }
        }
      }
      if (reduce) drawStatic();
    };

    const addChilli = (x: number, y: number) => {
      if (chillies.length > 140) chillies.splice(0, 20);
      const a = Math.random() * Math.PI * 2;
      const v = 4 + Math.random() * 7;
      chillies.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, s: 0.7 + Math.random() * 0.6, life: 260 });
    };

    const drawChilli = (k: Chilli) => {
      ctx.save();
      ctx.translate(k.x, k.y);
      ctx.rotate(k.r);
      ctx.scale(k.s, k.s);
      ctx.globalAlpha = Math.min(1, k.life / 40);
      ctx.fillStyle = coloursRef.current[0];
      ctx.beginPath();
      ctx.moveTo(-14, -4);
      ctx.quadraticCurveTo(4, -12, 22, 6);
      ctx.quadraticCurveTo(2, 4, -14, 6);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#2B2B2B";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-14, 1);
      ctx.quadraticCurveTo(-20, -4, -18, -12);
      ctx.stroke();
      ctx.restore();
    };

    function drawStatic() {
      ctx!.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.x = p.hx;
        p.y = p.hy;
        ctx!.fillStyle = p.c;
        ctx!.fillRect(p.x, p.y, p.s, p.s);
      }
    }

    const tick = () => {
      const sp = spiceRef.current;
      const R = sp.radius;
      const R2 = R * R;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / R) * sp.force * 6;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx += (p.hx - p.x) * 0.045 + (Math.random() - 0.5) * sp.jitter;
        p.vy += (p.hy - p.y) * 0.045 + (Math.random() - 0.5) * sp.jitter;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      for (const k of chillies) {
        k.vy += 0.35;
        k.x += k.vx;
        k.y += k.vy;
        k.r += k.vr;
        k.life--;
        if (k.y > H - 10) {
          k.y = H - 10;
          k.vy *= -0.45;
          k.vx *= 0.8;
          k.vr *= 0.7;
        }
        if (k.x < 0 || k.x > W) k.vx *= -1;
        drawChilli(k);
      }
      chillies = chillies.filter((k) => k.life > 0);
      raf = requestAnimationFrame(tick);
    };

    const pos = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => (mouse = pos(e));
    const onLeave = () => (mouse = { x: -999, y: -999 });
    const onDown = (e: PointerEvent) => {
      if (reduce) return;
      const m = pos(e);
      for (let i = 0; i < 10; i++) addChilli(m.x, m.y);
    };
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName ?? "";
      if (reduce || e.key.toLowerCase() !== "p" || /input|textarea/i.test(tag)) return;
      for (let i = 0; i < 40; i++) {
        chillies.push({ x: Math.random() * W, y: -20 - Math.random() * 200, vx: (Math.random() - 0.5) * 2, vy: Math.random() * 2, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.2, s: 0.7 + Math.random() * 0.7, life: 300 });
      }
    };
    const onBurst = () => {
      if (reduce) return;
      for (let i = 0; i < 24; i++) addChilli(W / 2, H * 0.6);
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener(CHILLI_EVENT, onBurst);
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    document.fonts.ready.then(() => {
      build();
      if (!reduce) raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(CHILLI_EVENT, onBurst);
    };
  }, []);

  return (
    <div ref={wrapRef} className="cs-fig">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="The DesignPav name made of particles. Move over it to scatter them, click to throw chillies."
      />
    </div>
  );
}
