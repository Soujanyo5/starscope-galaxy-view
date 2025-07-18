import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { SplineEmbed } from '@/components/SplineEmbed';
import { Play, Calendar, ArrowRight, Telescope, Star, Zap } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero entrance animation
    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      filter: "blur(8px)",
      duration: 1.2,
      ease: "power2.out"
    })
    .from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .from(buttonsRef.current?.children, {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.4");

    // Floating animation for hero content
    gsap.to(heroRef.current, {
      y: -10,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background 3D Scene - Full Screen */}
      <div className="absolute inset-0 z-0">
        <SplineEmbed
          src="https://my.spline.design/galaxy-AkOMEn755IKPBdpOQFsKJfJN/"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/40" />
      </div>
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-violet/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cosmic-purple/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        {/* Floating Content */}
        <div ref={heroRef} className="text-center space-y-8 max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="font-space text-6xl lg:text-8xl font-bold leading-tight"
          >
            <span className="gradient-text">NEURAL</span>
            <br />
            <span className="text-foreground">STARSCOPE</span>
            <br />
            <span className="gradient-text">SYSTEM</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="font-space text-xl lg:text-2xl text-foreground/90 max-w-2xl mx-auto tracking-wider"
          >
            QUANTUM TOURS • ASTRO-PHOTOGRAPHY • NEURAL STREAMS
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="neon" size="xl" className="group">
              <Zap className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              INITIALIZE TOUR
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="glass" size="xl" className="group font-space">
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              LIVE NEURAL FEED
            </Button>
          </div>

          {/* Enhanced Stats - Tech Style */}
          <div className="grid grid-cols-3 gap-8 pt-12">
            <div className="text-center glass rounded-xl p-4 border border-primary/20">
              <div className="font-space text-3xl font-bold text-primary">500K+</div>
              <div className="font-space text-xs text-foreground/60 tracking-widest">NEURAL SCANS</div>
            </div>
            <div className="text-center glass rounded-xl p-4 border border-secondary/20">
              <div className="font-space text-3xl font-bold text-secondary">50M+</div>
              <div className="font-space text-xs text-foreground/60 tracking-widest">ASTRO PIXELS</div>
            </div>
            <div className="text-center glass rounded-xl p-4 border border-accent/20">
              <div className="font-space text-3xl font-bold text-accent">24/7</div>
              <div className="font-space text-xs text-foreground/60 tracking-widest">QUANTUM SYNC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};