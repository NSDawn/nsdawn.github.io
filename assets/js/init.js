// // // // // // // // // // // // // // // // 
//                                           // 
//  PREFABS!!!!!!!                           // 
//                                           // 
// // // // // // // // // // // // // // // // 

const PREFABS = [
    "pf_header",
];
const ASSETS_FOLDER = document.querySelector('script').getAttribute('data-assets-folder');

var prefabs_promises = [];

for (filename of PREFABS) {
    
    prefabs_promises.push(fetch(ASSETS_FOLDER + 'html/' + filename + ".html")
    .then(res => res.text())
    .then(text => {
    
    
    let redirected_text = text.replaceAll("_assets_file_path/", ASSETS_FOLDER);

    document.getElementById(filename).innerHTML = redirected_text;
    }))
    
}

// // // // // // // // // // // // // // // // 
//                                           // 
//  LOCALIZATION                             // 
//                                           // 
// // // // // // // // // // // // // // // // 

function getDefualtLanguage() {
    var userLanguage = navigator.language;
    if (userLanguage.startsWith("en")) { return "en";} 
    if (userLanguage.startsWith("ja")) { return "ja";} 
    if (userLanguage.startsWith("es")) { return "es";} 
    if (userLanguage.startsWith("fr")) { return "fr";} 
    
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
    
    for (let k in in_data)  {
        if (k != "") {
            try {
                document.getElementById(k).innerHTML = in_data[k];
            } catch {
                continue;
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