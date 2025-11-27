import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in development or if explicitly enabled
    if (process.env.NODE_ENV === 'development' || localStorage.getItem('enablePerfMonitor')) {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.group('📊 Performance Metrics');
        console.log(`Page Load Time: ${pageLoadTime}ms`);
        console.log(`Connection Time: ${connectTime}ms`);
        console.log(`Render Time: ${renderTime}ms`);
        console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`);
        
        // Warn if performance is poor
        if (pageLoadTime > 3000) {
          console.warn('⚠️ Page load is slow! Consider optimizing.');
        }
        console.groupEnd();
      });

      // Monitor memory usage if available
      if (performance.memory) {
        setInterval(() => {
          const usedJSHeapSize = Math.round(performance.memory.usedJSHeapSize / 1048576);
          const jsHeapSizeLimit = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
          
          if (localStorage.getItem('enableMemoryMonitor')) {
            console.log(`💾 Memory: ${usedJSHeapSize}MB / ${jsHeapSizeLimit}MB`);
          }
        }, 5000);
      }
    }
  }, []);

  return null;
};

export default PerformanceMonitor;
