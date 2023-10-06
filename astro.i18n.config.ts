import { defineAstroI18nConfig } from "astro-i18n";

export default defineAstroI18nConfig({
	defaultLangCode: "en",
	supportedLangCodes: ["es", "fr", "ja"],
	showDefaultLangCode: true,
	translations: {
		en: "src/i18n/en.json",
		es: "src/i18n/es.json",
		ja: "src/i18n/ja.json",
		fr: "src//i18n/fr.json",
	},
	routeTranslations: {},
})