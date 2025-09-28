import React, { useEffect, useRef, useState } from 'react';

const CodeRainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Detect mobile devices and user preferences
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobile(mobile);
      setIsVisible(!prefersReducedMotion);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    
    // Optimize for mobile performance
    const fontSize = isMobile ? 12 : 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      // Reduce opacity on mobile for better performance
      ctx.fillStyle = isMobile ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Slower animation on mobile to improve performance
    const animationSpeed = isMobile ? 50 : 35;
    const interval = setInterval(draw, animationSpeed);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile, isVisible]);

  // Don't render if user prefers reduced motion or on very small screens
  if (!isVisible) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="matrix-bg" 
      aria-hidden="true"
      style={{ 
        willChange: isMobile ? 'auto' : 'transform',
        opacity: isMobile ? 0.02 : 0.1 
      }}
    />
  );
};

export default CodeRainBackground;