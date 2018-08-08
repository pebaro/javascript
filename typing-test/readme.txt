Typing Speed & Accuracy Test (with Certificate) 

This application tests your typing speed using ‘Words / min’ (words per minute) and your typing accuracy using ‘Keys / min’ (keys per minutes). Once the test is complete a modal asks for your full name and then after entering this and clicking ‘Download Certificate’, a pdf certificate downloads with your name, your typing speed, your typing accuracy, the level achieved and the date. 

There are 6 lists of words to choose from for the test and the time that the test runs for can be set to anything you want. 5 of the word lists are pre-written paragraphs of text with punctuation and carriage returns, plus another word list which is a dictionary list of words. If the dictionary word list is chosen then the program with randomise the words and also add random punctuation and random carriage returns 

For demonstration purposes I have set the test to use Wordlist 2 and run for 60 Seconds. 

NOTE: I will be adding a section where the user can input the setting on the front end without having to change code. Until I have done this, settings are changed in the file eventsModule.js using the call for eventsModule.init( ‘time-in-seconds', ‘choice-of-wordlist' ) 

Module-based programming using Bootstrap for layout, a base for styling and the modal at the end. 

Planning of Application 
This software was planned using a single file which was then split up and written out in stages. The planning can be viewed using: planning.js 

============================
Checking the JavaScript Code
Here are the files that make up the typing test:

The words module - wordsModule.js 
The certificate module - certificateModule.js 
The data module - dataModule.js 
The UI module - uiModule.js 
The events module - eventsModule.js 
...................................

====================
Take the Typing Test:
After page load the test will start when you type the first letter. You can start a new test by clicking ‘New Test’ then the time will begin when you type the first character. 

To run the demonstration use: index.html 
........................................
