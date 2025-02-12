import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import i18n from "../../infrastructure/config/i18next.ts";

export interface LocaleProps {
	[key: string]: { title: string; icon: string; code: string };
}

export interface Tabs {
	id: number;
	name: string;
}

export interface GlobalState {
	tabs: Tabs[];
	activeTab: number | null;
	setActiveTab: (id: number | null) => void;
	// language selector
	locales: LocaleProps;
	localeSel: { title: string; icon: string; code: string };
	handleLanguageChange: (lang: string) => void;
	// theme selector
	theme: string;
	setTheme: (theme: string) => void;
	// sidebar
	isSidebarOpen: boolean;
	setIsSidebarOpen: (isOpen: boolean) => void;
	// scroll
	isScrolled: boolean;
	setIsScrolled: (isScrolled: boolean) => void;
}

const locales: LocaleProps = {
	en: { code: "en", title: "shared.locale.en", icon: "🌐" },
	es: { code: "es", title: "shared.locale.es", icon: "🌐" },
	fr: { code: "fr", title: "shared.locale.fr", icon: "🌐" },
	esCO: { code: "es-CO", title: "shared.locale.esCO", icon: "🇨🇴" },
	esAR: { code: "es-AR", title: "shared.locale.esAR", icon: "🇦🇷" },
};

// Función para obtener el tema inicial
const getInitialTheme = (): string => {
	// Primero intentamos obtener el tema del localStorage
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme) {
		return savedTheme;
	}

	// Si no hay tema guardado, verificamos la preferencia del sistema
	/*  if (
     window.matchMedia &&
     window.matchMedia('(prefers-color-scheme: dark)').matches
   ) {
     return 'dark';
   }
  */
	// Por defecto retornamos 'light'
	return "light";
};

const getInitialLanguage = () => {
	const savedLang = localStorage.getItem("i18nextLng");
	return savedLang || "es";
};

// Función para aplicar el tema al DOM
const applyTheme = (theme: string) => {
	document.querySelector("html")?.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);
};

const storeApi: StateCreator<GlobalState> = (set) => {
	// Obtenemos el tema inicial
	const initialTheme = getInitialTheme();
	const initialLanguage = getInitialLanguage();

	// Aplicamos el tema inicial
	applyTheme(initialTheme);

	return {
		tabs: [
			{
				id: 1,
				name: "homepage.herocontrol.code",
			},
			{
				id: 2,
				name: "homepage.herocontrol.plan",
			},
			{
				id: 3,
				name: "homepage.herocontrol.collaborate",
			},
			{
				id: 4,
				name: "homepage.herocontrol.automate",
			},
			{
				id: 5,
				name: "homepage.herocontrol.secure",
			},
		],
		activeTab: 1,
		setActiveTab: (id) => {
			set({ activeTab: id });
		},
		locales,
		localeSel: locales[initialLanguage],
		handleLanguageChange: (lang) => {
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
			localStorage.setItem("i18nextLng", lang);
			i18n.changeLanguage(locales[lang].code);
			set({ localeSel: locales[lang] });
		},
		theme: initialTheme,
		setTheme: (newTheme: string) => {
			set({ theme: newTheme });
			applyTheme(newTheme);
		},
		isSidebarOpen: false,
		setIsSidebarOpen: (isOpen: boolean) => {
			set({ isSidebarOpen: isOpen });
		},
		isScrolled: false,
		setIsScrolled: (isScrolled: boolean) => {
			set({ isScrolled });
		},
	};
};

export const useGlobalStore = create<GlobalState>()(
	persist(devtools(storeApi), { name: "global-storage" }),
);
