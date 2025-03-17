import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToElement } from "@/App";
import "./FAQ.css";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQListItem = ({ item, isOpen, onClick }: { 
  item: FAQItem; 
  isOpen: boolean; 
  onClick: () => void 
}) => {
  const { getTextDirection, currentLang } = useLanguage();
  
  return (
    <div 
      className="faq-item mb-4 bg-dark-light/30 rounded-lg overflow-hidden"
      data-state={isOpen ? "open" : "closed"}
    >
      <button
        className="w-full flex items-center justify-between p-4 text-white/90"
        onClick={onClick}
        aria-expanded={isOpen}
        style={{ direction: getTextDirection() }}
      >
        <span className="text-lg font-medium">{item.question}</span>
        <span className="faq-icon transition-transform duration-300">
          {isOpen ? (
            <Minus className="h-5 w-5 text-royal-light flex-shrink-0" />
          ) : (
            <Plus className="h-5 w-5 text-royal-light flex-shrink-0" />
          )}
        </span>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div 
          className="p-4 border-t border-royal-light/20"
          style={{ direction: getTextDirection() }}
        >
          <p 
            className="text-white/80 whitespace-pre-wrap text-[0.95rem] leading-[1.65] font-extralight tracking-[0.01em]"
            style={{ 
              direction: getTextDirection(),
              fontFamily: currentLang === "he" ? "'Assistant', sans-serif" : "'Inter', sans-serif",
              WebkitFontSmoothing: "antialiased",
              fontOpticalSizing: "auto"
            }}
            dangerouslySetInnerHTML={{ __html: item.answer }}
          ></p>
        </div>
      </div>
    </div>
  );
};

