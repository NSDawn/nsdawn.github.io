// // // // // // // // // // // // // // // // 
//                                           // 
//  PREFABS!!!!!!!                           // 
//                                           // 
// // // // // // // // // // // // // // // // 

const PREFABS = [
    "pf_header",
];
const ASSETS_FOLDER = document.querySelector('script').getAttribute('data-assets-folder');
const SECTOR = document.querySelector('script').getAttribute('data-sector');

var prefabs_promises = [];

for (filename of PREFABS) {
    
    prefabs_promises.push(fetch(ASSETS_FOLDER + 'html/' + filename + ".html")
    .then(res => res.text())
    .then(text => {
    
    
    let redirected_text = text.replaceAll("_assets_file_path/", ASSETS_FOLDER);

    document.getElementById(filename).innerHTML = redirected_text;
    }))
    
}

const SFX_LIST = [];
const SFX = {};
for (let k = 0; k < SFX_LIST.length; k++) {
    const newSFX = new Audio(ASSETS_FOLDER + "sfx/" + SFX_LIST[k] + ".mp3")
    SFX[SFX_LIST[k]] = newSFX;
}

// // // // // // // // // // // // // // // // 
//                                           // 
//  LOCALIZATION                             // 
//                                           // 
// // // // // // // // // // // // // // // // 


function getDefualtLanguage() {
    var userLanguage = navigator.language;

    const languages = ["en", "ja", "es", "fr"];

    
    if (languages.includes(userLanguage.slice(0, 2))) {
        return userLanguage.slice(0, 2);
    }
    
    return "en";
}

function setLanguage(in_lang) {
    displayLanguage = in_lang;
    localStorage.setItem("displayLanguage", in_lang);
    location.reload();
}


var displayLanguage;

// Grab navigation Language
if (localStorage.getItem("displayLanguage") == null) {
    displayLanguage = getDefualtLanguage();
} else {
    displayLanguage = localStorage.getItem("displayLanguage");
}

// ON RENCONTRE SA DESTINÉE SOUVENT PAR LES CHEMINS QU’ON PREND POUR L’ÉVITER

let dataFilePath = ASSETS_FOLDER;
dataFilePath += "data/" + displayLanguage + ".json";


let LANG_DATA;

// Replace text with localized strings
// open file
Promise.all(prefabs_promises).then( (results) => {
    fetch(dataFilePath)
    .then(response => response.json())
    .then(DATA => {
    LANG_DATA = DATA;
    updateData(DATA);
    
    })
});

function updateData(in_data) {
    
    document.querySelector("html").setAttribute("lang", displayLanguage);
    for (sector of ["GLOBAL", SECTOR]) {
        for (let k in in_data[sector])  {
            if (k != "") {
                try {
                    document.getElementById(k).innerHTML = in_data[sector][k];
                } catch {
                    continue;
                }
            }
        }
    }
    
}

// // // // // // // // // // // // // // // // 
//                                           // 
//  SOME FUNCTIONS IG                        // 
//                                           // 
// // // // // // // // // // // // // // // // 

function copyToClipboard(in_text) {
     // Copy the text inside the text field
    navigator.clipboard.writeText(in_text);
  }
