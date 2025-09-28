import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Certification } from '../data/portfolioData';

interface BadgeProps {
  certification: Certification;
}

const Badge: React.FC<BadgeProps> = ({ certification }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        className="group cursor-pointer transition-all duration-300 hover:scale-110 animate-glow"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => certification.link && window.open(certification.link, '_blank')}
      >
        <div className="w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center p-4 transition-all duration-300 hover:animate-bounce-slow glow-border shadow-lg"
             style={{ 
               borderColor: 'var(--accent)',
               backgroundColor: 'var(--bg-secondary)',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
             }}>
          <div className="text-3xl mb-2">{certification.icon}</div>
          <div className="text-xs font-bold text-center leading-tight tracking-wide"
               style={{ 
                 color: 'var(--text-primary)',
                 textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)'
               }}>
            {certification.title.split(':')[0]}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-20 animate-fadeIn">
          <div className="bg-opacity-95 backdrop-blur-md rounded-lg p-4 shadow-xl border-2 max-w-xs w-64 transform transition-all duration-200 ease-in-out"
               style={{ 
                 backgroundColor: 'var(--bg-primary)',
                 borderColor: 'var(--accent)',
                 boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
               }}>
            <div className="text-sm font-bold mb-2 leading-snug tracking-wide" style={{ color: 'var(--text-primary)', textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)' }}>
              {certification.title}
            </div>
            <div className="text-xs mb-2 font-medium tracking-wide" style={{ color: 'var(--accent)', opacity: 0.9 }}>
              {certification.issuer} • {certification.date}
            </div>
            <div className="text-xs leading-relaxed tracking-wide" style={{ color: 'var(--text-secondary)', opacity: 0.95 }}>
              {certification.description}
            </div>
            {certification.link && (
              <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: 'var(--accent)' }}>
                <ExternalLink className="w-3 h-3" />
                View Certificate
              </div>
            )}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="border-8 border-transparent border-t-current"
                 style={{ color: 'var(--accent)' }}></div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Badge;