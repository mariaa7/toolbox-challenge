"use strict"

var array = tiles;
var shuffled = _.shuffle(array);
console.log(array);
console.log(shuffled);

var flipped = false;

var game = $('#game-board');

//sets 16 card positions
for (var i = 0; i < 16; i++) {
	var newTile = $(document.createElement('img'));
	newTile.attr('src', 'img/tile-back.png');
	newTile.attr('width', '250px');
	newTile.attr('border', '5px solid black');
	newTile.data('assocTile', tiles[i].src);
	game.append(newTile);
}

//flips card to show image
$('#game-board img').click(function() {
	var clickedImg = $(this);
	clickedImg.attr('src', clickedImg.data('assocTile'));
});

//makes all tiles tile back
//$('#game-board img').attr('src', 'img/tile-back.png');