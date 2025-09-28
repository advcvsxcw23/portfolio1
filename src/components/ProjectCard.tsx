import React from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg glow-border transition-all duration-300 hover:scale-105"
         style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Project Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold animate-glow"
               style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}>
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 flex flex-col h-[300px]">
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-opacity-80 transition-colors"
              style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          
          <p className="text-sm mb-4 line-clamp-3"
             style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-full border transition-colors duration-300 hover:scale-105"
                style={{ 
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-start items-end mt-auto">
          {project.liveDemo && (
                          <button
                onClick={() => window.open(project.liveDemo, '_blank')}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 min-w-[100px]"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg-primary)'
                }}
              >
                <Eye className="w-4 h-4" />
                Demo
              </button>
          )}
          
          {project.github && (
            <button
              onClick={() => window.open(project.github, '_blank')}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium border transition-all duration-300 hover:scale-105 min-w-[100px]"
              style={{ 
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                backgroundColor: 'transparent'
              }}
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>
          )}
          
          <button
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium border transition-all duration-300 hover:scale-105 min-w-[100px]"
            style={{ 
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent'
            }}
          >
            <ExternalLink className="w-4 h-4" />
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;