function Game(variation, difficulty, name) {
	this.name = name || 'Game Default';
	this.variation = variation;
	this.difficulty = difficulty;
	this.gridSize = 9; //  Always 9
	this.cellArray = [];
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
				this.cellArray[i][j] = new Cell(i,j, count, this.gameArray[count], this.defaultDisplay, this.gameGrids);
				//gameGrid += '<td id="' + this.cellArray[i][j].id + '" class="' + this.cellArray[i][j].styleClass + '">' + this.cellArray[i][j].name + ' (' + count + ')' + '</td>';
				gameGrid += '<td id="cell_' + count + '" class="' + this.cellArray[i][j].styleClass + '" onClick="myGame.playCell(' + i + ',' + j + ',' + count + ')">' + this.cellArray[i][j].cellValue + '</td>';
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

		this.gameRows = [];
		this.gameRows[1] = [9,6,1,7,5,8,4,2,3];
		this.gameRows[2] = [8,3,5,2,4,6,7,1,9];
		this.gameRows[3] = [4,7,2,9,3,1,8,5,6];
		this.gameRows[4] = [7,8,3,1,6,4,5,9,2];
		this.gameRows[5] = [5,2,4,3,8,9,6,7,1];
		this.gameRows[6] = [6,1,9,5,2,7,3,4,8];
		this.gameRows[7] = [1,4,6,8,7,2,9,3,5];
		this.gameRows[8] = [2,5,7,6,9,3,1,8,4];
		this.gameRows[9] = [3,9,8,4,1,5,2,6,7];

		this.gameCols = [];
		this.gameCols[1] = [9,8,4,7,5,6,1,2,3];
		this.gameCols[2] = [6,3,7,8,2,1,4,5,9];
		this.gameCols[3] = [1,5,2,3,4,9,6,7,8];
		this.gameCols[4] = [7,2,9,1,3,5,8,6,4];
		this.gameCols[5] = [5,4,3,6,8,2,7,9,1];
		this.gameCols[6] = [8,6,1,4,9,7,2,3,5];
		this.gameCols[7] = [4,7,8,5,6,3,9,1,2];
		this.gameCols[8] = [2,1,5,9,7,4,3,8,6];
		this.gameCols[9] = [3,9,6,2,1,8,5,4,7];

		this.gameGrids = [];
		this.gameGrids[1] = [1,2,3,10,11,12,19,20,21];
		this.gameGrids[2] = [4,5,6,13,14,15,22,23,24];
		this.gameGrids[3] = [7,8,9,16,17,18,25,26,27];
		this.gameGrids[4] = [28,29,30,37,38,39,46,47,48];
		this.gameGrids[5] = [31,32,33,40,41,42,49,50,51];
		this.gameGrids[6] = [34,35,36,43,44,45,52,53,54];
		this.gameGrids[7] = [55,56,57,64,65,66,73,74,75];
		this.gameGrids[8] = [58,59,60,67,68,69,76,77,78];
		this.gameGrids[9] = [61,62,63,70,71,72,79,80,81];
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

		this.selectedNumber = 0;
	};

	this.playCell = function(row, col, cellCount) {
		if (this.selectedNumber != 0 && this.defaultDisplay.indexOf(cellCount) == -1) {
			var result = this.cellArray[row][col].playNumber();

			if (result.good) {
				// Set the cell to the selected number
				document.getElementById('cell_' + cellCount).innerHTML = this.selectedNumber;
			}
		}
	}

	this.init();
}