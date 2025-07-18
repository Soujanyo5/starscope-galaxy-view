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
      title: "Guided Stargazing Tours",
      description: "Expert-led journeys through the cosmos with professional telescopes",
      icon: Telescope,
      splineUrl: "https://my.spline.design/3dstars-h2Cz4m7nX7YLKQbqKI7ESeBI/",
      price: "From $89",
      features: ["Professional Guide", "High-end Telescopes", "Dark Sky Location"]
    },
    {
      title: "Astrophotography Sessions",
      description: "Capture stunning celestial images with professional equipment",
      icon: Camera,
      splineUrl: "https://my.spline.design/jameswebb-KGKuwyc50148SIrPZaDv2dZX/",
      price: "From $149",
      features: ["Camera Equipment", "Expert Instruction", "Image Processing"]
    },
    {
      title: "Live Celestial Streams",
      description: "Real-time broadcasts of astronomical events and observations",
      icon: Tv,
      splineUrl: "https://my.spline.design/lostorbinthemountains-Oespc2pmJdsVEPPvQXvPDIKG/",
      price: "Free",
      features: ["HD Streaming", "Expert Commentary", "Interactive Chat"]
    },
    {
      title: "Educational Workshops",
      description: "Learn astronomy fundamentals and telescope operation",
      icon: GraduationCap,
      splineUrl: "https://my.spline.design/booksleeveexperiment-CtQCPhm2JzM0JhjhC69wNy1x/",
      price: "From $59",
      features: ["Hands-on Learning", "Certification", "Group Sessions"]
    },
    {
      title: "Membership Plans",
      description: "Exclusive access to all services with premium benefits",
      icon: Crown,
      splineUrl: "https://my.spline.design/worldplanet-dZgfDFu4KFD6X3WTymCpqnrj/",
      price: "From $29/mo",
      features: ["Unlimited Access", "Priority Booking", "Member Events"]
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
            <span className="gradient-text">Cosmic</span> Services
          </h2>
          <p className="font-body text-xl text-foreground/80 max-w-2xl mx-auto">
            From guided tours to professional astrophotography, explore our range of stellar experiences
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass rounded-2xl p-6 hover:shadow-glow-cyan transition-all duration-500 group cursor-pointer"
              style={{
                transform: "perspective(1000px)",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: 5,
                  rotateX: 5,
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
              {/* 3D Scene */}
              <div className="mb-6 rounded-xl overflow-hidden">
                <SplineEmbed
                  src={service.splineUrl}
                  className="w-full h-48 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <service.icon className="w-8 h-8 text-primary" />
                  <span className="font-space text-lg font-bold text-secondary">
                    {service.price}
                  </span>
                </div>

                <h3 className="font-space text-xl font-semibold text-foreground">
                  {service.title}
                </h3>

                <p className="font-body text-foreground/70 text-sm">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-foreground/60">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="glass" className="w-full group">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
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