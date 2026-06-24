/**
 * Privacy-First Analytics Wrapper (Umami)
 * 
 * Safely tracks custom events. If running locally or without tracking configured,
 * it silently logs to the console instead to prevent errors.
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string | Function, eventData?: Record<string, any>) => void;
    };
  }
}

export const initAnalytics = () => {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL;

  if (websiteId && scriptUrl && typeof window !== "undefined") {
    const script = document.createElement('script');
    script.defer = true;
    script.src = scriptUrl;
    script.setAttribute('data-website-id', websiteId);
    document.head.appendChild(script);
    console.info('[Analytics] Umami initialized.');
  }
};

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(eventName, eventData);
  } else if (import.meta.env.DEV) {
    console.info(`[Analytics Mock] Event: "${eventName}"`, eventData || '');
  }
};
