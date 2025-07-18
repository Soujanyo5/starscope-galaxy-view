import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { SplineEmbed } from '@/components/SplineEmbed';
import { Eye, EyeOff, Mail, Lock, User, Zap, Shield, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const formRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    if (formRef.current && fieldsRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      );
      
      gsap.fromTo(fieldsRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out" 
        }
      );
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Supabase auth
    console.log('Form submitted:', { isLogin, ...formData });
    
    // Success animation
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    
    // Animate form transition
    gsap.to(fieldsRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.2,
      onComplete: () => {
        gsap.to(fieldsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0">
        <SplineEmbed
          src="https://my.spline.design/destiny-ByPLFeHV5S6K9jBhpraFwqiS/"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30" />
      </div>

      {/* Left Side - Form */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-8">
        <div ref={formRef} className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center animate-pulse">
                <Shield className="w-6 h-6 text-deep-space" />
              </div>
              <span className="font-space text-2xl font-bold gradient-text">
                NEURAL ACCESS
              </span>
            </div>
            
            <h1 className="font-space text-3xl font-bold mb-2">
              {isLogin ? 'SYSTEM LOGIN' : 'INITIALIZE USER'}
            </h1>
            <p className="font-space text-foreground/70 tracking-wider">
              {isLogin 
                ? 'ACCESS YOUR STELLAR INTERFACE' 
                : 'CREATE NEURAL PROFILE CONNECTION'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div ref={fieldsRef} className="space-y-4">
              {/* Name field for signup */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="font-space text-sm font-medium text-foreground/80 tracking-wider">
                    NEURAL ID
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full pl-12 pr-4 py-3 bg-muted/30 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-space text-sm"
                      placeholder="Enter neural identifier"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="font-space text-sm font-medium text-foreground/80 tracking-wider">
                  COSMIC EMAIL
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-muted/30 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-space text-sm"
                    placeholder="stellar.explorer@cosmos.net"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="font-space text-sm font-medium text-foreground/80 tracking-wider">
                  QUANTUM PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-muted/30 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-space text-sm"
                    placeholder="Enter quantum security code"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="neon" size="lg" className="w-full group">
              <Zap className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
              {isLogin ? 'INITIALIZE ACCESS' : 'CREATE NEURAL LINK'}
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Toggle Mode */}
            <div className="text-center pt-6 border-t border-primary/20">
              <p className="font-space text-foreground/60 text-sm tracking-wider mb-3">
                {isLogin ? 'NEW TO THE SYSTEM?' : 'ALREADY HAVE ACCESS?'}
              </p>
              <Button 
                type="button"
                variant="ghost" 
                onClick={toggleMode}
                className="font-space"
              >
                {isLogin ? 'CREATE NEURAL PROFILE' : 'ACCESS EXISTING SYSTEM'}
              </Button>
            </div>

            {/* Additional Options */}
            {isLogin && (
              <div className="text-center">
                <Button variant="ghost" size="sm" className="font-space text-xs">
                  FORGOT QUANTUM PASSWORD?
                </Button>
              </div>
            )}
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 glass rounded-lg border border-primary/20">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-space text-sm font-semibold mb-1">QUANTUM SECURITY</h4>
                <p className="font-space text-xs text-foreground/60 leading-relaxed">
                  Your neural data is protected by advanced quantum encryption protocols
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Enhanced Visual (Hidden on mobile) */}
      <div className="hidden lg:block relative z-10 w-1/2 p-8">
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            <h2 className="font-space text-4xl font-bold gradient-text">
              STELLAR ACCESS
            </h2>
            <div className="space-y-4 max-w-md">
              <div className="flex items-center space-x-3 glass p-4 rounded-lg border border-primary/20">
                <Zap className="w-6 h-6 text-primary" />
                <span className="font-space text-sm">Neural Interface Ready</span>
              </div>
              <div className="flex items-center space-x-3 glass p-4 rounded-lg border border-secondary/20">
                <Shield className="w-6 h-6 text-secondary" />
                <span className="font-space text-sm">Quantum Security Active</span>
              </div>
              <div className="flex items-center space-x-3 glass p-4 rounded-lg border border-accent/20">
                <User className="w-6 h-6 text-accent" />
                <span className="font-space text-sm">Stellar Profile System</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;