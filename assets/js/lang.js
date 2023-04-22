/*
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

function _localize() {
    // Replace text with localized strings
    // open file
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
    });
}
*/

