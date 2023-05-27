const READOUT = document.getElementById("prime_readout");
let currNum = BigInt(localStorage.getItem("primeyCurrNum") ?? (Number(READOUT.innerHTML) ))
READOUT.innerHTML = currNum;
let ticking = false;


let COIN_SFX = {}; const COIN_SFX_LIST = ["1","2", "3","4","5"]
for (let k = 0; k < COIN_SFX_LIST.length; k++) {
    const newSFX = new Audio( ASSETS_FOLDER + 'sfx/coin_' + COIN_SFX_LIST[k] + ".wav")
    COIN_SFX[COIN_SFX_LIST[k]] = newSFX;
}


let ticker = 0;
function tickPrime(isRecursiveCall = false) {
    if (ticking && !isRecursiveCall) return;
    ticking = true;
    ticker = Math.min(ticker + 1, 5)

    COIN_SFX[String(ticker)].currentTime=0;
    COIN_SFX[String(ticker)].play()

    currNum += 1n;
    READOUT.innerHTML = currNum;

    if (!isPrime(currNum)) {setTimeout(()=> {
        tickPrime(true)
        
        }, 75
    ); return}

    ticking = false;
    ticker = 0;
    savePrime();
    return;   
}

function resetPrime(isRecursiveCall = false) {
    if (currNum == 0n) {ticking = false; savePrime(); return};
    if (ticking && !isRecursiveCall) return;
    ticking = true;
    COIN_SFX['1'].currentTime = 0;
    COIN_SFX['1'].play();
    currNum = currNum - 7n > 0n ? currNum - 7n : 0n ;
    READOUT.innerHTML = currNum;
   
    setTimeout(() => {
        resetPrime(true)
        
        }, 15
    );
} 

function savePrime() {
    localStorage.setItem("primeyCurrNum", currNum)
}

function isPrime(number) {
    if (number == 2n || number == 3n) {return true;};
    if ((number & 1n) != 1n) {return false;};
    if (number <= 1n || number % 3n == 0n) {return false;};
    for (let i = 5n; i*i < number; i += 6n) {
        if (number % i == 0n || number % (i + 2n) == 0n) return false;  
    }
    return true
}

