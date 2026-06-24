import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * 
 * Intercepts React Router pathname changes and resets the scroll position to the top.
 * Integrates flawlessly with Lenis by dispatching a custom 'lenis-scroll-top' event,
 * which instructs the smooth-scroller to snap to `0,0` instantly, preventing visual flicker.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Dispatch custom event to tell Lenis to scroll up instantly
    window.dispatchEvent(new CustomEvent("lenis-scroll-top"));
    
    // Fallback for native scroll (if Lenis isn't loaded or fails)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
