import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const GREETINGS = [
  { text: "Hello", typeEffect: false },
  { text: "नमस्ते", typeEffect: false },
  { text: "నమస్కారం", typeEffect: false },
  { text: "Welcome", typeEffect: true }
];

export default function Preloader({ theme, onComplete }) {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const cursorRef = useRef(null);
  const progressBarRef = useRef(null);
  
  const [typedText, setTypedText] = useState("");
  const isDark = theme === 'dark';

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Blinking cursor animation
    gsap.fromTo(cursorRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.4, repeat: -1, yoyo: true, ease: "steps(1)" }
    );

    const tl = gsap.timeline({
      onComplete: () => {
        // Instant clean fade-out of preloader overlay
        gsap.to(containerRef.current, {
          opacity: 0,
          yPercent: -10, // Slight clean upward motion on exit
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }
        });
      }
    });

    // Reset progress bar
    gsap.set(progressBarRef.current, { width: "0%" });

    // Progress bar fill synced with the fast loading duration
    gsap.to(progressBarRef.current, {
      width: "100%",
      duration: 2.1,
      ease: "power1.inOut"
    });

    // Cycle through greetings with extremely fast timing (under 2.5s total)
    GREETINGS.forEach((greeting, index) => {
      const { text, typeEffect } = greeting;

      if (!typeEffect) {
        // Instantly display and animate text fade/slide-up
        tl.to({}, {
          duration: 0.01,
          onStart: () => {
            setTypedText(text);
          }
        });

        tl.fromTo(textContainerRef.current,
          { y: 15, opacity: 0, filter: "blur(4px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.18, ease: "power2.out" },
          "<"
        );

        // Very brief hold
        tl.to({}, { duration: 0.22 });

        // Fade/slide out
        if (index < GREETINGS.length - 1) {
          tl.to(textContainerRef.current, {
            y: -15,
            opacity: 0,
            filter: "blur(4px)",
            duration: 0.15,
            ease: "power2.in",
            onComplete: () => {
              setTypedText("");
            }
          });
          // Snappy gap
          tl.to({}, { duration: 0.05 });
        }
      } else {
        // Reset container properties for Welcome
        tl.to(textContainerRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.01
        });

        // Fast typewriter effect for "Welcome" (around 0.6 seconds)
        const typingObj = { charCount: 0 };
        tl.to(typingObj, {
          charCount: text.length,
          duration: 0.55,
          ease: "none",
          onUpdate: () => {
            setTypedText(text.slice(0, Math.ceil(typingObj.charCount)));
          }
        });

        // Hold completed "Welcome" for exactly 0.5 seconds
        tl.to({}, { duration: 0.5 });
      }
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete, isDark]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none will-change-[opacity,transform] transition-colors duration-300 ${
        isDark ? 'bg-[#050816]' : 'bg-white'
      }`}
    >
      {/* Centered Greeting Container */}
      <div 
        ref={textContainerRef}
        className="relative z-10 flex items-center justify-center min-h-[120px] px-6 will-change-[transform,opacity]"
      >
        <h1 
          className={`text-5xl md:text-7xl font-light tracking-tight antialiased select-none flex items-center gap-1 ${
            isDark ? 'text-white' : 'text-[#111111]'
          }`}
          style={{ 
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          }}
        >
          <span>{typedText}</span>
          <span 
            ref={cursorRef} 
            className={`w-[3px] h-[45px] md:h-[60px] inline-block ml-1 ${
              isDark ? 'bg-white' : 'bg-[#111111]'
            }`}
          />
        </h1>
      </div>

      {/* Bottom Progress Bar & Info */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-40 z-10">
        <span 
          className={`text-[9px] tracking-[0.25em] font-medium ${
            isDark ? 'text-gray-400' : 'text-[#666666]'
          }`}
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          FETCHING ASSETS
        </span>
        <div className={`w-full h-[1.5px] rounded-full overflow-hidden ${
          isDark ? 'bg-white/10' : 'bg-[#eeeeee]'
        }`}>
          <div 
            ref={progressBarRef}
            className={`h-full rounded-full w-0 ${
              isDark ? 'bg-[#06a2c2]' : 'bg-[#111111]'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
