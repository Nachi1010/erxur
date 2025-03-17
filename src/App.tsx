import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import "@/components/ui/cta-button.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./App.css"; // ייבוא קובץ ה-CSS העיקרי

const queryClient = new QueryClient();

// פונקציית עזר לניקוי נתיבי תמונות והתאמתם לפרסום בגיטהאב פייג'ס
export function getImagePath(path: string): string {
  // מסיר את /erxur/ מהתחלת הנתיב אם קיים (כדי למנוע כפילות), ואז מוסיף / בהתחלה אם צריך
  let cleanPath = path;

  // אם הנתיב הוא URL מלא, מחזירים אותו כמו שהוא
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // אם הנתיב כבר מתחיל ב-/images, לא צריך להוסיף שום דבר
  if (path.startsWith('/images')) {
    return path;
  }

  // אם הנתיב מתחיל ב-/erxur/images, מסיר את /erxur/ כדי למנוע כפילות
  if (path.startsWith('/erxur/images')) {
    return path.replace('/erxur/', '/');
  }

  // במקרה שהנתיב הוא רק שם הקובץ, מוסיף את הנתיב המלא
  if (!path.startsWith('/')) {
    return `/images/${path}`;
  }

  return path;
}

// פונקציה לגלילה חלקה לאלמנטים על פי ID
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Toaster />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
