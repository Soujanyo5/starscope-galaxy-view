import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { SplineEmbed } from '@/components/SplineEmbed';
import { Telescope, Camera, Tv, GraduationCap, Crown, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.children;
    
    if (cards) {
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 80,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const services = [
    {
      title: "Neural Stargazing Matrix",
      description: "AI-enhanced cosmic navigation with quantum telescope arrays",
      icon: Telescope,
      splineUrl: "https://my.spline.design/3dstars-h2Cz4m7nX7YLKQbqKI7ESeBI/",
      price: "From $149",
      features: ["Neural Interface", "Quantum Telescopes", "Dark Space Matrix"]
    },
    {
      title: "Astro-Photography Protocol",
      description: "Capture stellar phenomena with advanced imaging algorithms",
      icon: Camera,
      splineUrl: "https://my.spline.design/jameswebb-KGKuwyc50148SIrPZaDv2dZX/",
      price: "From $249",
      features: ["AI Enhancement", "Neural Processing", "Quantum Imaging"]
    },
    {
      title: "Live Neural Streams",
      description: "Real-time cosmic data transmission via neural networks",
      icon: Tv,
      splineUrl: "https://my.spline.design/lostorbinthemountains-Oespc2pmJdsVEPPvQXvPDIKG/",
      price: "FREE ACCESS",
      features: ["Neural Feed", "AI Commentary", "Quantum Chat"]
    },
    {
      title: "Tech Laboratory Training",
      description: "Advanced stellar technology and AI systems mastery",
      icon: GraduationCap,
      splineUrl: "https://my.spline.design/booksleeveexperiment-CtQCPhm2JzM0JhjhC69wNy1x/",
      price: "From $99",
      features: ["Neural Learning", "AI Certification", "Tech Protocols"]
    },
    {
      title: "Elite Neural Access",
      description: "Premium membership with full system access privileges",
      icon: Crown,
      splineUrl: "https://my.spline.design/worldplanet-dZgfDFu4KFD6X3WTymCpqnrj/",
      price: "From $49/mo",
      features: ["Full Neural Access", "Priority Systems", "Elite Events"]
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-blue/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-space text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">NEURAL</span> SYSTEMS
          </h2>
          <p className="font-space text-xl text-foreground/80 max-w-2xl mx-auto tracking-wider">
            ADVANCED STELLAR TECHNOLOGY • AI-ENHANCED EXPERIENCES • QUANTUM PROTOCOLS
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="relative overflow-hidden rounded-2xl border border-primary/20 group cursor-pointer"
              style={{
                transform: "perspective(1000px)",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: 2,
                  rotateX: 2,
                  scale: 1.02,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: 0,
                  rotateX: 0,
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
            >
              {/* Background 3D Scene */}
              <div className="absolute inset-0 z-0">
                <SplineEmbed
                  src={service.splineUrl}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/30" />
              </div>

              {/* Floating Content */}
              <div className="relative z-10 p-6 h-80 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                  <span className="font-space text-lg font-bold text-secondary">
                    {service.price}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="font-space text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>

                  <p className="font-space text-foreground/70 text-sm tracking-wide">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-foreground/60 font-space">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="glass" className="w-full group font-space">
                    ACCESS SYSTEM
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button variant="cosmic" size="lg">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
};