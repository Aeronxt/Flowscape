import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { AuthModal } from './components/AuthModal';
import { AnimatedShinyText } from './components/AnimatedShinyText';
import { SmoothCursor } from './components/ui/smooth-cursor';
import { UserMenu } from './components/UserMenu';
import { ShimmerButton } from './components/magicui/shimmer-button';
import { InteractiveGridPattern } from './components/ui/interactive-grid-pattern';
import { ApiIntegrationDemo } from './components/ui/api-integration-demo';

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
  const { user, loading } = useAuth();

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Smooth Cursor */}
      <SmoothCursor />
      
      {/* Navigation Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="https://wrczctvglyhprlbkogjb.supabase.co/storage/v1/object/public/banklogos//flowscape%20logo%20(1).png" 
              alt="Flowscape Logo" 
              className="h-8 object-contain opacity-95"
            />
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
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
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-12">
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
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-16 opacity-40">
            <div className="text-xl font-bold text-white/60">BOGO</div>
            <div className="text-xl font-bold text-white/60">LOGO IPSUM</div>
            <div className="text-xl font-bold text-white/60">IP?</div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto -mt-16">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-purple-600/30 border border-purple-500/40 rounded-full px-4 py-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">2025</span>
            <AnimatedShinyText className="text-sm font-medium">
              Next Gen-Development
            </AnimatedShinyText>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-white">Helping Startups and SME's</span>
            <span className="block text-white">Get a Visual Identity</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>An intuitive platform that lets you plan, build, and launch your online presence in days not months. No Fortunes. No surprises.</p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <InteractiveButton 
              onClick={() => handleAuthClick('signup')}
              variant="primary"
              className="px-8 py-3"
            >
              Connect With Us
            </InteractiveButton>
            <InteractiveButton 
              onClick={() => handleAuthClick('signin')}
              variant="secondary"
              className="px-8 py-3"
            >
              What is Nubien?
            </InteractiveButton>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative py-32 px-6 overflow-hidden">
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
                 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-300 leading-relaxed hover:text-gray-200 transition-all duration-500 cursor-default"
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
      <section className="relative py-32 px-6 overflow-hidden" id="services">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {/* Seamless API Integrations */}
            <motion.div
              className="group relative bg-gray-900/40 border border-gray-800/50 rounded-3xl p-10 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-500"
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
              
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">
                Seamless API Integrations
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Connect with any API or service of your choice. Our platform is currently ready to be shipped with robust integration capabilities.
              </p>
              
              {/* Interactive AnimatedBeam visualization */}
              <div className="relative h-60 bg-gray-800/30 rounded-xl overflow-hidden group-hover:bg-gray-800/50 transition-colors">
                <ApiIntegrationDemo />
              </div>
            </motion.div>

            {/* Trusted Authentication */}
            <motion.div
              className="group relative bg-gray-900/40 border border-gray-800/50 rounded-3xl p-10 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-500"
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
              className="group relative bg-gray-900/40 border border-gray-800/50 rounded-3xl p-10 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-500"
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
      <section className="py-32 px-6 relative">
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}

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
  const plans = [
    {
      name: "Mini",
      subtitle: "Landing pages",
      price: "A$8",
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
      price: "A$20",
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
      price: "A$40",
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

export default App;