import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor({ theme }) {
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const canvasRef = useRef(null);
  const auroraRef = useRef(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return !window.matchMedia('(pointer: fine)').matches;
    }
    return true;
  });

  const isDark = theme === 'dark';
  const particlesRef = useRef([]);
  const ripplesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, vx: 0, vy: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const handleMediaChange = (e) => setIsMobile(!e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const xToDot = gsap.quickTo(dotRef.current, 'x', { duration: 0.05, ease: 'power3.out' });
    const yToDot = gsap.quickTo(dotRef.current, 'y', { duration: 0.05, ease: 'power3.out' });
    const xToAurora = gsap.quickTo(auroraRef.current, 'x', { duration: 0.85, ease: 'power2.out' });
    const yToAurora = gsap.quickTo(auroraRef.current, 'y', { duration: 0.85, ease: 'power2.out' });

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;

      xToDot(clientX);
      yToDot(clientY);
      xToAurora(clientX);
      yToAurora(clientY);

      if (!isVisible) setIsVisible(true);

      // Detect if hover is directly on active text characters (avoiding empty trailing space of block elements)
      const target = e.target;
      if (target) {
        const isText = target.closest('p, h1, h2, h3, h4, h5, h6, span, li, strong, em, code');
        const isInsideInteractive = target.closest('a, button, input, textarea, select, [role="button"], [onclick], .hover-target');
        
        if (isText && !isInsideInteractive) {
          // Get pixel-perfect bounding rects of the actual text lines
          const range = document.createRange();
          range.selectNodeContents(isText);
          const rects = range.getClientRects();
          
          let isOverTextCharacters = false;
          for (let i = 0; i < rects.length; i++) {
            const r = rects[i];
            // Check if cursor coordinate is within the exact text line rectangle (with 4px padding for natural feel)
            if (
              clientX >= r.left - 4 &&
              clientX <= r.right + 4 &&
              clientY >= r.top - 4 &&
              clientY <= r.bottom + 4
            ) {
              isOverTextCharacters = true;
              break;
            }
          }
          setIsHovered(isOverTextCharacters);
        } else {
          setIsHovered(false);
        }
      }

      // Spawn trail particles pulling into the black hole core
      const speed = Math.sqrt(mouseRef.current.vx ** 2 + mouseRef.current.vy ** 2);
      if (speed > 1 && Math.random() < 0.5) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 30 + 15;
        particlesRef.current.push({
          x: clientX + Math.cos(angle) * dist,
          y: clientY + Math.sin(angle) * dist,
          targetX: clientX,
          targetY: clientY,
          radius: Math.random() * 2 + 1,
          color: isDark ? 'rgba(6, 162, 194, ' : 'rgba(82, 39, 255, ',
          alpha: 0.8,
          speed: 0.15
        });
      }
    };

    const onMouseDown = (e) => {
      setIsClicked(true);
      
      // Black hole collapse shockwave
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 2,
        maxRadius: 120,
        alpha: 1,
        decay: 0.018
      });

      // Emit energy burst from collapse
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const spd = Math.random() * 4 + 2;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          radius: Math.random() * 2.5 + 1,
          color: isDark ? 'rgba(255, 159, 252, ' : 'rgba(6, 162, 194, ',
          alpha: 1,
          decay: Math.random() * 0.03 + 0.015,
          isBurst: true
        });
      }
    };

    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Physics update loop
    let frameId;
    const updatePhysics = () => {
      const m = mouseRef.current;
      m.vx = m.x - m.lastX;
      m.vy = m.y - m.lastY;
      m.lastX = m.x;
      m.lastY = m.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Gravitational Lensing Shockwaves
      ripplesRef.current = ripplesRef.current.filter(r => {
        r.radius += (r.maxRadius - r.radius) * 0.08;
        r.alpha -= r.decay;
        if (r.alpha <= 0) return false;
        
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark 
          ? `rgba(6, 162, 194, ${r.alpha * 0.4})` 
          : `rgba(82, 39, 255, ${r.alpha * 0.4})`;
        ctx.lineWidth = 8 * r.alpha;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius - 10, 0, Math.PI * 2);
        ctx.strokeStyle = isDark 
          ? `rgba(255, 159, 252, ${r.alpha * 0.25})` 
          : `rgba(160, 196, 255, ${r.alpha * 0.25})`;
        ctx.lineWidth = 3 * r.alpha;
        ctx.stroke();
        return true;
      });

      // Draw Orbiting / Infalling Particles
      particlesRef.current = particlesRef.current.filter(p => {
        if (p.isBurst) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
        } else {
          p.x += (p.targetX - p.x) * p.speed;
          p.y += (p.targetY - p.y) * p.speed;
          p.alpha -= 0.025;
        }
        
        if (p.alpha <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
        return true;
      });

      frameId = requestAnimationFrame(updatePhysics);
    };
    updatePhysics();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(frameId);
    };
  }, [isMobile, isVisible, isDark, isHovered]);

  if (isMobile) return null;

  // Accent color adaptive gradient map:
  const glowGradient = isDark
    ? 'radial-gradient(circle, rgba(6, 162, 194, 0.35) 0%, rgba(82, 39, 255, 0.12) 50%, rgba(255, 159, 252, 0) 100%)'
    : 'radial-gradient(circle, rgba(82, 39, 255, 0.35) 0%, rgba(160, 196, 255, 0.12) 50%, rgba(255, 214, 165, 0) 100%)';

  const coreColor = isDark ? '#06a2c2' : '#5227FF';

  return (
    <div 
      id="custom-cursor-container"
      ref={containerRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        pointerEvents: 'none'
      }}
    >
      <style>{`
        @keyframes morphBlob {
          0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          33% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; }
          66% { border-radius: 50% 50% 30% 70% / 40% 60% 40% 60%; }
          100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
        }
        .morphing-aurora-blob {
          animation: morphBlob 16s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Accretion Disk / Aurora Blob */}
      <div
        ref={auroraRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform morphing-aurora-blob"
        style={{
          background: glowGradient,
          mixBlendMode: isDark ? 'screen' : 'color-dodge',
          zIndex: 1,
          opacity: isVisible ? 1 : 0,
          filter: 'blur(120px)',
          transition: 'opacity 0.5s ease-in-out'
        }}
      />

      {/* Gravitational Lensing / Shockwave Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-[99998]"
      />

      {/* Black Hole Singularity Core (GSAP Wrapper) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
      >
        {/* Visual Singularity (Magnifying Lens / Rotated Diamond) */}
        <div
          className="w-3 h-3 transition-all duration-300"
          style={{
            backgroundColor: isHovered ? 'transparent' : coreColor,
            border: isHovered 
              ? (isDark ? '1.5px solid #FF9FFC' : '1.5px solid #5227FF') 
              : 'none',
            boxShadow: isHovered
              ? (isDark ? '0 0 12px rgba(255, 159, 252, 0.6)' : '0 0 12px rgba(82, 39, 255, 0.6)')
              : `0 0 8px ${coreColor}`,
            borderRadius: isHovered ? '4px' : '0%', // Keep it as a square/diamond when magnifying
            transform: `translate(-50%, -50%) rotate(45deg) scale(${isClicked ? 0.4 : isHovered ? 4.0 : 1})`,
            transition: 'transform 0.22s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.22s ease, background-color 0.22s, border 0.22s'
          }}
        />
      </div>
    </div>
  );
}
