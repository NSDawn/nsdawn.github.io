// // // // // // // // // // // // // // // // // // // //
// feature_lookup.js                                     //
// by N.S. Dawn                                          //
// A translation of previous python FeatureLookup.py     //
// // // // // // // // // // // // // // // // // // // //

// STUFF FOR INTERACTING WITH THE HTML (STOLEN FROM FEATURELOOKUP)
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
const CMD_LN = document.getElementsByClassName("command_line")[0];
const CONSOLE = document.getElementsByClassName("output_box")[0];
CONSOLE.scrollTop = CONSOLE.scrollHeight;
var currConsole = "";
var currIn = "";

function consolePrint(in_str = "", hasNewline = false) {
    let toPrint = String(in_str);
    currConsole += toPrint;
    if (hasNewline) {currConsole += "<br>"}
    CONSOLE.innerHTML = currConsole;
    saveConsole();
}

function consoleClear(save = true) {
    currConsole = "";
    CONSOLE.innerHTML = currConsole;
    if (save) {saveConsole()};
}

function saveConsole() {
    localStorage.setItem("yeetipa_console", currConsole);
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        //enterCmd();
    }
});

let previousStoredConsole = localStorage.getItem("yeetipa_console");
if (previousStoredConsole == null || previousStoredConsole == "") {
    consoleClear(save = true);
} else {
    consoleClear(save = false);
    consolePrint(localStorage.getItem("yeetipa_console"), hasNewline = false)
}

// REF!!
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
const REF_LOWERCASE = "qwertyuiopasdfghjklzxcvbnm";
const REF_UPPERCASE = "QWERTYUIOPASDFGHJKLZXCVBNM";

const CONSONANTS = [
    // NASAL
    "############",
    "mɱ#n#ɳ#ɲŋɴ##",
    //PLOSIVE
    "p##t#ʈ#ckqʡʔ",
    "b##d#ɖ#ɟgɢ##", 
    //FRICATIVE
    "ɸfθsʃʂɕçxχħh",
    "βvðzʒʐʑʝɣʁʕɦ",
    // APPROX
    "ʍ###########",
    "wʋ#ɹ#ɻɥjɰ###",
    // TAP
    "############",
    "#ⱱ#ɾ#ɽ######",
    //TRILL
    "#########ʜ##",
    "ʙ##r#ɽ###ʀʢ#",
    // LAFRIC
    "###ɬ########",
    "###ɮ########",
    // LAPPROX
    "############",
    "###l#ɭ#ʎʟ###",
];

VOWELS = [
    "iyɨʉɯu",
    "ɪʏ###ʊ",
    "eøɘɵɤo",
    "##ə###",
    "ɛœɜɞʌɔ",
    "æ#ɐ###",
    "aɶ##ɑɒ",
];



// STUFF FOR INTERACTING WITH THE HTML (STOLEN FROM FEATURELOOKUP)
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

setInterval(function tick() {
    currIn = CMD_LN.value;

    for (let c of REF_UPPERCASE) {
        currIn = currIn.replaceAll(c, c.toLowerCase() + c.toLowerCase())
    }

    CMD_LN.value = currIn;
    console.log(parse(currIn))
}, 500)

let CONS_LEN = 12;
let CONS_SIZE = 16;

function parse(exp) {
    if (exp.length < 2) {return "_"}
    let I = get_address(exp[1])[0];
    let J = get_address(exp[0])[1];

    for (let i in exp) {
        if (i < 2) {continue;}

        if ([",", "<"].includes(exp[i])) {
            let startJ = J;
            for (let i = 0; i < CONS_LEN; i++) {
                J = (J + CONS_LEN - 1) % CONS_LEN;
                if (CONSONANTS[I][J] == CONSONANTS[I][startJ]) {continue;};
                if (CONSONANTS[I][J] == "#") {continue;};
                break;
            }
        } else if ([">", "."].includes(exp[i])) {
            let startJ = J;
            for (let i = 0; i < CONS_LEN; i++) {
                J = (J + CONS_LEN + 1) % CONS_LEN;
                if (CONSONANTS[I][J] == CONSONANTS[I][startJ]) {continue;};
                if (CONSONANTS[I][J] == "#") {continue;};
                break;
            }
        } else if (["-", "_"].includes(exp[i])) {
            let startI = I;
            console.log(I);
            for (let i = 0; i < CONS_SIZE; i++) {
                console.log(I);
                I = (I + CONS_SIZE + 2) % CONS_SIZE;
                if (CONSONANTS[I][J] == CONSONANTS[startI][J]) {continue;};
                if (CONSONANTS[I][J] == "#") {continue;};
                break;
            }
        }
    }

    return (CONSONANTS[I][J]);
}


function get_address(c) {
    for (let i in CONSONANTS) {
        for (let j in CONSONANTS[i]) {
            if (CONSONANTS[i][j] == c) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}