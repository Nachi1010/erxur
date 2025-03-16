import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const Registration = () => {
  const { currentLang, getTextDirection } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // מצב פשוט ללא שימוש בספריות מורכבות
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    phone: ""
  });
  
  // עדכון ערכים באופן פשוט ויעיל
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      validationError: "Phone number OR name + email required for registration"
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
      validationError: "נדרש מספר טלפון או שם + אימייל להרשמה"
    }
  };

  const t = translations[currentLang];
  const rtlTextAlign = currentLang === "he" ? "text-right" : "text-left";
  const direction = getTextDirection();

  // פונקציית השליחה עם התנאים המדויקים מהקובץ המקורי
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // שליחה לסופבייס ללא תלות בתקינות הנתונים
      const { error } = await supabase.from('registrations').insert([{
        name: formData.name || '',
        id_number: formData.id || '',
        email: formData.email || '',
        phone: formData.phone || '',
        created_at: new Date().toISOString()
      }]);

      if (error) throw error;

      // בדיקת התנאים לפי הדרישות המקוריות
      const hasPhoneOnly = formData.phone && formData.phone.trim() !== '';
      const hasNameAndEmail = formData.name && formData.name.trim() !== '' && 
                             formData.email && formData.email.trim() !== '';
      
      // בדיקה נוספת לצורך ניווט
      const hasAllFields = hasPhoneOnly && hasNameAndEmail;

      if (hasPhoneOnly || hasNameAndEmail) {
        // הצגת הודעת הצלחה
        toast({
          title: "Success",
          description: t.successMessage,
        });
        
        // ניווט רק אם כל השדות מלאים
        if (hasAllFields) {
          navigate('/thank-you');
        }
      } else {
        // הצגת הודעת שגיאה אם אין מספיק שדות
        toast({
          title: "Validation Error",
          description: t.validationError,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Error",
        description: t.errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // יצירת שדה קלט בסיסי
  const FormInput = ({ 
    label, 
    name, 
    type = "text", 
    placeholder 
  }: { 
    label: string; 
    name: string; 
    type?: string; 
    placeholder: string;
  }) => (
    <div className="mb-4">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium mb-1"
        style={{ direction }}
      >
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={formData[name as keyof typeof formData]}
        onChange={handleChange}
        className={`form-input ${rtlTextAlign}`}
        style={{ direction }}
      />
    </div>
  );

  return (
    <section id="registration" className="py-16 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
      <div className="container max-w-lg mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-primary">
              {t.title}
            </h2>
            <p className="text-gray-600">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <FormInput
              label={t.nameLabel}
              name="name"
              placeholder={t.namePlaceholder}
            />
            <FormInput
              label={t.idLabel}
              name="id"
              placeholder={t.idPlaceholder}
            />
            <FormInput
              label={t.emailLabel}
              name="email"
              type="email"
              placeholder={t.emailPlaceholder}
            />
            <FormInput
              label={t.phoneLabel}
              name="phone"
              type="tel"
              placeholder={t.phonePlaceholder}
            />
            <Button 
              type="submit" 
              className="w-full py-4 text-lg mt-6 bg-primary hover:bg-primary-dark text-white rounded-md"
              disabled={isSubmitting}
            >
              {t.submitButton}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};