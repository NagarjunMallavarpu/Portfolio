import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import AOS from 'aos';
import LiquidEther from './components/LiquidEther';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import SkillsStrip from './components/SkillsStrip';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [isPreloading, setIsPreloading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-out-quad',
    });
  }, []);

  useEffect(() => {
    const originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const messages = [
          "Wait, don't leave me! 💔",
          "Hey! Where'd you go? 😭",
          "I miss you already... 🥺",
          "Code is getting lonely! 💻",
          "Are you looking at another site? 👀"
        ];
        document.title = messages[Math.floor(Math.random() * messages.length)];
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.stop();

    lenis.on('scroll', () => {
      AOS.refresh();
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isPreloading) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isPreloading]);

  return (
    <div className="relative min-h-screen text-gray-900 dark:text-white">
      {isPreloading && <Preloader theme={theme} onComplete={() => setIsPreloading(false)} />}
      <CustomCursor theme={theme} />
      {/* Fixed full-page background */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-white dark:bg-[#050816] transition-colors duration-300">
        <LiquidEther
          theme={theme}
          colors={theme === 'dark' ? ['#5227FF', '#FF9FFC', '#B497CF'] : ['#a0c4ff', '#ffc6ff', '#ffd6a5']}
          mouseForce={60}
          cursorSize={120}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          dt={0.014}
          BFECC={true}
          resolution={0.3}
          isBounce={false}
          autoDemo={false}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Page content on top */}
      <div className="relative z-10">
        <Header theme={theme} setTheme={setTheme} />
        <HeroSection theme={theme} />
        <AboutSection />
        <Education />
        <SkillsSection />
        <SkillsStrip />
        <Projects />
        <Certificates />
        <ContactSection />
        <Footer theme={theme} />
      </div>
    </div>
  );
}

export default App;