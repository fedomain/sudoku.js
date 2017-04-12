function Game() {
	this.gameBoard = {};

	this.gridSize = 9; //  Always 9
	this.cellArray = [];
	this.selectedNumber = 0;
	this.cellCountArray = []; // Reverse lookup of cells using the cell count

	this.errorArray = [];

	this.timer = [0,0,0];

	this.init = function() {
		this.getGameBoard(this.variation, this.difficulty);
		this.gridSetup();
		//this.startTimer();
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

		//document.getElementById("timer").innerHTML = this.digitPadding();

		if (this.timer[2] == 0) {
			document.getElementById("game-timer").innerHTML = this.digitPadding(this.timer[1]) + ':' + this.digitPadding(this.timer[0]);
		} else {
			document.getElementById("game-timer").innerHTML = this.digitPadding(this.timer[2]) + ':' + this.digitPadding(this.timer[1]) + ':' + this.digitPadding(this.timer[0]);
		}
	};

	this.digitPadding = function(digit) {
		if (digit < 10) {
			return '0' + digit.toString();
		} else {
			return digit.toString();
		}
	};

	this.fedtest = function() {
		var thisNum = 23;

		document.getElementById("fedtest").innerHTML = this.digitPadding(thisNum);
	}

	this.gridSetup = function() {
		var count = 1;
		var gameGrid = '<table class="game-board">';

		// Loop through the rows
		for (var i=1; i <= this.gridSize; i++) {
			gameGrid += '<tr>';
			this.cellArray[i] = [];

			// Set up the cells
			for (var j=1; j <= this.gridSize; j++) {
				this.cellArray[i][j] = new Cell(i,j, count, this.gameBoard);
				this.cellCountArray[count] = {row: i, col: j};

				if (this.cellArray[i][j].defaultDisplay) {
					gameGrid += '<td id="' + count + '" class="' + this.cellArray[i][j].styleClass + '">' + this.cellArray[i][j].displayNumber() + '</td>';
				} else {
					gameGrid += '<td id="' + count + '" class="' + this.cellArray[i][j].styleClass + '" onClick="myGame.playCell(' + i + ',' + j + ',' + count + ')">' + this.cellArray[i][j].displayNumber() + '</td>';
				}

				count++;
			}

			gameGrid += '</tr>';
		}

		gameGrid += '</table>';

		document.getElementById('game-header').innerHTML = this.name;
		document.getElementById('game-board-wrapper').innerHTML = gameGrid;

		document.getElementById('game-pad-wrapper').classList.remove('hide');
		document.getElementById('game-pad-wrapper').classList.add('show');
	};

	this.getGameBoard = function(variation, difficulty, name) {
		this.name = name || 'Game 1';
		this.variation = variation;
		this.difficulty = difficulty;

		// An array consisting of the answers to the current game board
		// Eventually this will come out of a database
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

		for (var i=0; i < this.errorArray.length; i++) {
			if (this.errorArray[i].cellid == 0) {
				this.errorArray.splice(i, 1);
			}
		}

		for (var i=1; i <= this.gridSize; i++) {
			for (var j=1; j <= this.gridSize; j++) {
				if (this.cellArray[i][j].cellValue == number) {
					document.getElementById(this.cellArray[i][j].cellid).classList.add('selectedNumber');
				}
			}
		}

		this.selectedNumber = number;
		this.showError();
	};

	this.clearNumbers = function() {
		for (var i=1; i <= this.gridSize; i++) {
			for (var j=1; j <= this.gridSize; j++) {
				document.getElementById(this.cellArray[i][j].cellid).classList.remove('selectedNumber');
			}
		}

		this.selectedNumber = 0;
	};

	this.playCell = function(row, col, cellid) {
		var _row = row;
		var _col = col;
		var _cellid = cellid;

		var subGridid = this.cellArray[_row][_col].getSubGridID();

		// if no number is selected
		if (this.selectedNumber == 0) {
			this.errorArray.push({row: 0, col: 0, cellid: 0, errmsg: 'Please select a number to play.'});
			this.showError();
			return false;
		}

		// if the cell is already occupied
		if (this.cellArray[_row][_col].cellValue != 0) {
			// if the cell already has the selected number then remove it
			if (this.cellArray[_row][_col].cellValue == this.selectedNumber) {
				this.clearCell(_row, _col, _cellid);
			}
			this.showError();
			return false;
		}

		// checking the row
		for (var i=1; i < this.cellArray[_row].length; i++) {
			if (this.cellArray[_row][i].cellValue == this.selectedNumber) {
				this.errorArray.push({
					row: _row,
					col: i,
					cellid: this.cellArray[_row][i].cellid,
					error_row: _row,
					error_col: _col,
					error_cellid: _cellid,
					errmsg: 'This number has already been played in the same row.'
				});
				continue;
			}
		}

		// checking the column
		for (var i=1; i < this.cellArray.length; i++) {
			if (this.cellArray[i][_col].cellValue == this.selectedNumber) {
				this.errorArray.push({
					row: i,
					col: _col,
					cellid: this.cellArray[i][_col].cellid,
					error_row: _row,
					error_col: _col,
					error_cellid: _cellid,
					errmsg: 'This number has already been played in the same column.'
				});
				continue;
			}
		}

		// checking the sub grid
		for (var i=0; i < this.gameBoard.gameGrids[subGridid].length; i++) {
			var thisRow = this.cellCountArray[this.gameBoard.gameGrids[subGridid][i]].row;
			var thisCol = this.cellCountArray[this.gameBoard.gameGrids[subGridid][i]].col;

			if (this.cellArray[thisRow][thisCol].cellValue == this.selectedNumber) {
				this.errorArray.push({
					row: thisRow,
					col: thisCol,
					cellid: this.cellArray[thisRow][thisCol].cellid,
					error_row: _row,
					error_col: _col,
					error_cellid: _cellid,
					errmsg: 'This number has already been played in the same sub-grid.'
				});
				continue;
			}
		}

		// Still set the cell to the selected number regardless of violations
		this.showNumber(_row, _col, _cellid);

		// Show errors if any
		this.showError();

		// Finally check the game board
		this.checkGame();
	};

	this.showError = function() {
		document.getElementById('game-error-wrapper').innerHTML = '';

		if (this.errorArray.length != 0) {
			var content = '<ul>';

			for (var i=0; i < this.errorArray.length; i++) {
				content += '<li>' + this.errorArray[i].errmsg + '</li>';

				if (this.errorArray[i].cellid != 0) {
					document.getElementById(this.errorArray[i].cellid).classList.add('errorCell');
				}
			}

			content += '</ul>';

			document.getElementById('game-error-wrapper').innerHTML = content;
		}
	}

	this.showNumber = function(row, col, cellid) {
		this.cellArray[row][col].cellValue = this.selectedNumber;
		document.getElementById(cellid).innerHTML = this.selectedNumber;
		document.getElementById(cellid).classList.add('selectedNumber');
	}

	this.clearCell = function(row, col, cellid) {
		this.cellArray[row][col].cellValue = 0;

		document.getElementById(cellid).innerHTML = '';
		//document.getElementById(cellid).classList.remove('errorCell');
		document.getElementById(cellid).classList.remove('selectedNumber');

		// clear related errors if any
		this.clearErrors(row, col, cellid);
		this.showError();
	}

	this.clearErrors = function(row, col, cellid) {
		for (var i=this.errorArray.length-1; i>=0; i--) {
			if (this.errorArray[i].error_cellid == cellid) {
				document.getElementById(this.errorArray[i].cellid).classList.remove('errorCell');
				this.errorArray.splice(i, 1);
			}
		}
		console.log(this.errorArray.length);
	}

	this.checkGame = function() {
		return true;
	}

	this.init();
}
