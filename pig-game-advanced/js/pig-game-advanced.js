/*
 * Pig Game - oink oink!!!
 * =======================
 */

// set the global variables
var scores, round_score, active_player, dice_id1, dice_id2, game_playing;

// initialise the game
init();

// variable for the last rolled dice
var last_dice = [0, 0];

/**--------------------------------------------------
 * setup the event listener for the Roll Dice button
 */
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (game_playing === true){
        // roll dice
        roll_dice_id1 = Math.ceil(Math.random() * 6);
        roll_dice_id2 = Math.ceil(Math.random() * 6);
        console.log( roll_dice_id1 + ' - ' + roll_dice_id2);

        // display dice
        dice_id1.style.display = 'block';
        dice_id2.style.display = 'block';

        // change dice image according to the dice roll
        dice_id1.src = 'img/dice-' + roll_dice_id1 + '.png';
        dice_id2.src = 'img/dice-' + roll_dice_id2 + '.png';

        // if exactly the same dice are rolled twice in a row
        if ( roll_dice_id1 === last_dice[0] && roll_dice_id2 === last_dice[1] ){
            alert('You Rolled The Same Dice Twice - You Now Lose Your Total Score');

            // wipe all of the current player's score
            scores[active_player] = 0;
            document.getElementById('score-' + active_player).textContent = scores[active_player];

            // hide the dice
            hide_dice();

            next_player();

        } else if ( roll_dice_id1 + roll_dice_id2 !== 2 ){
            // add the dice score to the round score
            round_score += roll_dice_id1 + roll_dice_id2;
            document.getElementById('current-' + active_player).textContent = round_score;

        } else {
            next_player();
        }

        last_dice[0] = roll_dice_id1;
        last_dice[1] = roll_dice_id2;
    }
});

/**-------------------------------------
 * setup event listener for Hold button
 */
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (game_playing === true){
        // hide the dice at the start
        hide_dice();

        // add round score to total score for player
        scores[active_player] += round_score;

        // update the UI for that player
        document.getElementById('score-' + active_player).textContent = scores[active_player];

        // set winning score target
        var input_winning_score = document.querySelector('.final-score').value;
        var winning_score_target;

        if (input_winning_score){
            winning_score_target = input_winning_score;
        } else {
            winning_score_target = 250;
        }

        if ( scores[active_player] >= winning_score_target ){
            document.getElementById('name-' + active_player).innerHTML = '<strong>Winner!</strong>';

            // remove the active class from both players
            document.querySelector('.player-0-panel').classList.add('active');
            document.querySelector('.player-1-panel').classList.add('active');

            // hide the dice
            hide_dice();

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
    last_dice[0] = 0;
    last_dice[1] = 0;
    roll_dice_id1 = 0;
    roll_dice_id2 = 0;

    // change active player
    active_player === 0 ? active_player = 1 : active_player = 0;

    // reset the round score
    round_score = 0;

    // update the round scores
    reset_round_scores();

    // switch the active class from one player to the other
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

/**--------------------
 * initialise the game
 */
function init() {
    alert('Get Ready To Play The Pig Game - Click Ok To Play');

    // allow game to play
    game_playing    = true;

    // reset scores
    scores          = [0, 0];

    // reset last dice
    last_dice = [0, 0];

    // reset round score and active player
    round_score     = 0;
    active_player   = 0;

    // reset totals for each player
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    // reset the round scores for each player
    reset_round_scores();

    // setup the dice
    dice_id1 = document.getElementById('dice-1');
    dice_id2 = document.getElementById('dice-2');
    // hide the dice
    hide_dice();

    // reset the player names
    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';

    // apply active class to player 1
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function hide_dice(){
    dice_id1.style.display = 'none';
    dice_id2.style.display = 'none';
}

function reset_round_scores(){
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
}













