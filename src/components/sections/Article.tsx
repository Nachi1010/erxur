import { useLanguage } from "@/contexts/LanguageContext";

export const Article = () => {
  const { currentLang, getTextDirection } = useLanguage();

  const content = {
    en: {
      title: "About the Revolution",
      mainText: [
        "The unique recruitment program of \"close.ai\"™ - one of the ten youngest and fastest-growing AI companies in Israel - was specifically developed for AI sciences by renowned teaching experts and international AI scientists. During one dense and intensive academic year, program participants become full-fledged AI developers with comprehensive knowledge equivalent to graduates with three degrees in mathematics, computer science, data science, and neuroscience.",
        
        "The course planning includes a special focus on neutralizing \"background noise\", while constantly corresponding with the dynamic needs of the industry. Considerable thought is invested in imparting autodidactic and analytical abilities, which will enable you to cope in the long shot with any technology/project/task in this ever-evolving field. Throughout (almost) the entire course, you acquire the required knowledge with \"hands-on\" integration while creating and participating in live and real projects, building experience and a portfolio equivalent to two to three years of practical experience.",
        
        "The innovative and successful learning methodology, considered a registered trade secret of close.ai™, was developed in collaboration with other leading AI companies and market leaders to address the existential needs of the AI industry in its various branches, which is thirsty for quality and talented workforce. Only candidates with personal and intellectual traits that will allow us to wholeheartedly offer them signing an explicit contract in advance, with a commitment to employment in our company upon course completion, will be accepted for training."
      ]
    },
    he: {
      title: "על המהפכה",
      mainText: [
        "PracticsAI תכנית הגיוס הייחודית של close.ai\"TM\" -אחת מעשרת חברות ה-AI הצעירות והצומחות בישראל - פותחה באופן ייעודי למדעי ה-AI בידי מומחי הוראה ידועי-שם ומדעני AI בינלאומיים. במהלך שנת לימודים אחת דחוסה ואינטנסיבית - משתתפי התכנית הופכים למפתחי AI מן המניין עם ידע מקיף ושווה ערך לבוגרי שלשה תארים במתמטיקה, מדעי המחשב והנתונים ומדעי המוח.",
        
        "התוכנית הייחודית עוצבה תוך התמקדות מיוחדת בנטרול של \"רעשי רקע\", בהתכתבות מתמדת עם צרכי התעשייה הדינמיים. מושקעת חשיבה רבה בהקניית יכולות אוטודידקטיות ואנליטיות, שיאפשרו לכם התמודדות ל-long shot עם כל טכנולוגיה/פרויקט/משימה בתחום המתפתח תמידית. לאורך (כמעט) כל ההכשרה, נרכוש את הידע הנדרש בשילוב \"hands-on\" ותוך יצירה והשתתפות בפרוייקטים חיים ואמיתיים שייצרו עבורנו ניסיון ותיק עבודות שווי ערך לשנתיים-שלש של ניסיון מעשי.",
        
        "מתודולוגיית הלימודים החדשנית והמצליחה של PracticsAI שנחשבת לסוד מסחרי רשום של close.aiTM, פותחה בשיתוף חברות AI נוספות ומובילות שוק בכדי לענות על צרכיה הקיומיים של תעשיית ה-AI לענפיה השונים הצמאה לכח אדם איכותי ומוכשר. להכשרה יתקבלו אך ורק מועמדים עם תכונות אישיות ואינטלקטואליות שיאפשרו לנו להציע להם בלב שלם חתימה על חוזה מפורש מראש, ובו התחייבות לתעסוקה בחברתנו עם סיום הקורס."
      ]
    }
  };

  const textContent = content[currentLang];
  const direction = getTextDirection();
  const isRTL = currentLang === "he";

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 
            className="text-3xl font-bold text-primary mb-8 text-center"
            style={{ direction }}
          >
            {textContent.title}
          </h2>
          
          {/* תוכן המאמר */}
          <div className="prose lg:prose-lg mx-auto">
            {textContent.mainText.map((paragraph, index) => (
              <p 
                key={index} 
                className="mb-6" 
                style={{ 
                  direction, 
                  textAlign: isRTL ? "right" : "left",
                  lineHeight: "1.6"
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};