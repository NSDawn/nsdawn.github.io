let codes = [
    {
        sequence: ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
        href: "https://www.youtube.com/watch?v=U1dirHGODpM",
        index: 0,
    },
    {
        sequence: ["c", "h","r","i","s","t","i","a","n"],
        href: "https://www.cglauch.dev",
        index: 0,
    },
    {
        sequence: ["s", "u","s","s","y","b","a","k","a"],
        href: "https://www.youtube.com/watch?v=Ru_j8oRi-rY",
        index: 0,
    }
]

let sequenceIndex = 0;

document.addEventListener("keydown", (e) => {
    
    const ignoredChars = [" "];
    if (ignoredChars.includes(e.key)) return;

    codes.forEach((code) => {
        if (code.sequence[code.index] === e.key) {
            code.index += 1;
            if (code.index === code.sequence.length) {
                location.href = code.href;
            }
        } else {
            code.index = 0;
        }
    })
});