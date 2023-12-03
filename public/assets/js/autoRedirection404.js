function main() {
    const [preferredLang, defaultLang] = tryRedirect();
    internationalizeUsingVanillaJS(preferredLang, defaultLang);
}
function tryRedirect() {
    const _DATA = JSON.parse(document.querySelector('._data').textContent);
    const URL_LIST = _DATA.url_list;
    const SUPPORTED_LANGS = _DATA.supported_langs;
    const PATHNAME = cleanPathname(location.pathname);
    const PREFERRED_LANG = getPreferredLang(SUPPORTED_LANGS);
    // custom js i18n bc astro won't work here
    const defaultLang = "en";

    // redirect if the pathname is valid but language unspecified.
    if (URL_LIST.includes(PATHNAME)) {
        location.replace(`https://nsdawn.dev/${PREFERRED_LANG}${PATHNAME}`);
    } 

    return [PREFERRED_LANG, defaultLang];
}

function internationalizeUsingVanillaJS(preferredLang, defaultLang) {
    console.log(preferredLang, defaultLang)
    const i18n = {
        ".h2-404": {
        "en": "uh oh!",
        "es": "¡ay caramba!",
        "fr": "zut alors!",
        "ja": "あっ、しまった！",
        },
        ".h3-404": {
        "en": "you were redirected here :(",
        "es": "parece que usted fue redirigido aquí :(",
        "fr": "il semble que vous avez été redirigé(e) vers ici :(",
        "ja": "ココへ転送いたしたようです。",
        },
        ".explanation-404": {
        "en": "ERROR 404: it is likely that the page you are looking for is at a different URL, or does not exist.",
        "es": "ERROR 404: es probable que la página que estás buscando se encuentre en una URL diferente o que no exista.",
        "fr": "ERREUR 404: il est probable que la page que vous recherchez se trouve à une URL différente ou n'existe pas.",
        "ja": "エラー４０４：多分、お探しのページは、異なるURLにあるか、存在しない可能性があります。",
        }
    }

    for (let entry in i18n) {
        const elem = document.querySelector(entry);
        if (elem) elem.textContent = i18n[entry][preferredLang] ?? i18n[entry][defaultLang];
    }
}

function getPreferredLang(supportedLangs) {
    return getPreferredLangViaLocalStorage(supportedLangs) ?? getPreferredLangViaNavigator(supportedLangs);
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

function cleanPathname(pathname) {

    if (pathname === "/") return "/home";

    const toRepl = [
        ["_", "-"], 
    ]

    return ( toRepl.reduce((acc_string, v) => {
        return acc_string.replaceAll(v[0], v[1]);
        }, pathname)
    );
}

main();