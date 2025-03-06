// src/locales/language-utils.ts
import { cookies } from 'next/headers';

import { Language } from 'src/contexts/language-context';

export function detectInitialLanguage(pathname: string): Language {
  const urlLang = pathname.split('/')[1]?.toUpperCase() as Language;
  if (Object.values(Language).includes(urlLang)) {
    return urlLang;
  }

  const cookieLang = cookies().get('language')?.value as Language;
  if (cookieLang && Object.values(Language).includes(cookieLang)) {
    return cookieLang;
  }

  return Language.ENG; // Default to English
}
