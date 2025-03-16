import { useLanguage } from "@/contexts/LanguageContext";

export const PartnerLogos = () => {
  const { currentLang } = useLanguage();
  
  const partners = [
    { name: "Google", logo: "/images/partners/google.png" },
    { name: "Microsoft", logo: "/images/partners/microsoft.png" },
    { name: "Amazon", logo: "/images/partners/amazon.png" },
    { name: "Meta", logo: "/images/partners/meta.png" },
    { name: "NVIDIA", logo: "/images/partners/nvidia.png" },
    { name: "OpenAI", logo: "/images/partners/open.png" },
    { name: "Anthropic", logo: "/images/partners/antrophic.png" },
    { name: "AI21", logo: "/images/partners/ai21.png" },
    { name: "RunAI", logo: "/images/partners/runai.png" },
    { name: "Codum", logo: "/images/partners/codum.png" },
    { name: "DID", logo: "/images/partners/did.png" },
    { name: "Xupr", logo: "/images/partners/xupr thbyk.png" }
  ];
  
  const translations = {
    en: { title: "Our partners" },
    he: { title: "השותפים שלנו" }
  };
  
  const t = translations[currentLang];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">{t.title}</h2>
        
        {/* פס לוגואים דינמי עם CSS בלבד */}
        <div className="relative overflow-hidden">
          {/* צללית בצדדים */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* הלוגואים עם אנימציה */}
          <div className="logos-slide-track">
            {/* חלק ראשון */}
            {partners.map((partner, index) => (
              <div key={`first-${index}`} className="logo-slide">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto max-w-[150px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            
            {/* חלק שני (שכפול) */}
            {partners.map((partner, index) => (
              <div key={`second-${index}`} className="logo-slide">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto max-w-[150px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* סגנונות לאנימציה */}
        <style>{`
          .logos-slide-track {
            display: flex;
            animation: scroll 30s linear infinite;
            width: calc(250px * 16);
          }
          
          .logo-slide {
            width: 250px;
            padding: 0 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-250px * 8)); }
          }
        `}</style>
      </div>
    </section>
  );
};