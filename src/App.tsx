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
