// global variables for html elements

const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingNumber = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

// funtion to update the word displayed on the screen

const updateWordInProgress = function(word) {
    word.split('');
    const displayWord = [];
    for (let letter of word) {
        let displayLetter =  "●";
        displayWord.push(displayLetter);
    }
    wordInProgress.innerText = displayWord.join('');
};

updateWordInProgress(word);

// guess button event listener

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const userGuessedThisLetter = letter.value;
    letter.value = "";
    console.log(userGuessedThisLetter);
});