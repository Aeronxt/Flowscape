import { motion } from "framer-motion";
import React from "react";

interface ComparisonItem {
  traditional: {
    title: string;
    description: string;
  };
  flowscape: {
    title: string;
    description: string;
  };
}

const comparisonData: ComparisonItem[] = [
  {
    traditional: {
      title: "Generic, Overused Layouts",
      description: "One‑time fees of $3,000–$10,000+ before a single line of code is written."
    },
    flowscape: {
      title: "AI-Driven Design",
      description: "Affordable monthly subscription starting at $9/mo—get live sites and apps with zero large deposits."
    }
  },
  {
    traditional: {
      title: "Cluttered & Outdated UI",
      description: "Pay full project cost, wait weeks for first deliverables."
    },
    flowscape: {
      title: "Premium, Minimal Aesthetic",
      description: "Agile & iterative: continuous updates, bi‑weekly sprints, and real‑time feedback loops."
    }
  },
  {
    traditional: {
      title: "Slow & Unoptimized",
      description: "One–two kickoff meetings, then radio silence until delivery."
    },
    flowscape: {
      title: "Performance Optimized",
      description: "Deep‑dive workshops with user‑persona mapping, journey‑mapping, and rapid prototyping from day one."
    }
  },
  {
    traditional: {
      title: "Limited Customization",
      description: "Static mockups in Photoshop or Sketch—no interactivity until final handoff."
    },
    flowscape: {
      title: "Future-Proof Technology",
      description: "Interactive Figma prototypes and Framer Motion demos—experience the UI/UX before development even starts."
    }
  },
  {
    traditional: {
      title: "Short-Term Relevance",
      description: "Locked into a single CMS/framework—often outdated PHP or proprietary platforms."
    },
    flowscape: {
      title: "Unmatched Flexibility",
      description: "Modern stack: Next.js/Vite + React, Tailwind CSS, and headless CMS for maximum performance and control."
    }
  }
];

export function ComparisonSection() {
  return (
    <div className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <span className="text-purple-200 font-medium">Comparison</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Flowscape vs. The Rest
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl text-gray-500 mb-8"
          >
            Let's See the Difference
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Flowscape is designed to set your agency and portfolio apart with a premium, clutter-free layout that enhances your work.
          </motion.p>
        </div>

        {/* Comparison Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-[#0A0A0A] rounded-3xl border border-gray-800/50 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Traditional */}
              <div className="space-y-8">
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={`traditional-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mt-1">
                      <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-gray-400 font-medium mb-1">{item.traditional.title}</h3>
                      <p className="text-gray-500 text-sm">{item.traditional.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column - Flowscape */}
              <div className="space-y-8">
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={`flowscape-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mt-1">
                      <svg className="w-3.5 h-3.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{item.flowscape.title}</h3>
                      <p className="text-gray-400 text-sm">{item.flowscape.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 