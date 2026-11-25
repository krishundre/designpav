"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import ParticleWordmark, { SPICE_LEVELS } from "./ParticleWordmark";
import PavBuilder from "./PavBuilder";
import NotifyForm from "./NotifyForm";
import ChilliCatch from "./ChilliCatch";
import Marquee from "./Marquee";
import Effects from "./Effects";

const WORDS = ["websites", "web apps", "brands", "UI kits", "launches"];

/** Colour themes: lime = main accent, pur = deep band colour (white text on it), pur2 = light tint. */
const FLAVOURS = [
  { id: "classic", name: "Classic", lime: "#C1EF18", pur: "#A01EF4", pur2: "#D29BFF", particles: ["#C1EF18", "#C1EF18", "#A01EF4", "#D29BFF", "#F4F4EE"] },
  { id: "schezwan", name: "Schezwan", lime: "#FF8A3D", pur: "#C8102E", pur2: "#FFB199", particles: ["#FF8A3D", "#FF8A3D", "#C8102E", "#FFB199", "#F4F4EE"] },
  { id: "mint", name: "Mint chutney", lime: "#5BF0B0", pur: "#1F5FD1", pur2: "#9CC3FF", particles: ["#5BF0B0", "#5BF0B0", "#1F5FD1", "#9CC3FF", "#F4F4EE"] },
] as const;

const STAGES = [
  { label: "Brand & logo", tag: "Served", state: "done" },
  { label: "Site design", tag: "Served", state: "done" },
  { label: "Build & content", tag: "On the tava", state: "now" },
  { label: "Portfolio", tag: "Prepping", state: "" },
  { label: "Launch", tag: "Next up", state: "" },
];
const PROGRESS = 62;

export default function ComingSoon() {
  const [spice, setSpice] = useState(1);
  const [word, setWord] = useState(0);
  const [flavourIdx, setFlavourIdx] = useState(0);
  const flavour = FLAVOURS[flavourIdx];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  const themeVars = { "--lime": flavour.lime, "--pur": flavour.pur, "--pur2": flavour.pur2 } as CSSProperties;

  return (
    <div className="cs-root" style={themeVars}>
      <Effects />
      <header>
        <div className="cs-wrap cs-head">
          <a className="cs-brand" href="#main-content">
            <Image src="/logo-mark.png" alt="" width={38} height={47} priority />
            DesignPav
          </a>
          <div className="cs-head-right">
            <div className="cs-flavours" role="radiogroup" aria-label="Pick a flavour">
              {FLAVOURS.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  role="radio"
                  aria-checked={i === flavourIdx}
                  aria-label={`${f.name} flavour`}
                  title={f.name}
                  className="cs-swatch"
                  style={{ "--a": f.lime, "--b": f.pur } as CSSProperties}
                  onClick={() => setFlavourIdx(i)}
                />
              ))}
            </div>
            <span className="cs-pill">
              <span className="cs-dot" aria-hidden="true" />
              Kitchen opens soon
            </span>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section aria-label="Interactive DesignPav wordmark">
          <ParticleWordmark spice={SPICE_LEVELS[spice]} colours={flavour.particles} />
          <div className="cs-wrap cs-hero-text">
            <div>
              <h1>
                Fresh <span className="cs-rot">{WORDS[word]}</span> are on the tava.
              </h1>
              <p>
                DesignPav designs and develops premium websites, web apps and digital experiences — helping brands get
                their space on the internet.
              </p>
              <div className="cs-row cs-hero-cta">
                <a className="cs-btn cs-lime" href="#notify" data-magnetic>
                  Get notified
                </a>
                <a className="cs-btn cs-ghost" href="mailto:chef@designpav.in" data-magnetic>
                  Email the chef
                </a>
              </div>
            </div>
            <div className="cs-ctrl">
              <label htmlFor="cs-spice">
                <span>Spice level</span>
                <b>{SPICE_LEVELS[spice].name}</b>
              </label>
              <input
                id="cs-spice"
                type="range"
                min={0}
                max={SPICE_LEVELS.length - 1}
                step={1}
                value={spice}
                onChange={(e) => setSpice(Number(e.target.value))}
              />
              <div className="cs-hint">
                Move over the name to scatter it · click to throw chillies · press <kbd>P</kbd> for pav rain · try the
                flavour dots up top
              </div>
            </div>
          </div>
        </section>

        <Marquee />

        <section className="cs-band">
          <div className="cs-wrap cs-grid">
            <div data-reveal data-tilt className="cs-tilt">
              <PavBuilder />
            </div>
            <div className="cs-ticket cs-tilt" aria-label="Launch progress" data-reveal data-tilt>
              <h2>Order #001 · designpav.in</h2>
              <div className="cs-meta">
                <span>Table: the internet</span>
                <span>Chef: in the kitchen</span>
              </div>
              <ol>
                {STAGES.map((s, i) => (
                  <li key={s.label} className={s.state ? `cs-${s.state}` : undefined}>
                    <span className="cs-st">{s.state === "done" ? "✓" : i + 1}</span>
                    <span>{s.label}</span>
                    <span className="cs-tag">{s.tag}</span>
                  </li>
                ))}
              </ol>
              <div
                className="cs-bar"
                role="progressbar"
                aria-valuenow={PROGRESS}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Launch progress"
              >
                <span style={{ width: `${PROGRESS}%` }} />
              </div>
            </div>
          </div>
        </section>

        <section className="cs-wrap cs-game-band" data-reveal>
          <ChilliCatch accent={flavour.lime} accent2={flavour.pur2} />
        </section>

        <section id="notify" className="cs-wrap cs-notify-band" data-reveal>
          <div className="cs-notify">
            <div>
              <h2>Want the first bite?</h2>
              <p>
                Leave your email and we&apos;ll write when the kitchen opens. Or skip the queue and talk to the chef
                about your project.
              </p>
            </div>
            <NotifyForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="cs-wrap cs-foot">
          <span>© 2026 DesignPav. All rights reserved.</span>
          <a href="mailto:chef@designpav.in">chef@designpav.in</a>
        </div>
      </footer>
    </div>
  );
}
