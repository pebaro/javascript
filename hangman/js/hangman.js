'use strict'

/**
 * ==============
 * Hangman Game
 * ==============
 * developed & written using 'strict' mode and ES6
 */

class Hangman {
    constructor(word, remainingGuesses = 10) {
        this.original = word                        // the original word entered
        this.word = word.toLowerCase().split('')    // the word as an array of letters
        this.remainingGuesses = remainingGuesses    // number of guesses remaining
        this.guessedLetters = []                    // the guesses that have been made
        this.status = 'playing'                     // the status of the game
    }
    
    addSpaces() {    
        if (this.word.includes(' ')) this.guessedLetters.push(' ') // push the spaces automatically if there's more than one word
    }

    calculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter)) // set the finished status of the game
    
        if (this.remainingGuesses === 0) this.status = 'failed' // if number of allowed guesses runs out, status = failed
        else if (finished) this.status = 'finished'             // if finished variable is TRUE, status = finished
        else this.status = 'playing'                            // if the game is in any other state, status = playing
    }

    get statusMessage() {
        if (this.status === 'playing') return `Remaing Guesses: ${this.remainingGuesses}`       // when playing, show number of remaining guesses allowed
        else if (this.status === 'failed') return `Unlucky.....The Word Was "${this.original}"` // show failed message when remaining guesses allowed = 0
        else return `Congratulations.....You Guessed The Word!!!`                               // show message when the word/words are guessed correctly
    }
    
    get gameProgress() {
        let hangmanWord = ''
    
        this.word.forEach(letter => {
            this.guessedLetters.includes(letter) || letter === ' ' ? hangmanWord += letter : hangmanWord += '_'
        })
    
        return hangmanWord
    }
    
    makeGuess(guess) {
        guess = guess.toLowerCase()
    
        if (!this.guessedLetters.includes(guess) && this.word.includes(guess)) {
            this.guessedLetters.push(guess)
        } else if (!this.guessedLetters.includes(guess) && !this.word.includes(guess)) {
            this.guessedLetters.push(guess)
            this.remainingGuesses--
        } else if (guess === ' ') {
            alert(`The spaces have already been entered for you!`)
        } else {
            alert(`You already entered '${guess}' as a guess, try again!`)
        }    
    
        this.calculateStatus()
        console.log(word.status)
    }
}
