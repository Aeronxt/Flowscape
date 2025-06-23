import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedBeam } from './animated-beam';

export const ApiIntegrationDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Center Hub Icon */}
      <div 
        ref={centerRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center z-20 border-2 border-purple-400/30"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </motion.div>
      </div>

      {/* Top Icon - Google Drive */}
      <motion.div 
        ref={topRef}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center z-10 shadow-lg border border-gray-200"
        animate={{ 
          scale: [1, 1.1, 1],
          y: [0, -2, 0]
        }}
        transition={{ 
          duration: 3,
          delay: 0,
          repeat: Infinity
        }}
      >
        <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.5 2L12 8.5L17.5 2L22 8.5L12 22L2 8.5L6.5 2Z"/>
        </svg>
      </motion.div>

      {/* Right Icon - Document */}
      <motion.div 
        ref={rightRef}
        className="absolute top-1/2 right-8 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center z-10 shadow-lg border border-gray-200"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 2, 0]
        }}
        transition={{ 
          duration: 3,
          delay: 0.5,
          repeat: Infinity
        }}
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </motion.div>

      {/* Bottom Icon - WhatsApp */}
      <motion.div 
        ref={bottomRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center z-10 shadow-lg border border-gray-200"
        animate={{ 
          scale: [1, 1.1, 1],
          y: [0, 2, 0]
        }}
        transition={{ 
          duration: 3,
          delay: 1,
          repeat: Infinity
        }}
      >
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </motion.div>

      {/* Left Icon - Messenger */}
      <motion.div 
        ref={leftRef}
        className="absolute top-1/2 left-8 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center z-10 shadow-lg border border-gray-200"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, -2, 0]
        }}
        transition={{ 
          duration: 3,
          delay: 1.5,
          repeat: Infinity
        }}
      >
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 4.975 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.626 0 12-4.974 12-11.111C24 4.975 18.626 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.13 3.26L19.752 8.1l-6.561 6.863z"/>
        </svg>
      </motion.div>

      {/* Animated Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={topRef}
        toRef={centerRef}
        gradientStartColor="#3b82f6"
        gradientStopColor="#8b5cf6"
        delay={0}
        duration={2}
        curvature={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rightRef}
        toRef={centerRef}
        gradientStartColor="#6b7280"
        gradientStopColor="#8b5cf6"
        delay={0.5}
        duration={2}
        curvature={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bottomRef}
        toRef={centerRef}
        gradientStartColor="#10b981"
        gradientStopColor="#8b5cf6"
        delay={1}
        duration={2}
        curvature={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftRef}
        toRef={centerRef}
        gradientStartColor="#2563eb"
        gradientStopColor="#8b5cf6"
        delay={1.5}
        duration={2}
        curvature={0}
      />
    </div>
  );
}; 