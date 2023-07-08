declare global {
  interface Window {
    gtag: any;
  }
}

// log custom GA4 events
export const gaEvent = ({ action, params }: any) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
};
