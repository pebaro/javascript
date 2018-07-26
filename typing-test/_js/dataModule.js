// Module for App Data
var dataModule = (function () {

    // ==========
    // PRIVATE:
    // ==========

    const lineReturn = '|';

    // shuffle function
    const shuffle = (array) => {

        let newArray = [], randomIndex, randomElement;

        while(array.length > 0){

            // generate a random index
            randomIndex = Math.floor( Math.random() * array.length );
            
            // select a random element
            randomElement = array[randomIndex];
            
            // add random element to the new array
            newArray.push(randomElement);
            
            // remove same element from original array
            array.splice(randomIndex, 1);
        }
        return newArray;
    };

    // random capitalisation function
    String.prototype.upperCaseFirst = (string) => {

        let newString, firstCharacter, remainingCharacters;

        // start newString as an empty string
        newString = '';

        // capitalise first character of string
        firstCharacter = this.charAt(0).toUpperCase();

        // get remaining characters
        remainingCharacters = this.slice(1);

        // output capitalised string
        newString = firstCharacter + remainingCharacters;

        return newString;
    };

    var capitaliseRandomWords = function(arrayOfStrings){
        return arrayOfStrings.map(function(currentWord){
            var capitaliseIndex = Math.floor(8 * Math.random()); // 15% chance
            return (capitaliseIndex == 7) ? currentWord.upperCaseFirst() : currentWord;
        });
    };

    // random punctuation function
    var addRandomPunctuation = function(arrayOfStrings){
        return arrayOfStrings.map(function(currentWord){
            var punctuation, randomPunctuation;

            punctuation = [lineReturn, lineReturn, '?', '!', '.', '.', '.', ',', ',', ',', ',', ',', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

            randomIndex = Math.floor(punctuation.length * Math.random());
            randomPunctuation = punctuation[randomIndex];

            return currentWord + randomPunctuation;
        });
    };                                                                                                                                        
    // callback to check no. correct characters inside current word
    var numberCorrectCharacters;
    var characterCallback = function(currentElement, index){
        numberCorrectCharacters += (currentElement == appData.words.currentWord.characters.user[index]) 
            ? 1 : 0;
    };

    var appData = {

        indicators: {
            testStarted:            false,
            testEnded:              false,
            timeLeft:               0,
            totalTestTime:          0
        },

        results: {
            wpm:                    0,
            cpm:                    0,
            accuracy:               0,

            wpmChange:              0,
            cpmChange:              0,
            accuracyChange:         0,
            
            numberOfCorrectWords:   0,
            numberOfCorrectChars:   0,
            numberOfTestChars:      0
        },

        words: {
            currentWordIndex:       -1,
            testWords:              [],
            currentWord: {
                value: {
                    user:           '',
                    correct:        '',
                    isCorrect:      false
                },
                characters: {
                    correct:        [],
                    user:           [],
                    totalCorrect:   0,
                    totalTest:      0
                }
            }
        },
    };

    // word constructor
    var word = function (index) {

        // values: correct, user, boolean
        this.value = {
            correct:    appData.words.testWords[index] + ' ',
            user:       '',
            isCorrect:  false
        };

        // characters: correct, user, totalCorrect, totalTest
        this.characters = {
            correct:        this.value.correct.split(''),
            user:           [],
            totalCorrect:   0,
            totalTest:      this.value.correct.length
        };
    };

    // update method using word typed by user
    word.prototype.update = function (value) {
        
        // update user input
        this.value.user = value;

        // update the word status (correct/incorrect)
        this.value.isCorrect = (this.value.correct === this.value.user);

        // update user characters
        this.characters.user = this.value.user.split('');

        // set starting value for use in characterCallback
        numberCorrectCharacters = 0;

        // set 'this' in characterCallback to the 'word' object
        characterCallback = characterCallback.bind(this);

        // calculate correct no. of characters
        this.characters.correct.forEach(characterCallback);
        this.characters.totalCorrect = numberCorrectCharacters;
    };

    
    // ==========
    // PUBLIC:
    // ==========

    return {

        /**************
         * INDICATOR
         */
        // set test time
        setTestTime: function (setTotalTestTime) {
            appData.indicators.totalTestTime = setTotalTestTime;
        },
        
        // initialise time left to total test time
        initializeTimeLeft: function () {
            appData.indicators.timeLeft = appData.indicators.totalTestTime;
        },

        // start test
        startTest: function () {
            appData.indicators.testStarted = true;
        },

        // end test
        endTest: function () {
            appData.indicators.testEnded = true;
        },
        
        // reduce time 1 second increments
        reduceTime: function () {
            // reduce time by 1 second
            appData.indicators.timeLeft--;

            return appData.indicators.timeLeft;
        },
        
        // checks for time left to continue with test
        timeLeft: function () {
            return appData.indicators.timeLeft != 0;
        },
        
        // checks if test has ended already
        testEnded: function () {
            return appData.indicators.testEnded;
        },
        
        // check if test has started
        testStarted: function () {
            return appData.indicators.testStarted;
        },

        // get remaining time appData.timeLeft
        getTimeLeft: function () {
            return appData.indicators.timeLeft;
        },
        
        /***********
         * RESULTS
         */
        // calculate WPM and WPM changes - update in appData
        calculateWPM: function () { 

            var wpmOld               = appData.results.wpm;
            var wpmChange            = appData.results.wpmChange;
            var numberOfCorrectWords = appData.results.numberOfCorrectWords;
            var timeLeft             = appData.indicators.timeLeft;
            var totalTestTime        = appData.indicators.totalTestTime;

            if(timeLeft != totalTestTime){
                appData.results.wpm = Math.round(60 * numberOfCorrectWords / (totalTestTime - timeLeft));
            } else {
                appData.results.wpm = 0;
            }
            wpmChange = appData.results.wpm - wpmOld;

            // console.log('wpm = ' + appData.results.wpm);
            // console.log('wpmChange = ' + wpmChange);

            return [appData.results.wpm, wpmChange];
        },

        // calculate CPM and CPM changes - update in appData
        calculateCPM: function () {

            var cpmOld                      = appData.results.cpm;
            var cpmChange                   = appData.results.cpmChange;
            var numberOfCorrectCharacters   = appData.results.numberOfCorrectChars;
            var timeLeft                    = appData.indicators.timeLeft;
            var totalTestTime               = appData.indicators.totalTestTime;

            if(timeLeft != totalTestTime){
                appData.results.cpm = 
                Math.round(60 * numberOfCorrectCharacters / (totalTestTime - timeLeft));
            } else {
                appData.results.cpm = 0;
            }
            cpmChange = appData.results.cpm - cpmOld;

            // console.log('cpm = ' + appData.results.cpm);
            // console.log('cpmChange = ' + cpmChange);

            return [appData.results.cpm, cpmChange];
        },
        
        // calculate accuracy and accuracy changes - update in appData
        calculateAccuracy: function () {

            var accuracyOld                 = appData.results.accuracy;
            var accuracyChange              = appData.results.accuracyChange;
            var numberOfCorrectCharacters   = appData.results.numberOfCorrectChars;
            var numberOfTestCharacters      = appData.results.numberOfTestChars;
            var timeLeft                    = appData.indicators.timeLeft;
            var totalTestTime               = appData.indicators.totalTestTime;

            if(timeLeft != totalTestTime){
                if(numberOfTestCharacters != 0){
                    appData.results.accuracy = Math.round((numberOfCorrectCharacters / numberOfTestCharacters) * 100);    
                } else {
                    appData.results.accuracy = appData.results.accuracy;
                }
            } else {
                appData.results.accuracy = 0;
            }
            accuracyChange = appData.results.accuracy - accuracyOld;

            // console.log('accuracy = ' + appData.results.accuracy);
            // console.log('accuracyChange = ' + accuracyChange);

            return [appData.results.accuracy, accuracyChange];
        },
        
        /***********
         * TEST WORDS
         */
        // fill test words from customer lists
        fillListOfTestWords: function (textNumber, words) { 
            var result = words.split(' ');

            if(textNumber === 0){
                // shuffle words
                result = shuffle(result);
                // capitalise random words
                result = capitaliseRandomWords(result);
                // add random punctuation
                result = addRandomPunctuation(result);
            }
            appData.words.testWords = result;
        },

        // get list of test words
        getListOfTestWords: function () { 
            return appData.words.testWords;
        },

        // update by creating new instance of word class
        moveToNewWord: function (index) {
            var newWord, currentIndex;

            if(appData.words.currentWordIndex > -1){
                // update numberOfCorrectWords
                if(appData.words.currentWord.value.isCorrect == true){
                    appData.results.numberOfCorrectWords++;
                }
                // update numberOfCorrectChars
                appData.results.numberOfCorrectChars += appData.words.currentWord.characters.totalCorrect;
                // update numberOfTestChars
                appData.results.numberOfTestChars += appData.words.currentWord.characters.totalTest;
            }
            appData.words.currentWordIndex++;

            currentIndex = appData.words.currentWordIndex;
            newWord = new word(currentIndex);

            appData.words.currentWord = newWord;
        },

        // get current word index
        getCurrentWordIndex: function(){
            return appData.words.currentWordIndex;
        },

        // get current word
        getCurrentWord: function(){
            var currentWord = appData.words.currentWord;
            return {
                value: {
                    correct: currentWord.value.correct,
                    user: currentWord.value.user
                }
            };
        },

        // update current word using current user input
        updateCurrentWord: function (value) {
            appData.words.currentWord.update(value);
        },

        // get the line return
        getLineReturn: function(){
            return lineReturn;
        },

        // get certificate data
        getCertificateData: function(){
            return {
                wpm:      appData.results.wpm,
                accuracy: appData.results.accuracy
            };
        },

        // for testing
        returnData: function(){
            console.log(appData);
        }
    };

})();
