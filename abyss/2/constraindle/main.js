/*  main.js -- constraintdle
*   nishant suria (ns dawn)
*   hahabrrrrrrrrrrrr
*/


// game logic -----------------------
const COND_TABLE = [ 
    {
        0 : "****%%%Y",
        1 : "EEEEEEEQQQ****",
        2 : "EEEEEbcdfghjklmnprstvwxyz*****",
        3 : "QQQabcdefghijklmnoprstuvwxyz*****",
        4 : "abdefhklmnoprstuw****",
    },
    {
        0 : "[]",
        1 : "[]>",
        2 : "[]&&&>>>",
        3 : "[]&&&>>>",
        4 : "[]&&&>>>",
    },


]

let WORDS;
function readWords() {
    fetch('words.txt')
        .then(response => response.text())
        .then(fileContents => {
            WORDS = fileContents.split('\n');
            main()
        })
        .catch(error => {
            console.log('Error:', error);
            return;
    });
}
readWords();



function randCondition() {
    let out_cond = "";
    while (1) {
        out_cond = "";
        for (let i = 0; i < 5; i++) {
            let l = randInt(COND_TABLE[0][i].length);
            out_cond += COND_TABLE[0][i][l];
        }
        let extra_conds = randInt(1) + 1;
        for (let i = 0; i < extra_conds; i++) {
            let char_to_change = randInt(5);
            
            let extra_cond_to_add = COND_TABLE[1][char_to_change][randInt(COND_TABLE[1][char_to_change].length)]
            while (out_cond.includes(extra_cond_to_add)) {
                extra_cond_to_add = COND_TABLE[1][char_to_change][randInt(COND_TABLE[1][char_to_change].length)]
            }

            out_cond = replaceChar(out_cond, char_to_change, extra_cond_to_add);

        }
        
        let wordsValid = findWords(out_cond);
        if (wordsValid.length == 3) {break;}
    }
    return out_cond;
}

function findWords(in_str) {
    if (in_str.length !== 5) {
        console.log("conditions invalid")
        return false;
    }

    let foundWords = [];

    const n = WORDS.length;
    for (let i = 0; i < n; i++) {
        let f = true;
        for (let j = 0; j < 5; j++) {
            if (!checkCond(WORDS[i], j, in_str[j])) {
                f = false; break;
            }
        }
        if (f) {
            foundWords.push(WORDS[i])
        }
    }

    return foundWords;

}

function checkCond(in_str, in_idx, in_cond) {

    if ("abcdefghijklmnopqrstuvwxyz".includes(in_cond)) {
        return (in_str[in_idx] == in_cond);
    }

    switch (in_cond) {
        case "*":
            // * = any
            return true;
        case "&":
            // & = copy previous letter
            return in_str[in_idx] == in_str[in_idx -1]
        case ">":
            // > = subsequent of previous letter
            return in_str[in_idx] == getNextLetter(in_str[in_idx -1])
        case "E": 
            // E = among most common letters : ETARIO
            return "etario".includes(in_str[in_idx])
        case "Q": 
            // Q = among least common letters : KVXJZQ
            return "kvxjzq".includes(in_str[in_idx])
        case "]":
            // ] = the last letter alphabetically among the letters
            for (let i = 0; i < 5; i++) {
                if (in_str[in_idx] < in_str[i]) {
                    return false;
                }
            } return true;
        case "[":
            // [ = the first letter alphabetically among the letters
            for (let i = 0; i < 5; i++) {
                if (in_str[i] == " ") continue;
                if (in_str[in_idx] > in_str[i]) {
                    return false;
                }
            } return true;
        case "%": 
            // % = * but no repeats
            let used_letters = []
            for (let i = 0; i < 5; i++) {
                if (used_letters.includes(in_str[i])) {
                    return false;
                } 
                if (in_str[i] == " ") continue;
                used_letters.push(in_str[i])
            } return true;
        case "Y": 
            // Y = * but no vowels
            for (let i = 0; i < 5; i++) {
                if ("aeiou".includes(in_str[i])) return false;
            } return true;
        
    }
}

function getNextLetter(letter) {
    if (letter === "z") return "a";
    const nextCharCode = letter.charCodeAt(0) + 1;
    return String.fromCharCode(nextCharCode);
}

function randInt(in_int) {
    return Math.floor(Math.random() * in_int);
}

