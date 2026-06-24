import { useEffect } from 'react';

// Use a global counter so multiple nested dialogs (e.g., a modal inside a drawer) 
// don't accidentally unlock scrolling when only one of them closes.
let lockCount = 0;

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (!lock) return;

    if (lockCount === 0) {
      // 1. Native DOM lock
      document.body.style.overflow = 'hidden';
      
      // 2. Lenis custom hook lock
      window.dispatchEvent(new CustomEvent('lenis-toggle', { detail: { stop: true } }));
    }
    
    lockCount++;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      
      if (lockCount === 0) {
        // 1. Native DOM unlock
        document.body.style.overflow = '';
        
        // 2. Lenis custom hook unlock
        window.dispatchEvent(new CustomEvent('lenis-toggle', { detail: { stop: false } }));
      }
    };
  }, [lock]);
}
