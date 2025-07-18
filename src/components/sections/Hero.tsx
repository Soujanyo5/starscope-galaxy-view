import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { SplineEmbed } from '@/components/SplineEmbed';
import { Play, Calendar, ArrowRight, Telescope, Star } from 'lucide-react';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div ref={heroRef} className="text-center lg:text-left space-y-8">
          <h1 
            ref={titleRef}
            className="font-space text-5xl lg:text-7xl font-bold leading-tight"
          >
            <span className="gradient-text">Explore</span>
            <br />
            <span className="text-foreground">the Infinite</span>
            <br />
            <span className="gradient-text">Night</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="font-body text-xl lg:text-2xl text-foreground/80 max-w-lg"
          >
            Guided tours · Astrophotography · Celestial livestreams
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="neon" size="lg" className="group">
              <Telescope className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Start Tour
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="glass" size="lg" className="group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Live Event
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="font-space text-2xl font-bold text-primary">500+</div>
              <div className="font-body text-sm text-foreground/60">Tours Guided</div>
            </div>
            <div className="text-center">
              <div className="font-space text-2xl font-bold text-secondary">50K+</div>
              <div className="font-body text-sm text-foreground/60">Photos Taken</div>
            </div>
            <div className="text-center">
              <div className="font-space text-2xl font-bold text-accent">24/7</div>
              <div className="font-body text-sm text-foreground/60">Live Streams</div>
            </div>
          </div>
        </div>

        {/* Right 3D Scene */}
        <div className="relative">
          <div className="glass rounded-2xl p-4 hover:shadow-glow-cyan transition-all duration-500">
            <SplineEmbed
              src="https://my.spline.design/galaxy-AkOMEn755IKPBdpOQFsKJfJN/"
              className="w-full h-96 lg:h-[500px]"
            />
          </div>
          
          {/* Floating UI elements */}
          <div className="absolute -top-4 -right-4 glass rounded-lg p-3 animate-pulse">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div className="absolute -bottom-4 -left-4 glass rounded-lg p-3 pulse-glow">
            <Star className="w-6 h-6 text-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};