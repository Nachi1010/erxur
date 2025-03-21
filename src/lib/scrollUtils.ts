import React from "react";

/**
 * פונקציית עזר לגלילה חלקה בין אלמנטים בדף
 * Utility function for smooth scrolling between page elements
 */

export const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>): void => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  
  if (href?.startsWith("#")) {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      // קביעת גלילה חלקה עם אופציה לשינוי המיקום
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
}; 