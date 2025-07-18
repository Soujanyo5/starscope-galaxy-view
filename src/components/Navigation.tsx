import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Telescope, Users, Calendar, BookOpen, Star } from 'lucide-react';
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
    { name: 'Tours', icon: Telescope, href: '#tours' },
    { name: 'Gallery', icon: Star, href: '#gallery' },
    { name: 'Live Events', icon: Calendar, href: '#events' },
    { name: 'Workshops', icon: BookOpen, href: '#workshops' },
    { name: 'Membership', icon: Users, href: '#membership' },
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
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'glass border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-neon flex items-center justify-center">
              <Telescope className="w-4 h-4 text-deep-space" />
            </div>
            <span className="font-space text-xl font-bold gradient-text">
              StarScope
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-foreground/80 hover:text-primary transition-colors duration-300 group"
              >
                <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="font-body">{item.name}</span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="font-body">
              Sign In
            </Button>
            <Button variant="neon" size="sm" className="font-space">
              Join Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-6 glass rounded-lg p-6 border border-white/10">
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-nav-item flex items-center space-x-3 text-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-body">{item.name}</span>
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Button variant="ghost" className="w-full justify-start font-body">
                  Sign In
                </Button>
                <Button variant="neon" className="w-full font-space">
                  Join Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};