function replaceChar(str, index, newChar) {
    if (index < 0 || index >= str.length) return str; 
    
    const modifiedString = str.slice(0, index) + newChar + str.slice(index + 1);
    return modifiedString;
}


// running in browser -----------------------

const CONSTRAINT_NAMES = {
    "*": ["*", "any"],
    "%": ["*!", "any<br><br>+ no repeat letters in the word"],
    "Y": ["*!", "any<br><br>+ no {a, e, i, o, u} present in the word"],
    ">": ["->>", "next letter alphabetically"] ,
    "&": ["->&", "same letter"],
    "E": ["etario", "{e,t,a,r,i,o}"],
    "Q": ["kvxjzq", "{k,v,x,j,z,q}"],
    "[": ["[a...", "alphabetically first among letters in the word"],
    "]": ["...z]", "alphabetically last among letters in the word"],
    "a": ["a", "{a}"],
    "b": ["b", "{b}"],
    "c": ["c", "{c}"],
    "d": ["d", "{d}"],
    "e": ["e", "{e}"],
    "f": ["f", "{f}"],
    "g": ["g", "{g}"],
    "h": ["h", "{h}"],
    "i": ["i", "{i}"],
    "j": ["j", "{j}"],
    "k": ["k", "{k}"],
    "l": ["l", "{l}"],
    "m": ["m", "{m}"],
    "n": ["n", "{n}"],
    "o": ["o", "{o}"],
    "p": ["p", "{p}"],
    "q": ["q", "{q}"],
    "r": ["r", "{r}"],
    "s": ["s", "{s}"],
    "t": ["t", "{t}"],
    "u": ["u", "{u}"],
    "v": ["v", "{v}"],
    "w": ["w", "{w}"],
    "x": ["x", "{x}"],
    "y": ["y", "{y}"],
    "z": ["z", "{z}"],
}

let CONDITION = ""
const ELEMS_COND = document.getElementsByClassName("cond_card")
const ELEMS_COND_TEXT = document.getElementsByClassName("cond_text")
const ELEMS_COND_SUBTEXT = document.getElementsByClassName("cond_subtext")
const ELEM_INPUT = document.getElementsByClassName("text_input")[0]
const ELEM_TEXT_SHARE = document.getElementsByClassName("text_share_box")[0]
const ELEM_SHARE_CHECK_INPUT = document.getElementsByClassName("check_input")[0]
const ELEM_RESULTS_BOX = document.getElementsByClassName("results_box")[0]

let SOLUTIONS = []
let SOLVED_SOLUTIONS = ["", "", ""]
let daily_progress = (localStorage.getItem("constraindle_daily_progress") ?? (getFormattedDate() + "-000")).split("-")


function init() {
    const formattedDate = getFormattedDate();
    CONDITION = DAILY_PUZZLE[formattedDate];
    SOLUTIONS = findWords(CONDITION);
    document.addEventListener("keydown", function() {setTimeout(draw, 10)})
    document.addEventListener("click", function() {setTimeout(draw, 10)})
    if (daily_progress[0] != getFormattedDate()) {
        daily_progress =  (getFormattedDate() + "-000").split("-")
    }
    setShareBox()
    draw()
}
function main() {
    init()
    for (let i = 0; i < 5; i++) {
        ELEMS_COND_TEXT[i].innerHTML = CONSTRAINT_NAMES[CONDITION[i]][0] 
        ELEMS_COND_SUBTEXT[i].innerHTML = "<br>" + CONSTRAINT_NAMES[CONDITION[i]][1]
    }
}

function draw() {
    let guess = ELEM_INPUT.value;
    guess = sanitizeGuess(guess)

    ELEM_INPUT.classList.remove("red_underline")   
    if (guess.length == 5) {
        if (!WORDS.includes(guess)) {
            ELEM_INPUT.classList.add("red_underline")
        }
    } 

    let _guess = ""
    for (let i = 0; i < 5; i ++) {
        _guess += guess[i] ?? " "
    }


    for (let i = 0; i < 5; i++) {
        if (_guess[i] === " ") {
            ELEMS_COND[i].classList.remove("red")
            ELEMS_COND[i].classList.remove("green")
        } else if (checkCond(_guess, i, CONDITION[i])) {
            ELEMS_COND[i].classList.remove("red")
            ELEMS_COND[i].classList.add("green")
        } else {
            ELEMS_COND[i].classList.add("red")
            ELEMS_COND[i].classList.remove("green")
        }
    }


    if (SOLUTIONS.includes(_guess)){
        if (daily_progress[1][SOLUTIONS.indexOf(_guess)] == "0") {
            daily_progress[1] = replaceChar(daily_progress[1], SOLUTIONS.indexOf(_guess), "1");
            setShareBox()
            setTimeout(draw, 100)
            guess = ""
        }

    }
    
    ELEM_RESULTS_BOX.style.display = (daily_progress[1] == "000") ? "none" : "block";

    ELEM_INPUT.value = guess;
    
    localStorage.setItem("constraindle_daily_progress", daily_progress.join("-"))
}

