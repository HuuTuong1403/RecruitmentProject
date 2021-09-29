import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tranlate_en from "./en.json";
import tranlate_vn from "./vn.json";

const lang = () => {
  let locale = localStorage.getItem('lang') || navigator.language
  localStorage.setItem('lang', locale)
  return locale;
};

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: lang(),
  resources: {
    "en-ES": {
      translation: tranlate_en,
    },
    "vi-VN": {
      translation: tranlate_vn,
    },
  },
});

export default i18n;
