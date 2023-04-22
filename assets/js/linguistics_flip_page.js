const LING_TITLE = document.getElementsByClassName("ling_mainbox_title")[0];
const LING_DESC = document.getElementsByClassName("ling_mainbox_text")[0];
const LING_ICON = document.getElementsByClassName("ling_mainbox_icon icon")[0];

function lingFlipPage(idname) {
    LING_TITLE.id = idname + "_TITLE";
    LING_DESC.id = idname + "_DESC";
    LING_ICON.src = "../assets/img/icon/" + idname + ".png";
    updateData(LANG_DATA);
}

