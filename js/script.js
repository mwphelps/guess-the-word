// global variables for html elements

const displayGuessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingNumber = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// funtion to update the word displayed on the screen

const getWord = function(word) {
    word.split('');
    const displayWord = [];
    for (let letter of word) {
        let displayLetter =  "●";
        displayWord.push(displayLetter);
    }
    wordInProgress.innerText = displayWord.join('');
};

getWord(word);

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
        updateWordInProgress(guessedLetters);
    }
    console.log(guessedLetters);

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

// function to check if user as won game
 //(called by updateWordInProgress)

const winner = function(checkWord) {
    const wordUpper = word.toUpperCase();
    if (checkWord === wordUpper) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word!  Congrats!</p>`;
    }
};