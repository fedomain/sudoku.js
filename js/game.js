function Game(variation, difficulty, name) {
	this.name = name || 'Game Default';
	this.variation = variation;
	this.difficulty = difficulty;
	this.gridSize = 9; //  Always 9
	this.cellArray = [];
	this.selectedNumber = 0;
	this.cellCountArray = []; // Reverse lookup of cells using the cell count

	this.init = function() {
		this.getGameBoard();
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
				this.cellArray[i][j] = new Cell(i,j, count, this.gameBoard);
				this.cellCountArray[count] = [i,j];
				//gameGrid += '<td id="' + this.cellArray[i][j].id + '" class="' + this.cellArray[i][j].styleClass + '">' + this.cellArray[i][j].name + ' (' + count + ')' + '</td>';
				gameGrid += '<td id="cell_' + count + '" class="' + this.cellArray[i][j].styleClass + '" onClick="myGame.playCell(' + i + ',' + j + ',' + count + ')">' + this.cellArray[i][j].cellValue + '</td>';
				count++;
			}

			gameGrid += '</tr>';
		}

		gameGrid += '</table>';

		document.getElementById('game-board-wrapper').innerHTML = gameGrid;
	};

	this.getGameBoard = function() {
		this.gameBoard = {};

		this.gameBoard.gameArray = [0,9,6,1,7,5,8,4,2,3,8,3,5,2,4,6,7,1,9,4,7,2,9,3,1,8,5,6,7,8,3,1,6,4,5,9,2,5,2,4,3,8,9,6,7,1,6,1,9,5,2,7,3,4,8,1,4,6,8,7,2,9,3,5,2,5,7,6,9,3,1,8,4,3,9,8,4,1,5,2,6,7];
		this.gameBoard.defaultDisplay = [1,5,8,11,12,14,17,18,19,20,23,27,28,33,39,43,49,54,55,59,62,63,64,65,68,70,71,74,77,81];

		var temp = [];
		temp[1] = [1,2,3,10,11,12,19,20,21];
		temp[2] = [4,5,6,13,14,15,22,23,24];
		temp[3] = [7,8,9,16,17,18,25,26,27];
		temp[4] = [28,29,30,37,38,39,46,47,48];
		temp[5] = [31,32,33,40,41,42,49,50,51];
		temp[6] = [34,35,36,43,44,45,52,53,54];
		temp[7] = [55,56,57,64,65,66,73,74,75];
		temp[8] = [58,59,60,67,68,69,76,77,78];
		temp[9] = [61,62,63,70,71,72,79,80,81];

		this.gameBoard.gameGrids = temp;

		var temp = [];
		temp[1] = [1,2,3,4,5,6,7,8,9];
		temp[2] = [10,11,12,13,14,15,16,17,18];
		temp[3] = [19,20,21,22,23,24,25,26,27];
		temp[4] = [28,29,30,31,32,33,34,35,36];
		temp[5] = [37,38,39,40,41,42,43,44,45];
		temp[6] = [46,47,48,49,50,51,52,53,54];
		temp[7] = [55,56,57,58,59,60,61,62,63];
		temp[8] = [64,65,66,67,68,69,70,71,72];
		temp[9] = [73,74,75,76,77,78,79,80,81];

		this.gameBoard.gameRowCols = temp;
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
		var selectedRow = row;
		var selectedCol = col;
		var selectedCellCount = cellCount;
		var result = {};
		var subGridid = this.cellArray[row][col].getSubGridID();

		if (this.selectedNumber != 0 && this.gameBoard.defaultDisplay.indexOf(cellCount) == -1) {
			/*var result = this.cellArray[row][col].playNumber(this.selectedNumber);

			if (result.good) {
				// Set the cell to the selected number
				document.getElementById('cell_' + cellCount).innerHTML = this.selectedNumber;
			}*/

			// Checking the row
			for (var i=1; i <= cellArray[selectedRow].length; i++) {
				if (cellArray[selectedRow][i].cellValue == this.selectedNumber) {
					result.good = false;
					continue;
				}
			}

			// Checking the column
			for (var i=1; i <= cellArray.length; i++) {
				if (cellArray[i][selectedCol].cellValue == this.selectedNumber) {
					result.good = false;
					continue;
				}
			}

			// Checking the sub grid
			for (var i=0; i< this.gameBoard.gameGrids[subGridid].length; i++) {

			}
		}
	};

	this.init();
}