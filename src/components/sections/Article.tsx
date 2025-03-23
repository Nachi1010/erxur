import { useLanguage } from "@/contexts/LanguageContext";

export const Article = () => {
  const { currentLang, getTextDirection } = useLanguage();

  const content = {
    en: {
      title: "About the Revolution",
      mainText: [
        "PracticsAI™, the unique recruitment program for AI professionals, was specifically developed for AI sciences by internationally renowned teaching experts and AI scientists, and is funded and actively managed by CloserAI - one of Israel's ten fastest-growing AI companies. During one intensive academic year, program participants master all theoretical and practical aspects required to become full-fledged AI scientists with comprehensive knowledge equivalent to graduates with three degrees in mathematics, computer and data science, and neuroscience.",
        
        "Course planning focuses particularly on eliminating 'background noise' while maintaining constant alignment with the industry's dynamic needs. Significant emphasis is placed on developing autodidactic and analytical capabilities, enabling you to handle any technology, project, or task in the long term. Almost throughout the entire course, students gain hands-on experience working on live projects from the company's regular operations, thus building both theoretical knowledge and practical experience equivalent to two to three years of real-world work experience.",
        
        "The innovative and successful learning methodology, considered a registered trade secret of close.ai™, was developed in collaboration with other leading AI companies and market leaders to address the existential needs of the AI industry in its various branches, which is thirsty for quality and talented workforce. Only candidates with personal and intellectual traits that will allow us to wholeheartedly offer them signing an explicit contract in advance, with a commitment to employment in our company upon course completion, will be accepted for training."
      ]
    },
    he: {
      title: "על המהפכה",
      mainText: [
        "™PracticsAI, תכנית הגיוס הייחודית למקצוע ה-AI פותחה באופן ייעודי למדעי ה-AI בידי מומחי הוראה ידועי-שם ומדעני AI בינלאומיים, ובמימון וניהול פעיל של  CloserAI - אחת מעשרת חברות ה-AI הצעירות והצומחות בישראל. במהלך שנת לימודים אחת דחוסה ואינטנסיבית - משתתפי התכנית שולטים בכל ההיבטים התיאורטיים והמעשיים הנדרשים כדי להפוך למדעני AI מן המניין עם ידע מקיף ושווה ערך לבוגרי שלשה תארים במתמטיקה, מדעי המחשב והנתונים ומדעי המוח.",
        
        "בתכנון הקורס ישנה התמקדות מיוחדת בנטרול של \"רעשי רקע\", תוך התכתבות מתמדת עם צרכי התעשייה הדינמיים. במקביל, מושקעת חשיבה רבה בהקניית יכולות אוטודידקטיות ואנליטיות, שיאפשרו לכם התמודדות ל-long shot עם כל טכנולוגיה/פרויקט/משימה. לאורך (כמעט) כל הקורס הסטודנטים מתנסים באופן מעשי בעבודה על פרויקטים חיים מתוך שדרת הפעילות הרגילה של החברה, ובכך בונים במקביל לידע התיאורטי גם ניסיון מעשי השווה ערך לשנתיים-שלוש של עבודה בעולם האמיתי.",
        
        "מתודולוגיית הלימודים החדשנית והמצליחה שנחשבת לסוד מסחרי רשום של CloserAI, פותחה בשיתוף חברות AI נוספות ומובילות שוק בכדי לענות על צרכיה הקיומיים של תעשיית ה-AI לענפיה השונים הצמאה לכח אדם איכותי ומוכשר. להכשרה יתקבלו אך ורק מועמדים עם תכונות אישיות ואינטלקטואליות שיאפשרו לנו להציע להם בלב שלם חתימה על חוזה מפורש מראש, ובו התחייבות לתעסוקה בחברתנו עם סיום הקורס."
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