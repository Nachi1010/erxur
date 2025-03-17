import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const CTA = () => {
  const { currentLang } = useLanguage();
  
  const content = {
    en: {
      title: "Ready to Start Your Journey?",
      subtitle: "Join our AI program today",
      cta: "Enroll Now"
    },
    he: {
      title: "מוכנים להתחיל חיים חדשים?",
      subtitle: "הרשמו עכשיו לתכנית הגיוס היחידה מסוגה בעולם",
      cta: "הגשת מועמדות"
    }
  };
  
  const textContent = content[currentLang];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm py-3 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-white">
          <h3 className="text-lg font-semibold">{textContent.title}</h3>
          <p className="text-sm opacity-60">{textContent.subtitle}</p>
        </div>
        <a 
          href="#registration-form"
          className="cta-button"
        >
          {textContent.cta}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};