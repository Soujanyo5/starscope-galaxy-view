import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo entrance
    tl.from(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    // Progress bar animation
    .to(progressRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
    })
    // Exit animation
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-cosmic"
    >
      {/* Animated starfield background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <h1 className="font-space text-6xl font-bold gradient-text">
            StarScope
          </h1>
          <p className="font-body text-lg text-foreground/80 mt-2">
            Explore the Infinite Night
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 h-1 bg-muted rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-neon rounded-full w-0"
            style={{ boxShadow: 'var(--glow-cyan)' }}
          />
        </div>
      </div>
    </div>
  );
};