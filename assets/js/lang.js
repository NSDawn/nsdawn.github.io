 // Grab navigation Language
// const userLanguage = navigator.language || navigator.userLanguage;
const userLanguage = "en-US";
// ON RENCONTRE SA DESTINÉE SOUVENT PAR LES CHEMINS QU’ON PREND POUR L’ÉVITER


let dataFilePath;
if (userLanguage.startsWith("en")) {
    dataFilePath = "assets/data/en.json";
} 
if (userLanguage.startsWith("ja")) {
    dataFilePath = "assets/data/ja.json";
} else {
    dataFilePath = "assets/data/en.json";
}

// Replace text with localized strings
// open file
fetch(dataFilePath)
    .then(response => response.json())
    .then(DATA => {
        for (let k in DATA)  {
            if (k != "") {
                document.getElementById(k).innerHTML = DATA[k];
            }
        }
});

