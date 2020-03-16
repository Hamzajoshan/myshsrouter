import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import cookie from "react-cookies";
import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";
let Language = "ar";
if (cookie.load("Language") === "en") {
  Language = "en";
} else if (cookie.load("Language") === "ar") {
  Language = "ar";
} else {
  Language = "ar";
}

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: Language,
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
