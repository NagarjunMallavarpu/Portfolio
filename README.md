# 🌌 Nagarjun's Interactive Portfolio

Welcome to my personal portfolio codebase! This is a modern, high-performance, and visually striking portfolio website designed to showcase my journey as a Full-Stack Developer and AWS Certified Cloud Practitioner.

Built with **React 19**, **Vite**, **Tailwind CSS**, and high-quality interactive libraries, the site features modern UX enhancements like viscous fluid background simulations, smooth scrolling, cards stacking animations, and micro-interactions.

🚀 **Live Link:** [https://nagarjun27.netlify.app/](https://nagarjun27.netlify.app/) (Netlify)

---

## ✨ Features

- **Interactive Fluid Simulation:** Dynamic full-screen fluid dynamics background (`LiquidEther`) responding to cursor movement.
- **Custom Adaptive Cursor:** Fluid cursor tracker that morphs and responds based on interactions.
- **Smooth Page Scrolling:** Integrated with `Lenis` for premium-feeling scroll velocity mapping.
- **Preloader Animation:** Sleek initial load screen to prepare heavy UI assets.
- **Stacking Projects Layout:** Projects stack visually on top of each other as the user scrolls (`ScrollStack`).
- **AOS Animations:** Subtly timed reveal animations on scroll elements.
- **Bi-directional Theme Toggle:** Animated seamless toggle between premium dark and clean light modes.
- **SEO & Social Optimization:** Pre-configured meta tags, open-graph protocols, and dynamically changing document titles when users switch browser tabs (e.g. *"Wait, don't leave me! 💔"*).

---

## 🛠️ Tech Stack

- **Frontend Core:** React 19, Vite, JavaScript (ES6+)
- **Styling:** Tailwind CSS (v4), Vanilla CSS variables
- **Animations:** GSAP (GreenSock Animation Platform), AOS (Animate on Scroll), Lenis Scroll
- **Icons & Visuals:** Lucide React, React Icons
- **Deployment Platform:** Netlify

---

## 📁 Key Components

- [App.jsx](file:///d:/Portfolio/Portfolio/src/App.jsx): Main orchestrator containing global states (theme, preloader), Lenis configuration, tab focus visibility detectors, and layout grids.
- [LiquidEther.jsx](file:///d:/Portfolio/Portfolio/src/components/LiquidEther.jsx): WebGL fluid dynamics canvas handling interactive mouse pressure and viscosity forces.
- [ScrollStack.jsx](file:///d:/Portfolio/Portfolio/src/components/ScrollStack.jsx): Stacked card layout algorithm using GSAP & CSS transform matrices to pin cards during scroll transitions.
- [Projects.jsx](file:///d:/Portfolio/Portfolio/src/components/Projects.jsx): Dynamic collection listing full-stack projects including:
  1. **Terra-Vista** (React, Node.js, MongoDB) - Direct consumer-farmer e-commerce.
  2. **Quizora** (React, Vite, Supabase, Hugging Face AI API) - Smart quiz platform.
  3. **Hotel-Booking System** (React, Node.js, MongoDB) - Analytical booking panel.
- [Certificates.jsx](file:///d:/Portfolio/Portfolio/src/components/Certificates.jsx): Visual cards display for professional credentials, including AWS Certified Cloud Practitioner.

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)

### 💻 Local Run Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NagarjunMallavarpu/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Launch local dev environment:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in terminal).

4. **Production Build:**
   To build files for production into the `dist/` directory, execute:
   ```bash
   npm run build
   ```

---

## 🌐 Netlify Deployment

This repository is optimized for zero-config Netlify continuous deployment. It includes a [netlify.toml](file:///d:/Portfolio/Portfolio/netlify.toml) config file preset:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

To deploy:
1. Connect your GitHub repository to your **Netlify Dashboard**.
2. Select this repository.
3. Netlify will auto-detect the configuration and trigger a build immediately.
4. Any future changes pushed to `main` will automatically re-deploy.
