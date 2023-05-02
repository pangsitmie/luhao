import i18n from 'i18next';
import { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const languages: string[] = ['en', 'tw'];

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'tw',
        debug: false,
        interpolation: {
            escapeValue: false
        },
        whitelist: languages
    } as InitOptions<object>); // specify the type of InitOptions as object

export default i18n;
