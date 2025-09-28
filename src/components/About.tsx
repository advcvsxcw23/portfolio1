import React, { useState, useEffect, useRef } from 'react';

const About: React.FC = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const codeContent = `{
  "name": "AlBaraa Alolabi",
  "class": "Computer Vision Enthusiast",
  "level": "Undergraduate Student",
  "location": "United Arab Emirates",
  "skills": [
    "Python",
    "AI/ML",
    "Computer Vision",
    "Web Development",
    "Deep Learning",
    "OpenCV",
    "TensorFlow",
    "React"
  ],
  "currentQuest": "Building intelligent systems that see the world",
  "achievements": [
    "CS50x Graduate",
    "Published Researcher",
    "AI Innovator",
    "Samsung Innovation Campus Graduate"
  ],
  "interests": [
    "Computer Vision",
    "Machine Learning",
    "Image Processing",
    "Neural Networks"
  ],
  "status": "Ready for new challenges"
}`;

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

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const chunkSize = 5; // Smaller chunks for smoother, slower typing
    const typeInterval = setInterval(() => {
      if (index <= codeContent.length) {
        setDisplayedCode(codeContent.slice(0, index));
        index += chunkSize;
      } else {
        setDisplayedCode(codeContent);
        clearInterval(typeInterval);
      }
    }, 20); // Slightly longer interval for slower effect

    return () => clearInterval(typeInterval);
  }, [isVisible]);

  const highlightSyntax = (code: string) => {
    return code
      .replace(/"([^"]*)":/g, '<span style="color: #60a5fa;">"$1"</span>:')
      .replace(/: "([^"]*)"/g, ': <span style="color: #34d399;">"$1"</span>')
      .replace(/\[/g, '<span style="color: #f59e0b;">[</span>')
      .replace(/\]/g, '<span style="color: #f59e0b;">]</span>')
      .replace(/{/g, '<span style="color: #f59e0b;">{</span>')
      .replace(/}/g, '<span style="color: #f59e0b;">}</span>');
  };

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Character Stats
            </span>
          </h2>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Loading player information...
          </p>
        </div>

        <div className="code-block max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-opacity-30" style={{ borderColor: 'var(--border)' }}>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              albara_stats.json
            </span>
          </div>
          
          <pre className="text-sm md:text-base leading-relaxed overflow-x-auto">
            <code
              dangerouslySetInnerHTML={{
                __html: highlightSyntax(displayedCode)
              }}
              style={{ color: 'var(--text-primary)' }}
            />
            {isVisible && displayedCode.length < codeContent.length && (
              <span className="animate-blink ml-1" style={{ color: 'var(--accent)' }}>|</span>
            )}
          </pre>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Status: Ready for new adventures
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;