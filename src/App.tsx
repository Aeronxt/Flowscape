import React, { useState, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { AuthModal } from './components/AuthModal';
import { AnimatedShinyText } from './components/AnimatedShinyText';
import { SmoothCursor } from './components/ui/smooth-cursor';
import { UserMenu } from './components/UserMenu';
import { ShimmerButton } from './components/magicui/shimmer-button';
import { InteractiveGridPattern } from './components/ui/interactive-grid-pattern';
import { ApiIntegrationDemo } from './components/ui/api-integration-demo';
import { Globe } from './components/magicui/globe';

// Country Context
const CountryContext = createContext<{
  selectedCountry: 'Australia' | 'Bangladesh' | 'Worldwide' | null;
  setSelectedCountry: (country: 'Australia' | 'Bangladesh' | 'Worldwide') => void;
}>({
  selectedCountry: null,
  setSelectedCountry: () => {}
});

const InteractiveButton = ({ children, onClick, className = "", variant = "primary" }: {
  children: React.ReactNode,
  onClick?: () => void,
  className?: string,
  variant?: "primary" | "secondary"
}) => {
  return (
    <motion.button
      className={`relative overflow-hidden rounded-full px-8 py-3 font-medium transition-all duration-300 ${
        variant === "primary" 
          ? "bg-white text-black hover:bg-gray-100 shadow-lg" 
          : "bg-purple-600/80 text-white border border-purple-500/50 hover:bg-purple-600 backdrop-blur-sm"
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};



function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<'Australia' | 'Bangladesh' | 'Worldwide' | null>(null);
  const { user, loading } = useAuth();

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // Handle navbar scroll behavior
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);
      
      // Only trigger animation if scroll difference is significant enough
      if (scrollDifference < 5) return;
      
      if (currentScrollY < 20) {
        // Always show navbar at top
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar (only after scrolling past 100px)
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for smoother performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [lastScrollY]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-2xl font-bold text-white"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Flowscape
        </motion.div>
      </div>
    );
  }

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      {/* Smooth Cursor */}
      <SmoothCursor />
      
      {/* Navigation Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
        initial={{ y: -100 }}
        animate={{ 
          y: isNavVisible ? 0 : -100,
          opacity: isNavVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween"
        }}
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl px-4 md:px-6 py-3 shadow-2xl">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="https://wrczctvglyhprlbkogjb.supabase.co/storage/v1/object/public/banklogos//flowscape%20logo%20(1).png" 
              alt="Flowscape Logo" 
              className="h-6 md:h-8 object-contain opacity-95"
            />
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); setTimeout(() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }}>Home</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }}>About</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }}>Pricing</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }}>Contact</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }}>FAQ</a>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <motion.button
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAuthClick('signin')}
                >
                  Sign In
                </motion.button>
                <ShimmerButton
                  onClick={() => handleAuthClick('signup')}
                  className="text-white font-medium"
                  background="rgba(147, 51, 234, 1)"
                  shimmerColor="#ffffff"
                >
                  Get Started
                </ShimmerButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log('Mobile menu clicked, current state:', isMobileMenuOpen);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <motion.div
              className="w-6 h-6 flex flex-col justify-center items-center"
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="w-5 h-0.5 bg-white block mb-1"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-white block mb-1"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-white block"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>
        </nav>
        </div>

        {/* Mobile Glass Drawer */}
        <motion.div
          className="md:hidden fixed inset-0 z-[60]"
          initial={false}
          animate={isMobileMenuOpen ? "open" : "closed"}
          style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            variants={{
              open: { opacity: 1, backdropFilter: 'blur(30px) saturate(0%) brightness(30%)' },
              closed: { opacity: 0, backdropFilter: 'blur(0px)' }
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <motion.div
            className="absolute top-20 right-4 left-4 rounded-3xl p-6 shadow-2xl"
            variants={{
              open: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }
              },
              closed: { 
                opacity: 0, 
                y: -20,
                scale: 0.95,
                transition: { 
                  duration: 0.3 
                }
              }
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(10, 10, 10, 1) 50%, rgba(0, 0, 0, 0.99) 100%)',
              backdropFilter: 'blur(40px) saturate(0%) brightness(50%)',
              WebkitBackdropFilter: 'blur(40px) saturate(0%) brightness(50%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.9),
                0 0 0 1px rgba(255, 255, 255, 0.03),
                inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
                inset 0 0 30px rgba(0, 0, 0, 0.5)
              `,
            }}
          >
            {/* Navigation Links */}
            <div className="space-y-4 mb-6">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Pricing', id: 'pricing' },
                { name: 'Contact', id: 'contact' },
                { name: 'FAQ', id: 'faq' }
              ].map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-white text-lg font-medium py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    setTimeout(() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setIsMobileMenuOpen(false);
                    }, 150);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0, 
                    x: isMobileMenuOpen ? 0 : 20 
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: isMobileMenuOpen ? index * 0.1 : 0 
                  }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="space-y-3 pt-4 border-t border-white/20">
                <motion.button
                  className="w-full text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-xl hover:bg-white/10 font-medium"
                  onClick={() => {
                    handleAuthClick('signin');
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0, 
                    y: isMobileMenuOpen ? 0 : 20 
                  }}
                  transition={{ duration: 0.3, delay: isMobileMenuOpen ? 0.5 : 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                  onClick={() => {
                    handleAuthClick('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0, 
                    y: isMobileMenuOpen ? 0 : 20 
                  }}
                  transition={{ duration: 0.3, delay: isMobileMenuOpen ? 0.6 : 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </div>
            )}

            {/* User Menu for Mobile */}
            {user && (
              <div className="pt-4 border-t border-white/20">
                <UserMenu />
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-16 md:pt-12">
        {/* Interactive Grid Background */}
        <InteractiveGridPattern
          width={50}
          height={50}
          squares={[30, 20]}
          className="opacity-20"
          squaresClassName="stroke-gray-600/20 hover:fill-purple-500/20"
        />
        
        {/* Background Orb Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3">
            <div className="w-[1000px] h-[600px] rounded-full bg-gradient-to-t from-purple-600/40 via-green-600/30 to-transparent blur-3xl"></div>
          </div>
          {/* Company logos in the orb */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl overflow-hidden">
            <motion.div 
              className="flex items-center gap-6 md:gap-8"
              animate={{ x: [0, -700] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              style={{ width: 'calc(200%)' }}
            >
              {/* First set of logos */}
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//BKash_Logo_icon-700x662.png" 
                alt="bKash" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//link_stripe-logo_brandlogos.net_scfln.png" 
                alt="Stripe" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//logo.png" 
                alt="Company Logo" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Paypal_2014_logo.png" 
                alt="PayPal" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Stripe_Logo,_revised_2016.svg.png" 
                alt="Stripe" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//vectorseek.com-Nagad-Logo-Vector.png" 
                alt="Nagad" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              
              {/* Duplicate set for seamless loop */}
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//BKash_Logo_icon-700x662.png" 
                alt="bKash" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//link_stripe-logo_brandlogos.net_scfln.png" 
                alt="Stripe" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//logo.png" 
                alt="Company Logo" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Paypal_2014_logo.png" 
                alt="PayPal" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Stripe_Logo,_revised_2016.svg.png" 
                alt="Stripe" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
              <img 
                src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//vectorseek.com-Nagad-Logo-Vector.png" 
                alt="Nagad" 
                className="h-6 md:h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              />
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto -mt-8 md:-mt-16">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-purple-600/30 border border-purple-500/40 rounded-full px-3 md:px-4 py-2 mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-purple-600 text-white text-xs px-2 md:px-3 py-1 rounded-full font-medium">2025</span>
            <AnimatedShinyText className="text-xs md:text-sm font-medium">
              Next Gen-Development
            </AnimatedShinyText>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight tracking-tight px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-white">Helping Startups and SME's</span>
            <span className="block text-white">Get a Visual Identity</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="text-base md:text-lg lg:text-xl text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto font-medium px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>An intuitive platform that lets you plan, build, and launch your online presence in days not months. No Fortunes. No surprises.</p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <InteractiveButton 
              onClick={() => {
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
              }}
              variant="primary"
              className="w-full sm:w-auto px-6 md:px-8 py-3 text-sm md:text-base"
            >
              Connect With Us
            </InteractiveButton>
            <InteractiveButton 
              onClick={() => {
                setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
              }}
              variant="secondary"
              className="w-full sm:w-auto px-6 md:px-8 py-3 text-sm md:text-base"
            >
              What is Flowscape?
            </InteractiveButton>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            className="text-left space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            {[
              "Flowscape was founded with a simple mission to help startups and small business owners build a powerful online identity without breaking the bank.",
              "We believe every entrepreneur deserves a modern, professional website or app that doesn't cost a fortune or take months to launch. That's why we created an intuitive platform where your ideas can come to life designed, built, and launched in days.",
              "Our team of developers and creators work day and night to ensure you get the best experience and not the highest price tag. Whether you're just starting out or scaling fast, Flowscape is here to help you grow on your terms, at your pace."
            ].map((paragraph, index) => (
                             <motion.p
                 key={index}
                 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-300 leading-relaxed hover:text-gray-200 transition-all duration-500 cursor-default"
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  transition: { 
                    duration: 0.8, 
                    delay: index * 0.3,
                    ease: "easeOut"
                  }
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: false, margin: "-50px" }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Bottom blur effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
      </section>

      {/* Services Section */}
      <section className="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden" id="services">
        {/* Background Grid Pattern */}
        <InteractiveGridPattern
          width={40}
          height={40}
          squares={[35, 25]}
          className="opacity-10"
          squaresClassName="stroke-gray-600/30"
        />
        
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated Main Title */}
            <div className="relative mb-6">
              <motion.h2 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-tight tracking-tight"
                style={{ color: '#ffffff' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {"Built with Innovation".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block text-white"
                    style={{ color: '#ffffff' }}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 0,
                      transition: {
                        duration: 0.8,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }
                    }}
                    whileHover={{
                      scale: 1.2,
                      color: "#a855f7",
                      textShadow: "0 0 20px rgba(168, 85, 247, 0.8)",
                      transition: { duration: 0.3 }
                    }}
                    viewport={{ once: true }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>
              
              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${-20 + (i % 2) * 40}px`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              {/* Glowing orb effect */}
              <motion.div
                className="absolute inset-0 -z-10"
                animate={{
                  background: [
                    "radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Animated subtitle */}
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              {"Comprehensive solutions designed to elevate your business with cutting-edge technology and seamless user experiences.".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-1"
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ 
                    opacity: 1, 
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.3,
                      delay: 1.2 + (index * 0.03)
                    }
                  }}
                  whileHover={{
                    color: "#d1d5db",
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Main Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-12 md:mb-16">
            {/* Seamless API Integrations */}
            <motion.div
              className="group relative bg-gray-900/40 border border-gray-800/50 rounded-3xl p-6 md:p-10 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 group-hover:text-purple-300 transition-colors">
                Seamless API Integrations
              </h3>
              <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 leading-relaxed">
                Connect with any API or service of your choice. Our platform is currently ready to be shipped with robust integration capabilities.
              </p>
              
              {/* Interactive AnimatedBeam visualization */}
              <div className="relative h-60 bg-gray-800/30 rounded-xl overflow-hidden group-hover:bg-gray-800/50 transition-colors">
                <ApiIntegrationDemo />
              </div>
            </motion.div>

            {/* Trusted Authentication */}
            <motion.div
              className="group relative bg-gray-900/40 border border-gray-800/50 rounded-3xl p-6 md:p-10 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-green-600 to-teal-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: -5 }}
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </motion.div>
              
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-green-300 transition-colors">
                Trusted Authentication
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Keep yourself and your customers safe with our robust authentication methods. Supporting B2B, B2C, and personal systems.
              </p>
              
              {/* Interactive security visualization */}
              <div className="relative h-60 bg-gray-800/30 rounded-xl overflow-hidden group-hover:bg-gray-800/50 transition-colors">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-24 h-24 border-4 border-green-500/50 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Premium UI/UX Design */}
            <motion.div
              className="group relative bg-gray-900/40 border border-gray-800/50 rounded-3xl p-6 md:p-10 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-pink-600 to-orange-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </motion.div>
              
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-pink-300 transition-colors">
                Premium UI/UX Design
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Excellent seamless fluid UI/UX designs that enhance user experience and drive engagement across all platforms.
              </p>
              
              {/* Interactive design visualization */}
              <div className="relative h-60 bg-gray-800/30 rounded-xl overflow-hidden group-hover:bg-gray-800/50 transition-colors">
                <motion.div className="absolute inset-0 p-6">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-5 bg-gradient-to-r from-pink-500/50 to-orange-500/50 rounded-full mb-3"
                      style={{ width: `${60 + i * 20}%` }}
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scaleX: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 3,
                        delay: i * 0.4,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ready to Ship */}
            <motion.div
              className="group text-center p-6 bg-gray-900/30 border border-gray-800/30 rounded-2xl backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-12 h-12 bg-blue-600/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors"
                whileHover={{ rotate: 10 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.div>
              <h4 className="text-lg font-bold text-white mb-2">Ready to Ship</h4>
              <p className="text-sm text-gray-400">Currently ready to be deployed with all integrations tested.</p>
            </motion.div>

            {/* B2B & B2C Solutions */}
            <motion.div
              className="group text-center p-6 bg-gray-900/30 border border-gray-800/30 rounded-2xl backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-12 h-12 bg-purple-600/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors"
                whileHover={{ rotate: -10 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
              <h4 className="text-lg font-bold text-white mb-2">B2B & B2C Solutions</h4>
              <p className="text-sm text-gray-400">Comprehensive solutions for business and personal systems.</p>
            </motion.div>

            {/* Lifetime Support */}
            <motion.div
              className="group text-center p-6 bg-gray-900/30 border border-gray-800/30 rounded-2xl backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-12 h-12 bg-green-600/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors"
                whileHover={{ rotate: 10 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </motion.div>
              <h4 className="text-lg font-bold text-white mb-2">Lifetime Support</h4>
              <p className="text-sm text-gray-400">Ongoing support and development for your peace of mind.</p>
            </motion.div>

            {/* Development Excellence */}
            <motion.div
              className="group text-center p-6 bg-gray-900/30 border border-gray-800/30 rounded-2xl backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-12 h-12 bg-orange-600/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors"
                whileHover={{ rotate: -10 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </motion.div>
              <h4 className="text-lg font-bold text-white mb-2">Expert Development</h4>
              <p className="text-sm text-gray-400">Professional development with modern technologies and best practices.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 relative">
        <InteractiveGridPattern
          width={40}
          height={40}
          squares={[25, 15]}
          className="opacity-10"
          squaresClassName="stroke-gray-700/20 hover:fill-purple-500/10"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Pricing
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Choose the perfect plan for your needs. No hidden fees, no surprises.
            </motion.p>
          </motion.div>

          {/* Controls */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Plan Toggle */}
            <PlanToggle />
            {/* Country Selector */}
            <CountrySelector />
          </motion.div>

          {/* Pricing Cards */}
          <PricingCards />

          {/* Divider */}
          <motion.div
            className="my-24 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />

          {/* Feature Comparison Table */}
          <FeatureTable />

          {/* Final CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#docs"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-lg transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Compare Full Documentation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 px-6 relative">
        <InteractiveGridPattern
          width={50}
          height={50}
          squares={[20, 10]}
          className="opacity-5"
          squaresClassName="stroke-gray-800/20 hover:fill-purple-500/5"
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-purple-300 font-medium text-sm">Comparison</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Flowscape vs. The Rest
            </motion.h2>
            <motion.p
              className="text-2xl md:text-3xl text-gray-500 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Let's See the Difference
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Flowscape is designed to set your agency and portfolio apart with a premium, clutter-free layout that enhances your work.
            </motion.p>
          </motion.div>

          {/* Comparison Grid */}
          <ComparisonGrid />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 relative">
        <InteractiveGridPattern
          width={60}
          height={60}
          squares={[15, 8]}
          className="opacity-5"
          squaresClassName="stroke-gray-800/20 hover:fill-purple-500/5"
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Header */}
            <motion.div
              className="lg:sticky lg:top-32"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-purple-300 font-medium text-sm">FAQ</span>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Frequently
                <br />
                <span className="text-gray-500">Asked Questions</span>
              </motion.h2>

              <motion.p
                className="text-lg text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
              </motion.p>
            </motion.div>

            {/* Right Column - FAQ Items */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FAQAccordion />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden bg-black">
        {/* Subtle animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-purple-600/30 border border-purple-500/40 rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center relative">
              <span className="text-white text-xs font-bold">24/7</span>
              <motion.div
                className="absolute inset-0 bg-purple-400 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-purple-200 font-medium text-sm">Collaborate With Us</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have Any Doubts? We are Ready to Help.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Whether you need guidance, support, or a fresh start, our team is ready to assist you.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-2xl mb-16 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fill The Form Out!
          </motion.button>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-black">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.05, 0.1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.05, 0.02, 0.05],
              x: [0, -40, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white/90 font-medium text-sm">Become a Part of Us</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Elevate Your Brand
            <br />
            <span className="text-white/70">with Next-Gen Innovation?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to take the next step? Join us now and start transforming your vision into reality with expert support.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-12 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800/50 py-16 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <img 
                  src="https://wrczctvglyhprlbkogjb.supabase.co/storage/v1/object/public/banklogos//flowscape%20logo%20(1).png" 
                  alt="Flowscape Logo" 
                  className="w-32 h-auto"
                />
              </div>
            </motion.div>

            {/* View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">View</h3>
              <ul className="space-y-4">
                {['Home', 'About', 'Pricing', 'Contact'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); }}>
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">Social</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Twitter (X)', url: '#' },
                  { name: 'Instagram', url: '#' },
                  { name: 'Youtube', url: '#' }
                ].map((item) => (
                  <motion.li key={item.name} whileHover={{ x: 5 }}>
                    <a href={item.url} className="text-gray-400 hover:text-white transition-colors">
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="pt-8 border-t border-gray-800/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 Aeron X Technologies. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
      </div>
    </CountryContext.Provider>
  );
}

// Country Selector Component
const CountrySelector = () => {
  const { selectedCountry, setSelectedCountry } = useContext(CountryContext);
  const [isOpen, setIsOpen] = useState(false);

  const countries = [
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Bangladesh', flag: '🇧🇩' },
    { name: 'Worldwide', flag: '🌍' }
  ] as const;

  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-full px-6 py-3 text-white hover:bg-gray-800/50 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-lg">
          {selectedCountry ? countries.find(c => c.name === selectedCountry)?.flag : '🌐'}
        </span>
        <span className="font-medium text-sm">{selectedCountry || 'Select Country'}</span>
        <motion.svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {/* Dropdown */}
      <motion.div
        className="absolute top-full left-0 right-0 mt-2 bg-gray-900/90 backdrop-blur-md border border-gray-800/50 rounded-2xl overflow-hidden shadow-2xl z-50"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          y: isOpen ? 0 : -10,
          scale: isOpen ? 1 : 0.95,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {countries.map((country, index) => (
          <motion.button
            key={country.name}
            className="w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-800/50 transition-colors"
            onClick={() => {
              setSelectedCountry(country.name);
              setIsOpen(false);
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              x: isOpen ? 0 : -20
            }}
            transition={{ duration: 0.3, delay: isOpen ? index * 0.1 : 0 }}
            whileHover={{ x: 5 }}
          >
            <span className="text-lg">{country.flag}</span>
            <span className="font-medium text-sm text-white">{country.name}</span>
            {selectedCountry === country.name && (
              <motion.div
                className="ml-auto w-2 h-2 bg-purple-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

// Pricing Components
const PlanToggle = () => {
  const [selectedPlan, setSelectedPlan] = useState<'personal' | 'business'>('personal');

  return (
    <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-full p-1">
      <motion.div
        className="absolute inset-1 bg-white rounded-full"
        initial={false}
        animate={{
          x: selectedPlan === 'personal' ? 0 : '100%',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ width: '50%' }}
      />
      <div className="relative flex">
        <button
          className={`px-8 py-2 rounded-full font-medium transition-colors relative z-10 text-sm ${
            selectedPlan === 'personal' ? 'text-black' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setSelectedPlan('personal')}
        >
          Personal
        </button>
        <button
          className={`px-8 py-2 rounded-full font-medium transition-colors relative z-10 text-sm ${
            selectedPlan === 'business' ? 'text-black' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setSelectedPlan('business')}
        >
          Business
        </button>
      </div>
    </div>
  );
};

const PricingCards = () => {
  const { selectedCountry } = useContext(CountryContext);

  // Don't render pricing cards if no country is selected
  if (!selectedCountry) {
    return (
      <div className="max-w-5xl mx-auto mb-16 text-center">
        <motion.div
          className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-12 border border-gray-800/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative w-48 h-48 mx-auto mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Globe
              className="!max-w-[192px] !aspect-square"
              config={{
                width: 800,
                height: 800,
                onRender: () => {},
                devicePixelRatio: 2,
                phi: 0,
                theta: 0.3,
                dark: 0,
                diffuse: 0.4,
                mapSamples: 16000,
                mapBrightness: 1.2,
                baseColor: [1, 1, 1],
                markerColor: [147 / 255, 51 / 255, 234 / 255],
                glowColor: [1, 1, 1],
                markers: [
                  { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney, Australia
                  { location: [23.8103, 90.4125], size: 0.08 }, // Dhaka, Bangladesh
                  { location: [40.7128, -74.006], size: 0.06 }, // New York, USA
                  { location: [51.5074, -0.1278], size: 0.06 }, // London, UK
                  { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo, Japan
                  { location: [48.8566, 2.3522], size: 0.05 }, // Paris, France
                  { location: [-23.5505, -46.6333], size: 0.05 }, // São Paulo, Brazil
                ],
              }}
            />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Choose Your Region</h3>
          <p className="text-gray-400 text-lg">
            Select your country above to view pricing in your local currency
          </p>
        </motion.div>
      </div>
    );
  }

  const getPricing = (planType: 'mini' | 'basic' | 'pro') => {
    const pricing = {
      Australia: { mini: 'A$8', basic: 'A$20', pro: 'A$40' },
      Bangladesh: { mini: '৳600', basic: '৳1000', pro: '৳3000' },
      Worldwide: { mini: '$8', basic: '$20', pro: '$40' }
    };
    return pricing[selectedCountry][planType];
  };

  const plans = [
    {
      name: "Mini",
      subtitle: "Landing pages",
      price: getPricing('mini'),
      period: "/month",
      description: "2 pages",
      features: [
        "2 pages",
        "10 GB bandwidth",
        "Custom domain"
      ],
      cta: "Get started",
      popular: false,
      monthly: true
    },
    {
      name: "Basic",
      subtitle: "Basic sites",
      price: getPricing('basic'),
      period: "/month",
      description: "1000 pages",
      features: [
        "1000 pages",
        "50 GB bandwidth",
        "Password protect"
      ],
      cta: "Get started",
      popular: false,
      monthly: true
    },
    {
      name: "Pro",
      subtitle: "Growing sites",
      price: getPricing('pro'),
      period: "/month",
      description: "10,000 pages",
      features: [
        "10,000 pages",
        "100 GB bandwidth",
        "10 CMS collections"
      ],
      cta: "Get started",
      popular: true,
      monthly: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          className={`relative bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
            plan.popular 
              ? 'border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-transparent' 
              : 'border-gray-800/50 hover:border-gray-700/50'
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          {/* Popular Badge */}
          {plan.popular && (
            <div className="absolute -top-3 left-6">
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                POPULAR
              </div>
            </div>
          )}

          {/* Plan Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{plan.subtitle}</p>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-2xl font-bold text-white">{plan.price}</span>
              <span className="text-gray-400 text-sm">{plan.period}</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.button
            className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
              plan.popular
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 hover:border-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {plan.cta}
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

const FeatureTable = () => {
  const featureCategories = [
    {
      name: "📄 Publish",
      features: [
        { name: "Home + 404 page", mini: true, basic: "1000 pages", pro: "10,000 pages" },
        { name: "Page & CMS drafts", mini: false, basic: "Page & CMS drafts", pro: "Page & CMS drafts" },
        { name: "CMS collections", mini: false, basic: "2 CMS collections", pro: "10 CMS collections" }
      ]
    },
    {
      name: "🤝 Collaboration",
      features: [
        { name: "3 editors max", mini: "A$27 per editor", basic: "3 editors max", pro: "3 editors max" },
        { name: "3 day version history", mini: "A$27 per editor", basic: "7 day version history", pro: "30 day version history" }
      ]
    },
    {
      name: "🤖 AI",
      features: [
        { name: "Wireframer unlimited", mini: false, basic: "Wireframer unlimited", pro: "Wireframer unlimited" },
        { name: "Workshop limited", mini: false, basic: "Workshop limited", pro: "Workshop unlimited" }
      ]
    },
    {
      name: "🌐 Hosting",
      features: [
        { name: "500MB storage", mini: true, basic: "1GB storage", pro: "10GB storage" },
        { name: "10GB bandwidth", mini: true, basic: "50GB bandwidth", pro: "100GB bandwidth" },
        { name: "50MB file uploads", mini: true, basic: "50MB file uploads", pro: "50MB file uploads" },
        { name: "50 form entries", mini: true, basic: "500 form entries", pro: "2,500 form entries" },
        { name: "Staging environment", mini: false, basic: false, pro: "Staging environment" }
      ]
    },
    {
      name: "✨ Features",
      features: [
        { name: "Custom code", mini: true, basic: "Custom code", pro: "Custom code" }
      ]
    }
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Table Headers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 px-6">
        <div></div>
        <div className="text-center">
          <h4 className="text-white font-semibold">Mini</h4>
        </div>
        <div className="text-center">
          <h4 className="text-white font-semibold">Basic</h4>
        </div>
        <div className="text-center">
          <h4 className="text-white font-semibold">Pro</h4>
        </div>
      </div>

      {featureCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            {category.name}
          </h3>
          
          <div className="space-y-4">
            {category.features.map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3 border-b border-gray-800/30 last:border-b-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (featureIndex * 0.05) }}
                viewport={{ once: true }}
              >
                <div className="text-gray-300 font-medium text-sm">
                  {feature.name}
                </div>
                
                {/* Mini Column */}
                <div className="text-center">
                  {typeof feature.mini === 'boolean' ? (
                    feature.mini ? (
                      <div className="w-4 h-4 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <span className="text-gray-600 text-sm">—</span>
                    )
                  ) : (
                    <span className="text-gray-300 text-sm">{feature.mini}</span>
                  )}
                </div>
                
                {/* Basic Column */}
                <div className="text-center">
                  {typeof feature.basic === 'boolean' ? (
                    feature.basic ? (
                      <div className="w-4 h-4 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <span className="text-gray-600 text-sm">—</span>
                    )
                  ) : (
                    <span className="text-gray-300 text-sm">{feature.basic}</span>
                  )}
                </div>
                
                {/* Pro Column */}
                <div className="text-center">
                  {typeof feature.pro === 'boolean' ? (
                    feature.pro ? (
                      <div className="w-4 h-4 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <span className="text-gray-600 text-sm">—</span>
                    )
                  ) : (
                    <span className="text-gray-300 text-sm">{feature.pro}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const ComparisonGrid = () => {
  const comparisonData = [
    {
      category: "The Rest",
      items: [
        { text: "Generic, Overused Layouts", negative: true },
        { text: "Cluttered & Outdated UI", negative: true },
        { text: "Slow & Unoptimized", negative: true },
        { text: "Limited Customization", negative: true },
        { text: "Short-Term Relevance", negative: true }
      ]
    },
    {
      category: "Flowscape",
      items: [
        { text: "AI-Driven Design", negative: false },
        { text: "Premium, Minimal Aesthetic", negative: false },
        { text: "Performance Optimized", negative: false },
        { text: "Future-Proof Technology", negative: false },
        { text: "Unmatched Flexibility", negative: false }
      ]
    }
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {comparisonData.map((column, columnIndex) => (
        <motion.div
          key={column.category}
          className={`bg-gray-900/40 backdrop-blur-sm border rounded-3xl p-8 ${
            column.category === "Flowscape" 
              ? "border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-transparent" 
              : "border-gray-800/50"
          }`}
          initial={{ opacity: 0, x: columnIndex === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + (columnIndex * 0.1) }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Column Header */}
          <div className="text-center mb-8">
            <h3 className={`text-2xl font-bold mb-2 ${
              column.category === "Flowscape" ? "text-white" : "text-gray-400"
            }`}>
              {column.category}
            </h3>
            {column.category === "Flowscape" && (
              <div className="w-12 h-1 bg-purple-500 rounded-full mx-auto"></div>
            )}
          </div>

          {/* Feature List */}
          <div className="space-y-6">
            {column.items.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + (columnIndex * 0.1) + (itemIndex * 0.05) 
                }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                {/* Icon */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                  item.negative 
                    ? "bg-red-500/20 border border-red-500/30" 
                    : "bg-purple-500/20 border border-purple-500/30"
                }`}>
                  {item.negative ? (
                    <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Text */}
                <span className={`text-lg font-medium leading-relaxed ${
                  item.negative ? "text-gray-400" : "text-white"
                }`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom decoration for Flowscape column */}
          {column.category === "Flowscape" && (
            <motion.div
              className="mt-8 pt-6 border-t border-purple-500/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-purple-400 text-sm font-medium">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>The Clear Winner</span>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqData = [
    {
      question: "What do I need to get started?",
      answer: "Getting started with Flowscape is simple! You just need a modern web browser and an internet connection. Our platform is designed to be user-friendly, so no technical expertise is required. Once you sign up, you'll have access to our intuitive dashboard where you can begin building your project immediately."
    },
    {
      question: "What kind of customization is available?",
      answer: "Flowscape offers extensive customization options including custom branding, color schemes, layouts, and functionality. You can modify templates, add custom code, integrate third-party services, and create unique user experiences tailored to your specific needs. Our flexible architecture supports both simple modifications and complex customizations."
    },
    {
      question: "How easy is it to edit for beginners?",
      answer: "Very easy! Flowscape is built with beginners in mind. Our drag-and-drop interface, visual editor, and pre-built components make it simple to create professional websites without coding knowledge. We also provide comprehensive tutorials, documentation, and support to help you get started quickly."
    },
    {
      question: "Let me know more about moneyback guarantee?",
      answer: "We offer a 30-day money-back guarantee on all our plans. If you're not completely satisfied with Flowscape within the first 30 days of your purchase, simply contact our support team and we'll provide a full refund, no questions asked. This guarantee reflects our confidence in the quality and value of our platform."
    },
    {
      question: "Do I need to know how to code?",
      answer: "Not at all! Flowscape is designed for users of all skill levels. While coding knowledge can be helpful for advanced customizations, it's not required. Our visual editor, pre-built templates, and intuitive interface allow you to create stunning websites without writing a single line of code. However, if you do know how to code, you have full access to customize everything."
    },
    {
      question: "What will I get after purchasing the template?",
      answer: "After purchase, you'll receive immediate access to the complete Flowscape template package including all source files, documentation, installation guide, and lifetime updates. You'll also get access to our premium support community, exclusive resources, and priority customer support to help you make the most of your investment."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqData.map((item, index) => (
        <motion.div
          key={index}
          className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700/50 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
        >
          <motion.button
            className="w-full px-6 py-6 text-left flex items-center justify-between group"
            onClick={() => toggleAccordion(index)}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
          >
            <span className="text-lg font-medium text-white group-hover:text-purple-300 transition-colors pr-4">
              {item.question}
            </span>
            
            <motion.div
              className="flex-shrink-0 w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center border border-purple-500/30 group-hover:bg-purple-600/30 transition-colors"
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <svg 
                className="w-4 h-4 text-purple-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </motion.div>
          </motion.button>

          <motion.div
            initial={false}
            animate={{
              height: openIndex === index ? "auto" : 0,
              opacity: openIndex === index ? 1 : 0
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut",
              opacity: { duration: 0.3 }
            }}
            className="overflow-hidden"
          >
            <motion.div
              className="px-6 pb-6"
              initial={{ y: -10 }}
              animate={{ y: openIndex === index ? 0 : -10 }}
              transition={{ duration: 0.3, delay: openIndex === index ? 0.1 : 0 }}
            >
              <div className="border-t border-gray-800/30 pt-4">
                <p className="text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div
      className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      viewport={{ once: true }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            viewport={{ once: true }}
          >
            <label className="block text-white text-sm font-medium mb-3">
              First name*
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Jane"
              className="w-full bg-gray-900/60 border border-gray-700/50 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
              required
            />
          </motion.div>

          {/* Last Name */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            viewport={{ once: true }}
          >
            <label className="block text-white text-sm font-medium mb-3">
              Last Name*
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Smith"
              className="w-full bg-gray-900/60 border border-gray-700/50 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
              required
            />
          </motion.div>
        </div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <label className="block text-white text-sm font-medium mb-3">
            How can we reach you?*
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="jane@example.com"
            className="w-full bg-gray-900/60 border border-gray-700/50 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
            required
          />
        </motion.div>

        {/* Message Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          viewport={{ once: true }}
        >
          <label className="block text-white text-sm font-medium mb-3">
            Tell us about your project
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Describe your project, goals, and how we can help you..."
            rows={5}
            className="w-full bg-gray-900/60 border border-gray-700/50 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 resize-none"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </motion.div>

        {/* Additional Info */}
        <motion.p
          className="text-gray-400 text-sm text-center pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          viewport={{ once: true }}
        >
          We'll get back to you within 24 hours. Your privacy is important to us.
        </motion.p>
      </form>
    </motion.div>
  );
};



export default App;