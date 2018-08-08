/*
 * Pig Game - oink oink!!!
 * =======================
 */

// set the global variables
var scores, round_score, active_player, dice_id1, game_playing;

// initialise the game
init();


/**--------------------------------------------------
 * setup the event listener for the Roll Dice button
 */
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (game_playing === true){
        // roll dice
        dice_roll = Math.ceil(Math.random() * 6);
        console.log(dice_roll);

        // display dice
        dice_id1.style.display = 'block';

        // change dice image according to the dice roll
        dice_id1.src = 'img/dice-' + dice_roll + '.png';

        if ( dice_roll !== 1 ){
            round_score += dice_roll;
            document.getElementById('current-' + active_player).textContent = round_score;
        } else {
            next_player();
        }
    }
});


/**-------------------------------------
 * setup event listener for Hold button
 */
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (game_playing === true){
        // hide the dice at the start
        dice_id1.style.display = 'none';

        // add round score to total score for player
        scores[active_player] += round_score;

        // update the UI for that player
        document.getElementById('score-' + active_player).textContent = scores[active_player];

        if ( scores[active_player] >= 25 ){
            document.getElementById('name-' + active_player).textContent = 'Winner!';

            // remove the active class from both players
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');

            // hide the dice
            dice_id1.style.display = 'none';

            // stop the game from playing further
            game_playing = false;
        } else {
            next_player();
        }
    }

});


/**---------------------------------------
 * setup event handler to New Game button
 */
document.querySelector('.btn-new').addEventListener('click', init);


/**---------------------
 * next player settings
 */
function next_player() {

    // change active player
    active_player === 0 ? active_player = 1 : active_player = 0;

    // reset the round score
    round_score = 0;

    // update the UI for the round scores
    document.getElementById('current-0').textContent = round_score;
    document.getElementById('current-1').textContent = round_score;

    // switch the active class from one player to the other
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


/**--------------------
 * initialise the game
 */
function init() {

    // allow game to play
    game_playing    = true;

    // reset scores
    scores          = [0, 0];

    // reset round score and active player
    round_score     = 0;
    active_player   = 0;

    // reset totals for each player
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    // reset the round scores for each player
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // hide the dice at the start
    dice_id1 = document.getElementById('dice-1');
    dice_id1.style.display = 'none';

    // reset the player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // apply active class to player 1
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}















