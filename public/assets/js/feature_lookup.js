// // // // // // // // // // // // // // // // // // // //
// feature_lookup.js                                     //
// by N.S. Dawn                                          //
// A translation of previous python FeatureLookup.py     //
// // // // // // // // // // // // // // // // // // // //

/*
* an apology to any reader of this nonsense. 
* i am refactoring this code in october 2023 and facing how terrible this code is. 
* oops.
* please feel free to take the data from here and write better code.
*/

// STUFF FOR INTERACTING WITH THE HTML
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
const CMD_LN = document.getElementsByClassName("command_line")[0];
const CONSOLE = document.getElementsByClassName("console")[0];
let COMMANDBOX = document.getElementsByClassName("command_box")[0];
COMMANDBOX.scrollTop = COMMANDBOX.scrollHeight;
var currConsole = "";
let version = "feature_lookup_hayes_2005"; // "feature_lookup_hayes_2005"

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
    localStorage.setItem(`${version}_console`, currConsole);
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        enterCmd();
    }
});

function featureLookupInit() {
    let selected_version = localStorage.getItem("feature_lookup_selection") ?? version;
    version = selected_version;
    PHONSET = {};
    CONSOLE.classList.remove("feature_lookup_2022");
    CONSOLE.classList.remove("feature_lookup_hayes_2005");
    CONSOLE.classList.add(version);

    localStorage.setItem("feature_lookup_selection", version);

    let previousStoredConsole = localStorage.getItem(`${version}_console`);
    if (previousStoredConsole == null || previousStoredConsole == "") {
        consoleClear(save = true);
        consolePrintDefault(version)
    } else {
        consoleClear(save = false);
        consolePrint(localStorage.getItem(`${version}_console`), hasNewline = false)
    }
}
featureLookupInit();

function changeSelection(sel) {
    localStorage.setItem("feature_lookup_selection", sel);
    featureLookupInit();
}

// DATA
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

