function Game(variation, difficulty, name) {
	this.name = name || 'Game Default';
	this.variation = variation;
	this.difficulty = difficulty;
	this.gridSize = 9; //  Always 9
	this.cellArray = [];
	this.subGridArray = [];
	this.selectedNumber = 0;

	this.init = function() {
		this.getBaseGameArray();
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
				this.cellArray[i][j] = new Cell(i,j, count, this.gameArray[count], this.defaultDisplay);
				//gameGrid += '<td id="' + this.cellArray[i][j].id + '" class="' + this.cellArray[i][j].styleClass + '">' + this.cellArray[i][j].name + ' (' + count + ')' + '</td>';
				gameGrid += '<td id="cell_' + count + '" class="' + this.cellArray[i][j].styleClass + '" onClick="myGame.playCell(' + count + ')">' + this.cellArray[i][j].cellValue + '</td>';
				count++;
			}

			gameGrid += '</tr>';
		}

		gameGrid += '</table>';

		document.getElementById('game-board-wrapper').innerHTML = gameGrid;
	};

	this.getBaseGameArray = function() {
		//this.gameArray = [0,5,2,4,9,6,8,1,7,3,7,6,9,2,1,3,5,4,8,8,3,1,5,7,4,9,6,2,1,9,3,7,2,6,8,5,4,2,5,8,4,9,1,7,3,6,6,4,7,8,3,5,2,9,1,4,1,5,3,8,7,6,2,9,3,8,2,6,5,9,4,1,7,9,7,6,1,4,2,3,8,5];
		this.gameArray = [0,9,6,1,7,5,8,4,2,3,8,3,5,2,4,6,7,1,9,4,7,2,9,3,1,8,5,6,7,8,3,1,6,4,5,9,2,5,2,4,3,8,9,6,7,1,6,1,9,5,2,7,3,4,8,1,4,6,8,7,2,9,3,5,2,5,7,6,9,3,1,8,4,3,9,8,4,1,5,2,6,7];
		this.defaultDisplay = [1,5,8,11,12,14,17,18,19,20,23,27,28,33,39,43,49,54,55,59,62,63,64,65,68,70,71,74,77,81];
	};

	this.playNumber = function(number) {
		this.clearNumbers();
		
		for (var i=1; i <= this.gridSize; i++) {
			for (var j=1; j <= this.gridSize; j++) {
				if (this.cellArray[i][j].cellValue == number) {
					document.getElementById('cell_' + this.cellArray[i][j].cellCount).classList.add('selectedNumber');
				}
			}
		}

		this.selectedNumber = number;
	};

	this.clearNumbers = function() {
		for (var i=1; i <= this.gridSize; i++) {
			for (var j=1; j <= this.gridSize; j++) {
				document.getElementById('cell_' + this.cellArray[i][j].cellCount).classList.remove('selectedNumber');
			}
		}
	};

	this.playCell = function(cellCount) {
		if (this.selectedNumber != 0 && this.defaultDisplay.indexOf(cellCount) == -1) {
			document.getElementById('cell_' + cellCount).innerHTML = this.selectedNumber;
		}
	}

	this.init();
}