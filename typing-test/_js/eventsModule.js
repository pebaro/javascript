// Module for all Events
var eventsModule = (function (dataMod, uiMod, certificateMod, wordsMod) {

    // PRIVATE:    
    var addEventListeners = function(){

        // event for 'Enter' key
        uiMod.getDOMElements().textInput.addEventListener('keydown', function(event){

            // if test ended do nothing
            if(dataMod.testEnded()){
                return;
            }
            var key     = event.key;
            var keycode = event.keyCode;

            if(key == 'Enter' && keycode == 13){
                uiMod.getDOMElements().textInput.value += dataMod.getLineReturn() + ' ';

                // create new input event
                var inputEvent = new Event('input');

                // dispath new input event
                uiMod.getDOMElements().textInput.dispatchEvent(inputEvent);
            }
        });

        // typing characters
        uiMod.getDOMElements().textInput.addEventListener('input', function(event){

            // if test ended do nothing
            if(dataMod.testEnded()){
                return;
            }

            // if test not started, start test
            if(!dataMod.testStarted()){
                // start test: dataModule
                dataMod.startTest();

                // start counter
                var timer = setInterval(function(){
                    // calculate results: dataModule
                    var results = {};

                    // update wpm, wpmChange
                    [results.wpm, results.wpmChange] = dataMod.calculateWPM();

                    // update cpm, cpmChange
                    [results.cpm, results.cpmChange] = dataMod.calculateCPM();

                    // update accuracy, accuracyChange
                    [results.accuracy, results.accuracyChange] = dataMod.calculateAccuracy();

                    // update results: uiModule
                    uiMod.updateResults(results);

                    // check if we have time left
                    if(dataMod.timeLeft()){

                        // reduce time left by 1 second: dataModule
                        var timeLeft = dataMod.reduceTime();

                        // update time remaining in the UI
                        uiMod.updateTimeLeft(timeLeft);

                    } else {
                        // end the test
                        clearInterval(timer);
                        dataMod.endTest();

                        // fill the modal
                        uiMod.fillModal(results.wpm);

                        // display the modal
                        uiMod.showModal();
                    }

                }, 1000);
            }

            // get typed word (uiModule)
            var typedWord = uiMod.getTypedWord();

            // update current word (dataModule)
            dataMod.updateCurrentWord(typedWord);

            // format active word
            var currentWord = dataMod.getCurrentWord();
            uiMod.formatWord(currentWord);

            // check if user pressed space/enter
            if(uiMod.enterPressed(dataMod.getLineReturn()) || uiMod.spacePressed(event)){
                // console.log(event);
                // empty text input
                uiMod.emptyInput();

                // deativate current word
                uiMod.deactivateCurrentWord();

                // move to a new word (dataModule)
                dataMod.moveToNewWord();

                // set active word (uiModule)
                index = dataModule.getCurrentWordIndex();
                uiMod.setActiveWord(index);

                // format the active word (uiModule)
                currentWord = dataMod.getCurrentWord();
                uiMod.formatWord(currentWord);

                // scroll new word into vertical-middle
                uiMod.scroll();
            }
        });

        // click download button
        uiMod.getDOMElements().downloadButton.addEventListener('click', function(event){
            if(uiMod.isNameEmpty()){
                uiMod.flagNameInput();
            } else {
                var certificateData = dataMod.getCertificateData();
                certificateMod.generateCertificate(certificateData);
            }
        });

        // click restart button

    };

    // scroll test words to middle of content box on window resize
    window.addEventListener('resize', uiMod.scroll);

    // PUBLIC:
    return {
        // init: function (duration, textNumber) { 
        init: function (duration, textNumber) { 

            var words, lineReturn, testWords, timeLeft, index, currentWord;

            // lineReturn
            lineReturn = dataMod.getLineReturn();

            // textNumber = uiMod.getDOMElements().chosenList.value;
            // fill the list of test words (dataModule)
            words = wordsMod.getWords(textNumber); //get word list
            // words = wordsMod.getWords(uiMod.getDOMElements().chooseList); //get word list

            dataMod.fillListOfTestWords(textNumber, words); //fill word list

            // fill the list of test words (uiModule)
            testWords = dataMod.getListOfTestWords();

            // uiMod.fillContent_orig(testWords);
            uiMod.fillContent(testWords, lineReturn);

            // set the total test time (duration parameter)
            dataMod.setTestTime(duration);

            // update the time left (dataModule)
            dataMod.initializeTimeLeft();

            // update the time left (uiModule)
            timeLeft = dataMod.getTimeLeft();
            uiMod.updateTimeLeft(timeLeft);

            // move to a new word (dataModule)
            dataMod.moveToNewWord();

            // set active word (uiModule)
            index = dataModule.getCurrentWordIndex();
            uiMod.setActiveWord(index);

            // format the active word (uiModule)
            currentWord = dataMod.getCurrentWord();
            uiMod.formatWord(currentWord);

            // focus on text input (uiModule)
            uiMod.inputFocus();

            // add event listeners
            addEventListeners();
        }
    };

})(dataModule, uiModule, certificateModule, wordsModule);

eventsModule.init(30, 5);
