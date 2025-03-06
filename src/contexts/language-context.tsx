// src/contexts/language-context.tsx

'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect, useContext, createContext } from 'react';

export enum Language {
  KA = 'ka',
  ENG = 'en',
}

interface LanguageContextType {
  language: Language;
  changeLanguage: (newLanguage: Language) => void;
  localizedRoute: (path: string) => string;
  renderLanguage: (ka: string, eng: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(Language.ENG);
  const pathname = usePathname();
  const router = useRouter();

  // Detect language from URL or localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    const urlLang = pathname.split('/')[1] as Language;

    if (urlLang && Object.values(Language).includes(urlLang)) {
      setLanguage(urlLang);
    } else {
      setLanguage(Language.KA);
    }
  }, [pathname]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);

    const newPath = `${newLanguage === Language.KA ? '' : '/en'}${pathname.replace(/^\/(en|ka)/, '')}`;

    router.push(newPath);
  };

  // Helper function to add language prefix
  const localizedRoute = (path: string) => `/${language}${path}`;

  const renderLanguage = (ka: string, eng: string): string => {
    if (language === Language.KA) {
      return ka;
    }
    if (language === Language.ENG) {
      return eng;
    }
    return ka;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, localizedRoute, renderLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
