// global variables 

const displayGuessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

// async function to get data and choose word
// (called below and playAgainButton)
const getWord = async function () {
    const request = await fetch(
        `https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`
    )
    const data = await request.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex];
    console.log(word);
    word = word.trim();
    startWord(word)
};

getWord();

// funtion to start the game and display hidden word to guess on screen
// (called by getWord)

const startWord = function(word) {
    word.split('');
    const displayWord = [];
    for (let letter of word) {
        let displayLetter =  "●";
        displayWord.push(displayLetter);
    }
    wordInProgress.innerText = displayWord.join('');
};

// guess button event listener

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const userGuessedThisLetter = letter.value;
    let validatedLetter = validate(userGuessedThisLetter);
    if (validatedLetter != undefined) {
        makeGuess(validatedLetter);
    }
    letter.value = "";
    //console.log(validatedLetter);
});

// function to validate player's input and display a meesage if input isn't valid. 
//(called by guessButton click)

const validate = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Please guess a letter.";
        //console.log("blank");
    } 
    else if (input.length !== 1 ) {
        message.innerText = "Please guess a single letter.";
        //console.log("more than one letter");
    }
    else if (input.match(acceptedLetter)) {
        //input is ok to call next function
        return input;
        //console.log("good input");
    }
    else {
        message.innerText = "Please input a letter from A-Z.";
        //console.log("not a letter");
    }
};

//function to capture the user's input
//(called by guessButton click)

const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    let check = guessedLetters.includes(letter);
    //console.log(check);
    if (check == true) {
        message.innerText = "You have already guessed that letter.  Please try a different one."
    }
    else {
        guessedLetters.push(letter);
        showGuessedLetters();
        guessesCounter(letter);
        updateWordInProgress(guessedLetters);
    }
    //console.log(guessedLetters);

};

// function to show the guessed letters on the screen
// (called by makeGuess else statement)

const showGuessedLetters = function () {
    displayGuessedLetters.innerText = "";
    for (let letter of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = letter;
        displayGuessedLetters.append(li);
    }
};

// function for update displayed word on page
// (called by makeGuess else statement)

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const progressWord = [];
    for (let letter of wordUpper) {
        let getLetter = "●";
        for (let checkLetter of guessedLetters) {
            if (letter === checkLetter) {
                getLetter = checkLetter;
            }
        }
        progressWord.push(getLetter);
    }
    //console.log(progressWord);
    const checkWord = progressWord.join("");
    wordInProgress.innerText = checkWord;
    winner(checkWord);
};

// function for counting down guesses remaining
// (called by makeGuess)

const guessesCounter = function (guess) {
    const wordUpper = word.toUpperCase();
    const check = wordUpper.includes(guess);
    //console.log(check);
    if (check == false) {
        message.innerText = `The word does not contain ${guess}.`;
        remainingGuesses--;
        if (remainingGuesses > 1) {
            remainingSpan.innerText = `${remainingGuesses} guesses`;
        }
        else if (remainingGuesses == 1) {
            remainingSpan.innerText = "1 guess";
        }
        else {
            message.innerText = `Game over.  The word was ${word}.`;
            remainingSpan.innerText = "0 guesses";
        }
    }
    else {
        message.innerText = `${guess} is in the word.`;
    }
};

// function to check if user as won game
 //(called by updateWordInProgress)

const winner = function(checkWord) {
    const wordUpper = word.toUpperCase();
    if (checkWord === wordUpper) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word!  Congrats!</p>`;
    }
};

