/**
 * פונקציית עזר לגלילה חלקה בין אלמנטים בדף
 * Utility function for smooth scrolling between page elements
 */

export const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>): void => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  
  if (href) {
    let targetId;
    
    // תמיכה בקישורים שונים: רגילים ("#id"), נתיבי האש ("#/id")
    // Support different link formats: standard ("#id"), hash router paths ("#/id")
    if (href.startsWith("#")) {
      // קישור רגיל #id או לאחר ניתוב #/id
      targetId = href.replace(/^#\/?/, "");
    } else if (href.startsWith("/") && window.location.hash) {
      // קישור בתוך נתיב האש (בנתיב נפרד)
      targetId = href.replace(/^\//, "");
    } else {
      targetId = href;
    }
    
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