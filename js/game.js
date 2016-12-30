function Game(variation, difficulty, name) {
	this.name = name || 'Game Default';
	this.variation = variation;
	this.difficulty = difficulty;
	this.gridSize = 12; // Hardcoding this for now
	this.gameArray = [];

	this.startTimer = function() {
		return true;
	};

	this.stopTimer = function() {
		return true;
	};

	this.setup = function() {
		var count = 1;
		var gameGrid = '<table class="game-board">';

		for (var i=1; i <= this.gridSize; i++) {
			gameGrid += '<tr>';
			gameArray[i] = [];

			for (var j=1; j <= this.gridSize; j++) {
				gameArray[i][j] = new Cell(i,j, this.gridSize, count);
				gameGrid += '<td id="' + gameArray[i][j].id + '" class="' + gameArray[i][j].styleClass + '">' + gameArray[i][j].name + ' (' + count + ')' + '</td>';
				count++;
			}

			gameGrid += '</tr>';
		}

		gameGrid += '</table>';

		document.getElementById('game-board-wrapper').innerHTML = gameGrid;
	}
}