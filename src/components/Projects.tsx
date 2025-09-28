import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data/portfolioData';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai-cv' | 'web-dev' | 'other'>('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filters = [
    { id: 'all', label: '🎮 All Quests', count: projects.length },
    { id: 'ai-cv', label: '🧠 AI & CV', count: projects.filter(p => p.category === 'ai-cv').length },
    { id: 'web-dev', label: '🌐 Web Dev', count: projects.filter(p => p.category === 'web-dev').length },
    { id: 'other', label: '🛠 Other', count: projects.filter(p => p.category === 'other').length },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Quest Inventory
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Explore my collection of projects spanning AI, computer vision, web development, and innovative solutions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                activeFilter === filter.id ? 'glow-border' : ''
              }`}
              style={{
                backgroundColor: activeFilter === filter.id ? 'var(--accent)' : 'var(--bg-secondary)',
                color: activeFilter === filter.id ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: activeFilter === filter.id ? 'none' : `1px solid var(--border)`
              }}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
                No quests found in this category
              </span>
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;