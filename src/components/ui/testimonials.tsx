import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Flowscape transformed our business completely. The web application they built is not only beautiful but incredibly functional. Our conversion rates increased by 40% within the first month!",
    name: "Sarah Johnson",
    role: "CEO, TechStart Solutions"
  },
  {
    text: "The team at Flowscape delivered beyond our expectations. Their attention to detail and modern design approach helped us stand out in a competitive market.",
    name: "Michael Chen",
    role: "Founder, Digital Ventures"
  },
  {
    text: "Working with Flowscape was a game-changer. They understood our vision and brought it to life with cutting-edge technology. Highly recommended!",
    name: "Emily Rodriguez",
    role: "Marketing Director, InnovateCorp"
  },
  {
    text: "The responsive design and user experience Flowscape created for us is phenomenal. Our customers love the new interface and it shows in our engagement metrics.",
    name: "David Thompson",
    role: "Product Manager, WebFlow Inc"
  },
  {
    text: "Flowscape's expertise in modern web development is unmatched. They delivered our project on time and exceeded all our requirements. Outstanding service!",
    name: "Lisa Park",
    role: "CTO, StartupHub"
  },
  {
    text: "The custom web application Flowscape built for us streamlined our entire workflow. It's intuitive, fast, and exactly what we needed to scale our business.",
    name: "James Wilson",
    role: "Operations Director, ScaleUp"
  }
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div className="p-6 md:p-8 rounded-3xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm shadow-lg max-w-xs w-full" key={i}>
                  <div className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">{text}</div>
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5 text-white">{name}</div>
                    <div className="leading-5 opacity-60 tracking-tight text-gray-400 text-sm">{role}</div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto relative z-10">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-purple-300 font-medium text-sm">Testimonials</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            What Our Clients
            <br />
            <span className="text-purple-400">Are Saying</span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Flowscape.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-[600px] overflow-hidden">
          {/* Top fade overlay */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
          
          {/* Bottom fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
          
          <TestimonialsColumn
            testimonials={testimonials.slice(0, 2)}
            duration={15}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={testimonials.slice(2, 4)}
            duration={12}
            className="block"
          />
          <TestimonialsColumn
            testimonials={testimonials.slice(4, 6)}
            duration={18}
            className="hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
} 