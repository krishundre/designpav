"use client";

import { useEffect, useRef, useState } from "react";

type Faller = { x: number; y: number; v: number; r: number; vr: number; bug: boolean };
type Phase = "ready" | "playing" | "over";

const BEST_KEY = "designpav-chilli-best";

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

/** Mini-game: move the pav to catch chillies and dodge bugs. */
export default function ChilliCatch({ accent, accent2 }: { accent: string; accent2: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colours = useRef({ accent, accent2 });
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(0);
  const startRef = useRef<() => void>(() => {});

  useEffect(() => {
    colours.current = { accent, accent2 };
  }, [accent, accent2]);

  useEffect(() => {
    setBest(readBest());
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!wrap || !cv || !ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;
    let running = false;
    let plateX = 0;
    let targetX = 0;
    let keys = { left: false, right: false };
    let items: Faller[] = [];
    let spawn = 0;
    let t = 0;
    let s = 0;
    let l = 3;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) {
        plateX = targetX = W / 2;
        draw();
      }
    };

    const drawPav = (x: number, y: number) => {
      ctx.fillStyle = "#3A3B3D";
      ctx.beginPath();
      ctx.roundRect(x - 46, y, 92, 16, [6, 6, 12, 12]);
      ctx.fill();
      ctx.fillStyle = colours.current.accent;
      ctx.fillRect(x - 42, y - 6, 84, 7);
      ctx.fillStyle = "#313335";
      ctx.beginPath();
      ctx.ellipse(x, y - 8, 48, 18, 0, Math.PI, 0);
      ctx.fill();
    };

    const drawChilli = (f: Faller) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.r);
      ctx.fillStyle = colours.current.accent;
      ctx.beginPath();
      ctx.moveTo(-14, -4);
      ctx.quadraticCurveTo(4, -12, 22, 6);
      ctx.quadraticCurveTo(2, 4, -14, 6);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#8A8A84";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-14, 1);
      ctx.quadraticCurveTo(-20, -4, -18, -12);
      ctx.stroke();
      ctx.restore();
    };

    const drawBug = (f: Faller) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.fillStyle = colours.current.accent2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 11, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = colours.current.accent2;
      ctx.lineWidth = 2;
      for (const sx of [-1, 1]) {
        for (const yy of [-6, 0, 6]) {
          ctx.beginPath();
          ctx.moveTo(sx * 10, yy);
          ctx.lineTo(sx * 18, yy - 3);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "#151515";
      ctx.fillRect(-1, -14, 2, 28);
      ctx.restore();
    };

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = "#262626";
      ctx!.fillRect(0, H - 8, W, 8);
      for (const f of items) (f.bug ? drawBug : drawChilli)(f);
      drawPav(plateX, H - 34);
    }

    const end = () => {
      running = false;
      cancelAnimationFrame(raf);
      setPhase("over");
      setBest((b) => {
        const nb = Math.max(b, s);
        try {
          localStorage.setItem(BEST_KEY, String(nb));
        } catch {
          /* storage unavailable */
        }
        return nb;
      });
    };

    const loop = () => {
      t++;
      const speed = 1 + Math.min(t / 1800, 2.2);
      spawn -= 1;
      if (spawn <= 0) {
        items.push({ x: 20 + Math.random() * (W - 40), y: -20, v: (2 + Math.random() * 1.5) * speed, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.15, bug: Math.random() < 0.22 + Math.min(t / 6000, 0.15) });
        spawn = Math.max(14, 48 - t / 60);
      }
      if (keys.left) targetX -= 9;
      if (keys.right) targetX += 9;
      targetX = Math.max(46, Math.min(W - 46, targetX));
      plateX += (targetX - plateX) * 0.25;

      const catchY = H - 44;
      items = items.filter((f) => {
        f.y += f.v;
        f.r += f.vr;
        if (f.y > catchY && f.y < catchY + 24 && Math.abs(f.x - plateX) < 52) {
          if (f.bug) {
            l -= 1;
            setLives(l);
          } else {
            s += 1;
            setScore(s);
          }
          return false;
        }
        if (f.y > H + 20) {
          return false;
        }
        return true;
      });
      draw();
      if (l <= 0) end();
      else raf = requestAnimationFrame(loop);
    };

    startRef.current = () => {
      items = [];
      t = 0;
      s = 0;
      l = 3;
      spawn = 0;
      setScore(0);
      setLives(3);
      setPhase("playing");
      running = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
      cv.focus();
    };

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      targetX = e.clientX - r.left;
    };
    const onKey = (down: boolean) => (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") keys = { ...keys, left: down };
      else if (e.key === "ArrowRight" || e.key === "d") keys = { ...keys, right: down };
      else return;
      if (running) e.preventDefault();
    };
    const kd = onKey(true);
    const ku = onKey(false);

    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerdown", onMove);
    cv.addEventListener("keydown", kd);
    cv.addEventListener("keyup", ku);
    const ro = new ResizeObserver(size);
    ro.observe(wrap);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerdown", onMove);
      cv.removeEventListener("keydown", kd);
      cv.removeEventListener("keyup", ku);
    };
  }, []);

  return (
    <div className="cs-card cs-game">
      <div className="cs-game-head">
        <div>
          <h2>Catch the chillies</h2>
          <p className="cs-sub">Move the pav with your mouse, finger or arrow keys. Chillies score, bugs cost a life.</p>
        </div>
        <dl className="cs-score" aria-live="polite">
          <div>
            <dt>Score</dt>
            <dd>{score}</dd>
          </div>
          <div>
            <dt>Lives</dt>
            <dd>{"●".repeat(Math.max(lives, 0))}{"○".repeat(3 - Math.max(lives, 0))}</dd>
          </div>
          <div>
            <dt>Best</dt>
            <dd>{best}</dd>
          </div>
        </dl>
      </div>
      <div ref={wrapRef} className="cs-game-stage">
        <canvas ref={canvasRef} tabIndex={0} aria-label="Catch the chillies game. Use left and right arrow keys to move the pav." />
        {phase !== "playing" && (
          <div className="cs-game-over">
            {phase === "over" && (
              <p>
                <b>{score}</b> chilli{score === 1 ? "" : "es"} caught{score > 0 && score >= best ? " — new best!" : "."}
              </p>
            )}
            <button className="cs-btn cs-lime" type="button" data-magnetic onClick={() => startRef.current()}>
              {phase === "over" ? "Play again" : "Start game"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
