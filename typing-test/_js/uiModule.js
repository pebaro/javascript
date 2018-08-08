// Module for UI
const uiModule = (() => {

    // ===========
    // PRIVATE:
    // ===========
    const DOMelements = {
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
    const splitArray = (theString) => {
        return theString.split('');
    };

    // add a space as the last index in an array
    const addSpace = (arrayOfCharacters) => {
        arrayOfCharacters.push(' ');

        return arrayOfCharacters;
    };

    // wrap characters with <span> tags
    const addSpanTags = (arrayOfCharacters) => {
        return arrayOfCharacters.map((currentCharacter) => {
            return '<span>' + currentCharacter + '</span>';
        });
    };

    // wrap each word with a <span> tag
    const addWordSpanTags = (arrayOfWords) => {
        arrayOfWords.push('</span>');
        arrayOfWords.unshift('<span>');

        return arrayOfWords;
    };

    // convert the characters array to a string
    const joinTheWords = (wordArray) => {
        return wordArray.join('');
    };

    // set the classes for each character
    let userValue;
    const returnCharacterClass = (currentCharacter, index) => {
        return (index < userValue.length) 
            ? (currentCharacter === userValue[index] ? 'correct-character' : 'wrong-character') 
            : '0' ;
    };

    // update changes to wpm, cpm, accuracy
    const updateChange = (value, changeElement) => {
        // determine class to add and HTML content to insert
        let classToAdd, html;
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

    const fadeElement = (element) => {
        element.style.borderBottomWidth = '4px';
        setTimeout(() => {
            element.style.borderBottomWidth = '2px';
        }, 100);
    };

    // ==========
    // PUBLIC:
    // ==========
    return {
        // DOM elements
        getDOMElements: () => {
            return {
                textInput:      DOMelements.textInput,
                downloadButton: DOMelements.downloadButton,
                chosenList:     DOMelements.chooseList
            };
        },

        // indicators
        updateTimeLeft: (timeLeft) => {
            DOMelements.timeLeft.innerHTML = timeLeft;
        },
        
        // test results
        updateResults: (results) => {
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

        fillModal: (wpm) => {
            let results;
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

            const html = '<div class="modal-text"><h2>...You Are A %type%!</h2><p>Your Typing Speed: %wpm% Words per Minute</p></div>';

            DOMelements.modalContent.classList.add(results.contentClass);

            html = html.replace('%type%', results.type);
            html = html.replace('%wpm%', wpm);
            DOMelements.nameInput.insertAdjacentHTML('beforebegin', html);

            // store level in download button
            DOMelements.downloadButton.setAttribute('level', results.level);
        },
        
        showModal: () => {
            // trigger modal with jQuery
            $('#typing-test-modal').modal('show');
        },

        // user input
        inputFocus: () => {
            DOMelements.textInput.focus();
        },
        
        isNameEmpty: () => {
            return DOMelements.nameInput.value == '';
        },
        
        flagNameInput: () => {
            DOMelements.nameInput.style.borderColor = 'red';
        },
        
        spacePressed: () => {
            return event.data == ' ';
        },
        
        enterPressed: (lineReturn) => {
            return DOMelements.textInput.value.includes(lineReturn + ' ');
        },
        
        emptyInput: () => {
            DOMelements.textInput.value = '';
        },

        getTypedWord: () => {
            // console.log(DOMelements.textInput.value);
            return DOMelements.textInput.value;
        },


        /***************
         * TEST WORDS
         */
        // fill container with test words
        fillContent: (arrayOfWords, lineReturn) => {
            let content, contentContainer;

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
        formatWord: (wordObject) => {
            const activeWord = DOMelements.activeWord;

            // highlight active word
            activeWord.className = 'active-word';

            // format individual characters
            const correctValue = wordObject.value.correct;
            userValue = wordObject.value.user;

            // add classes var
            const classes = Array.prototype.map.call(correctValue, returnCharacterClass);

            // get active word
            const activeWord = DOMelements.activeWord;
            const characters = activeWord.children;

            // add classes to characters
            for(let i = 0; i < characters.length; i++){
                characters[i].removeAttribute('class');
                characters[i].className = classes[i];
            }
        },
        
        // set the active test word
        setActiveWord: (index) => {
            DOMelements.activeWord = DOMelements.content.children[index];
        },
        
        deactivateCurrentWord: () => {
            DOMelements.activeWord.removeAttribute('class');
        },
        
        scroll: () => {
            const activeWord = DOMelements.activeWord;
            const top1 = activeWord.offsetTop;
            const top2 = DOMelements.content.offsetTop;
            const diff = top1 - top2;

            // scroll into middle
            DOMelements.content.scrollTop = diff - 40;
        }
    };
})();
