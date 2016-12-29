function Game(variation, difficulty, name) {
	this.name = name || 'Game Default';
	this.variation = variation;
	this.difficulty = difficulty;
	this.gridSize = 12; // Hardcoding this for now

	this.startTimer = function() {
		this.value = value;
	};

	this.stopTimer = function() {
		return this.value;
	};

	this.setup = function() {
		var gameGrid = '<table border=1 class="game-board">';

		for (var i=1; i <= this.gridSize; i++) {
			gameGrid += '<tr>';

			for (var j=1; j <= this.gridSize; j++) {
				gameGrid += '<td id="' + id + '">' + id + '</td>';
			}

			gameGrid += '</tr>';
		}

		gameGrid += '</table>';

		document.getElementById('game-board-wrapper').innerHTML = gameGrid;
	}
}