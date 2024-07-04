let words = [];

// API call

async function apiCall(wordLength) {
    const apiUrl = `https://random-word-api.herokuapp.com/word?number=100&length=${wordLength}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not OK!");
        }
        const data = await response.json();
        words = [...words, ...data]; 
    } catch (error) {
        console.log("Error is", error);
    }
}

const typeTime = 30000;
window.timer = null;
window.start = null;
let isGameOver = false;

// Generating Random words
function randomWord() {
    const idx = Math.floor(Math.random() * words.length);
    return words[idx];
}

// Closing modal
function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('saveWordLengthBtn').addEventListener('click', async function () {
    var wordLength = document.getElementById('wordLengthSelect').value;
    console.log('Selected word length:', wordLength);
    closeModal();
    await apiCall(wordLength);
    console.log(words);
    newGame();
});

// Addition & removal of class
function addClass(e, name) {
    e.className += ' ' + name;
}

function removeClass(e, name) {
    e.className = e.className.replace(name, '');
}

// Converting letters into a span format
function format(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`
}

// New test begin
function newGame() {
    console.log("new game words are", words);
    document.getElementById('words').innerHTML = '';
    for (let i = 0; i < 100; i++) {
        document.getElementById('words').innerHTML += format(randomWord());
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
    document.getElementById("timer").innerHTML = typeTime / 1000;
    window.timer = null;
}

// Function to update the cursor's position
function updateCursor() {
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const cursor = document.getElementById('cursor');
    if (currentLetter) {
        const rect = currentLetter.getBoundingClientRect();
        const gameRect = document.getElementById('game').getBoundingClientRect();
        cursor.style.left = `${rect.left - gameRect.left}px`;
        cursor.style.top = `${rect.top - gameRect.top}px`;
    } else if (currentWord) {
        // Move cursor to the end of the current word if no current letter is found
        const lastLetter = currentWord.lastChild;
        if (lastLetter) {
            const rect = lastLetter.getBoundingClientRect();
            const gameRect = document.getElementById('game').getBoundingClientRect();
            cursor.style.left = `${rect.right - gameRect.left}px`;
            cursor.style.top = `${rect.top - gameRect.top}px`;
        }
    }
}

// Listening to key press and updating the cursor position
document.getElementById('game').addEventListener('keydown', (e) => {
    if (isGameOver) return;
    const key = e.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    let expected = currentLetter ? currentLetter.innerHTML : ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackspace = key === "Backspace";
    const isFirstLetter = currentLetter === currentWord.firstChild;

    // Handling time check and starting timer if not already started
    if (!window.timer) {
        window.timer = setInterval(() => {
            if (!window.start) {
                window.start = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.start;
            const sPassed = Math.round(msPassed / 1000);
            const sLeft = (typeTime / 1000) - sPassed;
            if (sLeft <= 0) {
                gameOver();
                return;
            }
            document.getElementById("timer").innerHTML = sLeft;
        }, 1000);
    }

    // Handling letter typing
    if (isLetter) {
        if (currentLetter) {
            let classType = key === expected ? 'correct' : 'incorrect';
            currentLetter.classList.add(classType);
            currentLetter.classList.remove('current');
            if (currentLetter.nextSibling) {
                currentLetter.nextSibling.classList.add('current');
            }
        } else {
            const appendWords = document.createElement('span');
            appendWords.innerHTML = key;
            appendWords.className = 'letter incorrect extra';
        }
    }

    // Handling space typing
    if (isSpace) {
        if (expected !== ' ') {
            const letterSkip = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            letterSkip.forEach((e) => e.classList.add('incorrect'));
        }
        currentWord.classList.remove('current');
        currentWord.nextSibling.classList.add('current');
        if (currentLetter) currentLetter.classList.remove('current');
        currentWord.nextSibling.firstChild.classList.add('current');
    }

    // Handling backspace
    if (isBackspace) {
        if (currentLetter && isFirstLetter) {
            currentWord.classList.remove('current');
            currentWord.previousSibling.classList.add('current');
            currentLetter.classList.remove('current');
            currentWord.previousSibling.lastChild.classList.add('current');
            currentWord.previousSibling.lastChild.classList.remove('incorrect', 'correct');
        }
        if (currentLetter && !isFirstLetter) {
            currentLetter.classList.remove('current');
            currentLetter.previousSibling.classList.add('current');
            currentLetter.previousSibling.classList.remove('correct', 'incorrect');
        }
        if (!currentLetter) {
            currentWord.lastChild.classList.add('current');
            currentWord.lastChild.classList.remove('correct', 'incorrect');
        }
    }

    // Scrolling down lines
    if (currentWord.getBoundingClientRect().top > 220) {
        const words = document.getElementById('words');
        const margin = parseInt(words.style.marginTop || '0px');
        words.style.marginTop = (margin - 35) + 'px';
    }

    updateCursor();
});

// Calculation of wpm
function result() {
    const allWords = [...document.querySelectorAll('.word')];
    const lastTyped = document.querySelector('.word.current');
    const lastTypedIdx = allWords.indexOf(lastTyped);
    const typedWords = allWords.slice(0, lastTypedIdx);
    const correctWords = typedWords.filter((e) => {
        const letters = [...e.children];
        const incorrectLetters = letters.filter(k => k.className.includes('incorrect'));
        const correctLetters = letters.filter(k => k.className.includes('correct'));
        return incorrectLetters.length === 0 && correctLetters.length === letters.length;
    });

    console.log(correctWords);

    return (correctWords.length / (typeTime / 60000));
}

// When game is over then simply add the class & show the wpm 
function gameOver() {
    isGameOver = true;
    clearInterval(window.timer);
    addClass(document.getElementById('game'), 'over');
    document.getElementById("timer").innerHTML = `WPM: ${result()}`;
}

document.getElementById("fight").addEventListener("click", () => {
    location.reload();
});
