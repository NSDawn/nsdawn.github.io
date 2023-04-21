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

// Grab navigation Language
// const userLanguage = navigator.language || navigator.userLanguage;
var userLanguage = "en-US";
var displayLanguage = "en"
// ON RENCONTRE SA DESTINÉE SOUVENT PAR LES CHEMINS QU’ON PREND POUR L’ÉVITER

let dataFilePath = ASSETS_FOLDER;

if (userLanguage.startsWith("en")) { 
    dataFilePath += "data/en.json";
    displayLanguage = "en";
} 
else if (userLanguage.startsWith("ja")) {
    dataFilePath += "data/ja.json";
    displayLanguage = "ja";
} else {
    dataFilePath += "data/en.json";
    displayLanguage = "en";
}


let LANG_DATA;

// Replace text with localized strings
// open file
Promise.all(prefabs_promises).then( (results) => {
    fetch(dataFilePath)
    .then(response => response.json())
    .then(DATA => {
    LANG_DATA = DATA;
    for (let k in DATA)  {
        if (k != "") {
            try {
                document.getElementById(k).innerHTML = DATA[k];
            } catch {
                continue;
            }
                
            }
        }
    })
});

// // // // // // // // // // // // // // // // 
//                                           // 
//  SOME FUNCTIONS IG                        // 
//                                           // 
// // // // // // // // // // // // // // // // 

function copyToClipboard(in_text) {
     // Copy the text inside the text field
    navigator.clipboard.writeText(in_text);
  }