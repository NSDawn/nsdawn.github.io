// // // // // // // // // // // // // // // // // // // //
// feature_lookup.js                                     //
// by N.S. Dawn                                          //
// A translation of previous python FeatureLookup.py     //
// // // // // // // // // // // // // // // // // // // //

// STUFF FOR INTERACTING WITH THE HTML
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
const CMD_LN = document.getElementsByClassName("command_line")[0];
const CONSOLE = document.getElementsByClassName("console")[0];
let COMMANDBOX = document.getElementsByClassName("command_box")[0];
COMMANDBOX.scrollTop = COMMANDBOX.scrollHeight;
var currConsole = "";

function consolePrint(in_str = "", hasNewline = true) {
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
    localStorage.setItem("feature_lookup_console", currConsole);
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        enterCmd();
    }
});

let previousStoredConsole = localStorage.getItem("feature_lookup_console");
if (previousStoredConsole == null) {
    consoleClear(save = true);
    consolePrintDefault()
} else {
    consoleClear(save = false);
    consolePrint(localStorage.getItem("feature_lookup_console"), hasNewline = false)
}




// DATA
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

var PHONDATA = {
    "i":"+++---+++000++++0--+--",
    "ɪ":"+++----++000++++0--+--",
    "u":"+++-+++++000++++0--+--",
    "ʊ":"+++-++-++000++++0--+--",
    "e":"++----+++000++++0--+--",
    "ɛ":"++-----++000++++0--+--",
    "o":"++--+++++000++++0--+--",
    "ɔ":"++--++-++000++++0--+--",
    "a":"++-++--++000++++0--+--",
    "ɑ":"++-++--++000++++0--+--",
    "æ":"++-+---++000++++0--+--",
    "y":"+++--++++000++++0--+--",
    "ʏ":"+++--+-++000++++0--+--",
    "ø":"++---++++000++++0--+--",
    "œ":"++---+-++000++++0--+--",
    "ɘ":"++--+--++000++++0--+--",
    "ʌ":"++--+--++000++++0--+--",
    "ɯ":"+++-+-+++000++++0--+--",
    "ɨ":"+++-+-+++000++++0--+--",
    "j":"-++---+++000++++0--+--",
    "w":"-++-+++++000++++0--+--",
    "ɥ":"-++--++++000++++0--+--",
    "m":"--000-0+--00-+--0-++--",
    "n":"--000-0+-++-----0-++--",
    //"n̪":"--000-0+-+++----0-++--",
    "ɳ":"--000-0+-+or ---0-++--",
    "ɲ":"--+---0+-+-++---0-++--",
    "ŋ":"--+-+-0+--00+---0-++--",
    "ɴ":"----+-0+--00+---0-++--",
    "l":"--000-0++++----+0+-+--",
    "ɭ":"--000-0+++-----+0+-+--",
    "ʎ":"--+---0+++-++--+0+-+--",
    "r":"--000-0++++----+0--+--",
    "ɽ":"--000-0+++-----+0--+--",
    "ʀ":"----+-0++-00+--+0--+--",
    //"t̪":"--000-0--+++or -------",
    //"d̪":"--000-0--+++or ----+--",
    "t":"--000-0--++or --------",
    "d":"--000-0--++or -----+--",
    "ʈ":"--000-0--+or ---or ---",
    "ɖ":"--000-0--+or ------+--",
    "s":"--000-0--++----++---+-",
    "z":"--000-0--++----++--+--",
    "ɬ":"--000-0--++----+-+--+-",
    "ɮ":"--000-0--++----+-+-+--",
    "θ":"--000-0--+++---+----+-",
    "ð":"--000-0--+++---+---+--",
    "ʃ":"--+---0--+-++--++---+-",
    "ʒ":"--+---0--+-++--++--+--",
    "c":"--+---0--+-++or ------",
    "ɟ":"--+---0--+-++or ---+--",
    "ç":"--+---0--+-++--+----+-",
    "ʝ":"--+---0--+-++--+---+--",
    "tʃ":"--+---0--+-++---+-----",
    "dʒ":"--+---0--+-++---+--+--",
    "ts":"--000-0--++-----+-----",
    "dz":"--000-0--++-----+--+--",
    "pf":"--000-0---00-+--+-----",
    "bv":"--000-0---00-+--+--+--",
    "p":"--000-0---00-+or -----",
    "b":"--000-0---00-+-----+--",
    "ɸ":"--000-0---00-+-+----+-",
    "β":"--000-0---00-+-+---+--",
    "f":"--000-0---00-+-++---+-",
    "v":"--000-0---00-+-++--+--",
    "k":"--+-+-0---00+or ------",
    "g":"--+-+-0---00+or ---+--",
    "x":"--+-+-0---00+--+----+-",
    "ɣ":"--+-+-0---00+--+---+--",
    "q":"----+-0---00+or ------",
    "ɢ":"----+-0---00+or ---+--",
    "χ":"----+-0---00+--++---+-",
    "ʁ":"----+-0---00+--++--+--",
    "ħ":"--000-0---00--++----+-",
    "ʕ":"--000-0---00--++---+--",
    "ʔ":"--000-0---00or ------+",
    "h":"--000-0---00---+----+-",
    "ɦ":"--000-0---00---+---++-",
}

