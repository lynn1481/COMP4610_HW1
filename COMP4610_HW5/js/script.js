/* 
  File: script.js
  GUI Assignment5: Implementing a Bit of Scrabble with Drag-and-Drop
  Brief Overview: 
    Implement one-line Scrabble game using JQuery UI. Users can get scores by dragging 7 hand tiles from the rack to
    the board containing the bonus squares. Also, users can restart the game or choose to proceed to the next round until all tiles
    have been used.
  
  Judy Huang, UMass Lowell Computer Science, ChiungHui_Huang@student.uml.edu 
  Copyright (c) 2023 by Judy.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author. 
  Created by JH on June 22, 2023 at 04:08 PM , Updated by JH on June 25, 2023 at 10:23 PM 
*/
/* 
  ##Sources of Help: 
    (1) W3Schools 
    (2) Get random item from array: https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
    (3) Refresh page: https://stackoverflow.com/questions/5404839/how-do-i-refresh-a-page-using-javascript
    (4) JQuery draggable & droppable: https://jqueryui.com/draggable/#revert ; https://jqueryui.com/droppable/#accepted-elements
    (5) Draggable stop Event: https://www.geeksforgeeks.org/jquery-ui-draggable-stop-event/#
    (6) Droppable out Event: https://www.geeksforgeeks.org/jquery-ui-droppable-out-event/
    (7) Access Keys With Hyphen: https://stackoverflow.com/questions/32942415/how-to-access-json-keys-with-hyphen
    (8) JacaScript Weighted Random: https://redstapler.co/javascript-weighted-random/ ; https://stackoverflow.com/questions/43566019/how-to-choose-a-weighted-random-array-element-in-javascript
    (9) Confirm that the score is calculated correctly: https://scrabblescore.online/
    (10) jQuery Selector not contain <img>: https://stackoverflow.com/questions/2624832/jquery-selector-for-div-which-does-not-contain-img
*/

var current_word = "", current_score = 0, total_score = 0;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";

// Copied from the provided 'Scrabble_Pieces_AssociativeArray_Jesse.js'
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

$(document).ready(function(){
    makeTiles();

    /* Make the tiles draggable */
    $("#tileRack div").draggable({
        revert: "invalid", // The item will revert back to its initial position when not dropped
        stop: function(event, ui) { // Trigger when the item stops being dragged
            $(this).attr("style", "position: relative;");
            updateWord();
            calcScore();
        }
    });

    /* Make the targets droppable */
    for (let i = 0; i < 15; i++) {
        var targetsID = "#t" + i;
        $(targetsID).droppable({
            accept: "#tileRack div, #targetBoard div",
            drop: function(event, ui) { // Trigger when an item is dropped on the droppable area
                $(this).append(ui.draggable);
                $(this).droppable("option", "accept", ui.draggable);
            },
            out: function(event, ui) { // Trigger when an item is dragged out of the droppable area
                $(this).droppable("option", "accept", ".tiles");
            }
        });
    }

    /* Makes it possible for an item to be placed back on the rack again after it has been placed on the target board */
    $("#tileRack").droppable({
        accept: "#targetBoard div",
        drop: function(event, ui) {
            $(this).append(ui.draggable);
        }
    });

    // When the user clicked the 'Next Round' Button, call goNextRound()
    $("#nextRound").click(function(){ goNextRound(); });
    // When the user clicked the 'Restart Game' Button, refresh the entire webpage
    $("#restartGame").click(function(){ location.reload(); });

});

/* getRandomTiles(): 
    Count the number of remaining tiles and update the current probability of each tile, 
    use weightedRandom() to get random tiles proportionally. */
function getRandomTiles() {
    var total_remaining_tiles = getTotalRemainingTiles();
    var weights = {};
    for(let i = 0; i < alphabet.length ; i++){ // Get the probability of each tile
        weights[alphabet[i]] = ScrabbleTiles[alphabet[i]]["number-remaining"]/total_remaining_tiles;
    }
    return weightedRandom(weights);
}

/* weightedRandom(): Weighted random selection function.
    This snippet refers from this site: https://redstapler.co/javascript-weighted-random/ */
