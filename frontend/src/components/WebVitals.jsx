import { useEffect } from 'react';

const WebVitals = () => {
  useEffect(() => {
    // Track Core Web Vitals for performance monitoring
    const trackWebVitals = async () => {
      try {
        // Delay import to avoid circular dependencies
        setTimeout(async () => {
          try {
            const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
            
            // Largest Contentful Paint - Target < 2.5s
            getLCP(metric => {
              console.log('LCP:', metric.value);
            });
            
            // First Input Delay - Target < 100ms
            getFID(metric => {
              console.log('FID:', metric.value);
            });
            
            // Cumulative Layout Shift - Target < 0.1
            getCLS(metric => {
              console.log('CLS:', metric.value);
            });
            
            // First Contentful Paint
            getFCP(metric => {
              console.log('FCP:', metric.value);
            });
            
            // Time to First Byte
            getTTFB(metric => {
              console.log('TTFB:', metric.value);
            });
          } catch (error) {
            // Silently fail - web-vitals is optional
          }
        }, 500);
      } catch (error) {
        // Silently fail
      }
    };
    
    trackWebVitals();
  }, []);

  return null;
};

export default WebVitals;
