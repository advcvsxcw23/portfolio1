import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const metrics: PerformanceMetrics = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstContentfulPaint: 0,
          largestContentfulPaint: 0
        };

        // Get paint metrics
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          metrics.firstContentfulPaint = fcpEntry.startTime;
        }

        // Get LCP metric
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            metrics.largestContentfulPaint = lastEntry.startTime;
            setMetrics({ ...metrics });
          });
          
          try {
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (e) {
            // LCP not supported
          }
        }

        setMetrics(metrics);
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Show metrics in development mode
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => setShowMetrics(true), 3000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('load', measurePerformance);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || !showMetrics || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black bg-opacity-80 text-green-400 p-3 rounded-lg text-xs font-mono max-w-xs">
      <div className="mb-2 font-bold">Performance Metrics:</div>
      <div>Load: {metrics.loadTime.toFixed(0)}ms</div>
      <div>DOM: {metrics.domContentLoaded.toFixed(0)}ms</div>
      <div>FCP: {metrics.firstContentfulPaint.toFixed(0)}ms</div>
      <div>LCP: {metrics.largestContentfulPaint.toFixed(0)}ms</div>
      <button 
        onClick={() => setShowMetrics(false)}
        className="mt-2 text-red-400 hover:text-red-300"
      >
        ✕ Close
      </button>
    </div>
  );
};

export default PerformanceMonitor;