const DATA = {
    feature_lookup_2022: {
        phon: {
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
            "ɳ":"--000-0+-+------0-++--",
            "ɲ":"--+---0+-+-++---0-++--",
            "ŋ":"--+-+-0+--00+---0-++--",
            "ɴ":"----+-0+--00+---0-++--",
            "l":"--000-0++++----+0+-+--",
            "ɭ":"--000-0+++-----+0+-+--",
            "ʎ":"--+---0+++-++--+0+-+--",
            "r":"--000-0++++----+0--+--",
            "ɽ":"--000-0+++-----+0--+--",
            "ʀ":"----+-0++-00+--+0--+--",
            "t":"--000-0--++-----------",
            "d":"--000-0--++--------+--",
            "ʈ":"--000-0--+------------",
            "ɖ":"--000-0--+---------+--",
            "s":"--000-0--++----++---+-",
            "z":"--000-0--++----++--+--",
            "ɬ":"--000-0--++----+-+--+-",
            "ɮ":"--000-0--++----+-+-+--",
            "θ":"--000-0--+++---+----+-",
            "ð":"--000-0--+++---+---+--",
            "ʃ":"--+---0--+-++--++---+-",
            "ʒ":"--+---0--+-++--++--+--",
            "c":"--+---0--+-++---------",
            "ɟ":"--+---0--+-++------+--",
            "ç":"--+---0--+-++--+----+-",
            "ʝ":"--+---0--+-++--+---+--",
            "tʃ":"--+---0--+-++---+-----",
            "dʒ":"--+---0--+-++---+--+--",
            "ts":"--000-0--++-----+-----",
            "dz":"--000-0--++-----+--+--",
            "pf":"--000-0---00-+--+-----",
            "bv":"--000-0---00-+--+--+--",
            "p":"--000-0---00-+--------",
            "b":"--000-0---00-+-----+--",
            "ɸ":"--000-0---00-+-+----+-",
            "β":"--000-0---00-+-+---+--",
            "f":"--000-0---00-+-++---+-",
            "v":"--000-0---00-+-++--+--",
            "k":"--+-+-0---00+---------",
            "g":"--+-+-0---00+------+--",
            "x":"--+-+-0---00+--+----+-",
            "ɣ":"--+-+-0---00+--+---+--",
            "q":"----+-0---00+---------",
            "ɢ":"----+-0---00+------+--",
            "χ":"----+-0---00+--++---+-",
            "ʁ":"----+-0---00+--++--+--",
            "ħ":"--000-0---00--++----+-",
            "ʕ":"--000-0---00--++---+--",
            "ʔ":"--000-0---00---------+",
            "h":"--000-0---00---+----+-",
            "ɦ":"--000-0---00---+---++-",
        },
        features: [
            "syllabic", "vocalic", "high", "low", "back", "round", "atr", "sonorant", "approximant", "coronal", "anterior", "distributed", "dorsal", "labial", "pharyngeal", "continuant", "strident", "lateral", "nasal", "voice", "aspirated", "glottalized"
        ],
        abrv: [
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
        ],
        cmd_abrv: [
            ["c ", "clear "],
            ["con ", "contrast "],
            ["com ", "compare "],
            ["l ", "list "],
            ["h ", "help "],
            ["s ", "set "],
            ["set a ", "set add "],
            ["set add . ", "set add all "],
            ["set add * ", "set add all "],
            ["set d ", "set del "],
            ["set del ", "set delete "],
            ["set delete .", "set delete all"],
            ["set delete all", "set clear"],
            ["set f ", "set filter "],
            ["set c ", "set clear "],
        ]
    },
    feature_lookup_hayes_2005: {
        phon: {
            "i": "+-++-+0--+------0000++-+-+",
            "y": "+-++-+0--+--++--0000++-+-+",
            "ɨ": "+-++-+0--+------0000++---+",
            "ʉ": "+-++-+0--+--++--0000++---+",
            "ɯ": "+-++-+0--+------0000++--++",
            "u": "+-++-+0--+--++--0000++--++",
            "ɪ": "+-++-+0--+------0000++-+--",
            "ʏ": "+-++-+0--+--++--0000++-+--",
            "ʊ": "+-++-+0--+--++--0000++--+-",
            "e": "+-++-+0--+------0000+--+-+",
            "ø": "+-++-+0--+--++--0000+--+-+",
            "ɘ": "+-++-+0--+------0000+----+",
            "ɵ": "+-++-+0--+--++--0000+----+",
            "ɤ": "+-++-+0--+------0000+---++",
            "o": "+-++-+0--+--++--0000+---++",
            "ɛ": "+-++-+0--+------0000+--+--",
            "œ": "+-++-+0--+--++--0000+--+--",
            "ə": "+-++-+0--+------0000+-----",
            "ɞ": "+-++-+0--+--++--0000+-----",
            "ʌ": "+-++-+0--+------0000+---+-",
            "ɔ": "+-++-+0--+--++--0000+---+-",
            "æ": "+-++-+0--+------0000+-++-0",
            "ɶ": "+-++-+0--+--++--0000+-++-0",
            "a": "+-++-+0--+------0000+-+--0",
            "ɑ": "+-++-+0--+------0000+-+-+0",
            "ɒ": "+-++-+0--+--++--0000+-+-+0",

            "j": "--++-+0--+------000-++-+-+",
            "ʋ": "--++-+0--+--+-+-000--00000",
            "ɥ": "--++-+0--+--++--000-++-+-+",
            "w": "--++-+0--+--++--000-++--++",

            "ʙ": "-+++-+0+-+--+---000--00000",
            "l": "-+++-+0--+-----++--+-00000",
            "r": "-+++-+0+-+-----++----00000",
            "ɾ": "-+++-+0-++-----++----00000",
            "ɹ": "--++-+0--+-----+-+---00000",
            "ʎ": "-+++-+0--+-----+-+-+++-+-0",
            "ʟ": "-+++-+0--+------000+++-000",
            "ʀ": "-+++-+0+-+------000-+---+0",
            "m": "-+-++-0--+--+---000--00000",
            "ɱ": "-+-++-0--+--+-+-000--00000",
            "n": "-+-++-0--+-----++----00000",
            "ɳ": "-+-++-0--+-----+-----00000",
            "ɲ": "-+-++-0--+-----+-+--++-+-0",
            "ŋ": "-+-++-0--+------000-++-000",
            "ɴ": "-+-++-0--+------000-+---+0",

            "p": "-+----------+---000--00000",
            "b": "-+-------+--+---000--00000",
            "ɸ": "-+---++-----+---000--00000",
            "β": "-+---++--+--+---000--00000",
            "f": "-+---++-----+-+-000--00000",
            "v": "-+---++--+--+-+-000--00000",

            "θ": "-+---++--------+++---00000",
            "ð": "-+---++--+-----+++---00000",
            "t": "-+-------------++----00000",
            "d": "-+-------+-----++----00000",
            "s": "-+---++--------++-+--00000",
            "z": "-+---++--+-----++-+--00000",
            "ʃ": "-+---++--------+-++--00000",
            "ʒ": "-+---++--+-----+-++--00000",

            "ts":"-+----+--------++-+--00000",
            "dz":"-+----+--+-----++-+--00000",
            "tʃ":"-+----+--------+-++--00000",
            "dʒ":"-+----+--+-----+-++--00000",

            "c": "-+-------------+-+--++-+-0",
            "ɟ": "-+-------+-----+-+--++-+-0",
            "ç": "-+---++--------+-+--++-+-0",
            "ʝ": "-+---++--+-----+-+--++-+-0",

            "k": "-+--------------000-++-000",
            "g": "-+-------+------000-++-000",
            "x": "-+---++---------000-++-000",
            "ɣ": "-+---++--+------000-++-000",
            "q": "-+--------------000-+---+0",
            "ɢ": "-+-------+------000-+---+0",
            "χ": "-+---++---------000-+---+0",
            "ʁ": "-+---++--+------000-+---+0",

            "ħ": "-+---++---------000-+-+-+0",
            "ʕ": "-+---++--+------000-+-+-+0",

            "h": "-----++---+-----000--00000",
            "ɦ": "-----++--++-----000--00000",
            "ʔ": "-+---------+----000--00000", 
        },
        features: [
            "syllabic", "consonantal", "approximant", "sonorant", 
            "nasal", "continuant", "delayed", "trill", "tap",
            "voice", "spr.gl", "constr.gl",
            "labial", "round", "labiodental", "coronal", "anterior", "distributed", "strident",
            "lateral", "dorsal", 
            "high", "low", "front", "back", "tense",
        ],
        abrv: [
            [" syll ", " syllabic "],
            [" cons ", " consonantal "],
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
            [" dlyd ", " delayed "],
            [" cont ", " continuant "],
            [" str ", " strident "],
            [" lat ", " lateral "],
            [" nas ", " nasal "],
            [" lat ", " lateral "],
            [" voi ", " voice "],
            [" tns ", " tense "],
            [" trl ", " trill "],
            [" spread.glottis ", " spr.gl "],
            [" constricted.glottis ", " constr.gl "],
            [" sgl ", " spr.gl "],
            [" cgl ", " constr.gl "],
        ],
        cmd_abrv: [
            ["c ", "clear "],
            ["con ", "contrast "],
            ["com ", "compare "],
            ["l ", "list "],
            ["h ", "help "],
            ["s ", "set "],
            ["set a ", "set add "],
            ["set add . ", "set add all "],
            ["set add * ", "set add all "],
            ["set d ", "set del "],
            ["set del ", "set delete "],
            ["set delete .", "set delete all"],
            ["set delete all", "set clear"],
            ["set f ", "set filter "],
            ["set c ", "set clear "],
        ]
    },
}