const allowed_chars = "abcdefghijklmnopqrstuvwxyz"
function sanitizeGuess(guess) {
    let output = guess
        .slice(0, 5)
        .toLowerCase();

    let _output = ""
    for (let i = 0; i < output.length; i++) {
        if (allowed_chars.includes(output[i])) {
            _output += output[i]
        }
    }  
    return _output
}


function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const day = currentDate.getDate();
    return `${year}/${month}/${day}`;
}


// daily puzzles -----------------------

let DAILY_PUZZLE = {
    "2023/6/20": "%>Et*",
    "2023/6/21": "*[*he",
    "2023/6/22": "**EQ>",
    "2023/6/23": "***]b",
    "2023/6/24": "*E>n*",
    "2023/6/25": "***&f",
    "2023/6/26": "*[f*r",
    "2023/6/27": "%>E*m",
    "2023/6/28": "]Eg*n",
    "2023/6/29": "**[sm",
    "2023/6/30": "*E[b*",
    "2023/6/31": "]*g*l",
    "2023/7/1": "*Q[*l",
    "2023/7/2": "]Ed*o",
    "2023/7/3": "]*Ein",
    "2023/7/4": "*E*f[",
    "2023/7/5": "[Ewe*",
    "2023/7/6": "]*Ead",
    "2023/7/7": "*E*]k",
    "2023/7/8": "***y*",
    "2023/7/9": "[E*de",
    "2023/7/10": "%>>[*",
    "2023/7/11": "[Erse",
    "2023/7/12": "%*]*m",
    "2023/7/13": "*EQa*",
    "2023/7/14": "EQEEt",
    "2023/7/15": "%>*ve",
    "2023/7/16": "*E*&k",
    "2023/7/17": "**>&]",
    "2023/7/18": "%[tu*",
    "2023/7/19": "]*Ear",
    "2023/7/20": "EEEeE",
    "2023/7/21": "[>*&*",
    "2023/7/22": "",
    "2023/7/23": "",
    "2023/7/24": "",
    "2023/7/25": "",
    


}

let share_mode_hidden = true;
function setShareBox() {
    for (let i = 0; i < SOLVED_SOLUTIONS.length; i++) {
        if (daily_progress[1][i] == "1") {
            SOLVED_SOLUTIONS[i] = SOLUTIONS[i] + "\n"
        }
    }

    let share_box_text = `constraindle ${getFormattedDate()}\n${CONDITION}\n`

    if (share_mode_hidden) {
        for (let i = 0; i < SOLVED_SOLUTIONS.length; i++) {
            if (SOLVED_SOLUTIONS[i] != "") {
                share_box_text += "#####\n"
            }
        }
    } else {
        share_box_text += `${SOLVED_SOLUTIONS[0]}${SOLVED_SOLUTIONS[1]}${SOLVED_SOLUTIONS[2]}`;
    }
    
    if (ELEM_TEXT_SHARE.innerHTML != share_box_text) {
        ELEM_TEXT_SHARE.innerHTML = share_box_text;
    } 
    
}

function flipShareMode() {
    share_mode_hidden = !share_mode_hidden;
    setShareBox();
    if (share_mode_hidden) {
        ELEM_SHARE_CHECK_INPUT.innerHTML = "[ ]"
    } else {
        ELEM_SHARE_CHECK_INPUT.innerHTML = "[✕]"
    }
}

function copyResultToClipboard() {
      // Select the text field
        ELEM_TEXT_SHARE.select();
        ELEM_TEXT_SHARE.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(ELEM_TEXT_SHARE.innerHTML);

}
