import { useState, useEffect } from 'react';
import { Preloader } from '@/components/Preloader';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';
import { AIChatBot } from '@/components/AIChatBot';
import { ChatBotTrigger } from '@/components/ChatBotTrigger';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Initialize smooth scrolling and other animations here
    const handleLoad = () => {
      // Additional load logic if needed
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Contact />
      </main>
      <Footer />
      
      {/* AI ChatBot */}
      <ChatBotTrigger onClick={() => setIsChatOpen(true)} />
      <AIChatBot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default Index;
