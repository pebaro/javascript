Notes Application 

This is a simple but affective application for taking down notes comprising of a title and body for each. The app is written with ES6 and makes use of the ‘class’ syntax and features such as ‘arrow functions’. 

Using localstorage to store the data for this app – so you will need to create some notes. I would recommend creating at least 4 notes to give you the ability to fully test all features. I would give the notes the simple titles, something like: First, Second, Third, Fourth or One, Two, Three, Four 

This will allow testing of the ‘a to z’ and the ‘z to a’ filters, as well as changing the order when testing the newest to oldest and oldest to newest filters. 

For testing the most recently edited filter I would open up either Second or Third and perform edits before testing. This will allow you to see that this filter option is working correctly. 

The other reason for these names is that when you test the text input filter it makes it quick to just insert the letters f or I or o or t followed by a second letter to filter down further. 

I have set this up in a way that will auto-update the content across multiple tabs at the same time without the need for doing a refresh in any second or third etc. open tabs to see any changes. if you pull two tabs side by side and make a change in one, you will see that change happen in both tabs at the same time, regardless of whether you are in the main list screen or the editing screen, or whether you delete from the main list or use the delete button in the edit screen, you will still see changes happen in both tabs or multiple tabs at the same time. 


=================== 
The JavaScript Code 
-------------------
The main class: notes-functions.js 
The editing functions / event listeners: notes-edit.js 
The app controller / event listeners: notes-app.js 
External library for unique ID generation: uuidv4.min.js 

Running the Application 
index.html 

The edit page HTML: edit.html 
