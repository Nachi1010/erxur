const menuItems = [
  { title: "Home", titleHe: "דף הבית", href: "#" },
  { title: "About", titleHe: "אודות", href: "#about" },
  { title: "Course Details", titleHe: "פרטי הקורס", href: "#course-details" },
  { title: "Technical Details", titleHe: "פרטים טכניים", href: "#technical-details" },
  { title: "Registration", titleHe: "הרשמה", href: "#registration-form" },
  { title: "FAQ", titleHe: "שאלות נפוצות", href: "#faq" },
  { title: "Contact", titleHe: "צור קשר", href: "#registration-form" }
] as const;

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useLanguage } from "@/contexts/LanguageContext";

export const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const { currentLang } = useLanguage();
  
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col justify-between h-full">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.title}>
                <a
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors block py-2"
                  onClick={onClose}
                >
                  {currentLang === "en" ? item.title : item.titleHe}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto pt-4 border-t border-slate-700">
            <div className="text-white/60 text-xs space-y-2">
              <a href="#accessibility" className="block hover:text-white transition-colors">
                {currentLang === "en" ? "Accessibility" : "נגישות"}
              </a>
              <a href="#registration-form" className="block hover:text-white transition-colors">
                {currentLang === "en" ? "More Information" : "מידע נוסף"}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};