function Game(variation, difficulty, name) {
	this.name = name || 'Game 1';
	this.variation = variation;
	this.difficulty = difficulty;

	this.gridSize = 9; //  Always 9
	this.cellArray = [];
	this.selectedNumber = 0;
	this.cellCountArray = []; // Reverse lookup of cells using the cell count

	this.timer = [0,0,0];

	this.init = function() {
		this.getGameBoard();
		this.setup();
		this.startTimer();
	};

	this.startTimer = function() {
		var myTimer = setInterval(this.getTimer, 1000);
	};

	this.stopTimer = function() {
		return true;
	};

	this.getTimer = function() {
		this.timer[0]++;

		if (this.timer[0] == 10) {
			this.timer[0] = 0;
			this.timer[1]++;
		}

		if (this.timer[1] == 10) {
			this.timer[1] = 0;
			this.timer[2]++;
		}

		if (this.timer[2] == 0) {
			document.getElementById("timer").innerHTML = this.digitPadding(this.timer[1]) + ':' + this.digitPadding(this.timer[0]);
		} else {
			document.getElementById("timer").innerHTML = this.digitPadding(this.timer[2]) + ':' + this.digitPadding(this.timer[1]) + ':' + this.digitPadding(this.timer[0]);
		}
	};

	this.digitPadding2 = function(digit) {
		if (digit < 10) {
			return '0' + digit.toString();
		} else {
			return digit.toString();
		}
	};

	this.setup = function() {
		var count = 1;
		var gameGrid = '<table class="game-board">';

		for (var i=1; i <= this.gridSize; i++) {
			gameGrid += '<tr>';
			this.cellArray[i] = [];

			for (var j=1; j <= this.gridSize; j++) {
				this.cellArray[i][j] = new Cell(i,j, count, this.gameBoard);
				this.cellCountArray[count] = {row: i, col: j};

				gameGrid += '<td id="cell_' + count + '" class="' + this.cellArray[i][j].styleClass + '" onClick="myGame.playCell(' + i + ',' + j + ',' + count + ')">' + this.cellArray[i][j].displayNumber() + '</td>';
				count++;
			}

			gameGrid += '</tr>';
		}

		gameGrid += '</table>';

		document.getElementById('header').innerHTML = this.name;
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
		var _row = row;
		var _col = col;
		var _cellCount = cellCount;

		var errorArray = [];
		var subGridid = this.cellArray[row][col].getSubGridID();

		if (this.cellArray[_row][_col].cellValue != 0) {
			if (this.cellArray[_row][_col].cellValue == this.selectedNumber) {
				this.cellArray[_row][_col].cellValue = 0;
				document.getElementById('cell_' + _cellCount).innerHTML = '';
				document.getElementById('cell_' + _cellCount).classList.remove('errorCell');
				document.getElementById('cell_' + _cellCount).classList.remove('selectedNumber');
			}
		} else {
			// Checking the row
			for (var i=1; i < this.cellArray[_row].length; i++) {
				if (this.cellArray[_row][i].cellValue == this.selectedNumber) {
					errorArray.push({row: _row, col: i, errmsg: 'This number is already been played in the same row'});
					continue;
				}
			}

			// Checking the column
			for (var i=1; i < this.cellArray.length; i++) {
				if (this.cellArray[i][_col].cellValue == this.selectedNumber) {
					errorArray.push({row: i, col: _col, errmsg: 'This number is already been played in the same column'});
					continue;
				}
			}

			// Checking the sub grid
			for (var i=0; i < this.gameBoard.gameGrids[subGridid].length; i++) {
				var thisRow = this.cellCountArray[this.gameBoard.gameGrids[subGridid][i]].row;
				var thisCol = this.cellCountArray[this.gameBoard.gameGrids[subGridid][i]].col;

				if (this.cellArray[thisRow][thisCol].cellValue == this.selectedNumber) {
					errorArray.push({row: thisRow, col: thisCol, errmsg: 'This number is already been played in the same sub-grid'});
					continue;
				}
			}

			// Still set the cell to the selected number regardless of violations
			this.cellArray[_row][_col].cellValue = this.selectedNumber;
			document.getElementById('cell_' + _cellCount).innerHTML = this.selectedNumber;

			// If there are rule violations then print them out
			if (errorArray.length != 0) {
				var content = '<ul>';

				for (var i=0; i < errorArray.length; i++) {
					content += '<li>' + errorArray[i].errmsg + '</li>';
				}

				content += '</ul';

				document.getElementById('game-error-wrapper').innerHTML = '';
				document.getElementById('game-error-wrapper').innerHTML = content;
				document.getElementById('cell_' + _cellCount).classList.add('errorCell');

				//console.log(errorArray);
			}
		}

		// Finally check the game board
		this.checkGame();
	};

	this.checkGame = function() {
		return true;
	}

	this.init();
}