===================================
The Pig Game (Version 2 – Advanced) 
===================================

This is the second of two versions of this game using two dice and two sets of images, extended rules and an extended UI with user control over the score needed to win a game. 

When a new game is started the UI resets – all scores are reset to zero, both dice are hidden, player 1 is selected to start the new game and an alert is triggered telling the players to get ready for the new game. 

If a double 1 is rolled then the player loses any score they have built up in that round so far but not the total score that comes from clicking hold. 

If two doubles are rolled consecutively then all of the players’ scores will be wiped – the score for that round and the total score for that player. 

If either a double 1 or two consecutive doubles are rolled the other player is also selected to take their turn. 

The input field for ‘Winning Score’ can be used to set the target for the score that wins the game. If nothing is set then the game uses the default setting of 250 points. 

When a player clicks hold their score in that round gets added to their total and the game selects the other player to take their turn. 

If clicking the hold button results in a total score that exceeds the target winning score then the player will win the game – this changes the players message to let all players know that the game has been won. 

The dice images change to match the numbers rolled when clicking the ‘roll dice’ button 

====================
The JavaScript Code:
--------------------
The single js file: pig-game-advanced.js 


Running the Game: 
pig-game-advanced.html 

 
