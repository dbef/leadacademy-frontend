'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export enum Language {
  KA = 'KA',
  ENG = 'ENG',
}

interface LanguageContextType {
  language: Language;
  changeLanguage: (newLanguage: Language) => Language;
  renderLanguage: (ka: string, eng: string) => string;
}

const defaultLanguageContext: LanguageContextType = {
  language: Language.KA,
  renderLanguage: (ka: string) => ka,
  changeLanguage: (newLanguage: Language) => newLanguage,
};

export const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [language, setLanguage] = useState(Language.ENG);

  const changeLanguage = (newLanguage: Language): Language => {
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', newLanguage);
    }

    return newLanguage;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currLang = (window.localStorage.getItem('language') as Language) || Language.ENG;

      if (currLang) {
        setLanguage(currLang);
      }
    }
  }, []);

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
    <LanguageContext.Provider value={{ language, changeLanguage, renderLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
