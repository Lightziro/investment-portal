import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LngDetector from "i18next-browser-languagedetector";
import { enLanguage } from "../lang/en.language";
import { ruLanguage } from "../lang/ru.language";

// "Inline" English and Arabic translations.
// We can localize to any language and any number of languages.
const resources = {
    en: {
        translation: enLanguage,
    },
    ru: {
        translation: ruLanguage,
    },
};
const options = {
    order: ["localStorage"],
    lookupLocalStorage: "i18nextLng",
    caches: ["localStorage", "cookie"],
    excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)
};

i18n.use(LngDetector)
    .use(initReactI18next)
    .init({
        resources,
        // lng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
            prefix: "%",
            suffix: "%",
        },
        detection: options,
    });

export default i18n;
