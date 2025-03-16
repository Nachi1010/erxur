import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// טופס רישום עם עיצוב מותאם ולוגיקה משופרת
export const Registration = () => {
  const { currentLang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // מצב הטופס
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    phone: ""
  });
  
  // עדכון ערכים
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // תרגומים
  const translations = {
    en: {
      title: "Join Our Elite Program",
      subtitle: "Take your first step towards AI mastery",
      namePlaceholder: "Enter your full name",
      idPlaceholder: "Enter your ID number",
      emailPlaceholder: "you@example.com",
      phonePlaceholder: "Enter your phone number",
      submitButton: "Begin Your Journey",
      nameLabel: "Full Name",
      idLabel: "ID Number",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      successMessage: "Registration submitted successfully!",
      errorMessage: "Something went wrong. Please try again.",
      validationError: "Missing required information:",
      phoneValidationHint: "(should contain at least 9 digits)",
      missingName: "Name is required",
      missingEmail: "Valid email is required",
      missingPhone: "Phone number with at least 9 digits is required",
      loading: "Processing..."
    },
    he: {
      title: "הצטרפו לתכנית היוקרתית שלנו",
      subtitle: "קחו את הצעד הראשון שלכם לקראת מומחיות ב-AI",
      namePlaceholder: "הזינו את שמכם המלא",
      idPlaceholder: "הזינו את מספר הזהות שלכם",
      emailPlaceholder: "your@email.com",
      phonePlaceholder: "הזינו את מספר הטלפון שלכם",
      submitButton: "התחילו את המסע שלכם",
      nameLabel: "שם מלא",
      idLabel: "מספר זהות",
      emailLabel: "כתובת אימייל",
      phoneLabel: "מספר טלפון",
      successMessage: "ההרשמה הושלמה בהצלחה!",
      errorMessage: "משהו השתבש. אנא נסו שוב.",
      validationError: "חסר מידע נדרש:",
      phoneValidationHint: "(נדרש לפחות 9 ספרות)",
      missingName: "נדרש למלא שם",
      missingEmail: "נדרשת כתובת אימייל תקינה",
      missingPhone: "נדרש מספר טלפון עם לפחות 9 ספרות",
      loading: "מעבד..."
    }
  };

  const t = translations[currentLang];
  
  // פונקציית עזר לבדיקת תקינות אימייל
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email ? emailRegex.test(email) : false;
  };
  
  // פונקציית עזר לבדיקת תקינות מספר טלפון (לפחות 9 ספרות)
  const isValidPhone = (phone: string): boolean => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 9;
  };

  // עדכון הלוגיקה של השליחה
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // שליחה לסופבייס בכל מקרה
      const { error } = await supabase.from('registrations').insert([{
        name: formData.name || '',
        id_number: formData.id || '',
        email: formData.email || '',
        phone: formData.phone || '',
        created_at: new Date().toISOString()
      }]);

      if (error) throw error;

      // בדיקות תקינות לקביעת סטטוס ללא עצירת השליחה
      const hasValidName = formData.name && formData.name.trim() !== '';
      const hasValidEmail = isValidEmail(formData.email);
      const hasValidPhone = isValidPhone(formData.phone);
      
      // האם הוזן אימייל בכלל (אפילו לא תקין)
      const hasEmailInput = formData.email && formData.email.trim() !== '';
      
      // בדיקה של התנאים לקביעת הצלחה - האימייל נבדק רק אם הוזן
      const isRegistrationValid = hasValidPhone || hasValidName;
      const hasAllFields = hasValidName && (hasEmailInput ? hasValidEmail : true) && hasValidPhone;

      if (isRegistrationValid) {
        // הצלחה - הצגת הודעת הצלחה עם אייקון
        toast({
          title: "✅ " + "Success",
          description: t.successMessage,
          variant: "success",
          duration: 5000,
        });
        
        // ניווט רק במידה ויש את כל השדות
        if (hasAllFields) {
          navigate('/thank-you');
        }
      } else {
        // כישלון - יצירת הודעת שגיאה מפורטת
        let errorDetails = t.validationError + "\n";
        
        if (!hasValidPhone) {
          errorDetails += "\n- " + t.missingPhone;
        }
        
        if (!hasValidName) {
          errorDetails += "\n- " + t.missingName;
        }
        
        // הצג הודעת שגיאה על אימייל רק אם הוזן אימייל והוא לא תקין
        if (hasEmailInput && !hasValidEmail) {
          errorDetails += "\n- " + t.missingEmail;
        }
        
        // הצגת הודעת כישלון עם אייקון
        toast({
          title: "❌ " + "Validation Error",
          description: errorDetails,
          variant: "destructive",
          duration: 7000,
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "❌ " + "Error",
        description: t.errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // קבלת ערך ה-dir המתאים לשפה
  const dir = currentLang === "he" ? "rtl" : "ltr";

  return (
    <section 
      className="py-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800"
      dir={dir}
    >
      <div className="w-full max-w-md px-6">
        {/* כרטיס הטופס */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* כותרת */}
          <div className="p-8 bg-gradient-to-r from-slate-700 to-slate-800 text-white">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {t.title}
            </h2>
            <p className="text-white/80">
              {t.subtitle}
            </p>
          </div>
          
          {/* גוף הטופס */}
          <div className="p-8">
            <form onSubmit={onSubmit} className="space-y-5">
              {/* שם */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                />
              </div>

              {/* מספר זהות */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.idLabel}
                </label>
                <input
                  type="text"
                  name="id"
                  placeholder={t.idPlaceholder}
                  value={formData.id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                />
              </div>

              {/* אימייל */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                />
              </div>

              {/* טלפון */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.phoneLabel} <span className="text-xs text-gray-500">{t.phoneValidationHint}</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t.phonePlaceholder}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                />
              </div>

              {/* כפתור שליחה */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 mt-6 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.loading}
                  </span>
                ) : t.submitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};