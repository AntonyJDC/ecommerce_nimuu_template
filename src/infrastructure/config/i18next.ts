import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
const languages = ["en", "es", "fr", "es-CO", "es-AR"];
const TRANSLATIONS_VERSION = "1.0.0";

// Añadir control de versión en localStorage
const STORED_VERSION_KEY = "i18nextVersion";
const storedVersion = localStorage.getItem(STORED_VERSION_KEY);

// Si la versión almacenada es diferente, limpiamos el caché
if (storedVersion !== TRANSLATIONS_VERSION) {
	localStorage.removeItem("i18nextLng");
	localStorage.setItem(STORED_VERSION_KEY, TRANSLATIONS_VERSION);
} // don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
if (!i18n.isInitialized) {
	i18n
		// load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
		// learn more: https://github.com/i18next/i18next-http-backend
		// want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
		.use(Backend)
		// detect user language
		// learn more: https://github.com/i18next/i18next-browser-languageDetector
		.use(LanguageDetector)
		// pass the i18n instance to react-i18next.
		.use(initReactI18next)
		// init i18next
		// for all options read: https://www.i18next.com/overview/configuration-options
		.init({
			// lng: 'es', // Uses the system language
			fallbackLng: {
				default: ["es"],
			}, // Backup language in case the system language cannot be detected
			supportedLngs: languages,
			// TODO: Switching to production
			debug: process.env.NODE_ENV === "development",
			detection: {
				order: ["localStorage"],
				lookupLocalStorage: "i18nextLng",
				caches: ["localStorage"],
			},
			interpolation: {
				escapeValue: false, // not needed for react as it escapes by default
				formatSeparator: ",",
			},
			load: "languageOnly",
			backend: {
				loadPath: (lng: string, ns: string) => {
					return `/locales/${lng}/${ns}.json`;
				},
				queryStringParams: {
					v: TRANSLATIONS_VERSION,
				},
				allowMultiLoading: true,
				reloadInterval: 0,
			},
			ns: ["common", "zod"],
			defaultNS: "common",
			react: {
				useSuspense: true,
			},
		});
}
export default i18n;
