import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, MessageCircle, Zap } from 'lucide-react';
import { gsap } from 'gsap';

interface ChatBotTriggerProps {
  onClick: () => void;
}

export const ChatBotTrigger = ({ onClick }: ChatBotTriggerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Add click animation
    gsap.to('.chatbot-trigger', {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    onClick();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="chatbot-trigger w-16 h-16 rounded-full bg-gradient-neon hover:shadow-glow-cyan transition-all duration-300 group relative overflow-hidden"
        size="icon"
      >
        {/* Animated background pulse */}
        <div className="absolute inset-0 bg-gradient-aurora opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full animate-pulse" />
        
        {/* Icon with rotation animation */}
        <Bot className="w-7 h-7 text-deep-space group-hover:rotate-12 transition-transform duration-300" />
        
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center animate-bounce">
          <Zap className="w-2 h-2 text-white" />
        </div>
        
        {/* Hover tooltip */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 glass rounded-lg border border-primary/20 whitespace-nowrap">
            <span className="font-space text-sm text-foreground">
              Talk to ASTRO-AI
            </span>
          </div>
        )}
      </Button>
      
      {/* Floating particles around button */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-60 animate-ping"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};