function weightedRandom(prob) {
    let i, sum = 0,
        r = Math.random();
    for (i in prob) {
        sum += prob[i];
        if (r <= sum) return i;
    }
}


/* makeTiles(): 
    Randomly select 7 tiles, insert each of them with the corresponding image into the
    designated position, and make it display. */ 
function makeTiles() {
    var total_remaining_tiles = getTotalRemainingTiles();
    // When the total remaining tiles are less than 7, not to insert the image in the extra tiles div
    for( var i=0; i < 7 && i < total_remaining_tiles; i++){
        var getTile = getRandomTiles();
        if(getTile=='_'){
            $("#s"+i).append("<img src='./images/Scrabble_Tiles/Scrabble_Tile_Blank.jpg'/>");
            $("#s"+i).attr("alt", '_');
        }else{
            $("#s"+i).append("<img src='./images/Scrabble_Tiles/Scrabble_Tile_"+getTile+".jpg'/>");
            $("#s"+i).attr("alt", getTile);
        }
    }  
}

/* removeUsedTiles(): Deduct the number of used tiles and update the value of 'number-remaining' in ScrabbleTiles. */
function removeUsedTiles(word){
    for(let i = 0; i < word.length; i++){
        if(ScrabbleTiles[word[i]]["number-remaining"] != 0){
            ScrabbleTiles[word[i]]["number-remaining"]--;
        }
        else { }
    }
}


/* updateWord(): Display the words according to the tiles placed on the target board. */
function updateWord() {
    current_word = "";
    var word;
    $("#targetBoard div div").each(function() {
        if($(this).children().length > 0) {
            word = $(this).attr("alt");
        }
        current_word += word;
    });
    $("#word").text("Word: " + current_word);
}

/* calcScore(): 
    Calculate the score for a round based on where the letter is placed, 
    including consideration of bonus square multipliers. */
function calcScore() {
    var score = 0;
    for (let i = 0; i < current_word.length; i++) {
        score += ScrabbleTiles[current_word[i]].value;
    }
    if ($("#t6").children().length > 0) { // double letter score
        score += ScrabbleTiles[$("#t6").children().attr("alt")].value;
    }
    if ($("#t8").children().length > 0) { // double letter score
        score += ScrabbleTiles[$("#t8").children().attr("alt")].value;
    }
    if ($("#t2").children().length > 0) { // double word score
        score *= 2;
    }
    if ($("#t12").children().length > 0) { // double word score
        score *= 2;
    }
    $("#roundScore").text("Round Score: " + score);
    current_score = score;
}

/* getTotalRemainingTiles(): Calculate the total number of tiles remaining. */
function getTotalRemainingTiles(){
    var total_remaining_tiles = 0;
    for(let i = 0; i < alphabet.length; i++){
        total_remaining_tiles += ScrabbleTiles[alphabet[i]]["number-remaining"];
    }
    return total_remaining_tiles;
}

/* goNextRound(): Save and print the total score so far for the round,
    Bring the player's hand back to 7 tiles until all tiles are used. 
    Print an appropriate message when the user runs out of all tiles. */
function goNextRound(){
    total_score += current_score;
    removeUsedTiles(current_word);
    $(".tiles").detach().appendTo("#tileRack");
    $(".tiles img").remove();
    $(".targets").droppable("option", "accept", ".tiles");
    current_word = "";
    current_score = 0;
    $("#word").text("Word: ");
    $("#roundScore").text("Round Score: 0");
    $("#totalScore").text("Total Score: " + total_score);

    makeTiles(); // bring the player’s hand back to 7 tiles

    total_remaining_tiles = getTotalRemainingTiles()

    $(".tiles:not(:has(img)").remove(); // If a tile div doesn't contain an image, then deleted it.

    if (total_remaining_tiles == 0){ // If the user runs out of all tiles, show congratulatory messages.
        $("#word").text("Congratulations!");
        $("#roundScore").text("All tiles have been used.");
        $("#totalScore").text("Your final score is " + total_score);
    }
}