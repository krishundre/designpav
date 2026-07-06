# DesignPav – Creative Digital Studio

[![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-F43F5E?style=flat&logo=framer)](https://www.framer.com/motion/)

DesignPav is a premium agency website engineered for a creative digital studio. It features an immersive dark-mode aesthetic, micro-animations, custom WebGL canvas particles, and 3D hover interactions inspired by components from **React Bits**.

---

## ✨ Features

- **🌌 WebGL Canvas Background**: A fully interactive, fluid, performance-optimized particle system running on `OGL` that reacts to mouse tracking.
- **✨ Custom React Bits Components**:
  - **`BlurText`**: Staggered blur-in animations for captions and typography.
  - **`ShinyText`**: Sweeping gradient reflection shimmers.
  - **`SpotlightCard`**: Cards featuring cursor-tracking radial backgrounds and border glows.
  - **`TiltedCard`**: 3D parallax card tilt rotations that adapt dynamically on mouse move.
- **📱 Responsive Floating Navigation**: Glassmorphic floating header with seamless scrolling and mobile navigation drawer.
- **⚙️ Modular Sections**:
  - **Hero**: Atmospheric visual entry points with dynamic action triggers.
  - **Services**: Grids highlighting studio capabilities inside `SpotlightCard` tiles.
  - **Featured Work**: High-fidelity project showcases emphasizing agency designs in 3D `TiltedCard` containers.
  - **Process**: Grid step-by-step indicator tracking timeline progression.
  - **Contact**: State-driven onboarding inquiries with animated success overlays.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (using App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion v12](https://framer.com/motion)
- **WebGL Engine**: [OGL](https://github.com/o-g-l/ogl) (for low-overhead WebGL rendering)
- **Iconography**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
├── app/
│   ├── globals.css         # Styling directives, design tokens, keyframes
│   ├── layout.tsx          # Meta tags, viewport layout, Font declarations
│   └── page.tsx            # Main layout rendering sections
├── components/
│   ├── reactbits/          # Core interactive physics & animation components
│   │   ├── BlurText.tsx
│   │   ├── ShinyText.tsx
│   │   ├── SpotlightCard.tsx
│   │   └── TiltedCard.tsx
│   ├── AnimatedButton.tsx  # Dynamic interactive CTA button
│   ├── Background.tsx      # Particles wrapper
│   ├── Badge.tsx           # Floating header studio badge
│   ├── ContactForm.tsx     # Client onboarding inputs and state validations
│   ├── Footer.tsx          # Direct emails and copyright details
│   ├── Galaxy.tsx          # Shader-driven background element
│   ├── Glow.tsx            # Ambient radial typography backdrop
│   ├── Hero.tsx            # Hero landing sections
│   ├── Navbar.tsx          # Responsive navigation links and mobile drawer
│   ├── Particles.tsx       # Low-level WebGL vertex particle grid
│   ├── Process.tsx         # Methods timeline
│   └── Work.tsx            # Portfolio mockups using tilted grids
├── public/                 # Image assets, SVG icons, and mockups
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/designpav.git
   cd designpav
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🎨 Design Tokens & Customization

Core theme tokens are configured inside `app/globals.css` using Tailwind CSS v4 variables:

```css
@theme {
  --color-bg-primary:    #050505;
  --color-bg-secondary:  #0F0F0F;
  --color-accent:        #6D5EF8;
  --color-accent-hover:  #8A7CFF;
  --color-text-primary:  #FFFFFF;
  --color-text-secondary:#A1A1AA;
  --color-border:        rgba(255,255,255,0.08);
  --color-card:          rgba(255,255,255,0.05);
}
```

Change these color codes to adapt the brand kit to match other visual palettes easily.