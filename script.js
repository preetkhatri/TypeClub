let words = [
    "have", "is", "our", "of", "what", "all", "by", "say", "her", "well",
    "out", "us", "friend", "the", "any", "new", "those", "want", "see", "much",
    "men", "should", "up", "in", "world", "go", "about", "only", "thought", "people",
    "could", "other", "than", "its", "work", "also", "play", "small", "state", "even",
    "need", "change", "beautiful", "form", "found", "happen", "risk", "full", "culture", "year",
    "day", "life", "school", "famliy", "house", "present", "point", "service", "government",
    "company", "money", "information", "first", "america", "make", "second", "perspective",
    "and", "thought", "business", "literature", "development", "public", "health", "law",
    "compare", "provide", "system", "particularly", "potential", "society", "economic",
    "interest", "relationships", "education", "article", "importance", "environment",
    "technology", "industry", "healthcare", "available", "environment", "because", "analysis",
    "investment", "policy", "behavior", "particular", "necessary", "opportunity", "international",
    "treatment", "research", "customer", "report", "development", "marketing", "purchase",
    "agreement", "discussion", "advantage", "relationship", "production", "responsibility",
    "experience", "technology", "management", "organization", "financial", "information",
    "market", "employee", "analysis", "discussion", "goal", "support", "advantage",
    "creative", "interest", "strategy", "decision", "resource", "customer", "service", "delivery",
    "performance", "marketing", "sale", "technology", "innovation", "partner", "project", "management",
    "leader", "team", "skill", "motivation", "culture", "environment", "communication", "problem",
    "solving", "planning", "goal", "setting", "evaluation", "feedback", "time", "management", "pressure",
    "stress", "conflict", "resolution", "change", "management", "diversity", "inclusion", "ethics",
    "corporate", "social", "responsibility", "globalization", "sustainability", "economics", "finance",
    "accounting", "marketing", "human", "resources", "management", "information", "technology", "operations",
    "research", "and", "development", "engineering", "sales", "legal", "compliance", "risk", "management",
    "audit", "internal", "control", "tax", "finance", "budget", "forecast", "cash", "flow", "investment",
    "banking", "insurance", "real", "estate", "manufacturing", "construction", "transportation",
    "communication", "utilities", "wholesale", "retail", "trade", "services", "public", "sector",
    "non", "profit", "organization", "entrepreneur", "startup", "business", "plan", "marketing",
    "strategy", "sales", "force", "management", "customer", "relationship", "management", "advertising",
    "public", "relations", "social", "media", "branding", "communication", "negotiation", "leadership",
    "teamwork", "motivation", "problem", "solving", "decision", "making", "critical", "thinking",
    "creativity", "innovation", "time", "management", "stress", "management", "conflict", "resolution",
    "ethics", "integrity", "corporate", "social", "responsibility", "globalization", "sustainability",
    "economics", "microeconomics", "macroeconomics", "supply", "demand"];

const len = words.length;
const typeTime = 30000;
window.timer = null;
window.start = null;


function randomWord() {
    const idx = Math.floor(Math.random() * len);
    return words[idx];
}

function addClass(e,name) {
    e.className += ' '+name;
}

function removeClass(e,name) {
    e.className = e.className.replace(name,'');
}

function format(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`
}

function newGame() {
    document.getElementById('words').innerHTML = '';
    for (let i = 0; i < 100; i++) {
        document.getElementById('words').innerHTML += format(randomWord());
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
    document.getElementById("timer").innerHTML = typeTime/1000;
    window.timer = null;
}

document.getElementById('game').addEventListener('keyup',(e)=> {
    const key = e.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    let expected = currentLetter;
    if(expected===null) expected=' ';
    else expected=currentLetter.innerHTML;
    const isLetter = key.length===1 && key!==' ';
    const isSpace = key===' ';
    const isBackspace = key==="Backspace";
    const isFirstLetter = currentLetter===currentWord.firstChild;

    if(document.querySelector('#game.over')) {
        return;
    }

    console.log({key, expected});

    if(!window.timer) {
        window.timer = setInterval(() => {
            if(!window.start) {
                window.start = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.start;
            const sPassed = Math.round(msPassed/1000);
            const sLeft = (typeTime/1000)-sPassed;
            if(sLeft<=0) {
                // document.getElementById("timer").innerHTML = sLeft;
                gameOver();
                return;
            }
            document.getElementById("timer").innerHTML = sLeft;
        }, 1000);
    }

    if(isLetter) {
        if(currentLetter) {
            let classType;
            if(key===expected) classType='correct';
            else classType='incorrect';
            addClass(currentLetter,classType);
            removeClass(currentLetter,'current');
            if(currentLetter.nextSibling) {
                addClass(currentLetter.nextSibling,'current');
            }
        } else {
            const appendWords = document.createElement('span');
            appendWords.innerHTML = key;
            appendWords.className = 'letter incorrect extra';
            // currentWord.appendChild(appendWords);
        }
    }

    if(isSpace) {
        if(expected!==' ') {
            const letterSkip = [...document.querySelectorAll('.word.current .letter:not(.correct)')]
            letterSkip.forEach((e)=>{
                addClass(e,'incorrect');
            })
        }
        removeClass(currentWord,'current');
        addClass(currentWord.nextSibling,'current');

        if(currentLetter) removeClass(currentLetter,'current')
        addClass(currentWord.nextSibling.firstChild,'current')
    }

    if(isBackspace) {
        if(currentLetter && isFirstLetter) {
            removeClass(currentWord,'current');
            addClass(currentWord.previousSibling,'current');
            removeClass(currentLetter,'current');
            addClass(currentWord.previousSibling.lastChild,'current');
            removeClass(currentWord.previousSibling.lastChild,'incorrect');
            removeClass(currentWord.previousSibling.lastChild,'correct');
        }
        if(currentLetter && !isFirstLetter) {
            removeClass(currentLetter,'current');
            addClass(currentLetter.previousSibling,'current');
            removeClass(currentLetter.previousSibling, 'correct');
            removeClass(currentLetter.previousSibling, 'incorrect');
        }
        if(!currentLetter) {
            addClass(currentWord.lastChild,'current');
            removeClass(currentWord.lastChild,'correct');
            removeClass(currentWord.lastChild,'incorrect');
        }
    }

    if(currentWord.getBoundingClientRect().top>220) {
        const words = document.getElementById('words');
        const margin = parseInt(words.style.marginTop || '0px');
        words.style.marginTop = (margin - 35) + 'px';
    }

})

function result() {
    const allWords = [...document.querySelectorAll('.word')];
    const lastTyped = document.querySelector('.word.current');
    const lastTypedIdx = allWords.indexOf(lastTyped);
    const typedWords = allWords.slice(0,lastTypedIdx);
    const correctWords = typedWords.filter((e)=>{
        const letters = [...e.children];
        const incorrectLetters = letters.filter(k=>k.className.includes('incorrect'))
        const correctLetters = letters.filter(k=>k.className.includes('correct'));
        console.log("Word change ");
        console.log(incorrectLetters.length);
        console.log(correctLetters.length);
        return incorrectLetters.length===0 && correctLetters.length === letters.length;
    });

    return (correctWords.length/typeTime)*60000;
}

function gameOver() {
    clearInterval(window.timer);
    addClass(document.getElementById('game'),'over');
    document.getElementById("timer").innerHTML = `WPM: ${result()}`
}

document.getElementById("fight").addEventListener("click", ()=>{
    location.reload();
})

newGame();
