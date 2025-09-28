import React, { useState, useEffect } from 'react';
import { Play, Download } from 'lucide-react';

const Hero: React.FC = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "I build intelligent systems that see the world";

  useEffect(() => {
    const timer = setTimeout(() => setShowTypewriter(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTypewriter) return;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [showTypewriter]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToResume = () => {
    const resumeSection = document.getElementById('resume');
    if (resumeSection) {
      resumeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        {/* Press Start Animation */}
        <div className="mb-8">
          <span className="text-2xl md:text-3xl font-mono animate-blink" style={{ color: 'var(--accent)' }}>
            &gt; Press Start
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
            Hi, I'm AlBaraa
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Computer Vision Explorer
          </span>
        </h1>

        {/* Typewriter Subtitle */}
        <div className="mb-12 h-16 flex items-center justify-center">
          <p className="text-xl md:text-2xl font-mono" style={{ color: 'var(--text-secondary)' }}>
            {typewriterText}
            {showTypewriter && (
              <span className="animate-blink ml-1" style={{ color: 'var(--accent)' }}>|</span>
            )}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={scrollToAbout}
            className="group flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 hover:scale-105"
            style={{ 
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
              backgroundColor: 'transparent'
            }}
          >
            <Play className="w-6 h-6 group-hover:animate-pulse" />
            <span>🎮</span> Enter Portfolio
          </button>
          
          <button
            onClick={scrollToResume}
            className="flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 hover:scale-105"
            style={{ 
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
              backgroundColor: 'transparent'
            }}
          >
            <Download className="w-6 h-6" />
            <span>👀</span> View Resume
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{ borderColor: 'var(--accent)' }}>
            <div className="w-1 h-3 rounded-full mt-2 animate-pulse" style={{ backgroundColor: 'var(--accent)' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;