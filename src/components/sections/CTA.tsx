import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const CTA = () => {
  const { currentLang, getTextDirection } = useLanguage();
  const isRTL = currentLang === "he";
  
  const content = {
    en: {
      title: "Ready to Start Your Journey?",
      subtitle: "Join our AI program today",
      cta: "Enroll Now"
    },
    he: {
      title: "מוכנים להתחיל את המסע?",
      subtitle: "הצטרפו לתכנית הבינה המלאכותית שלנו היום",
      cta: "הירשמו עכשיו"
    }
  };
  
  const textContent = content[currentLang];
  const direction = getTextDirection();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm py-3 z-40">
      <div 
        className={`container mx-auto px-4 flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between`}
        style={{ direction }}
      >
        <div className={`text-white ${isRTL ? 'text-right' : 'text-left'}`}>
          <h3 className="text-lg font-semibold">{textContent.title}</h3>
          <p className="text-sm opacity-60">{textContent.subtitle}</p>
        </div>
        <a 
          href="#registration-form"
          className="cta-button"
        >
          {textContent.cta}
          {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </a>
      </div>
    </div>
  );
};