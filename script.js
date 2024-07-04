let words = [];

const quotes = [
    "The first rule of Fight Club is: you do not talk about Fight Club.",
    "We are the middle children of history, raised by television, but yearning for a big war.",
    "The things you own end up owning you.",
    "You met me at a very strange time in my life.",
    "You are not your job, you are not how much money you have in the bank. You are not the car you drive. You are not the contents of your wallet. You are not your fucking khakis.",
    "When you have insomnia, you're never really asleep and you're never really awake.",
    "We're consumers. We are by-products of a lifestyle obsession. Ultimate consumers.",
    "It's only after we've lost everything that we're free to do anything.",
    "Sticking feathers up your butt does not make you a chicken.",
    "This is not a fight. This is self-improvement.",
    "Without pain, without sacrifice, we would have nothing.",
    "I say never be complete. I say stop always fucking striving to become.",
    "The irony is that the only ones who are happy are the fucking idiots.",
    "You are not special. We are all made of the same damn stuff. We are all sentenced to this life.",
    "Fuck society.",
    "First rule of Project Mayhem: I get to break the rules.",
    "You break the rules, and you become the rule.",
    "We're the all-singing, all-dancing crap of the world.",
    "My soap is a fight club. My life is a fight club.",
    "Our war is a spiritual war. It is a war of the soul against humanity.",
    "Gentlemen, welcome to Fight Club. The following are the rules...",
    "The condoms are there for safety, not for hygiene.",
    "Self-improvement is masturbation. This is self-destruction.",
    "Maybe we all have a little bit of insomnia in us.",
    "I am Jack's complete lack of surprise.",
    "You are fucking weak. And when you die, you're going to hell.",
    "Isn't that the point? To laugh at the whole thing?",
    "Humanity needs a plague.",
    "The thing about insomnia... the world doesn't stop spinning just because you can't catch your breath.",
    "Tyler always gets what he wants.",
    "Leave the gun. Take the cannoli.",
    "You're not weak. You just haven't found what you're strong at.",
    "Hit me.",
    "It is about a generation that has had everything yet feels like it has nothing.",
    "The chemicals in your brain interact with the narrative you construct of your life.",
    "Tyler and I are the same person.",
    "You're not dying. You're waking up.",
    "The chaos is the cure.",
    "I haven't been to a support group in months. I don't need them anymore. I've got you.",
    "You are not your illness.",
    "Tears happen when your brain needs to relieve stress hormones.",
    "On a long enough timeline, the survival rate for everyone drops to zero.",
    "The underwear business is a multi-billion dollar a year industry. People buy underwear. They need more underwear. People need new underwear.",
    "You're a consumer, a product. The delusion that you control your life...",
    "Maybe that's the real fight - to be a single goddamn unit.",
    "Tyler wasn't weak. He wasn't burdened by the past. He wasn't tethered to anything.",
    "Where is my goddamn soap?",
    "Maybe we all looked like freaks to them, too.",
    "The horror of what you see in yourself... that's what tears are for.",
    "You are not sleeping. You are waiting."
];

const getParagraph = () => {
    const quotes_size = quotes.length;
    let paragraph = "";
    let indexes = [];
    for (let i = 0; i < quotes_size; i++) indexes = [...indexes, i];
    while (indexes.length != 0) {
        const random_index = Math.floor(Math.random() * indexes.length);
        paragraph += quotes[random_index] + " ";
        indexes.splice(random_index, 1);
    }
    console.log("paragraph is");
    return paragraph;
}


// API call
async function apiCall(wordLength) {
    const apiUrl = `https://random-word-api.herokuapp.com/word?number=100&length=${wordLength}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not OK!");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error is", error);
    }
}

// fetch words of diff length and combine them
async function fetchAndCombine() {
    try {
        const [lengthThreeWords, lengthFourWords, lengthFiveWords, lengthSixWords] = await Promise.all([
            apiCall(3),
            apiCall(4),
            apiCall(5),
            apiCall(6)
        ]);

        words = [
            ...words,
            ...lengthThreeWords,
            ...lengthFourWords,
            ...lengthFiveWords,
            ...lengthSixWords
        ];

        console.log(words);
    } catch (error) {
        console.log("Error fetching words:", error);
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
async function newGame() {
    const spinner = document.getElementById('loading-spinner');
    const game = document.getElementById('game');

    spinner.style.display = 'block';
    game.style.display = 'none';

    await fetchAndCombine();

    spinner.style.display = 'none';
    game.style.display = 'block';

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

newGame();
