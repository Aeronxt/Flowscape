import React, { useState, createContext, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { AuthModal } from './components/AuthModal';
import { AnimatedShinyText } from './components/AnimatedShinyText';
import { SmoothCursor } from './components/ui/smooth-cursor';
import { UserMenu } from './components/UserMenu';
import { ShimmerButton } from './components/magicui/shimmer-button';
import { InteractiveGridPattern } from './components/ui/interactive-grid-pattern';
import { Globe } from './components/magicui/globe';
import { Footer } from './components/Footer';
import { Squares } from './components/ui/squares';
import { LogoCarousel } from './components/ui/logo-carousel';
import { FeaturesSectionWithHoverEffects } from './components/ui/features-section-hover';
import { UIUXDesignFeature } from './components/ui/uiux-design-feature';
import ScrollFloat from './components/ui/ScrollFloat';
// import ScrollReveal from './components/ui/ScrollReveal';
import { FeatureSteps } from './components/ui/feature-steps';
import { IconCloud } from './components/ui/icon-cloud';
import TestimonialsSection from './components/ui/testimonials';
import { ComparisonSection } from './components/ui/comparison-section';
import ShowcaseSection from './components/ui/project-versions';
import { PricingCard, type PricingCardProps } from './components/ui/animated-glassy-pricing';
import { MagicText } from './components/ui/magic-text';

// Type definitions
type FeatureValue = string | boolean | number;
type BusinessFeature = {
  name: string;
  startup: FeatureValue;
  risingStar: FeatureValue;
  enterprise: FeatureValue;
};
type PersonalFeature = {
  name: string;
  lite: FeatureValue;
  plus: FeatureValue;
  pro: FeatureValue;
};

// Logo data for the carousel
const logoData = [
  {
    id: 1,
    name: 'bKash',
    img: 'https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//BKash_Logo_icon-700x662.png'
  },
  {
    id: 2,
    name: 'Stripe',
    img: 'https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//link_stripe-logo_brandlogos.net_scfln.png'
  },
  {
    id: 3,
    name: 'Company Logo',
    img: 'https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//logo.png'
  },
  {
    id: 4,
    name: 'PayPal',
    img: 'https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Paypal_2014_logo.png'
  },
  {
    id: 5,
    name: 'Stripe Alternative',
    img: 'https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Stripe_Logo,_revised_2016.svg.png'
  },
  {
    id: 6,
    name: 'Nagad',
    img: 'https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//vectorseek.com-Nagad-Logo-Vector.png'
  }
];

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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<'Australia' | 'Bangladesh' | 'Worldwide' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'personal' | 'business'>('personal');

  // const handleAuthClick = (mode: 'signin' | 'signup') => {
  //   if (mode === 'signin') {
  //     setIsAuthModalOpen(true);
  //   } else {
  //     setIsAuthModalOpen(true);
  //   }
  // };

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



  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      <PlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
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
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl px-4 md:px-6 py-3 shadow-2xl overflow-hidden">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/public//f.png" 
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
                  onClick={() => window.location.href = 'https://dashboard.flowscape.xyz/'}
                >
                  Sign In
                </motion.button>
                <ShimmerButton
                  onClick={() => window.open('https://dashboard.flowscape.xyz/', '_blank')}
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
                    window.location.href = 'https://dashboard.flowscape.xyz/';
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
                    window.open('https://dashboard.flowscape.xyz/', '_blank');
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
        {/* Animated Squares Background */}
        <div className="absolute inset-0">
          <Squares
            direction="diagonal"
            speed={0.5}
            borderColor="#333"
            squareSize={50}
            hoverFillColor="#222"
            className="opacity-30"
        />
        </div>
        
        
        {/* Background Orb Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3">
            <div className="w-[1000px] h-[600px] rounded-full bg-gradient-to-t from-purple-600/40 via-green-600/30 to-transparent blur-3xl"></div>
          </div>
          {/* Company logos in the orb */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl flex justify-center">
            <LogoCarousel logos={logoData} columnCount={3} />
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
            <span className="block text-white">Your Vision, Our Pixel‑Perfect</span>
            <span className="block text-white">Execution.</span>
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
              Spensit
            </InteractiveButton>
            <InteractiveButton 
              onClick={() => {
                setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
              }}
              variant="secondary"
              className="w-full sm:w-auto px-6 md:px-8 py-3 text-sm md:text-base"
            >
              Ecommerce
            </InteractiveButton>
          </motion.div>
        </div>
      </section>

      {/* View our Work Section */}
      <section className="relative overflow-hidden">
        <ShowcaseSection />
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* About Us Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-green-600/30 border border-green-500/40 rounded-full px-3 md:px-4 py-2 mb-12 md:mb-16 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-green-600 text-white text-xs px-2 md:px-3 py-1 rounded-full font-medium">?</span>
            <AnimatedShinyText className="text-xs md:text-sm font-medium">
              About Us
            </AnimatedShinyText>
          </motion.div>

          <div className="text-left space-y-8">
            <MagicText
              textClassName="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-300 leading-relaxed"
              text={
                "Flowscape was founded with a simple mission to help startups and small business owners build a powerful online identity without breaking the bank. We believe every entrepreneur deserves a modern, professional website or app that doesn't cost a fortune or take months to launch. That's why we created an intuitive platform where your ideas can come to life designed, built, and launched in days. Our team of developers and creators work day and night to ensure you get the best experience and not the highest price tag. Whether you're just starting out or scaling fast, Flowscape is here to help you grow on your terms, at your pace."
              }
            />
          </div>
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
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Left Column - Title and Text */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Main Title with ScrollFloat */}
              <div className="relative mb-6">
                <ScrollFloat
                  animationDuration={1}
                  ease='back.inOut(2)'
                  scrollStart='center bottom+=50%'
                  scrollEnd='bottom bottom-=40%'
                  stagger={0.03}
                  containerClassName="text-left"
                  textClassName="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
                >
                  Built with Innovation
                </ScrollFloat>
              </div>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                Comprehensive solutions designed to elevate your business with cutting-edge technology and seamless user experiences.
              </p>
            </motion.div>

            {/* Right Column - Icon Cloud */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                <IconCloud
                  iconSlugs={[
                    "typescript",
                    "javascript",
                    "react",
                    "nextdotjs",
                    "nodejs",
                    "python",
                    "tailwindcss",
                    "framermotion",
                    "supabase",
                    "vercel",
                    "git",
                    "github",
                    "figma",
                    "docker",
                    "postgresql",
                    "mongodb",
                    "redis",
                    "graphql",
                    "html5",
                    "css3",
                    "sass",
                    "webpack",
                    "vite",
                    "eslint",
                    "prettier"
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Features Section with Hover Effects */}
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>

      {/* UI/UX Design Section */}
      <section className="relative">
        <UIUXDesignFeature />
      </section>

      {/* How to Get Started Section */}
      <section className="relative py-16 md:py-32 bg-black">
        <FeatureSteps
          features={[
            {
              step: "Step 1",
              title: "Choose Your Pricing Plan",
              content: "Select the perfect plan that fits your needs and budget. Sign up with just a few clicks to get started on your journey.",
              image: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture%20(2).PNG"
            },
            {
              step: "Step 2", 
              title: "Access Your Dashboard",
              content: "Login to your personalized dashboard and create a new project. Our intuitive interface makes it easy to manage everything in one place.",
              image: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture231.PNG"
            },
            {
              step: "Step 3",
              title: "Submit Your Requirements",
              content: "Update all your project requirements and preferences. Then sit back and relax while we craft your perfect web application.",
              image: "https://cpwowrsesrefnugctpos.supabase.co/storage/v1/object/public/flowscape//Capture32121.PNG"
            }
          ]}
          autoPlayInterval={5000}
          imageHeight="h-[300px] md:h-[400px]"
        />
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

          {/* Feature Comparison Table - Hidden on Mobile and when no country is selected */}
          {selectedCountry && (
            <motion.div 
              className="hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FeatureTable />
            </motion.div>
          )}

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
      <ComparisonSection />

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
            onClick={() => window.open('https://dashboard.flowscape.xyz/', '_blank')}
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={user ? 'signin' : 'signup'}
      />
    </div>
      </PlanContext.Provider>
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

// Plan Context
const PlanContext = createContext<{
  selectedPlan: 'personal' | 'business';
  setSelectedPlan: (plan: 'personal' | 'business') => void;
}>({
  selectedPlan: 'personal',
  setSelectedPlan: () => {}
});

// Pricing Components
const PlanToggle = () => {
  const { selectedPlan, setSelectedPlan } = useContext(PlanContext);

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
  const { selectedPlan } = useContext(PlanContext);
  const [isScrolling, setIsScrolling] = useState(false);
  const [pricingSectionRef, setPricingSectionRef] = useState<HTMLDivElement | null>(null);

  // Track scrolling within pricing section for mobile sticky behavior
  useEffect(() => {
    if (!pricingSectionRef) return;

    const handleScroll = () => {
      const rect = pricingSectionRef.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= 100;
      setIsScrolling(isInView && window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pricingSectionRef]);

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

  const getPricing = (planType: 'lite' | 'plus' | 'pro' | 'startup' | 'risingStar' | 'enterprise') => {
    if (selectedPlan === 'business') {
      const businessPricing = {
        Australia: { startup: 'A$45', risingStar: 'A$75', enterprise: 'Custom' },
        Bangladesh: { startup: '৳1399', risingStar: '৳4999', enterprise: 'Custom' },
        Worldwide: { startup: '$45', risingStar: '$75', enterprise: 'Custom' }
      };
      return businessPricing[selectedCountry][planType as 'startup' | 'risingStar' | 'enterprise'];
    } else {
    const pricing = {
        Australia: { lite: 'A$9', plus: 'A$15', pro: 'A$35' },
        Bangladesh: { lite: '৳600', plus: '৳1200', pro: '৳3500' },
        Worldwide: { lite: '$9', plus: '$15', pro: '$35' }
      };
      return pricing[selectedCountry][planType as 'lite' | 'plus' | 'pro'];
    }
  };

  const getCustomDomainPricing = () => {
    if (selectedCountry === 'Bangladesh') {
      return '৳1200';
    }
    return 'A$20';
  };

  const getAddOnText = () => {
    if (selectedCountry === 'Bangladesh') {
      return "Add on available ৳3500 For Increased limits";
    }
    return "Add on available A$30 For Increased limits";
  };

  const plans = selectedPlan === 'business' ? [
    {
      name: "Startup",
      subtitle: "Perfect for startups",
      price: getPricing('startup'),
      period: "/month",
      description: "4 Pages + Ecommerce",
      features: [
        "4 Pages + Ecommerce",
        "2GB Storage",
        selectedCountry === 'Bangladesh' 
          ? "Bkash + Nagad + SSL Commerce" 
          : "Stripe + Paypal + (Bangladesh payments)",
        "6-12 Days Standard Delivery",
        "10 Team Members Dashboard"
      ],
      cta: "Get started",
      popular: false,
      monthly: true,
      includesEverythingFrom: null
    },
    {
      name: "Rising Star",
      subtitle: "Best for growing businesses",
      price: getPricing('risingStar'),
      period: "/month",
      description: "10 Pages + 1 Bonus + Ecommerce",
      features: [
        "10 Pages + 1 Bonus + Ecommerce",
        "5GB Storage",
        "Split Payment + BNPL",
        "10-14 Days Standard Delivery",
        "25 Team Members Dashboard"
      ],
      cta: "Get started",
      popular: true,
      monthly: true,
      includesEverythingFrom: null
    },
    {
      name: "Enterprise",
      subtitle: "For large enterprises",
      price: getPricing('enterprise'),
      period: "",
      description: "Custom Solution",
      features: [
        "Custom Pages & Storage",
        "Custom Payment Gateways",
        "Custom Delivery Time",
        "Custom Team Access",
        "Custom Features & Support"
      ],
      cta: "Contact Sales",
      popular: false,
      monthly: false,
      includesEverythingFrom: null
    }
  ] : [
    {
      name: "Lite",
      subtitle: "Perfect for getting started",
      price: getPricing('lite'),
      period: "/month",
      description: "Interactive Blog + 1 Page",
      features: [
        "Interactive Blog + 1 Page",
        "500MB Storage",
        `Custom Domain +${getCustomDomainPricing()}`,
        "3-7 Days Standard Delivery",
        "1 Dashboard Access"
      ],
      cta: "Get started",
      popular: false,
      monthly: true,
      includesEverythingFrom: null
    },
    {
      name: "Plus",
      subtitle: "Best for Landing pages",
      price: getPricing('plus'),
      period: "/month",
      description: "4 Pages + 1 Bonus",
      features: [
        "1GB Storage",
        "Google Adsense Monetization",
        "Custom Domain Included",
        "Enhanced Database (100K users)",
        "2 Team Members"
      ],
      cta: "Get started",
      popular: true,
      monthly: true,
      includesEverythingFrom: "Lite"
    },
    {
      name: "Pro",
      subtitle: "For Persons with Complex Needs",
      price: getPricing('pro'),
      period: "/month",
      description: "10+ Pages + 1 Bonus",
      features: [
        "Max 8 Edits/Month",
        "3 Team Members",
        "Database Access",
        "Express Delivery (3-7 Days)",
        "Premium Support"
      ],
      cta: "Get started",
      popular: false,
      monthly: true,
      includesEverythingFrom: "Plus"
    }
  ];

  const getDomainPricing = () => {
    if (selectedCountry === 'Bangladesh') {
      return "+৳1200 (1 Year)";
    }
    return "+A$20 (1 Year)";
  };

  const featureCategories = selectedPlan === 'business' ? [
    {
      name: "📄 Pages & Content",
      features: [
        { name: "Pages", startup: "4 Pages + Ecommerce", risingStar: "10 Pages + 1 bonus + Ecommerce", enterprise: "Custom" },
        { name: "Storage", startup: "2 GB", risingStar: "5GB", enterprise: "Custom" }
      ]
    },
    {
      name: "💳 Payment Gateway",
      features: [
        { name: "Payment Gateway", startup: selectedCountry === 'Bangladesh' ? "Bkash + Nagad + SSL" : "Stripe + Paypal", risingStar: "All Payment Methods", enterprise: "Custom" },
        { name: "Split Payment", startup: false, risingStar: true, enterprise: true },
        { name: "BNPL", startup: false, risingStar: true, enterprise: true }
      ]
    },
    {
      name: "📈 Monetization & SEO",
      features: [
        { name: "Monetization", startup: "Google Adsense", risingStar: "Google Adsense", enterprise: "Custom" },
        { name: "SEO", startup: "Optimized", risingStar: "Optimized", enterprise: "Optimized" }
      ]
    },
    {
      name: "⏰ Delivery Time",
      features: [
        { name: "Standard Delivery", startup: "6-12 Days", risingStar: "10-14 Days", enterprise: "Custom" },
        { name: "Express Delivery", startup: "5-7 Days", risingStar: "6-12 Days", enterprise: "Custom" }
      ]
    },
    {
      name: "✨ Features",
      features: [
        { name: "Design & Code", startup: "Interactive Design + Custom Code", risingStar: "Interactive Design + Custom Code", enterprise: "Custom" },
        { name: "Analytics & Tools", startup: "30-day analytics + Popup + Cookie banner", risingStar: "30-day analytics + Popup + Cookie banner", enterprise: "Custom" }
      ]
    },
    {
      name: "🌐 Domain & Integration",
      features: [
        { name: "Custom Domain", startup: "Included", risingStar: "Included", enterprise: "Included" },
        { name: "BYO Domain", startup: true, risingStar: true, enterprise: true },
        { name: "Social Media Integration", startup: true, risingStar: true, enterprise: true }
      ]
    },
    {
      name: "🛠️ Support & Edits",
      features: [
        { name: "Support", startup: "24/7 Included", risingStar: "24/7 Included", enterprise: "24/7 Included" },
        { name: "Edits", startup: "Max 5x/Month", risingStar: "Max 5x/Month", enterprise: "Custom" }
      ]
    },
    {
      name: "💾 Database Computation",
      addOn: getAddOnText(),
      features: [
        { name: "Database Users", startup: "100K monthly active users", risingStar: "100K monthly active users", enterprise: "Custom" },
        { name: "Database Size", startup: "8 GB disk", risingStar: "8 GB disk", enterprise: "Custom" },
        { name: "Bandwidth", startup: "250 GB", risingStar: "250 GB", enterprise: "Custom" },
        { name: "File Storage", startup: "100 GB", risingStar: "100 GB", enterprise: "Custom" }
      ]
    },
    {
      name: "👥 Dashboard Access",
      features: [
        { name: "Team Members", startup: "10", risingStar: "25", enterprise: "Custom" },
        { name: "Backend Access", startup: "Flowscape Dashboard + Database", risingStar: "Flowscape Dashboard + Database", enterprise: "Custom" }
      ]
    },
    {
      name: "🔗 API & Advanced",
      features: [
        { name: "Custom API Integration", startup: "10", risingStar: "20", enterprise: "Custom" },
        { name: "Custom Transaction Email", startup: true, risingStar: true, enterprise: true },
        { name: "ISO", startup: "On Demand", risingStar: "On Demand", enterprise: "Custom" },
        { name: "Marketing", startup: "On Demand", risingStar: "On Demand", enterprise: "Custom" }
      ]
    }
  ] : [
    {
      name: "📄 Pages & Content",
      features: [
        { name: "Pages", lite: "Interactive Blog + 1 Page", plus: "4 Pages + 1 Bonus", pro: "10+ Pages + 1 Bonus" },
        { name: "Storage", lite: "500MB", plus: "1GB", pro: "1GB" },
        { name: "Monetization", lite: false, plus: "Google Adsense", pro: "Google Adsense" },
        { name: "SEO", lite: true, plus: true, pro: true }
      ]
    },
    {
      name: "⏰ Delivery & Support",
      features: [
        { name: "Standard Delivery", lite: "3-7 Days", plus: "3-7 Days", pro: "6-12 Days" },
        { name: "Express Delivery", lite: "2-3 Days", plus: "2-3 Days", pro: "3-7 Days" },
        { name: "Support", lite: "24/7 Included", plus: "24/7 Included", pro: "24/7 Included" },
        { name: "Monthly Edits", lite: "Max 5x", plus: "Max 5x", pro: "Max 8x" }
      ]
    },
    {
      name: "🌐 Domain & Integration",
      features: [
        { name: "Custom Domain", lite: getDomainPricing(), plus: "Included", pro: "Included" },
        { name: "BYO Domain", lite: true, plus: true, pro: true },
        { name: "Social Media Integration", lite: true, plus: true, pro: true },
        { name: "Custom API Integration", lite: false, plus: "Up to 5x", pro: "Up to 5x" }
      ]
    },
    {
      name: "💾 Database & Team",
      addOn: getAddOnText(),
      features: [
        { name: "Database Users", lite: "50K monthly", plus: "100K monthly", pro: "100K monthly" },
        { name: "Database Size", lite: "500MB", plus: "8GB", pro: "8GB" },
        { name: "File Storage", lite: "1GB", plus: "100GB", pro: "100GB" },
        { name: "Bandwidth", lite: "5GB", plus: "250GB", pro: "250GB" },
        { name: "Team Members", lite: "1", plus: "2", pro: "3" },
        { name: "Backend Access", lite: "Flowscape Dashboard", plus: "Flowscape Dashboard", pro: "Flowscape + Database Access" }
      ]
    },
    {
      name: "✨ Features",
      features: [
        { name: "Interactive Design", lite: true, plus: true, pro: true },
        { name: "Custom Code Option", lite: true, plus: true, pro: true },
        { name: "30-day Analytics", lite: true, plus: true, pro: true },
        { name: "Cookie Banner", lite: true, plus: true, pro: true }
      ]
    }
  ];

  return (
    <div ref={setPricingSectionRef} className="max-w-5xl mx-auto mb-16">
      {/* Desktop View - Animated Glassy Pricing Cards */}
      <div className="hidden md:flex flex-col md:flex-row gap-8 md:gap-6 justify-center items-center w-full max-w-4xl mx-auto">
        {plans.map((plan) => {
          // Transform the plan data to match PricingCardProps interface
          const pricingCardProps: PricingCardProps = {
            planName: plan.name,
            description: plan.subtitle,
            price: plan.price, // Pass the full price string
            features: plan.features,
            buttonText: plan.cta,
            isPopular: plan.popular,
            buttonVariant: plan.popular ? 'primary' : 'secondary',
            onClick: () => {
              if (plan.cta === 'Get started') {
                window.open('https://dashboard.flowscape.xyz/', '_blank');
              }
            }
          };
          
          return (
            <PricingCard 
              key={plan.name}
              {...pricingCardProps}
            />
          );
        })}
      </div>

      {/* Mobile View - Screenshot Style */}
      <div className="md:hidden">
        {/* Mobile Sticky Header */}
        <motion.div
          className={`sticky top-0 z-20 bg-black backdrop-blur-md transition-all duration-300 ${
            isScrolling ? 'py-2' : 'py-4'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-between px-4 mb-3">
            <div className="text-sm text-gray-400 font-medium">
              {selectedPlan === 'business' ? 'Business plans' : 'Personal plans'}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Billed Monthly
            </div>
          </div>
          
          {/* Plan Price Cards */}
          <div className="grid grid-cols-3 gap-3 px-4">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`text-center rounded-lg border transition-all duration-300 ${
                  index === 1 // Middle plan (popular)
                    ? 'bg-purple-600 border-purple-500' 
                    : 'bg-gray-800 border-gray-700'
                }`}
                animate={{
                  padding: isScrolling ? '8px' : '12px'
                }}
              >
                <div className={`font-semibold ${index === 1 ? 'text-white' : 'text-gray-300'}`}>
                  {plan.name}
                </div>
                <div className={`text-lg font-bold text-white mt-1`}>
                  {plan.price}
                </div>
                {!isScrolling && (
                  <motion.button
                    className={`w-full py-2 rounded-md text-xs font-medium mt-2 transition-colors ${
                      index === 1
                        ? 'bg-white text-purple-600 hover:bg-gray-100'
                        : index === 0
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-600 text-white hover:bg-gray-500'
                    }`}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (index !== 2) { // Not the "Explore" button
                        window.open('https://dashboard.flowscape.xyz/', '_blank');
                      }
                    }}
                  >
                    {index === 2 ? 'Explore' : 'Get'}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Feature List - Comprehensive Features */}
        <div className="px-4 pt-6 space-y-6 pb-32">
          {featureCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                {category.name}
              </h3>
              
              {/* Add-on information for Database sections */}
              {category.addOn && (
                <div className="mb-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2 text-center">
                    <span className="text-blue-400 text-xs font-medium">{category.addOn}</span>
                  </div>
                </div>
              )}
              
              {category.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-300 text-sm">{feature.name}</span>
                    <div className="w-4 h-4 text-gray-500">
                      <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4">
                        <circle cx="10" cy="10" r="2"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[0, 1, 2].map((planIndex) => {
                      const value = selectedPlan === 'business' 
                        ? (feature as BusinessFeature)[['startup', 'risingStar', 'enterprise'][planIndex] as keyof BusinessFeature]
                        : (feature as PersonalFeature)[['lite', 'plus', 'pro'][planIndex] as keyof PersonalFeature];
                      
                      return (
                        <div key={planIndex} className="py-2">
                          <div className="flex items-center justify-center">
                            {typeof value === 'boolean' ? (
                              value ? (
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="text-gray-600 text-sm">—</span>
                              )
                            ) : (
                              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="text-xs text-white mt-1">
                            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureTable = () => {
  const { selectedCountry } = useContext(CountryContext);
  const { selectedPlan } = useContext(PlanContext);
  
  const getDomainPricing = () => {
    if (selectedCountry === 'Bangladesh') {
      return "+৳1200 (1 Year)";
    }
    return "+A$20 (1 Year)";
  };

  const getAddOnText = () => {
    if (selectedCountry === 'Bangladesh') {
      return "Add on available ৳3500 For Increased limits";
    }
    return "Add on available A$30 For Increased limits";
  };

  const featureCategories = selectedPlan === 'business' ? [
    {
      name: "📄 Pages & Content",
      features: [
        { name: "Pages", startup: "4 Pages + Ecommerce", risingStar: "10 Pages + 1 bonus + Ecommerce", enterprise: "Custom" },
        { name: "Storage", startup: "2 GB", risingStar: "5GB", enterprise: "Custom" }
      ]
    },
    {
      name: "💳 Payment Gateway",
      features: [
        { name: "Payment Gateway", startup: selectedCountry === 'Bangladesh' ? "Bkash + Nagad + SSL" : "Stripe + Paypal", risingStar: "All Payment Methods", enterprise: "Custom" },
        { name: "Split Payment", startup: false, risingStar: true, enterprise: true },
        { name: "BNPL", startup: false, risingStar: true, enterprise: true }
      ]
    },
    {
      name: "📈 Monetization & SEO",
      features: [
        { name: "Monetization", startup: "Google Adsense", risingStar: "Google Adsense", enterprise: "Custom" },
        { name: "SEO", startup: "Optimized", risingStar: "Optimized", enterprise: "Optimized" }
      ]
    },
    {
      name: "⏰ Delivery Time",
      features: [
        { name: "Standard Delivery", startup: "6-12 Days", risingStar: "10-14 Days", enterprise: "Custom" },
        { name: "Express Delivery", startup: "5-7 Days", risingStar: "6-12 Days", enterprise: "Custom" }
      ]
    },
    {
      name: "✨ Features",
      features: [
        { name: "Design & Code", startup: "Interactive Design, Style of your choice, Custom code Option", risingStar: "Interactive Design, Style of your choice, Custom code Option", enterprise: "Custom" },
        { name: "Analytics & Tools", startup: "30-day analytics, Popup, Cookie banner", risingStar: "30-day analytics, Popup, Cookie banner", enterprise: "Custom" }
      ]
    },
    {
      name: "🌐 Domain & Integration",
      features: [
        { name: "Custom Domain", startup: "Included", risingStar: "Included", enterprise: "Included" },
        { name: "BYO Domain", startup: true, risingStar: true, enterprise: true },
        { name: "Social Media Integration", startup: true, risingStar: true, enterprise: true }
      ]
    },
    {
      name: "🛠️ Support & Edits",
      features: [
        { name: "Support", startup: "24/7 Included", risingStar: "24/7 Included", enterprise: "24/7 Included" },
        { name: "Edits", startup: "Max of 5x Month Post delivery", risingStar: "Max of 5x Month Post delivery", enterprise: "Custom" }
      ]
    },
    {
      name: "💾 Database Computation",
      addOn: getAddOnText(),
      features: [
        { name: "Database Info", startup: "Included + Add on for 100,000 monthly active users, 8 GB disk size per project, 250 GB bandwidth, 100 GB file storage", risingStar: "Included + Add on for 100,000 monthly active users, 8 GB disk size per project, 250 GB bandwidth, 100 GB file storage", enterprise: "Custom" }
      ]
    },
    {
      name: "👥 Dashboard Access",
      features: [
        { name: "Dashboard Access", startup: "10 Team Members", risingStar: "25 Team Members", enterprise: "Custom" },
        { name: "Backend Access & Management", startup: "Flowscape Dashboard + Database Access", risingStar: "Flowscape Dashboard + Database Access", enterprise: "Custom" }
      ]
    },
    {
      name: "🔗 API & Advanced",
      features: [
        { name: "Custom API Integration", startup: "10", risingStar: "20", enterprise: "Custom" },
        { name: "Custom Transaction Email", startup: true, risingStar: true, enterprise: true },
        { name: "ISO", startup: "On Demand*", risingStar: "On Demand*", enterprise: "Custom" },
        { name: "Marketing", startup: "On Demand*", risingStar: "On Demand*", enterprise: "Custom" }
      ]
    }
  ] : [
    {
      name: "📄 Pages & Content",
      features: [
        { name: "Pages", lite: "Interactive Blog + 1 Page", plus: "4 Pages + 1 Bonus", pro: "10+ Pages + 1 Bonus" },
        { name: "Storage", lite: "500MB", plus: "1GB", pro: "1GB" },
        { name: "Monetization", lite: false, plus: "Google Adsense", pro: "Google Adsense" },
        { name: "SEO", lite: true, plus: true, pro: true }
      ]
    },
    {
      name: "⏰ Delivery & Support",
      features: [
        { name: "Standard Delivery", lite: "3-7 Days", plus: "3-7 Days", pro: "6-12 Days" },
        { name: "Express Delivery", lite: "2-3 Days", plus: "2-3 Days", pro: "3-7 Days" },
        { name: "Support", lite: "24/7 Included", plus: "24/7 Included", pro: "24/7 Included" },
        { name: "Monthly Edits", lite: "Max 5x", plus: "Max 5x", pro: "Max 8x" }
      ]
    },
    {
      name: "🌐 Domain & Integration",
      features: [
        { name: "Custom Domain", lite: getDomainPricing(), plus: "Included", pro: "Included" },
        { name: "BYO Domain", lite: true, plus: true, pro: true },
        { name: "Social Media Integration", lite: true, plus: true, pro: true },
        { name: "Custom API Integration", lite: false, plus: "Up to 5x", pro: "Up to 5x" }
      ]
    },
    {
      name: "💾 Database & Team",
      addOn: getAddOnText(),
      features: [
        { name: "Database Users", lite: "50,000 monthly", plus: "100,000 monthly", pro: "100,000 monthly" },
        { name: "Database Size", lite: "500MB", plus: "8GB", pro: "8GB" },
        { name: "File Storage", lite: "1GB", plus: "100GB", pro: "100GB" },
        { name: "Bandwidth", lite: "5GB", plus: "250GB", pro: "250GB" },
        { name: "Dashboard Access", lite: "1 User", plus: "2 Team Members", pro: "3 Team Members" },
        { name: "Backend Management", lite: "Flowscape Dashboard", plus: "Flowscape Dashboard", pro: "Flowscape Dashboard + Database Access" }
      ]
    },
    {
      name: "✨ Features",
      features: [
        { name: "Interactive Design", lite: true, plus: true, pro: true },
        { name: "Custom Code Option", lite: true, plus: true, pro: true },
        { name: "30-day Analytics", lite: true, plus: true, pro: true },
        { name: "Cookie Banner", lite: true, plus: true, pro: true }
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
          <h4 className="text-white font-semibold">{selectedPlan === 'business' ? 'Startup' : 'Lite'}</h4>
        </div>
        <div className="text-center">
          <h4 className="text-white font-semibold">{selectedPlan === 'business' ? 'Rising Star' : 'Plus'}</h4>
        </div>
        <div className="text-center">
          <h4 className="text-white font-semibold">{selectedPlan === 'business' ? 'Enterprise' : 'Pro'}</h4>
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
          
          {/* Add-on information for Database & Team section */}
          {category.name === "💾 Database & Team" && category.addOn && (
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div></div>
                <div className="text-center">
                  <span className="text-gray-600 text-xs">—</span>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
                    <span className="text-blue-400 text-xs font-medium">{category.addOn}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
                    <span className="text-blue-400 text-xs font-medium">{category.addOn}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
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
                
                {/* First Column */}
                <div className="text-center">
                  {(() => {
                    const value = selectedPlan === 'business' ? (feature as BusinessFeature).startup : (feature as PersonalFeature).lite;
                    return typeof value === 'boolean' ? (
                      value ? (
                      <div className="w-4 h-4 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <span className="text-gray-600 text-sm">—</span>
                    )
                  ) : (
                      <span className="text-gray-300 text-sm">{value}</span>
                    );
                  })()}
                </div>
                
                {/* Second Column */}
                <div className="text-center">
                  {(() => {
                    const value = selectedPlan === 'business' ? (feature as BusinessFeature).risingStar : (feature as PersonalFeature).plus;
                    return typeof value === 'boolean' ? (
                      value ? (
                      <div className="w-4 h-4 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <span className="text-gray-600 text-sm">—</span>
                    )
                  ) : (
                      <span className="text-gray-300 text-sm">{value}</span>
                    );
                  })()}
                </div>
                
                {/* Third Column */}
                <div className="text-center">
                  {(() => {
                    const value = selectedPlan === 'business' ? (feature as BusinessFeature).enterprise : (feature as PersonalFeature).pro;
                    return typeof value === 'boolean' ? (
                      value ? (
                      <div className="w-4 h-4 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <span className="text-gray-600 text-sm">—</span>
                    )
                  ) : (
                      <span className="text-gray-300 text-sm">{value}</span>
                    );
                  })()}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};



const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqData = [
    {
      question: "What's included in your subscription plan?",
      answer: "Unlimited website & app updates, global CDN hosting with auto‑renewing SSL, access to our component library, analytics dashboard with A/B testing, and priority email support with bi‑weekly sprint reviews."
    },
    {
      question: "How does your pricing compare to traditional agencies?",
      answer: "Traditional agencies often charge $5,000–$20,000 up front plus $100+/hr for changes. Our plans start at $9/mo with no upfront fees."
    },
    {
      question: "Can I cancel or upgrade my plan at any time?",
      answer: "Yes. You can upgrade mid‑cycle, pause for up to two months, or cancel with 30 days' notice."
    },
    {
      question: "How long does it take to launch a new site or app?",
      answer: "Most go live in 2–4 days thanks to our agile, component‑driven process. More complex features may require additional sprints, but you always get incremental value each cycle."
    },
    {
      question: "What technologies do you use?",
      answer: "Frontend: Next.js or Vite + React, Tailwind CSS, Framer Motion\nBackend: Node.js API routes or Supabase\nDatabase: PostgreSQL or Supabase\nDevOps: CI/CD with zero‑downtime deploys, global CDN, auto SSL"
    },
    {
      question: "Do you provide content creation services?",
      answer: "Yes. We offer SEO‑optimized copywriting, professional photography, and motion‑graphics or explainer video production as add‑on services."
    },
    {
      question: "How are updates and new features delivered?",
      answer: "We work in two‑week sprints: you submit requests, we prioritize and plan, then deliver a live demo and release notes at the end of each sprint."
    },
    {
      question: "What happens if I need an emergency fix?",
      answer: "All plans include priority support. Critical issues (site down, security breach) get a one‑hour response and immediate out‑of‑cycle deployment."
    },
    {
      question: "Can you migrate my existing site?",
      answer: "Absolutely. We migrate from WordPress, Shopify, Drupal, custom CMS, or static HTML, preserving SEO and URL structure with zero‑downtime redirects."
    },
    {
      question: "How do you ensure performance and security?",
      answer: "Performance: Core Web Vitals audits, image optimization, code splitting, aggressive caching.\nSecurity: WAF protections, DDoS mitigation via Cloudflare, regular dependency updates, and monthly security scans."
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
    
    // Format the email body with form data
    const emailBody = `
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Message: ${formData.message}
    `.trim();

    // Encode the email parameters
    const mailtoLink = `mailto:info@flowscape.xyz?subject=Contact Form Submission&body=${encodeURIComponent(emailBody)}`;
    
    // Open the local mail app
    window.location.href = mailtoLink;
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

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <label className="block text-white text-sm font-medium mb-3">
            Email*
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

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          viewport={{ once: true }}
        >
          <label className="block text-white text-sm font-medium mb-3">
            Message*
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your project..."
            rows={4}
            className="w-full bg-gray-900/60 border border-gray-700/50 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 resize-none"
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          viewport={{ once: true }}
          className="flex justify-end"
        >
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-medium transition-colors duration-300"
          >
            Send Message
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};



export default App;