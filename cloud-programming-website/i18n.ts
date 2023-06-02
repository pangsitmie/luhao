import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from './src/locales/en/translation.json';
import tw from './src/locales/tw/translation.json';

// the translations
const resources = {
    en: {
        translation: en
    },
    tw: {
        translation: tw
    }
};

i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "tw",
        fallbackLng: "tw",

    });


export default i18next;