import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/scrollUtils";

export const QuestionsAndCTA = () => {
  const { currentLang, getTextDirection } = useLanguage();
  const isRTL = currentLang === "he";

  const content = {
    en: {
      title: "Is This Program Right For You?",
      subtitle: "Check if you match our candidate profile:",
      questions: [
        "<span class='font-bold'>Do you</span> have high-level computational or analytical abilities?",
        "<span class='font-bold'>Do you</span> have a bachelor's degree or rich experience in unique domain knowledge?",
        "<span class='font-bold'>Can you</span> think outside the box and expand your horizons?",
        "<span class='font-bold'>Have you</span> completed advanced mathematics studies?",
        "<span class='font-bold'>Are you</span> eager to break through barriers and glass ceilings?",
        "<span class='font-bold'>Do you</span> have unique added value that could benefit us?",
        "<span class='font-bold'>Can you</span> combine different fields of knowledge, think independently and innovatively, understand concepts deeply and not just hear them?"
      ],
      finalNote: "If you checked any of these questions - you might belong with us. Register here and now, we'll check your compatibility with PracticsAI™, and you might receive the world's only entry ticket to the most sought-after profession of the 21st century",
      ctaButton: "Register Now"
    },
    he: {
      title: "האם התכנית מתאימה לך?",
      subtitle: "בדוק אם אתה מתאים לפרופיל המועמדים שלנו:",
      questions: [
        "<span class='font-bold'>האם</span> יש לך יכולות חישוביות או אנליטיות ברמה גבוהה?",
        "<span class='font-bold'>האם</span> את/ה בוגר/ת תואר ראשון או בעל/ת ניסיון עשיר ב-domain knowlleg ייחודי?",
        "<span class='font-bold'>האם</span> את/ה אדם שמסוגל להגדיל ראש ולחשוב מחוץ לקופסה?",
        "<span class='font-bold'>האם</span> את/ה בוגר/ת 5 יח' במתמטיקה?",  
        "<span class='font-bold'>האם</span> את/ה כמה לנפץ את הקופסה ולשבור תקרות זכוכית?",
        "<span class='font-bold'>האם</span> יש לך ערך מוסף ייחודי שיוכל לבוא עבורנו לידי שימוש?",
        "<span class='font-bold'>האם</span> יש לך יכולת לשלב תחומי ידע שונים, לנהל חשיבה עצמאית וחדשנית, להבין דברים ולא רק לשמוע?"
      ],
      finalNote: "אם סימנת וי על אחת או יותר מהשאלות הללו – ייתכן שמקומך איתנו. הרשם כאן ועכשיו, אנו נבדוק את התאמתך לתכנית, ואולי תזכה לקבל את כרטיס הכניסה היחיד מסוגו בעולם אל המקצוע המבוקש ביותר במאה ה-21",
      ctaButton: "הירשם עכשיו"
    }
  };

  const textContent = content[currentLang];
  const direction = getTextDirection();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* הסרת הכותרות - לא מציגים אותן בכלל */}
          
          {/* שאלות */}
          <div 
            className="bg-white rounded-lg shadow-md p-8 mb-10"
            style={{ direction }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              {textContent.questions.map((question, index) => (
                <div 
                  key={index} 
                  className={`py-3 px-4 bg-gray-50 rounded-lg border-l-4 border-primary hover:bg-gray-100 transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: question }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* הערה סופית והפניה להרשמה */}
          <div 
            className="bg-primary text-white p-6 rounded-lg shadow-md text-center"
          >
            <p 
              className="text-lg mb-6"
              style={{ direction, textAlign: isRTL ? 'right' : 'left' }}
            >
              {textContent.finalNote}
            </p>
            
            {/* כפתור הרשמה - חץ עגול */}
            <div className="mt-6 flex justify-center">
              <button 
                onClick={() => smoothScrollTo('registration-form')}
                className="inline-flex items-center justify-center w-14 h-14 bg-white text-primary rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
                aria-label={currentLang === 'he' ? 'הירשם עכשיו' : 'Register now'}
              >
                <ChevronUp size={24} />
              </button>
            </div>
          </div>
          
          {/* Empty padding div to prevent content from being hidden when scrolling to max */}
          <div className="h-24"></div>
        </div>
      </div>
    </section>
  );
}; 