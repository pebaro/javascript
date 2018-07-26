/**
 * set the test time
 */

/** launch test *****
 * launch test var boolean true/false
 * check if there is any time left var boolean true/false
 * 
 * if time left var boolean true
 *  - calculate results
 *  - calculate new time
 *  - calculate changes
 * 
 * if no time left var boolean false
 *  - end the test
 */

/** typing a character *****
 * has test ended boolean true/false
 *  - if test ended = false
 *  - - check if test has started boolean true/false
 * 
 *  - if test started = false
 *  - - launch the test (top of this module)
 */

/**
 * Data Module    
 */

//////////////
// PUBLIC
// ------------------------------
/** Indicators/Test Control *****
 * Launch Test - startTest(){ change testStarted to true }
 * - any time left? - timeLeft(){ check var timeLeft for true/false }
 * 
 * End Test - endTest(){ changed testEnded to true }
 * - test ended - testEnded(){ check var testEnded for true/false }
 * 
 * Calculate New Time - reduceTime(){ access timeLeft and -1 }
 * - test started - testStarted(){ check var testStarted for true/false }
 * 
 * Set Test Time - setTestTime(param){ set var totalTestTime }
 * initializeTimeLeft(){ initialize timeLeft variable }
 */

/** Test Results *****
 * Calculate Results
 *  - calculateWPM(){ calculate var wpm, wpmChange }
 *  - calculateCPM(){ calculate var cpm, cpmChange }
 *  - calculateAccuracy(){ calculate var accuracy, accuracyChange }
 */

/////////////
// PRIVATE
// ----------------------------
/** Indicators/Test Control *****
 * var testStarted - false
 * var testEnded - false
 * var timeLeft - set by reduceTime()
 * var totalTestTime - set by setTestTime()
 */

/** Test Results *****
 * var wpm
 * var cpm
 * var accuracy
 * 
 * var wpmChange
 * var cpmChange
 * var accuracyChange
 */

// Module for App Data
var dataModule = (function () {

    // PRIVATE:
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
            
            numbOfCorrectWords:     0,
            numbOfCorrectChars:     0,
            numbOfTestChars:        0
        },

        words: {
            currentWordIndex:       0,
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
        }

    };

    // word constructor
    var word = function () { };
    // update method
    word.prototype.update = function (value) { };

    // PUBLIC:
    return {
        /**************
         * INDICATORS
         */
        // set test time
        setTestTime: function (testTime) { },
        
        // initialise time left to total test time
        initializeTimeLeft: function () { },

        // start test
        startTest: function () { },

        // end test
        endTest: function () { },
        
        // reduce time 1 second increments
        reduceTime: function () { },
        
        // checks for time left to continue with test
        timeLeft: function () { },
        
        // checks if test has ended already
        testEnded: function () { },
        
        // check if test has started
        testStarted: function () { },

        // get remaining time appData.timeLeft
        getTimeLeft: function () { },
        
        /***********
         * RESULTS
         */
        // calculate WPM and WPM changes - update in appData
        calculateWPM: function () { },

        // calculate CPM and CPM changes - update in appData
        calculateCPM: function () { },
        
        // calculate accuracy and accuracy changes - update in appData
        calculateAccuracy: function () { },
        
        /***********
         * TEST WORDS
         */
        // fill test words from customer lists
        fillListOfTestWords: function (textNumber) { },

        // get list of test words
        getListOfTestWords: function () { },

        // update current word by creating new instance of word class
        moveToNewWord: function (index) { },

        /***********
         * WORD CLASS
         */
        // update current word using current user input
        updateCurrentWord: function (value) { }
    };

})();

/** launch test *****
 * page loads
 * press restart
 * 
 * if no time left
 *  - click on download button
 * 
 */

/** typing a character *****
 * type a character
 * 
 */

// Module for all Events
var eventsModule = (function () {

    // PRIVATE:
    var addEventListeners = function(){
        // typing characters

        // click download button

        // click restart button

    };

    // PUBLIC:
    return {
        init: function (duration, textNumber) { 
            addEventListeners();
        },
    };

})();


