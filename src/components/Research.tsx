import React, { useEffect, useRef, useState } from 'react';
import { Trophy, ExternalLink, FileText } from 'lucide-react';
import { research } from '../data/portfolioData';

const Research: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="research" ref={sectionRef} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Achievements Unlocked
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Research contributions and academic publications in the field of computer vision and AI.
          </p>
        </div>

        {/* Research Papers */}
        <div className="space-y-8">
          {research.map((paper, index) => (
            <div
              key={paper.id}
              className={`relative overflow-hidden rounded-xl glow-border transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Glowing Trophy Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full animate-glow"
                     style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}>
                  <Trophy className="w-5 h-5 animate-bounce-slow" />
                  <span className="font-bold">Published {paper.year}</span>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  {/* Paper Content */}
                  <div className="lg:col-span-2">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4"
                            style={{ 
                              backgroundColor: 'var(--accent)', 
                              color: 'var(--bg-primary)' 
                            }}>
                        {paper.conference}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight"
                        style={{ color: 'var(--text-primary)' }}>
                      {paper.title}
                    </h3>
                    
                    <p className="text-lg leading-relaxed mb-6"
                       style={{ color: 'var(--text-secondary)' }}>
                      {paper.abstract}
                    </p>

                    {/* Action Button */}
                    <button
                      onClick={() => window.open(paper.link, '_blank')}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-lg border-2 transition-all duration-300 hover:scale-105"
                      style={{ 
                        borderColor: 'var(--accent)',
                        color: 'var(--accent)',
                        backgroundColor: 'transparent'
                      }}
                    >
                      <FileText className="w-5 h-5" />
                      Read Paper
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Visual Element */}
                  <div className="lg:col-span-1 flex justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 flex items-center justify-center animate-glow"
                           style={{ borderColor: 'var(--accent)' }}>
                        <Trophy className="w-16 h-16 lg:w-20 lg:h-20 animate-pulse" 
                                style={{ color: 'var(--accent)' }} />
                      </div>
                      
                      {/* Floating particles */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-ping"
                           style={{ backgroundColor: 'var(--accent)' }}></div>
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full animate-ping"
                           style={{ backgroundColor: 'var(--accent)', animationDelay: '1s' }}></div>
                      <div className="absolute top-1/2 -right-4 w-2 h-2 rounded-full animate-ping"
                           style={{ backgroundColor: 'var(--accent)', animationDelay: '2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom glow effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
                   style={{ color: 'var(--accent)' }}></div>
            </div>
          ))}
        </div>

        {/* Future Research Section */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-xl border-2 border-dashed transition-all duration-300 hover:scale-105"
               style={{ borderColor: 'var(--accent)' }}>
            <div className="text-4xl mb-4"><span>🚀</span></div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              More Research Coming Soon
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Currently working on exciting new projects in computer vision and AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;