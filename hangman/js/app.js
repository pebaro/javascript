'use strict'

/**********************************
 * Hangman Game - App Controller
 * =============================
 */

const word = new Hangman('JavaScript Development Rules')

word.addSpaces()

const textContainer      = document.getElementById('hangman-text')
const remainingGuesses   = document.getElementById('remaining-guesses')
const hangmanWord        = document.getElementById('hangman-word')
const guessedLetters     = document.getElementById('guessed-letters')
const graphicsContainer  = document.getElementById('hangman-graphics')

remainingGuesses.textContent = word.gameStatus
hangmanWord.textContent      = word.gameProgress
graphicsContainer.innerHTML  = '<img src="../img/large/Guess-' + word.remainingGuesses + '.png">'

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)

    if (word.status === 'playing') word.makeGuess(guess)

    remainingGuesses.textContent = word.gameStatus
    hangmanWord.textContent      = word.gameProgress
    
    guessedLetters.textContent   = 'Letters Guessed: ' + word.guessedLetters.slice(1)
    graphicsContainer.innerHTML  = '<img src="../img/large/Guess-' + word.remainingGuesses + '.png">'
})