import { useEffect } from 'react';

export function useScrollToTop(behavior: 'auto' | 'smooth' = 'auto') {
  useEffect(() => {
 
    const userAgent = navigator.userAgent.toLowerCase();
    const isSocialCrawler = userAgent.includes('facebookexternalhit') || 
                          userAgent.includes('facebookcatalog') ||
                          userAgent.includes('twitterbot') || 
                          userAgent.includes('linkedinbot') ||
                          userAgent.includes('slackbot') ||
                          userAgent.includes('whatsapp');
    
    if (isSocialCrawler) return;


    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior
      });
    };


    requestAnimationFrame(scrollToTop);
  }, [behavior]);
}