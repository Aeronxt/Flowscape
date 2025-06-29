import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Testimonial {
  name: string;
  quote: string;
  designation: string;
  src: string;
  link: string;
}

interface ProjectShowcaseProps {
  testimonials: Testimonial[];
  colors?: {
    name?: string;
    position?: string;
    testimony?: string;
  };
  fontSizes?: {
    name?: string;
    position?: string;
    testimony?: string;
  };
  spacing?: {
    nameTop?: string;
    nameBottom?: string;
    positionTop?: string;
    positionBottom?: string;
    testimonyTop?: string;
    testimonyBottom?: string;
    lineHeight?: string;
  };
  isRTL?: boolean;
  buttonInscriptions?: {
    previousButton?: string;
    nextButton?: string;
    openWebAppButton?: string;
  };
  halomotButtonGradient?: string;
  halomotButtonBackground?: string;
  halomotButtonTextColor?: string;
  halomotButtonOuterBorderRadius?: string;
  halomotButtonInnerBorderRadius?: string;
  halomotButtonHoverTextColor?: string;
  onItemClick?: (link: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  testimonials,
  colors = {},
  fontSizes = {},
  spacing = {},
  isRTL = false,
  buttonInscriptions = {},
  halomotButtonGradient = "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
  halomotButtonBackground = "#1a1a1a",
  halomotButtonTextColor = "#ffffff",
  halomotButtonOuterBorderRadius = "12px",
  halomotButtonInnerBorderRadius = "8px",
  halomotButtonHoverTextColor = "#ffffff",
  onItemClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const handleOpenProject = () => {
    if (onItemClick && currentTestimonial.link) {
      onItemClick(currentTestimonial.link);
    }
  };

  return (
    <div className={`relative w-full max-w-6xl mx-auto p-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Project Image */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-lg shadow-2xl"
            >
              <img
                src={currentTestimonial.src}
                alt={currentTestimonial.name}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 50 : -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 
                className="text-3xl font-bold text-white"
                style={{ 
                  color: colors.name || '#ffffff',
                  fontSize: fontSizes.name || '1.875rem',
                  marginTop: spacing.nameTop || '0',
                  marginBottom: spacing.nameBottom || '0'
                }}
              >
                {currentTestimonial.name}
              </h3>
              
              <p 
                className="text-purple-400 font-medium"
                style={{ 
                  color: colors.position || '#a855f7',
                  fontSize: fontSizes.position || '1rem',
                  marginTop: spacing.positionTop || '0',
                  marginBottom: spacing.positionBottom || '0'
                }}
              >
                {currentTestimonial.designation}
              </p>
              
              <p 
                className="text-gray-300 leading-relaxed"
                style={{ 
                  color: colors.testimony || '#d1d5db',
                  fontSize: fontSizes.testimony || '1rem',
                  marginTop: spacing.testimonyTop || '0',
                  marginBottom: spacing.testimonyBottom || '0',
                  lineHeight: spacing.lineHeight || '1.75'
                }}
              >
                {currentTestimonial.quote}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-2">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                style={{
                  background: halomotButtonBackground,
                  borderRadius: halomotButtonOuterBorderRadius
                }}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                style={{
                  background: halomotButtonBackground,
                  borderRadius: halomotButtonOuterBorderRadius
                }}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            <button
              onClick={handleOpenProject}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: halomotButtonGradient,
                color: halomotButtonTextColor,
                borderRadius: halomotButtonInnerBorderRadius
              }}
            >
              <span>{buttonInscriptions.openWebAppButton || 'Open Project'}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex space-x-2 pt-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-purple-500 w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 