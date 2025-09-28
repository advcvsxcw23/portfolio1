import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CodeRainBackground from './CodeRainBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Easter egg console message
    const easterEgg = () => {
      console.log(`
%c
██╗  ██╗███████╗██╗   ██╗    ████████╗██╗  ██╗███████╗██████╗ ███████╗██╗
██║  ██║██╔════╝╚██╗ ██╔╝    ╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔════╝██║
███████║█████╗   ╚████╔╝        ██║   ███████║█████╗  ██████╔╝█████╗  ██║
██╔══██║██╔══╝    ╚██╔╝         ██║   ██╔══██║██╔══╝  ██╔══██╗██╔══╝  ╚═╝
██║  ██║███████╗   ██║          ██║   ██║  ██║███████╗██║  ██║███████╗██╗
╚═╝  ╚═╝╚══════╝   ╚═╝          ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝

%cHey! Thanks for checking my portfolio 👾

%cLooks like you're curious about how this was built! 
This gamified portfolio was created with:
• React + TypeScript
• Tailwind CSS
• Canvas API for Matrix rain effect
• Lots of coffee ☕ and creativity 🚀

Want to collaborate? Let's connect!
LinkedIn: http://www.linkedin.com/in/albaraa-alolabi-0693b5278
GitHub: https://github.com/AlBaraa-1
Email: 666645@gmail.com

%cKeep exploring! 🎮
      `, 
      'color: #00ff41; font-family: monospace;',
      'color: #00ff41; font-size: 16px; font-weight: bold;',
      'color: #ffffff; font-size: 14px; line-height: 1.5;',
      'color: #00ff41; font-size: 14px; font-weight: bold;'
      );
    };

    // Add keyboard shortcut for easter egg
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'c') {
        easterEgg();
      }
    };

    // Show easter egg on load
    setTimeout(easterEgg, 2000);
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Performance optimization: Preload critical resources
  useEffect(() => {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);

    // Add viewport meta tag for mobile optimization
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }

    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <CodeRainBackground />
      <Navbar />
      <main id="main-content" className="relative z-10" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;