// BASIC FNS
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


// fn that converts string data as in PHONDATA into a dictionary based on DATA[version].features
function dict_convert(in_string, vsn) {
    let new_dict_entry = {};
    for (let i = 0; i < DATA[vsn].features.length; i ++) {
        new_dict_entry[DATA[vsn].features[i]] = in_string[i];
    }
    return new_dict_entry;
}
// do a sneaky sneaky convert of DATA[version].phon rn
for (let vsn of ["feature_lookup_hayes_2005", "feature_lookup_2022"]) {
    for (let phoneme in DATA[vsn].phon) {
        DATA[vsn].phon[phoneme] = dict_convert(DATA[vsn].phon[phoneme], vsn);
    }
}


// fn that prints dicts 
function dict_print(in_dict) {
    for (const key in in_dict) {
        let outPrint = key + ":" + "-".repeat((16 - key.length)) + "[" + in_dict[key] + "]";
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
    
    for (let r of DATA[version].abrv) {
        out_str = out_str.replaceAll(r[0], r[1]);
    }

    for (let r of DATA[version].cmd_abrv) {
        if (out_str.startsWith(r[0])) {out_str = out_str.replace(r[0], r[1])}
    }

    out_str = out_str.trim();

    out_str = out_str.replaceAll(">", "").replaceAll("<", "") // replace erroneous syntax

    return out_str;
}

function consolePrintDefault(ver) {
    switch (ver) {
        case "feature_lookup_2022" : 
            consolePrint("Welcome to feature_lookup.js.");
            consolePrint("[*] 2022 Version");
            consolePrint("Type 'help' for help.");
            break;
        case "feature_lookup_hayes_2005" : 
            consolePrint("Welcome to feature_lookup.js.");
            consolePrint("[*] 2021 Version, based on Hayes (2005)");
            consolePrint("Type 'help' for help.");
            break;
    }
    
}

// THE MAIN PART
// - - - - - - - - - - - - - - -

var PHONSET = {}

function enterCmd() {
    const dummyDiv = document.createElement('div');
    const _user_input = CMD_LN.value.trim(); // lmao can you believe i forgot to sanitize in the original :(
    dummyDiv.textContent = _user_input;
    const user_input = dummyDiv.innerHTML;
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
            consolePrintDefault(version);
            break;
        
        case "help": 
            consolePrint("<span style='color:white;'>$ " + cmd[0] + "</span>");
            if (interpreted_message != "") {consolePrint(interpreted_message)};
            consolePrint("This program is a compliation of feature data for use in phonology. This is a specific version was made for use with UCSC's LING 101, Spring 2022, with Professor Jaye Padgett.")
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
                for (let entry in DATA[version].phon) {
                    i += 1;
                    formatted_result += entry;
                    formatted_result += (i % 8 != 0)? " " : "<br>";
                }
                consolePrint(formatted_result, hasNewline = (i % 8 != 0))
            }  else if (cmd.length == 2) {
                if (cmd[1] in DATA[version].phon) {
                    consolePrint("<span style='color:white;'>$ " + user_input + "</span>");
                    if (interpreted_message != "") {consolePrint(interpreted_message)};
                    dict_print(DATA[version].phon[cmd[1]]);
                } else if (DATA[version].features[cmd[1]] !== null) {
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
                console.log(cmd[1])
                if (DATA[version].features.includes(cmd[1])) {
                    if (["+", "-", "0"].includes(cmd[2])) {
                        consolePrint("<span style='color:white;'>$ " + user_input + "</span>");
                        if (interpreted_message != "") {consolePrint(interpreted_message)};
                        // sets a new variable i, to 1. 
                        let i = 0;
                        let formatted_result = ""
                        for (let entry in DATA[version].phon) {
                            if (DATA[version].phon[entry][cmd[1]] == cmd[2]) {
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
                    if (DATA[version].phon[phone] == null) {
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
                    for (let entry in DATA[version].phon[cmd[1]]) {
                        let isShared = true;
                        for (let phone of cmd.slice(1)) {
                            if (DATA[version].phon[cmd[1]][entry] != DATA[version].phon[phone][entry]) {
                                isShared = false;
                                break
                            }
                        }
                        if (isShared) {
                            compare_dict[entry] = DATA[version].phon[cmd[1]][entry];
                        }
                    }
                    if (Object.keys(compare_dict).length === 0) {
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
                    if (DATA[version].phon[phone] == null) {
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
                    for (let entry in DATA[version].phon[cmd[1]]) {
                        let isShared = DATA[version].phon[cmd[1]][entry] == DATA[version].phon[cmd[2]][entry];
                        if (!isShared) {
                            contrast_dict[entry] = DATA[version].phon[cmd[1]][entry] + "/" + DATA[version].phon[cmd[2]][entry];
                        }
                    }
                    if (Object.keys(contrast_dict).length === 0) {
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
            let isSuccess = true;
            let printSet = true;
            let msg = "";
            
            if (cmd.length > 1) {
                switch (cmd[1]) {
                    case "clear" : 
                        PHONSET = {};
                        msg = "Set cleared."
                        isSuccess = true;
                        printSet = false;
                        break;

                    case "add" :
                        if (cmd.length > 2) {
                            if (cmd[2] == "all") {
                                for (let entry in DATA[version].phon) {
                                    PHONSET[entry] = DATA[version].phon[entry];
                                }
                                printSet = true;
                            } else if (DATA[version].features.includes(cmd[2])) {
                                if (["+", "-", "0"].includes(cmd[3])) {
                                    for (let entry in DATA[version].phon) {
                                        if (DATA[version].phon[entry][cmd[2]] == cmd[3]) {
                                            PHONSET[entry] = DATA[version].phon[entry];
                                        }
                                    }
                                    printSet = true;
                                } else {
                                    msg = "Feature value must be specified as +, -, or 0.";
                                    isSuccess = false;
                                }
                            } else {
                                let phonemeAdd = true;
                                
                                for (let phone of cmd.slice(2)) {
                                    if (DATA[version].phon[phone] == null) {
                                        phonemeAdd = false;
                                    }
                                }
                                if (phonemeAdd) {
                                    
                                    for (let phone of cmd.slice(2)) {
                                        PHONSET[phone] = DATA[version].phon[phone];
                                        printSet = true;
                                    }
                                } else {
                                    msg = "One or multiple phonemes were not found or invalid.";
                                    isSuccess = false;
                                }
                            }  

                        } else {
                            isSuccess = false;
                        }
                        break;
                    case "delete" : 
                        if (cmd.length > 2) {
                            if (DATA[version].features.includes(cmd[2])) {
                                if (cmd[2] == "all") {
                                    PHONSET = {};
                                    msg = "Set cleared."
                                    isSuccess = true;
                                    printSet = false;
                                } else if (["+", "-", "0"].includes(cmd[3])) {
                                    let new_set = {}
                                    for (let entry in PHONSET) {
                                        if (PHONSET[entry][cmd[2]] != cmd[3]) {
                                            new_set[entry] = PHONSET[entry];
                                        }
                                    }
                                    PHONSET = new_set;
                                    printSet = true;
                                } else {
                                    msg = "Feature value must be specified as +, -, or 0.";
                                    isSuccess = false;
                                }
                            } else {
                                let phonemeDel = true;
                                
                                for (let phone of cmd.slice(2)) {
                                    if (DATA[version].phon[phone] == null) {
                                        phonemeDel = false;
                                    }
                                }
                                if (phonemeDel) {
                                    
                                    for (let phone of cmd.slice(2)) {
                                        delete PHONSET[phone];
                                        printSet = true;
                                    }
                                } else {
                                    msg = "One or multiple phonemes were not found or invalid.";
                                    isSuccess = false;
                                }
                            }  

                            } else {
                                isSuccess = false;
                            }
                        break;
                    
                    case "filter":
                        if (cmd.length > 2) {
                            if (DATA[version].features.includes(cmd[2])) {
                                if (["+", "-", "0"].includes(cmd[3])) {
                                    let new_set = {}
                                    for (let entry in PHONSET) {
                                        if (PHONSET[entry][cmd[2]] == cmd[3]) {
                                            new_set[entry] = PHONSET[entry];
                                        }
                                    }
                                    PHONSET = new_set;
                                    printSet = true;
                                } else {
                                    msg = "Feature value must be specified as +, -, or 0.";
                                    isSuccess = false;
                                }
                            } else {
                                msg = "Feature '" + cmd[2] + "' not found.";
                                isSuccess = false;
                            }
                        } else {
                            isSuccess = false;
                        }
                        break;
                    default:
                        isSuccess = false;
                        break;
                }
            }
        
            if (isSuccess) {
                
                consolePrint("<span style='color:white;'>$ " + user_input + "</span>");
                if (interpreted_message != "") {consolePrint(interpreted_message)};
                if (msg != "") {consolePrint(msg)};
                if (printSet) {
                    if (Object.keys(PHONSET).length === 0) {
                        consolePrint("Set is empty. Enter 'set add all' to add all phonemes.")
                    } else {
                        let i = 0;
                        let formatted_result = ""
                        for (let entry in PHONSET) {
                            i += 1;
                            formatted_result += entry;
                            formatted_result += (i % 8 != 0)? " " : "<br>";
                        }
                        consolePrint(formatted_result, hasNewline = (i % 8 != 0));
                    }
                }
            } else {
                consolePrint("<span style='color:red;'>? " + user_input + "</span>");
                if (interpreted_message != "") {consolePrint(interpreted_message)};
                if (msg != "") {consolePrint(msg)};
                consolePrint("Usage: set<br>or --- set clear<br>or --- set add [phoneme]<br>or --- set add [feature] {+/-/0}<br>or --- set add all<br>or --- set delete [phoneme]<br>or --- set delete [feature] {+/-/0}<br>or --- set filter [feature] {+/-/0}")
            }
            
            break;
        default:
            consolePrint("<span style='color:red;'>? " + user_input + "</span>");
            consolePrint("Command '" + cmd[0] + "' was not understood.")
            break;
    }
    
    COMMANDBOX.scrollTop = COMMANDBOX.scrollHeight;
    CMD_LN.value = ""

}