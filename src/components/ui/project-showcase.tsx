import React from 'react';
import { motion } from 'framer-motion';

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
  const handleProjectClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Showcase
          </motion.h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleProjectClick(project.link)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-900/10 border border-purple-500/10">
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
                  <p className="text-purple-400 text-sm mb-3">{project.type}</p>
                  <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 