const FEATURES = [
    "syllabic", "vocalic", "high", "low", "back", "round", "atr", "sonorant", "approximant", "coronal", "anterior", "distributed", "dorsal", "labial", "pharyngeal", "continuant", "strident", "lateral", "nasal", "voice", "aspirated", "glottalized"
]

const ABRV = [
    [" syll ", " syllabic "],
    [" voc ", " vocalic "],
    [" hi ", " high "],
    [" lo ", " low "],
    [" bk ", " back "],
    [" rd ", " round "],
    [" son ", " sonorant "],
    [" approx ", " approximant "],
    [" cor ", " coronal "],
    [" ant ", " anterior "],
    [" dist ", " distributed "],
    [" dor ", " dorsal "],
    [" lab ", " labial "],
    [" phar ", " pharyngeal "],
    [" cont ", " continuant "],
    [" str ", " strident "],
    [" lat ", " lateral "],
    [" nas ", " nasal "],
    [" lat ", " lateral "],
    [" voi ", " voice "],
    [" asp ", " aspirated "],
    [" glot ", " glottalized "] 
]

const CMD_ABRV = [
    ["c ", "clear "],
    ["con ", "contrast "],
    ["com ", "compare "],
    ["l ", "list "],
    ["h ", "help "],
    ["s ", "set "],
]

// BASIC FNS
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


// fn that converts string data as in PHONDATA into a dictionary based on FEATURES
function dict_convert(in_string) {
    let new_dict_entry = {};
    for (let i = 0; i < FEATURES.length; i ++) {
        new_dict_entry[FEATURES[i]] = in_string[i];
    }
    return new_dict_entry;
}
// do a sneaky sneaky convert of PHONDATA rn
for (let phoneme in PHONDATA) {
    PHONDATA[phoneme] = dict_convert(PHONDATA[phoneme]);
}

// fn that prints dicts 
function dict_print(in_dict) {
    
    for (const key in in_dict) {
        let outPrint = key + ": [" + in_dict[key] + "]";
        consolePrint(outPrint);
    }
}

// fn that interprets the cmd to be split
function cmd_parse(in_str) {
    let out_str = in_str.trim();
    out_str = out_str.toLowerCase();


    const erroneous_chars = [">", "<", "[", "]", "'", "$", "?", "{", "}"];
    for (let char of erroneous_chars) {
        out_str = out_str.replaceAll(char, "");
    }
    
    out_str += " ";
    
    for (let r of ABRV) {
        out_str = out_str.replaceAll(r[0], r[1]);
    }

    for (let r of CMD_ABRV) {
        if (out_str.startsWith(r[0])) {out_str = out_str.replace(r[0], r[1])}
    }

    out_str = out_str.trim();

    out_str = out_str.replaceAll(">", "").replaceAll("<", "") // replace erroneous syntax

    return out_str;
}

function consolePrintDefault() {
    consolePrint("Welcome to feature_lookup.js.");
    consolePrint("Type 'help' for help.");
}

// THE MAIN PART
// - - - - - - - - - - - - - - -

