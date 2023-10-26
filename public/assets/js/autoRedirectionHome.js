function main() {
    tryRedirect();
}
function tryRedirect() {
    const SUPPORTED_LANGS = ["en", "ja", "fr", "es"];

    // redirect if no localStorage language is preset.
    if (!getPreferredLangViaLocalStorage(SUPPORTED_LANGS)) {
        const l = getPreferredLangViaNavigator(SUPPORTED_LANGS)
        localStorage.setItem("preferred-navigation-language", l);
        location.replace(`/${l}`);
    } 

}

function getPreferredLangViaNavigator(supportedLangs) {
const defaultLang = "en";

    if (Intl && Intl.Locale) {
        let navLanguages = navigator.languages.map(
            (localeStr) => new Intl.Locale(localeStr).language
        );

        for (let language of navLanguages) {
            if (supportedLangs.includes(language)) return language;
        }
    }
    return defaultLang;
}

function getPreferredLangViaLocalStorage(supportedLangs) {
    const l = localStorage.getItem("preferred-navigation-language");
    if (supportedLangs.includes(l)) return l;
    return null;
}



main();