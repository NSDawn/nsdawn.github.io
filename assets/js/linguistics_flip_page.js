const LING_TITLE = document.getElementsByClassName("ling_mainbox_title")[0];
const LING_DESC = document.getElementsByClassName("ling_mainbox_text")[0];
const LING_ICON = document.getElementsByClassName("ling_mainbox_icon icon")[0];
const LING_LINK = document.getElementsByClassName("ling_mainbox_go_link")[0];
const LING_MAINBOX = document.getElementsByClassName("ling_mainbox")[0]

const LING_LINKS_REF = {
    "LINGUISTICS/PROJECTS_1": "tamil_liquids",
    "LINGUISTICS/PROJECTS_2": "japanese_vowels",
    "LINGUISTICS/PROJECTS_3": "feature_lookup",
}

if (LING_MAINBOX != null) {setTimeout(function() {LING_MAINBOX.classList.remove('quickspin');}, 505) }
let curr_ling_page = 'LINGUISTICS/PROJECTS_1'
function lingFlipPage(idname) {
    if (idname == curr_ling_page) return;
    curr_ling_page = idname;
    LING_TITLE.id = idname + "_TITLE";
    LING_DESC.id = idname + "_DESC";
    LING_ICON.src = "../assets/img/icon/" + idname + ".png";
    LING_LINK.href = LING_LINKS_REF[idname];
    LING_MAINBOX.classList.add('quickspin');
    setTimeout(function() {LING_MAINBOX.classList.remove('quickspin');}, 505)
    updateData(LANG_DATA);
}


const FEATURE_LOOKUP_LINKS_REF = {
    "LINGUISTICS/FEATURE_LOOKUP_1": {
        "name": "feature_lookup_2022",
        "color": "rgb(0, 235, 67)",
    },
    "LINGUISTICS/FEATURE_LOOKUP_2": {
        "name": "feature_lookup_hayes_2005",
        "color": "rgb(69, 140, 255)",
    }
}


try {featureLookupInit()} catch {}
function featureLookupInit() {

    let idname = localStorage.getItem("feature_lookup_selection")
    if (idname == null) {idname = "LINGUISTICS/FEATURE_LOOKUP_1"}

    const FL_CONSOLE = document.getElementsByClassName("console")[0];
    FL_CONSOLE.style.setProperty("color", FEATURE_LOOKUP_LINKS_REF[idname]["color"]);
    FL_CONSOLE.style.setProperty("border-color", FEATURE_LOOKUP_LINKS_REF[idname]["color"]);

    const oldScriptElement = document.getElementsByClassName("feature_lookup")[0];
        if (oldScriptElement != null) {
            oldScriptElement.remove()
    
            const scriptElement = document.createElement('script');
            scriptElement.setAttribute('src', "../../assets/js/" + FEATURE_LOOKUP_LINKS_REF[idname]["name"] + ".js");
            scriptElement.setAttribute('type', 'text/javascript');
            document.head.appendChild(scriptElement);
        }
        
}

function lingFeatureLookupFlipPage(idname) {
    localStorage.setItem("feature_lookup_selection", idname);
    location.reload()
}

