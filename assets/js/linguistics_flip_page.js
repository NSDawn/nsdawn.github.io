const LING_TITLE = document.getElementsByClassName("ling_mainbox_title")[0];
const LING_DESC = document.getElementsByClassName("ling_mainbox_text")[0];
const LING_ICON = document.getElementsByClassName("ling_mainbox_icon icon")[0];
const LING_LINK = document.getElementsByClassName("ling_mainbox_go_link")[0];

const LING_LINKS_REF = {
    "LINGUISTICS/PROJECTS_1": "tamil_liquids",
    "LINGUISTICS/PROJECTS_2": "japanese_vowels",
    "LINGUISTICS/PROJECTS_3": "feature_lookup",
}
function lingFlipPage(idname) {
    LING_TITLE.id = idname + "_TITLE";
    LING_DESC.id = idname + "_DESC";
    LING_ICON.src = "../assets/img/icon/" + idname + ".png";
    LING_LINK.href = LING_LINKS_REF[idname];
    updateData(LANG_DATA);
}

