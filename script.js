const words = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us", "is", "are", "was", "were", "has", "were", "had", "been", "do", "does", "did", "done", "can", "could", "will", "would", "shall", "should", "ought", "might", "may", "must", "have", "has", "had", "having", "make", "made", "making", "let", "lets", "letting", "go", "went", "gone", "going", "come", "came", "coming", "run", "ran", "running", "take", "took", "taking", "give", "gave", "giving", "keep", "kept", "keeping", "see", "saw", "seen", "seeing", "seem", "seemed", "seeming", "feel", "felt", "feeling", "hear", "heard", "hearing", "say", "said", "saying", "tell", "told", "telling", "read", "read", "reading", "think", "thought", "thinking", "find", "found", "finding", "ask", "asked", "asking", "work", "worked", "working", "seem", "seemed", "seeming", "try", "tried", "trying", "use", "used", "using", "call", "called", "calling", "be", "been", "being", "put", "put", "putting", "begin", "began", "beginning", "appear", "appeared", "appearing", "feel", "felt", "feeling", "bring", "brought", "bringing", "understand", "understood", "understanding", "mean", "meant", "meaning", "stand", "stood", "standing", "choose", "chose", "chosen", "choosing", "move", "moved", "moving", "live", "lived", "living", "believe", "believed", "believing", "receive", "received", "receiving", "experience", "experienced", "experiencing", "leave", "left", "leaving", "decide", "decided", "deciding", "hear", "heard", "hearing", "expect", "expected", "expecting", "offer", "offered", "offering", "allow", "allowed", "allowing", "train", "trained", "training", "learn", "learned", "learning", "stop", "stopped", "stopping", "change", "changed", "changing", "grow", "grew", "grown", "growing", "improve", "improved", "improving", "remember", "remembered", "remembering", "serve", "served", "serving", "build", "built", "building", "remain", "remained", "remaining", "reach", "reached", "reaching", "kill", "killed", "killing", "carry", "carried", "carrying", "occur", "occurred", "occurring", "drive", "drove", "driven", "driving", "walk", "walked", "walking", "explain", "explained", "explaining", "pay", "paid", "paying", "produce", "produced", "producing", "determine", "determined", "determining", "include", "included", "including", "study", "studied", "studying", "play", "played", "playing", "run", "ran", "running", "exist", "existed", "existing", "set", "set", "setting", "send", "sent", "sending", "watch", "watched", "watching", "choose", "chose", "chosen", "choosing", "think", "thought", "thinking", "belong", "belonged", "belonging", "appear", "appeared", "appearing", "write", "wrote", "writing", "understand", "understood", "understanding", "continue", "continued", "continuing", "grow", "grew", "grown", "growing", "lose", "lost", "losing", "allow", "allowed", "allowing", "require", "required", "requiring", "suggest", "suggested", "suggesting", "remain", "remained", "remaining", "raise", "raised", "raising", "improve", "improved", "improving", "contain", "contained", "containing", "join", "joined", "joining", "win", "won", "winning", "understand", "understood", "understanding", "show", "showed", "shown", "showing", "obtain", "obtained", "obtaining", "mean", "meant", "meaning", "consider", "considered", "considering", "appear", "appeared", "appearing", "suggest", "suggested", "suggesting", "refer", "referred", "referring", "start", "started", "starting", "develop", "developed", "developing", "permit", "permitted", "permitting", "hope", "hoped", "hoping", "require", "required", "requiring", "agree", "agreed", "agreeing", "identify", "identified", "identifying", "wonder", "wondered", "wondering", "expect", "expected", "expecting", "predict", "which", "are", "we", "his", "from", "or", "an", "this", "will", "one",
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
}

document.getElementById('game').addEventListener('keyup',(e)=> {
    const key = e.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    let expected = currentLetter;
    if(expected===null) expected=' ';
    else expected=currentLetter.innerHTML;
    console.log({key, expected});
    const isLetter = key.length===1 && key!==' ';
    const isSpace = key===' ';
    const isBackspace = key==="Backspace";
    const isFirstLetter = currentLetter===currentWord.firstChild;

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

newGame();