function enterCmd() {
    const user_input = CMD_LN.value.trim();
    if (user_input == "") {return;} // if there is nothing in the cmd line, do nothing.
    
    let parsed_user_input = cmd_parse(user_input);
    let cmd = parsed_user_input.split(" ");

    let interpreted_message = "";
    if (parsed_user_input != user_input) {
        interpreted_message = "* Interpreted: <span style='color:white;'>$ " + parsed_user_input + "</span>";
    }

    consolePrint()

    switch (cmd[0]) {
        case "clear":
            consoleClear();
            consolePrintDefault();
            break;
        
        case "help": 
            consolePrint("<span style='color:white;'>$ " + cmd[0] + "</span>");
            if (interpreted_message != "") {consolePrint(interpreted_message)};
            consolePrint("This program is a compliation of feature data for use in phonology. This is a specific version was edited for use with UCSC LING 101, Spring 2022, with Professor Jaye Padgett.")
            consolePrint("- - - - - - - - -")
            consolePrint("This program includes 4 basic functions, as follows:<br>")
            consolePrint("The 'list' function lists all items of a given type.<br>Usage: list<br>or --- list [phoneme]<br>or --- list [feature] {+/-/0}<br>")
            consolePrint("The 'compare' function lists the similar features of any amount of phonemes. <br>Usage: compare [phoneme1] [phomeme2] ...<br>")
            consolePrint("The 'contrast' function lists the different features of two phonemes. <br>Usage: contrast [phoneme1] [phomeme2]<br>")
            consolePrint("The 'clear' function clears the terminal.<br>Usage: clear")
            consolePrint("- - - - - - - - -")
            consolePrint("This program covers the basic phonemes provided by the chart, and does not include diacritics.")
            consolePrint("Type 'list' for a list of all phonemes in this program's dictionary.")
            consolePrint("Type 'advanced' for more advanced functionality.")
            break;
        
        case "advanced":
            consolePrint("<span style='color:white;'>$ " + cmd[0] + "</span>");
            if (interpreted_message != "") {consolePrint(interpreted_message)};
            consolePrint("The 'set' function allows the user to hold a certain subset of phonemes.")
            consolePrint("Simply typing 'set' will print the current set.")
            consolePrint("Phonemes can be added or deleted from the set.")
            consolePrint("The set can also be filtered to only phonemes of a specific feature.")
            consolePrint("Usage: set<br>or --- set clear<br>or --- set add [phoneme]<br>or --- set add [feature] {+/-/0}<br>or --- set add all<br>or --- set delete [phoneme]<br>or --- set delete [feature] {+/-/0}<br>or --- set filter [feature] {+/-/0}")
            break;
        
        case "list" : 
            if (cmd.length == 1) {
                consolePrint("<span style='color:white;'>$ " + user_input + "</span>");
                if (interpreted_message != "") {consolePrint(interpreted_message)};
                let i = 0;
                let formatted_result = ""
                for (let entry in PHONDATA) {
                    i += 1;
                    formatted_result += entry;
                    formatted_result += (i % 8 != 0)? " " : "<br>";
                }
                consolePrint(formatted_result, hasNewline = (i % 8 != 0))
            }  else if (cmd.length == 2) {
                if (cmd[1] in PHONDATA) {
                    consolePrint("<span style='color:white;'>$ " + user_input + "</span>");
                    if (interpreted_message != "") {consolePrint(interpreted_message)};
                    dict_print(PHONDATA[cmd[1]]);
                } else if (FEATURES[cmd[1]] !== null) {
                    consolePrint("<span style='color:red;'>? " + user_input + "</span>");
                    if (interpreted_message != "") {consolePrint(interpreted_message)};
                    consolePrint("Feature value must be specified as +, -, or 0.");
                    consolePrint("Usage: list<br>or --- list [phoneme]<br>or --- list [feature] {+/-/0}");
                } else {
                    consolePrint("<span style='color:red;'>? " + user_input + "</span>");
                    if (interpreted_message != "") {consolePrint(interpreted_message)};
                    consolePrint("Phoneme '" + cmd[1] + "' not found.");
                    consolePrint("Usage: list<br>or --- list [phoneme]<br>or --- list [feature] {+/-/0}");
                }
            } else if (cmd.length == 3) {
                if (FEATURES[cmd[1]] != null) {
                    if (["+", "-", "0"].includes(cmd[2])) {
                        consolePrint("<span style='color:white;'>$ " + user_input + "</span>");
                        if (interpreted_message != "") {consolePrint(interpreted_message)};
                        let i = 0;
                        let formatted_result = ""
                        for (let entry in PHONDATA) {
                            if (PHONDATA[entry][cmd[1]] == cmd[2]) {
                                i += 1;
                                formatted_result += entry;
                                formatted_result += (i % 8 != 0)? " " : "<br>";
                            }
                        }
                        consolePrint(formatted_result, hasNewline = (i % 8 != 0));
                    } else {
                        consolePrint("<span style='color:red;'>? " + user_input + "</span>");
                        if (interpreted_message != "") {consolePrint(interpreted_message)};
                        consolePrint("Feature value must be specified as +, -, or 0.");
                        consolePrint("Usage: list<br>or --- list [phoneme]<br>or --- list [feature] {+/-/0}");
                    }
                } else {
                    consolePrint("<span style='color:red;'>? " + user_input + "</span>");
                    if (interpreted_message != "") {consolePrint(interpreted_message)};
                    consolePrint("Feature '" + cmd[1] + "' not found.");
                    consolePrint("Usage: list<br>or --- list [phoneme]<br>or --- list [feature] {+/-/0}");
                }

            } else {
                consolePrint("<span style='color:red;'>? " + user_input + "</span>");
                if (interpreted_message != "") {consolePrint(interpreted_message)};
                consolePrint("Usage: list<br>or --- list [phoneme]<br>or --- list [feature] {+/-/0}");
            }
            break;
        
        case "compare": 
            if (cmd.length > 2) {
                
                let f = true;

                for (let phone of cmd.slice(1)) {
                    if (PHONDATA[phone] == null) {
                        consolePrint("<span style='color:red;'>? " + user_input + "</span>");
                        if (interpreted_message != "") {consolePrint(interpreted_message)};
                        consolePrint("One or more phonemes not found or invalid.");
                        consolePrint("Usage: compare [phoneme1] [phomeme2] ...");
                        f = false;
                        break
                    }
                }

                if (f) {
                    consolePrint("<span style='color:white;'>$ " + user_input + "</span>");
                    if (interpreted_message != "") {consolePrint(interpreted_message)};

                    let compare_dict = {};
                    for (let entry in PHONDATA[cmd[1]]) {
                        let isShared = true;
                        for (let phone of cmd.slice(1)) {
                            if (PHONDATA[cmd[1]][entry] != PHONDATA[phone][entry]) {
                                isShared = false;
                                break
                            }
                        }
                        if (isShared) {
                            compare_dict[entry] = PHONDATA[cmd[1]][entry];
                        }
                    }
                    if (compare_dict.length === 0) {
                        consolePrint("No similarities were found.");
                    } else {
                        dict_print(compare_dict);
                    }
                } 

            } else {
                consolePrint("<span style='color:red;'>? " + user_input + "</span>");
                if (interpreted_message != "") {consolePrint(interpreted_message)};
                consolePrint("Usage: compare [phoneme1] [phomeme2] ...");

            }
            break;
        
        case "contrast" :
            if (cmd.length === 3) {
                let f = true;
                for (let phone of cmd.slice(1)) {
                    if (PHONDATA[phone] == null) {
                        consolePrint("<span style='color:red;'>? " + user_input + "</span>");
                        if (interpreted_message != "") {consolePrint(interpreted_message)};
                        consolePrint("One or more phonemes not found or invalid.");
                        consolePrint("Usage: contrast [phoneme1] [phomeme2]");
                        f = false;
                        break
                    }
                }

                if (f) {
                    consolePrint("<span style='color:white;'>$ " + user_input + "</span>");
                    if (interpreted_message != "") {consolePrint(interpreted_message)};

                    let contrast_dict = {};
                    for (let entry in PHONDATA[cmd[1]]) {
                        let isShared = PHONDATA[cmd[1]][entry] == PHONDATA[cmd[2]][entry];
                        if (!isShared) {
                            contrast_dict[entry] = PHONDATA[cmd[1]][entry] + "/" + PHONDATA[cmd[2]][entry];
                        }
                    }
                    if (contrast_dict.length === 0) {
                        consolePrint("No distinctions were found.");
                    } else {
                        dict_print(contrast_dict);
                    }
                } 
            } else {
                consolePrint("<span style='color:red;'>? " + user_input + "</span>");
                if (interpreted_message != "") {consolePrint(interpreted_message)};
                consolePrint("Usage: contrast [phoneme1] [phomeme2]");
            }
            break;

        case "set": 
            consolePrint("<span style='color:red;'>? " + user_input + "</span>");
            if (interpreted_message != "") {consolePrint(interpreted_message)};
            consolePrint("Support for command 'set' is currently in-progress.");
            break
        default:
            consolePrint("<span style='color:red;'>? " + user_input + "</span>");
            consolePrint("Command '" + cmd[0] + "' was not understood.")
            break;
    }
    
    COMMANDBOX.scrollTop = COMMANDBOX.scrollHeight;
    CMD_LN.value = ""
}