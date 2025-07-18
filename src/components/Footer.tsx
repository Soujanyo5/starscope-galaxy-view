import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Telescope, Instagram, Twitter, Youtube, Github } from 'lucide-react';

export const Footer = () => {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create twinkling stars animation
    const stars = starsRef.current?.children;
    if (stars) {
      Array.from(stars).forEach((star, index) => {
        gsap.to(star, {
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
          ease: "power2.inOut"
        });
      });
    }
  }, []);

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Github, href: "#", label: "GitHub" }
  ];

  const footerLinks = {
    Services: ["Stargazing Tours", "Astrophotography", "Live Streams", "Workshops"],
    Company: ["About Us", "Careers", "Press", "Contact"],
    Support: ["Help Center", "Safety Guidelines", "Terms of Service", "Privacy Policy"]
  };

  return (
    <footer className="relative bg-gradient-to-t from-deep-space to-background border-t border-white/10 overflow-hidden">
      {/* Animated starfield background */}
      <div ref={starsRef} className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center">
                <Telescope className="w-5 h-5 text-deep-space" />
              </div>
              <span className="font-space text-2xl font-bold gradient-text">
                StarScope
              </span>
            </div>
            
            <p className="font-body text-foreground/70 max-w-md">
              Explore the infinite night with premium stargazing experiences, 
              professional astrophotography, and live celestial streams.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:shadow-glow-cyan transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-space text-lg font-semibold text-foreground">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-foreground/60 hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="glass rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-space text-2xl font-bold mb-2 gradient-text">
                Cosmic Newsletter
              </h3>
              <p className="font-body text-foreground/70">
                Get updates on celestial events, new tours, and exclusive astrophotography tips.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-muted/50 border border-white/10 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-body"
              />
              <button className="neon-button">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="font-body text-foreground/60 text-center md:text-left">
            © 2025 StarScope. All rights reserved. Reach Beyond.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="font-body text-foreground/60 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-foreground/60 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};