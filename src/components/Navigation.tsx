import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Telescope, Users, Calendar, BookOpen, Star, Zap, Shield, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Neural Tours', icon: Cpu, href: '#tours' },
    { name: 'Astro Gallery', icon: Star, href: '#gallery' },
    { name: 'Live Streams', icon: Zap, href: '#events' },
    { name: 'Tech Labs', icon: Shield, href: '#workshops' },
    { name: 'Elite Access', icon: Users, href: '#membership' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      gsap.from('.mobile-nav-item', {
        y: 30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  };

  return (
    <>
      {/* Futuristic Logo - Fixed Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <div className="flex items-center space-x-3 glass rounded-full px-4 py-2 border border-primary/30">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-neon flex items-center justify-center animate-pulse">
              <Telescope className="w-4 h-4 text-deep-space" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-ping" />
          </div>
          <span className="font-space text-lg font-bold gradient-text hidden sm:block">
            StarScope.AI
          </span>
        </div>
      </div>

      {/* Futuristic Navigation - Overlay Style */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-background/20 to-background/10 backdrop-blur-md border-b border-primary/20" />
        
        <div className="container mx-auto px-6 py-4 relative">
          <div className="flex items-center justify-between">
            {/* Spacer for logo */}
            <div className="w-32" />

            {/* Desktop Menu - Floating Style */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full glass border border-transparent hover:border-primary/30 text-foreground/80 hover:text-primary transition-all duration-300 group"
                >
                  <item.icon className="w-4 h-4 group-hover:text-primary transition-colors group-hover:rotate-12" />
                  <span className="font-space text-sm font-medium">{item.name}</span>
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="font-space glass rounded-full border border-primary/20">
                  <Shield className="w-4 h-4 mr-2" />
                  Neural Link
                </Button>
              </Link>
              <Button variant="neon" size="sm" className="font-space">
                <Zap className="w-4 h-4 mr-2" />
                Activate
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden glass rounded-full border border-primary/20"
              onClick={toggleMenu}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden mt-6 glass rounded-2xl p-6 border border-primary/20">
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="mobile-nav-item flex items-center space-x-3 text-foreground/80 hover:text-primary transition-colors duration-300 p-3 rounded-lg hover:bg-primary/10 border border-transparent hover:border-primary/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-space font-medium">{item.name}</span>
                  </a>
                ))}
                <div className="pt-4 border-t border-primary/20 space-y-3">
                  <Link to="/login" className="block">
                    <Button variant="ghost" className="w-full justify-start font-space glass">
                      <Shield className="w-4 h-4 mr-2" />
                      Neural Link
                    </Button>
                  </Link>
                  <Button variant="neon" className="w-full font-space">
                    <Zap className="w-4 h-4 mr-2" />
                    Activate System
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};