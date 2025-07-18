import React from 'react';
import { motion } from 'framer-motion';
import { PinContainer } from './3d-pin';
import { AnimatedText } from './animated-text';

interface Project {
  name: string;
  description: string;
  type: string;
  image: string;
  link: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  // const handleProjectClick = (link: string) => {
  //   window.open(link, "_blank", "noopener,noreferrer");
  // };

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Showcase"
            textClassName="text-4xl md:text-5xl font-bold mb-6"
            gradientColors="linear-gradient(90deg, #8A2BE2, #ADD8E6, #8A2BE2)"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400"
          >
            Companies choose Flowscape to build their web applications.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              // onClick={() => handleProjectClick(project.link)}
              className="group cursor-pointer flex justify-center"
            >
              <PinContainer title={project.name} href={project.link}>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-900/10 border border-purple-500/10 p-4 flex flex-col w-80 h-80 sm:w-[22rem] sm:h-[22rem]">
                  {/* Project Image */}
                  <div className="relative flex-1 overflow-hidden rounded-md mb-4">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Project Info */}
                  <div className="text-center flex-shrink-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-1">{project.name}</h3>
                    <p className="text-purple-400 text-xs sm:text-sm mb-2">{project.type}</p>
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 