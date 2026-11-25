"use client";

import { useState, type CSSProperties } from "react";
import { CHILLI_EVENT } from "./ParticleWordmark";

type Ingredient = { key: string; name: string; colour: string; text?: string; w: number; h: number; radius?: string };

const INGREDIENTS: Ingredient[] = [
  { key: "bun", name: "Bottom bun", colour: "#3A3B3D", text: "#F4F4EE", w: 210, h: 34, radius: "10px 10px 18px 18px" },
  { key: "chutney", name: "Green chutney", colour: "#C1EF18", w: 200, h: 14 },
  { key: "ux", name: "UX research", colour: "#E8E8E0", w: 190, h: 22 },
  { key: "design", name: "Design", colour: "#A01EF4", text: "#fff", w: 196, h: 26 },
  { key: "code", name: "Clean code", colour: "#D29BFF", w: 186, h: 22 },
  { key: "seo", name: "SEO", colour: "#F4C542", w: 180, h: 16 },
  { key: "chilli", name: "Chilli", colour: "#7DBA0F", w: 120, h: 14 },
  { key: "top", name: "Top bun", colour: "#313335", text: "#F4F4EE", w: 214, h: 56, radius: "90px 90px 12px 12px" },
];

const MAX_LAYERS = 11;

export default function PavBuilder() {
  const [stack, setStack] = useState<number[]>([]);

  const done = stack.length > 0 && INGREDIENTS[stack[stack.length - 1]].key === "top";

  const isDisabled = (ing: Ingredient) =>
    done ||
    (stack.length === 0 && ing.key !== "bun") ||
    (stack.length > 0 && ing.key === "bun") ||
    stack.length >= MAX_LAYERS;

  const add = (i: number) => {
    setStack((s) => [...s, i]);
    if (INGREDIENTS[i].key === "top") window.dispatchEvent(new Event(CHILLI_EVENT));
  };

  let status = "";
  if (done) {
    const mid = stack.slice(1, -1).map((i) => INGREDIENTS[i].name.toLowerCase());
    status = mid.length
      ? `Order up! One pav with ${mid.slice(0, -1).join(", ")}${mid.length > 1 ? " and " : ""}${mid[mid.length - 1]}.`
      : "Order up! One plain pav — bold choice.";
  } else if (stack.length === 0) {
    status = "Start with the bottom bun.";
  } else {
    status = `${stack.length} layer${stack.length > 1 ? "s" : ""} on the plate.`;
  }

  return (
    <div className="cs-card">
      <h2>Build your pav while you wait</h2>
      <p className="cs-sub">Stack the ingredients of a good website. Finish with the top bun to place your order.</p>
      <div className="cs-pav">
        <div className="cs-plate" aria-live="polite">
          {stack.map((i, n) => {
            const g = INGREDIENTS[i];
            const style = {
              "--c": g.colour,
              "--w": `${g.w}px`,
              "--h": `${g.h}px`,
              "--r": g.radius ?? "10px",
              "--t": g.text ?? "#151515",
            } as CSSProperties;
            return (
              <div key={n} className="cs-layer" style={style}>
                {g.h >= 22 ? g.name : ""}
              </div>
            );
          })}
        </div>
        <div>
          <div className="cs-picks">
            {INGREDIENTS.map((g, i) => (
              <button
                key={g.key}
                type="button"
                className="cs-pick"
                style={{ "--c": g.colour } as CSSProperties}
                disabled={isDisabled(g)}
                onClick={() => add(i)}
              >
                <i aria-hidden="true" />
                {g.name}
              </button>
            ))}
          </div>
          <div className="cs-order" aria-live="polite">{status}</div>
          <div className="cs-row">
            <button className="cs-btn cs-ghost" type="button" onClick={() => setStack((s) => s.slice(0, -1))}>
              Undo
            </button>
            <button className="cs-btn cs-ghost" type="button" onClick={() => setStack([])}>
              Clear plate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
