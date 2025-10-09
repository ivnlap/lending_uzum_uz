import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.json';
import uz from './uz.json';

const resources = {
  ru: {
    translation: ru
  },
  uz: {
    translation: uz
  }
};

// Определяем язык из data-lang атрибута на HTML элементе
const getInitialLanguage = (): string => {
  const htmlLang = document.documentElement.getAttribute('data-lang');
  if (htmlLang && (htmlLang === 'ru' || htmlLang === 'uz')) {
    return htmlLang;
  }
  // Fallback на localStorage или русский
  return localStorage.getItem('language') || 'ru';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;