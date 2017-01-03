function Game(variation, difficulty, name) {
	this.name = name || 'Game Default';
	this.variation = variation;
	this.difficulty = difficulty;
	this.gridSize = 9; //  Always 9
	this.cellArray = [];
	this.subGridArray = [];
	this.gameArray = [0,5,2,4,9,6,8,1,7,3,7,6,9,2,1,3,5,4,8,8,3,1,5,7,4,9,6,2,1,9,3,7,2,6,8,5,4,2,5,8,4,9,1,7,3,6,6,4,7,8,3,5,2,9,1,4,1,5,3,8,7,6,2,9,3,8,2,6,5,9,4,1,7,9,7,6,1,4,2,3,8,5];

	this.init = function() {
		this.setup();
	};

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
			this.cellArray[i] = [];

			for (var j=1; j <= this.gridSize; j++) {
				this.cellArray[i][j] = new Cell(i,j, count, this.gameArray[count]);
				//gameGrid += '<td id="' + this.cellArray[i][j].id + '" class="' + this.cellArray[i][j].styleClass + '">' + this.cellArray[i][j].name + ' (' + count + ')' + '</td>';
				gameGrid += '<td id="' + this.cellArray[i][j].id + '" class="' + this.cellArray[i][j].styleClass + '">' + this.cellArray[i][j].cellValue + '</td>';
				count++;
			}

			gameGrid += '</tr>';
		}

		gameGrid += '</table>';

		document.getElementById('game-board-wrapper').innerHTML = gameGrid;
	};

	this.init();
}