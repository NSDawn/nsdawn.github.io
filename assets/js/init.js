// // // // // // // // // // // // // // // // 
//                                           // 
//  PREFABS!!!!!!!                           // 
//                                           // 
// // // // // // // // // // // // // // // // 

const PREFABS = [
    "pf_header", "pf_abyssheader",
];
const PREFABS_TO_INSERT = [];
const ASSETS_FOLDER = document.querySelector('script').getAttribute('data-assets-folder');
const SECTOR = document.querySelector('script').getAttribute('data-sector');



for (filename of PREFABS) {
    if( document.getElementById(filename) != null) {
        PREFABS_TO_INSERT.push(filename)
    }
    
}

var prefabs_promises = [];

for (filename of PREFABS_TO_INSERT) {
    
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


function copyToClipboard(in_text, notif= false) {

    navigator.clipboard.writeText(in_text);

    // fun notif stuff, animation
    if (notif) {
        let notifdiv = document.getElementsByClassName("copy_notif")[0]       
        if (!notifdiv.classList.contains('copy_notif_animation_running')){
            
            notifdiv.classList.add('copy_notif_animation_running');
            setTimeout(() => {
                notifdiv.classList.remove('copy_notif_animation_running');
            }, 2500);
        }
    }
}

// // // // // // // // // // // // // // // // 
//                                           // 
//  KONAMI CODE EASTER EGG                   // 
//                                           // 
// // // // // // // // // // // // // // // // 

let input_history = [];
const max_history_length = 20;
let konami_codes = [
    {
        seq: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
        link: "https://www.youtube.com/watch?v=U1dirHGODpM",
    },
    {
        seq: [83,85,83,83,89],
        link: "https://www.youtube.com/shorts/bdlXdO_u4sE",
    },
]
function logInput(event) {
    console.log(event.keyCode);
    input_history.push(event.keyCode);
    while (input_history.length > max_history_length) {
        input_history.shift()
    }
    for (let i = 0; i < konami_codes.length; i++) {
        if (containsSubsequence(input_history, konami_codes[i].seq)) {
            window.location.href = konami_codes[i].link;
        }
    }
    

}

document.addEventListener('keydown', logInput);

function containsSubsequence(mainArray, subArray) {

    let n = mainArray.length;
    if (n < subArray.length) return false;

    let subArrayIndex = 0;

    for (let i = 0; i < n; i++) {
      if (mainArray[i] === subArray[subArrayIndex]) {
        subArrayIndex++;
      }
      
      if (subArrayIndex === subArray.length) {
        return true; 
      }
    }
    
    return false; 
}

