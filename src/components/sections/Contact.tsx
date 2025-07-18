import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { SplineEmbed } from '@/components/SplineEmbed';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Animate form fields on scroll
    const inputs = formRef.current?.querySelectorAll('input, textarea');
    
    if (inputs) {
      gsap.fromTo(inputs,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Supabase
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    
    // Show success animation
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@starscope.space",
      href: "mailto:hello@starscope.space"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-STAR",
      href: "tel:+15551237827"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dark Sky Observatory, Colorado",
      href: "#"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-space text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Contact</span> Mission Control
          </h2>
          <p className="font-body text-xl text-foreground/80 max-w-2xl mx-auto">
            Ready to embark on your cosmic journey? Get in touch with our stellar team
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8">
            <div className="mb-8">
              <h3 className="font-space text-2xl font-semibold mb-2">Send a Message</h3>
              <p className="font-body text-foreground/70">
                Share your stargazing dreams with us
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-foreground/80">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-muted/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-body"
                  placeholder="Your stellar name"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-foreground/80">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-muted/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-body"
                  placeholder="your.email@cosmos.com"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-foreground/80">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-muted/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-body resize-none"
                  placeholder="Tell us about your cosmic aspirations..."
                />
              </div>

              <Button type="submit" variant="neon" size="lg" className="w-full group">
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Launch Message
              </Button>
            </form>
          </div>

          {/* Contact Info & 3D Scene */}
          <div className="space-y-8">
            {/* 3D Scene */}
            <div className="glass rounded-2xl p-4">
              <SplineEmbed
                src="https://my.spline.design/destiny-ByPLFeHV5S6K9jBhpraFwqiS/"
                className="w-full h-64"
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-4 p-4 glass rounded-lg hover:shadow-glow-cyan transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-neon rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-deep-space" />
                  </div>
                  <div>
                    <div className="font-body text-sm text-foreground/60">{item.label}</div>
                    <div className="font-space text-lg font-medium">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Help Section */}
            <div className="glass rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="w-6 h-6 text-primary animate-pulse" />
                <h4 className="font-space text-lg font-semibold">Need Help?</h4>
              </div>
              <p className="font-body text-foreground/70 mb-4">
                Our stellar support team is available 24/7 to assist with your cosmic journey.
              </p>
              <Button variant="ghost" size="sm" className="w-full">
                Live Chat Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};