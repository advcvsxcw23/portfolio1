import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Track scroll position for navbar styling
      setIsScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-opacity-30 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        style={{ 
          backgroundColor: isScrolled ? 'var(--bg-primary)' : 'rgba(var(--bg-primary-rgb), 0.95)', 
          borderColor: 'var(--border)' 
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl md:text-2xl font-bold terminal-prompt focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-2 py-1"
              style={{ color: 'var(--accent)' }}
              aria-label="Go to home section"
            >
              AlBaraa.dev
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 min-h-[44px] ${
                    activeSection === item.id
                      ? 'glow-border'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    color: activeSection === item.id ? 'var(--accent)' : 'var(--text-primary)',
                  }}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-md transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                style={{ color: 'var(--text-primary)' }}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        id="mobile-menu"
        className={`md:hidden backdrop-blur-md border-t border-opacity-30 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block px-4 py-4 rounded-md text-base font-medium w-full text-left transition-all duration-300 min-h-[44px] ${
                  activeSection === item.id ? 'glow-border' : ''
                }`}
                style={{
                  color: activeSection === item.id ? 'var(--accent)' : 'var(--text-primary)',
                }}
                tabIndex={isOpen ? 0 : -1}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;