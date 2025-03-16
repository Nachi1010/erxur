import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import "@/components/ui/cta-button.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { AccessibilityPanel } from "@/components/ui/AccessibilityPanel";
import "./App.css"; // ייבוא קובץ ה-CSS העיקרי

const queryClient = new QueryClient();

// Helper function to handle image paths with the correct base URL
export const getImagePath = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return import.meta.env.BASE_URL + cleanPath;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AccessibilityProvider>
          <Toaster />
          <AccessibilityPanel />
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </AccessibilityProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
