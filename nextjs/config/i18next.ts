import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LngDetector from "i18next-browser-languagedetector";
import { enLanguage } from "../lang/en.language";
import { ruLanguage } from "../lang/ru.language";

const resources = {
    en: {
        translation: enLanguage,
    },
    ru: {
        translation: ruLanguage,
    },
};
const options = {
    lookupQuerystring: "lng",
    order: ["localStorage"],
    lookupLocalStorage: "i18nextLng",
    caches: ["localStorage", "cookie"],
    excludeCacheFor: ["cimode"],
};

i18n.use(LngDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "ru",
        interpolation: {
            escapeValue: false,
            prefix: "%",
            suffix: "%",
        },
        detection: options,
    });

export default i18n;
