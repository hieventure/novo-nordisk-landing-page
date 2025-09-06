import { useState } from 'react';

interface LanguageToggleProps {
  className?: string;
  onLanguageChange?: (language: 'vi' | 'en') => void;
}

export function LanguageToggle({ className = '', onLanguageChange }: LanguageToggleProps) {
  const [currentLanguage, setCurrentLanguage] = useState<'vi' | 'en'>('vi');

  const handleToggle = () => {
    const newLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
    setCurrentLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-0.5 sm:p-1 shadow-lg border border-gray-200">
        <div className="flex items-center">
          {/* Vietnamese Option */}
          <button
            onClick={currentLanguage === 'en' ? handleToggle : undefined}
            className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 ${
              currentLanguage === 'vi'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <span className="hidden sm:inline">🇻🇳 </span>VI
          </button>

          {/* English Option */}
          <button
            onClick={currentLanguage === 'vi' ? handleToggle : undefined}
            className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 ${
              currentLanguage === 'en'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <span className="hidden sm:inline">🇺🇸 </span>EN
          </button>
        </div>
      </div>
    </div>
  );
}
