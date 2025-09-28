import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
      <button
        onClick={toggleTheme}
        className="group relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: 'transparent',
          borderColor: 'var(--accent)',
          color: 'var(--text-primary)'
        }}
        aria-label="Toggle theme"
      >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-sm font-medium hidden sm:block">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-sm font-medium hidden sm:block">Dark</span>
            </>
          )}
        
        {/* Tooltip for mobile */}
        <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:hidden"
             style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </div>
      </button>
  );
};

export default ThemeToggle;