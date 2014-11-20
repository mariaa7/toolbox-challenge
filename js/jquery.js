"use strict"

var array = tiles;
var shuffled = [];
var flippedCard;
var count = 0;
var matches = [];
var failedAttempts = 1;

console.log(array);


var flipped = false;

var game = $('#game-board');
setTiles();
$('#game-board img').click(clickTiles);

//sets 16 card positions
function setTiles() {
	shuffled = _.shuffle(array);
	shuffled = shuffled.slice(0, 8);
	shuffled = $.merge(shuffled, shuffled);
	shuffled = _.shuffle(shuffled);
	console.log(shuffled);
	for (var i = 0; i < 16; i++) {
		var newTile = $(document.createElement('img'));
		newTile.attr('src', 'img/tile-back.png');
		newTile.attr('width', '200px');
		//newTile.attr('border', '5px solid black');
		newTile.data('tile-front', shuffled[i].src);
		
		newTile.data('matched', false);
		game.append(newTile);
	}
}

//flips card to show image
//$('#game-board img').click(function() {
function clickTiles() {
	var clickedImg = $(this);
	if (!flipped && _.contains(matches, clickedImg.data('tile-front')) === false && count == 0
		&& clickedImg.hasClass('flipped') === false) {
		clickedImg.attr('src', clickedImg.data('tile-front'));
		flipped = true;
		$(this).addClass('flipped');
		flippedCard = clickedImg;
		count++;
	} else if (!clickedImg.data('matched') && count < 2 && _.contains(matches, clickedImg.data('tile-front')) === false
		&& clickedImg.hasClass('flipped') === false){
		flipped = false;
		count++;
		clickedImg.attr('src', clickedImg.data('tile-front'));
		if (clickedImg.data('tile-front') == flippedCard.data('tile-front')){
			matches.push(clickedImg.data('tile-front'));
			console.log(matches);
			count = 0;
			$('#matches').html("Total Matches: " + matches.length);
			$('#remainingMatches').html("Remaining Matches: " + (8 - matches.length));
			if(matches.length === 8) {
				alert("You Won!"); //change to function
			}
		} else {
			setTimeout(function(){flippedCard.attr('src', 'img/tile-back.png')}, 1000);
			setTimeout(function(){clickedImg.attr('src', 'img/tile-back.png')}, 1000);
			setTimeout(function(){count = 0}, 1000);
			$('img').removeClass('flipped');
			$('#failedAttempts').html("Failed Attempts: " + failedAttempts++);
		}
	}
//});
}

//not working, doesn't flip on click
$('#newGame').click(function() {
	game.empty();
	matches = [];
	$('#matches').html("Total Matches: " + 0);
	$('#failedAttempts').html("Failed Attempts: " + 0);
	$('#remainingMatches').html("Remaining Matches: " + (8 - matches.length));
	setTiles();
	$('#game-board img').click(clickTiles);
});

/*var startTime = _.now();
var timer = window.setInterval(onTimer, 1000);
function onTimer() {
	var totalSecs = Math.floor((_.now() - startTime)/ 1000);
	$('#time').html(totalSecs);
}*/

//makes all tiles tile back
//$('#game-board img').attr('src', 'img/tile-back.png');