const faqItems = {
  en: [
    {
      question: "What will I learn in this course?",
      answer: "You'll learn cutting-edge AI technologies including machine learning, deep learning, natural language processing, and computer vision. The curriculum is aligned with current industry demands."
    },
    {
      question: "Is prior experience required?",
      answer: "Basic programming and mathematics background is required. We provide preparatory materials for candidates who need a refresher."
    },
    {
      question: "What is the course duration?",
      answer: "The course runs for 6 months, with flexible learning pace options."
    },
    {
      question: "How is the program structured?",
      answer: "The program combines theoretical foundations with hands-on practice. You'll work on real-world projects, participate in workshops, and receive mentoring from industry experts."
    },
    {
      question: "What career support do you provide?",
      answer: "We offer comprehensive career support including resume building, interview preparation, and direct connections to our industry partners for job placement opportunities."
    },
    {
      question: "What are the payment options?",
      answer: "We offer flexible payment plans including upfront payment, monthly installments, and income share agreements. Scholarships are available for qualified candidates."
    },
    {
      question: "Can I take this course while working full-time?",
      answer: "Yes, we offer both full-time and part-time options. The part-time track is specifically designed for working professionals, with evening classes and flexible scheduling."
    },
    {
      question: "What kind of projects will I work on?",
      answer: "You'll work on diverse projects including computer vision applications, natural language processing systems, and machine learning models. All projects are based on real industry challenges."
    },
    {
      question: "What is the application process?",
      answer: "The application process includes an online application, technical assessment, and personal interview. We evaluate candidates based on their potential and commitment to learning."
    },
    {
      question: "What credentials will I receive upon completion?",
      answer: "Graduates receive an industry-recognized certificate and a portfolio of completed projects. More importantly, you'll gain practical skills valued by employers."
    },
    {
      question: "What technical requirements are needed?",
      answer: "You'll need a computer with at least 8GB RAM, modern processor, and stable internet connection. We provide all necessary software and development tools."
    }
  ],
  he: [
    {
      question: "מי אנחנו?",
      answer: "היי, נעים מאוד. אז אנחנו ™PracticsAI, תכנית הגיוס של CloserAI – אחת מעשרת חברות ה-AI הצומחות ביותר בישראל. כאשר התברר הפער הבלתי נתפס בין צרכי הגיוס שלנו ושל הקולגות, לבין היצע כח האדם המצומצם בשוק – החלטנו, בשת\"פ עם חברות AI נוספות, להקים שולחן עגול שבו יושבים מומחי הוראה בינלאומיים עם זיקה לתחום. ובשת\"פ עם המתמטיקאים, המתכנתים, מדעני המוח והנתונים המובילים בתחומם, הקמנו את התכנית היחידה מסוגה בעולם, שבה אדם \"מן השורה\" יכול להפוך למדען AI עם ידע מקיף וניסיון עשיר, כשבכיסו התחייבות חוזית למשרה בחברתנו עם תום הקורס."
    },
    {
      question: "מה בתוכנית?",
      answer: "מתוך היכרות עמוקה עם התכנים והבנה מקיפה של צרכי התעשייה, דחסנו לשנת לימודים אחת אינטנסיבית את כל התכנים ושיטות הלמידה שבאמצעותם נהפוך למתכנתי AI עם נקודת מבט תיאורטית, אינטואיטיבית וביצועית. ועם ידע מקיף ושווה ערך לבוגרי שלשה תארים במתמטיקה, מדעי המחשב והנתונים ומדעי המוח. לאורך (כמעט) כל הקורס, הסטודנטים יעבדו בשילוב \"hands on\" על פרוייקטים חיים מתוך שדרת הפעילות הסדירה של החברה כך שבמקביל לידע התיאורטי התלמיד בונה לעצמו גישה אוטודידקטית שתסייע לו בעבודה ב\"עולם האמיתי\", ויוצר לעצמו ניסיון ותיק עבודות שווה ערך לשנתיים-שלש של ניסיון מעשי."
    },
    {
      question: "איך קורה הקסם?",
      answer: "מתודולוגיית הלימודים החדשנית והמצליחה שלנו, פותחה בידי מומחי הוראה ידועי-שם ומדעני AI בינלאומיים, באופן ספציפי המותאם לתכני הלימודים המורכבים ולמולטי-דיסציפלינריות המובנית של תחום ה-AI. נעשתה חשיבה על כל פרט, כך שכל תלמיד ירכוש את כלל הדיסציפלינות הנדרשות, ואת מיומנויות הלמידה הקריטיות, כמו גם היכרות עם הארכיטקטורות החדשניות ביותר המופיעות חדשות לבקרים, תוך התכתבות מתמדת עם צרכי התעשייה הדינמיים. במקביל, מושקעת חשיבה רבה בהקניית יכולות אוטודידקטיות ואנליטיות, שיאפשרו לתלמיד התמודדות ל-long shot בתחום דינמי ומתפתח שכזה."
    },
    {
      question: "מהי שיטת הלימוד הייחודית?",
      answer: "לאורך כל שנת הלימודים נתקוף את עולם ה-AI מכל היבטיו. נשקיע לא מעט זמן ברכישת שפות תכנות ומיומנויות כתיבת קוד, נכיר את כל הכלים והעזרים הרלוונטיים לתחום, ונערוך הכרות עם המחקר החדשני ביותר. אבל חשוב מכך, נפתח את הגישה התיאורטית שתסייע לנו לקבל החלטות מורכבות שמתבססות על דיסציפלינות מרובות, נתרגל שעות רבות כל אספקט של הלימודים, ונבנה יחד פרוייקטים אמיתיים מתוך פעילות החברה. בשילוב תרגולי חשיבה מנטליים – נהפוך למדעני AI מובילים ופורצי דרך: אוטודידקטים שמסוגלים להתמודד עם כל טכנולוגיה או ארכיטקטורה חדשה שתצמח בעתיד הלא-רחוק."
    },
    {
      question: "מה לומדים תכלס?",
      answer: "תוכנית הלימודים הזוכה להצלחה חסרת תקדים, מחולקת לארבעה סמסטרים נפרדים – בכל אחד מהם מערכי לימודים מזוויות של גישה תיאורטית, גישה אינטואיטיבית וגישה ביצועית – בשני הראשונים נדחס את כל לימודי הבסיס (כמו מתמטיקה) ולימודי התשתית (כמו תכנות בפייתון) הנדרשים. בשלישי, נתמקד כבר בלימודי AI מתקדמים (כמו רשתות קונבולוציוניות ו-Backprograming) ונערוך הכרות עם מגוון רחב של ארכיטקטורות מובילות. בסמסטר הרביעי התלמידים יתחלקו למסלולים לפי התפקיד שיוקצה לכל אחד מהם בידי מחלקת ה-hr שלנו שם נלמד על שיטות אימון מתקדמות, נשתלב בצוותים ייעודיים לפי מסלול ונערוך הכרות עם ארכיטקטורות רלוונטיות למסלול הספציפי. בכל המסלולים יילמדו גם ארכיטקטורות חזותיות וגנרטיביות."
    },
    {
      question: "מה עלויות ההכשרה?",
      answer: "העלות הריאלית של כלל מערכי הלימודים מוערכת בכ-38,000$ לתלמיד. עם זאת, בהינתן עמידה בתנאי הקבלה למסלול (שבלעדיה בלאו הכי לא ניתן להצטרף לתכנית, לצערנו) - רובו העצום של הסכום מסובסד בידי חברות הקבוצה, רשות החדשנות, וגורמים מממנים נוספים. כך שבסופו של יום, כלל התלמידים משלמים אחוז בודד בלבד מעלות הקורס הכוללת. גם עלות סמלית זו מתקזזת ממילא עם משכורות העתק שמקבלים עובדי החברה לאחר תום ההכשרה."
    },
    {
      question: "למי התכנית מיועדת?",
      answer: "™PracticsAI – אקדמיית ההכשרה של CloserAI, הוקמה בכדי לענות על צורך קיומי של תעשיית ה-AI לענפיה השונים. אנו מגייסים אנשים איכותיים ובעלי יכולות מנטאליות גבוהות – במטרה מוצהרת שאלו יאיישו את מגוון המשרות הזמינות אצלנו במסלול המזורז ביותר האפשרי מבלי להתפשר על רמת הלימודים והקניית הידע. זו הסיבה שבתהליך האבחון אנו מסננים אך ורק מועמדים עם סט תכונות ספציפיות שיאפשרו לנו להציע בלב שלם חתימה על חוזה מפורש, ובו התחייבות לתעסוקה בחברתנו עם סיום הקורס. אין צורך בתארים אקדמיים מפני שרובם של תכני הלימודים האקדמיים כמו גם השיטה הפדגוגית המיושנת בלאו הכי לא מתאימים לעולם ה-AI הדינמי והמתפתח, ואת היתר אנו מקנים בעצמנו בשיטה חדשנית בהכשרה המזורזת."
    },
    {
      question: "יש התחייבות להשמה?",
      answer: "כן, חד וחלק. כלל המועמדים מסיימי הקורס בהצלחה (כ-96% לפי ממוצע המחזורים הקודמים), יתקבלו מיידית למשרות AI נחשקות בחברת CloserAI, או באחת מ-35 חברות ה-AI מהצומחות בישראל שפועלות עימנו בשיתוף פעולה. זו גם הסיבה שבסמסטר הרביעי של תכנית הלימודים, כלל הכיתות מתחלקות מחדש לפי מסלולים שונים שבהן יילמדו ארכיטקטורות ומתודולוגיות אלגוריתמיקה ייעודיות לפי תחום ההשמה שנקבע עבור כל מועמד. עם זאת, היעדרות של פחות מ-80% מהלימודים ללא אישור עלולה לסיים את המחוייבות שלנו לתעסוקה בתום הקורס - הלימודים הינם אינטנסיביים במיוחד וכל החמצה הינה משמעותית."
    },
    {
      question: "מי זכאי להגיש מועמדות?",
      answer: `כל אחד יכול להרשם לבדיקת התאמה, <a href="#" class="text-white font-bold hover:text-white/80 hover:underline transition-colors" onclick="event.preventDefault(); window.scrollToElement('registration-form')">ממש כאן</a>. עם זאת, ההרשמה אינה מבטיחה קבלה למסלול. אנו מגייסים אנשים איכותיים ובעלי יכולות מנטאליות גבוהות – במטרה מוצהרת שאלו יאיישו את מגוון המשרות הזמינות אצלנו עם תום הלימודים. זו הסיבה שמתקיים תהליך אבחון מוקפד שבו אנו מסננים אך ורק מועמדים עם סט תכונות ספציפיות שיאפשרו לנו להציע בלב שלם חתימה על חוזה מפורש מראש, ובו התחייבות לתעסוקה בחברתנו עם תום הקורס. חשוב להדגיש כי ההתמקדות בתהליך הסינון הינה אך ורק ביכולות האישיות והמנטליות של המועמד ולא נדרש ידע מוקדם או תואר אקדמי מפני שאת אלו אנו מקנים בעצמנו בשיטה חדשנית במהלך ההכשרה המזורזת.`
    },
    {
      question: "למה כדאי להצטרף אלינו?",
      answer: "אם וכאשר תתקבלו למסלול ההכשרה, הרי ש-™PracticsAI תהווה עבורכם הזדמנות יחידה מסוגה בעולם לדלג על לימוד שלשה תארים מפרכים, ולקפוץ היישר אל עולמות ה-AI העמוקים לאחר הכשרה אינטנסיבית של שנה בסה\"כ. מקצוע ה-AI הינו מורכב וסבוך, וזאת הסיבה לכך שאין אף תואר אקדמאי יחיד המאפשר לימודי בינה מלאכותית מקיפים. הקורסים ל\"תכנות עם AI\" וכדו', אותם מציעים מוסדות הלימוד מתחום ההייטק הישן הינם קורסים מיושנים שאבד עליהם הכלח עם תוספת תכנים שוליים, שלכל היותר יסייעו למהנדס התוכנה המצוי להישאר רלוונטי לעוד שנים ספורות."
    },
    {
      question: "למה עוד יש לחכות?",
      answer: `לכלום. <a href="#" class="text-white font-bold hover:text-white/80 hover:underline transition-colors" onclick="event.preventDefault(); window.scrollToElement('registration-form')">מגישים מועמדות</a> כאן ועכשיו. המתאימים יוכלו לזכות בכרטיס הכניסה היחיד מסוגו בעולם למקפצה בטוחה ישירות אל מקצוע העתיד.`
    }
  ]
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { currentLang } = useLanguage();

  return (
    <section id="faq" className="py-16 bg-dark-darker" aria-labelledby="faq-title">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 
            id="faq-title" 
            className={`text-3xl font-bold mb-8 text-white/90 ${
              currentLang === "he" ? "text-right" : "text-left"
            }`}
          >
            {currentLang === "he" ? "שאלות נפוצות" : "Frequently Asked Questions"}
          </h2>
          {faqItems[currentLang].map((item, index) => (
            <FAQListItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// שימוש בפונקציית scrollToElement
const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  scrollToElement(targetId);
};