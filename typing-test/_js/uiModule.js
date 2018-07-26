// Module for UI
var uiModule = (function () {

    // ===========
    // PRIVATE:
    // ===========
    var DOMelements = {
        // indicators
        timeLeft:       document.getElementById('time-left'),

        // test results
        wpm:            document.getElementById('wpm'),
        cpm:            document.getElementById('cpm'),
        accuracy:       document.getElementById('accuracy'),
        wpmChange:      document.getElementById('wpm__change'),
        cpmChange:      document.getElementById('cpm__change'),
        accuracyChange: document.getElementById('accuracy__change'),

        // user input
        textInput:      document.getElementById('typing-input'),
        nameInput:      document.getElementById('modal-name-input'),

        // test words
        content:        document.getElementById('test-content'),
        activeWord:     '',

        // modal
        modaljQuery:    $('#typing-test-modal'),
        bootstrapModal: document.getElementById('typing-test-modal'),
        modalContent:   document.querySelector('.modal-content'),
        downloadButton: document.getElementById('download-button'),

        // settings
        chooseLength:   document.getElementById('select-length'),
        chooseList:     document.getElementById('select-list')
    };

    // turn string into an array of characters
    var splitArray = function(theString){
        return theString.split('');
    };

    // add a space as the last index in an array
    var addSpace = function(arrayOfCharacters){
        arrayOfCharacters.push(' ');

        return arrayOfCharacters;
    };

    // wrap characters with <span> tags
    var addSpanTags = function(arrayOfCharacters){
        return arrayOfCharacters.map(function(currentCharacter){
            return '<span>' + currentCharacter + '</span>';
        });
    };

    // wrap each word with a <span> tag
    var addWordSpanTags = function(arrayOfWords){
        arrayOfWords.push('</span>');
        arrayOfWords.unshift('<span>');

        return arrayOfWords;
    };

    // convert the characters array to a string
    var joinTheWords = function(wordArray){
        return wordArray.join('');
    };

    // set the classes for each character
    var userValue;
    var returnCharacterClass = function(currentCharacter, index){
        return (index < userValue.length) 
            ? (currentCharacter === userValue[index] ? 'correct-character' : 'wrong-character') 
            : '0' ;
    };

    // update changes to wpm, cpm, accuracy
    var updateChange = function(value, changeElement){
        // determine class to add and HTML content to insert
        var classToAdd, html;
        [classToAdd, html] = (value >= 0) ? ['score-up', '+' + value] : ['score-down', value];

        // add percentage character to accuracy change
        if(changeElement == DOMelements.accuracyChange){
            html += '%';
        }        

        // update the change element
        changeElement.innerHTML = html;

        // style the change element
        changeElement.removeAttribute('class');
        changeElement.className = classToAdd;

        // fade element
        fadeElement(changeElement);
    };

    var fadeElement = function(element){
        element.style.borderBottomWidth = '4px';
        setTimeout(function(){
            element.style.borderBottomWidth = '2px';
        }, 100);
    };

    // ==========
    // PUBLIC:
    // ==========
    return {
        // DOM elements
        getDOMElements: function () {
            return {
                textInput:      DOMelements.textInput,
                downloadButton: DOMelements.downloadButton,
                chosenList:     DOMelements.chooseList
            };
        },

        // indicators
        updateTimeLeft: function (timeLeft) {
            DOMelements.timeLeft.innerHTML = timeLeft;
        },
        
        // test results
        updateResults: function (results) {
            // update words per minute
            DOMelements.wpm.innerHTML = results.wpm;

            // update keys per minutes
            DOMelements.cpm.innerHTML = results.cpm;

            // update accuracy
            DOMelements.accuracy.innerHTML = results.accuracy + '%';

            // update changes
            updateChange(results.wpmChange, DOMelements.wpmChange);
            updateChange(results.cpmChange, DOMelements.cpmChange);
            updateChange(results.accuracyChange, DOMelements.accuracyChange);
        },

        fillModal: function (wpm) {
            var results;
            if(wpm < 30){
                results = {
                    type: 'Snail',
                    contentClass: 'modal-snail',
                    level: 'Snail'
                };
            } else if (wpm >= 30 && wpm < 45){
                results = {
                    type: 'Turtle',
                    contentClass: 'modal-turtle',
                    level: 'Turtle'
                };
            } else if (wpm >= 45 && wpm < 60){
                results = {
                    type: 'Donkey',
                    contentClass: 'modal-donkey',
                    level: 'Donkey'
                };
            } else {
                results = {
                    type: 'Cheetah',
                    contentClass: 'modal-cheetah',
                    level: 'Cheetah'
                };
            }

            var html = '<div class="modal-text"><h2>...You Are A %type%!</h2><p>Your Typing Speed: %wpm% Words per Minute</p></div>';

            DOMelements.modalContent.classList.add(results.contentClass);

            html = html.replace('%type%', results.type);
            html = html.replace('%wpm%', wpm);
            DOMelements.nameInput.insertAdjacentHTML('beforebegin', html);

            // store level in download button
            DOMelements.downloadButton.setAttribute('level', results.level);
        },
        
        showModal: function () {
            // trigger modal with jQuery
            $('#typing-test-modal').modal('show');
        },

        // user input
        inputFocus: function () {
            DOMelements.textInput.focus();
        },
        
        isNameEmpty: function () {
            return DOMelements.nameInput.value == '';
        },
        
        flagNameInput: function () {
            DOMelements.nameInput.style.borderColor = 'red';
        },
        
        spacePressed: function (event) {
            return event.data == ' ';
        },
        
        enterPressed: function (lineReturn) {
            return DOMelements.textInput.value.includes(lineReturn + ' ');
        },
        
        emptyInput: function () {
            DOMelements.textInput.value = '';
        },

        getTypedWord: function () {
            // console.log(DOMelements.textInput.value);
            return DOMelements.textInput.value;
        },


        /***************
         * TEST WORDS
         */
        // fill container with test words
        fillContent: function(arrayOfWords, lineReturn){
            var content, contentContainer;

            content = arrayOfWords.map(splitArray);
            content = content.map(addSpace);
            content = content.map(addSpanTags);
            content = content.map(addWordSpanTags);
            content = content.map(joinTheWords);
            content = content.join('');
            content = content.split(lineReturn).join('&crarr;');

            DOMelements.content.innerHTML = content;
        },

        // format test word
        formatWord: function (wordObject) {
            var activeWord = DOMelements.activeWord;

            // highlight active word
            activeWord.className = 'active-word';

            // format individual characters
            var correctValue = wordObject.value.correct;
            userValue = wordObject.value.user;

            // add classes var
            var classes = Array.prototype.map.call(correctValue, returnCharacterClass);

            // get active word
            var activeWord = DOMelements.activeWord;
            var characters = activeWord.children;

            // add classes to characters
            for(var i = 0; i < characters.length; i++){
                characters[i].removeAttribute('class');
                characters[i].className = classes[i];
            }
        },
        
        // set the active test word
        setActiveWord: function (index) {
            DOMelements.activeWord = DOMelements.content.children[index];
        },
        
        deactivateCurrentWord: function () {
            DOMelements.activeWord.removeAttribute('class');
        },
        
        scroll: function () {
            var activeWord = DOMelements.activeWord;
            var top1 = activeWord.offsetTop;
            var top2 = DOMelements.content.offsetTop;
            var diff = top1 - top2;

            // scroll into middle
            DOMelements.content.scrollTop = diff - 40;
        }
    };
})();
