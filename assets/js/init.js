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
const userLanguage = "en-US";
// ON RENCONTRE SA DESTINÉE SOUVENT PAR LES CHEMINS QU’ON PREND POUR L’ÉVITER

let dataFilePath = ASSETS_FOLDER;

if (userLanguage.startsWith("en")) { 
    dataFilePath += "data/en.json";
} 
else if (userLanguage.startsWith("ja")) {
    dataFilePath += "data/ja.json";
} else {
    dataFilePath += "data/en.json";
}




// Replace text with localized strings
// open file
Promise.all(prefabs_promises).then( (results) => {
    fetch(dataFilePath)
    .then(response => response.json())
    .then(DATA => {
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

