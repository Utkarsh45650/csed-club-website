import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard expo ease out
      touchMultiplier: 2,
      infinite: false,
    });

    // Optional: hook into Framer Motion if complex scroll-linked animations are added later.
    // For standard scroll reveals (useInView) and parallax, Lenis works flawlessly out of the box 
    // by interpolating native scroll.
    
    // Listen to custom event to pause lenis when Modals/Dialogs open
    const handleToggle = (e: CustomEvent<{ stop: boolean }>) => {
      if (e.detail?.stop) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    
    // Listen to custom event to scroll instantly to top
    const handleScrollTop = () => {
      lenis.scrollTo(0, { immediate: true });
    };

    window.addEventListener('lenis-toggle', handleToggle as EventListener);
    window.addEventListener('lenis-scroll-top', handleScrollTop);
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('lenis-toggle', handleToggle as EventListener);
      window.removeEventListener('lenis-scroll-top', handleScrollTop);
      lenis.destroy();
    };
  }, []);

  return null;
}