// Module for Words
var wordsModule = (function () {
    
    // PRIVATE:
    var words = [];

    // PUBLIC:
    return {
        getWords: function (textNumber) { 
            return words[textNumber];
        },
    };

})();


    /** launch test *****
     * fill content box with text
     * highlight the first word
     * focus on text input
     * set remaining amount of time for the test
     * 
     * if time left 
     *  - display results
     *  - display new time
     *  - display updated changes
     * 
     * if no time left
     *  - show the result message
     * 
     * if download button clicked
     *  - check if name exists in the input field
     *  - - if no name then highlight input field in red
     * 
     */

    /** typing a character *****
     * check which character is typed - classed UI because of how it's handled in the code
     * 
     * if space/enter is pressed
     *  - format current word
     *  - un-highlight current word
     *  - highlight next word
     *  - scroll new word into middle of view (end of line)
     * 
     *  - empty text input
     * 
     * if other character is pressed
     *  - format current word
     */

    /////////////
    // PRIVATE
    // ----------------------------
    /*** Indicators/Test Controls ***
     * var timeLeft = document.getElementById('time-left');
     * 
    /*** Test Results ***
     * var wpm
     * var cpm
     * var accuracy
     * 
     * var wpmChange
     * var cpmChange
     * var accuracyChange
     * 
    /*** User Input ***
     * var textInput
     * var nameInput
     * 
    /*** Test Words ***
     * var content
     * var activeWord
     * 
    /*** Modal ***
     * var modal
     * 
     */

    /////////////
    // PUBLIC
    // ----------------------------
    /*** Indicators/Test Controls ***
     * updateTimeLeft(){ set time left }
     *
    /*** Test Results ***
     * updateResults(){ update results/changes HTML }
     * fillModal(){ fill modal with content }
     * showModal(){ show result message }
     *
    /*** User Input ***
     * inputFocus(){ focus on input }
     * isNameEmpty(){ check if name exists }
     * flagNameInput(){ highlight name input in red - use same nameInput var }
     * which character is typed?
     *  - spacePressed()
     *  - enterPressed()
     *  - if neither spacePressed/enterPressed then something else was pressed, hence only 2 methods
     * emptyInput(){ empty the text input field }
     *
    /*** Test Words ***
     * fillContent(theContent){}
     * formatCurrentWord(){ format current word, highlight next word }
     * setActiveWord(){ highlight the first word }
     * deativateCurrentWord(){ un-highlight current word }
     * scroll(){ scroll new word into vertical middle of view - use activeWord var }
     */

// Module for UI
var uiModule = (function () {

    // PRIVATE:
    var DOMelements = {
        // indicators
        timeLeft:       0,

        // test results
        wpm:            0,
        cpm:            0,
        accuracy:       0,
        wpmChange:      0,
        cpmChange:      0,
        accuracyChange: 0,

        // user innput
        textInput:      0,
        nameInput:      0,

        // test words
        content:        0,
        activeWord:     0,

        // modal
        modal:          0
    };

    // PUBLIC:
    return {
        // DOM elements
        getDOMElements: function () { },


        // indicators
        updateTimeLeft: function () { },
        

        // test results
        updateResults: function () { },

        fillModal: function () { },
        
        showModal: function () { },


        // user input
        inputFocus: function () { },
        
        isNameEmpty: function () { },
        
        flagNameInput: function () { },
        
        spacePressed: function () { },
        
        enterPressed: function () { },
        
        emptyInput: function () { },

        getTypedWord: function () { },


        // test words
        fillContent: function () { },
        
        formatWord: function (wordObject, wordHTML) { },
        
        setActiveWord: function (index) { },
        
        deactivateCurrentWord: function () { },
        
        scroll: function () { },
    };
})();

/** launch test *****
 * generate certificate
 * 
 */

/** typing a character *****
 * 
 */

// Module for Certificate
var certificateModule = (function () {
    // PUBLIC:
    return {
        generateCertificate: function () {
            //
        },
    };
})();
