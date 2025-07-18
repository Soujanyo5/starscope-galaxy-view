import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { X, Send, Bot, User, Zap, Brain, Cpu } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatBot = ({ isOpen, onClose }: AIChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Neural system activated. I am ASTRO-AI, your cosmic intelligence interface. How may I assist your stellar journey?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(chatRef.current, 
        { 
          scale: 0.8, 
          opacity: 0,
          y: 50 
        },
        { 
          scale: 1, 
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const responses = [
      "Neural analysis complete. Stellar conditions optimal for cosmic exploration.",
      "Quantum data indicates fascinating celestial phenomena in your sector.",
      "AI recommendation: Enhanced stargazing protocols would benefit your mission.",
      "Processing cosmic intelligence... Your stellar curiosity is admirable.",
      "Neural networks suggest optimal viewing coordinates for tonight's observations.",
      "AI systems detecting heightened interest in astrophotography protocols.",
      "Stellar data banks updated. Ready to assist with your cosmic endeavors."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now().toString() + '_bot',
        text: simulateAIResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Window */}
      <div 
        ref={chatRef}
        className="relative w-full max-w-md h-[600px] glass rounded-2xl border border-primary/30 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-primary/20 bg-gradient-neon/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center animate-pulse">
                <Bot className="w-5 h-5 text-deep-space" />
              </div>
              <div>
                <h3 className="font-space text-lg font-bold text-foreground">ASTRO-AI</h3>
                <p className="text-xs text-foreground/60 font-space tracking-wider">NEURAL INTELLIGENCE</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot 
                    ? 'bg-gradient-neon' 
                    : 'bg-gradient-aurora'
                }`}>
                  {message.isBot ? (
                    <Brain className="w-4 h-4 text-deep-space" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`p-3 rounded-lg font-space text-sm ${
                  message.isBot 
                    ? 'bg-muted/30 text-foreground border border-primary/20' 
                    : 'bg-primary/20 text-foreground border border-secondary/20'
                }`}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-neon flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-deep-space animate-spin" />
                </div>
                <div className="bg-muted/30 p-3 rounded-lg border border-primary/20">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-primary/20">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Interface with ASTRO-AI..."
              className="flex-1 px-4 py-2 bg-muted/30 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-space text-sm"
            />
            <Button 
              variant="neon" 
              size="icon"
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};