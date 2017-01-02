function Cell(row, col, cellCount, cellAnswer) {
	this.row = row;
	this.col = col;
	this.name = 'R' + this.row + 'C' + this.col;
	this.id = 'r' + this.row + 'c' + this.col;
	this.styleClass = '';
	this.gridSize = 9; // Always 9
	this.cellCount = cellCount;
	this.cellAnswer = cellAnswer;
	this.cellValue = cellAnswer;
	this.defaultDisplay = false;
	this.cellCandidates = [];

	this.subgridArray = [];
	this.subgridArray[1] = [1,2,3,10,11,12,19,20,21];
	this.subgridArray[2] = [4,5,6,13,14,15,22,23,24];
	this.subgridArray[3] = [7,8,9,16,17,18,25,26,27];
	this.subgridArray[4] = [28,29,30,37,38,39,46,47,48];
	this.subgridArray[5] = [31,32,33,40,41,42,49,50,51];
	this.subgridArray[6] = [34,35,36,43,44,45,52,53,54];
	this.subgridArray[7] = [55,56,57,64,65,66,73,74,75];
	this.subgridArray[8] = [58,59,60,67,68,69,76,77,78];
	this.subgridArray[9] = [61,62,63,70,71,72,79,80,81];
	this.subgridColor = [2,4,6,8];
	this.hardLeftCell = [4,13,22,31,40,49,58,67,76,7,16,25,34,43,52,61,70,79];
	this.hardTopCell = [28,29,30,31,32,33,34,35,36,55,56,57,58,59,60,61,62,63];

	this.init = function() {
		this.styleClass = this.getStyleClass();
	};

	this.getStyleClass = function() {
		var thisClass = 'normal';

		if (this.col == this.gridSize && this.row == this.gridSize) {
			thisClass = '';

		} else if (this.col == this.gridSize) {
			thisClass = 'row-last';

		} else if (this.row == this.gridSize) {
			thisClass = 'col-last';
		}

		if (this.subgridColor.indexOf(this.getSubGridID()) != -1) {
			thisClass += ' highlighted';
		}

		if (this.hardLeftCell.indexOf(this.cellCount) != -1) {
			thisClass += ' hard-left';
		}

		if (this.hardTopCell.indexOf(this.cellCount) != -1) {
			thisClass += ' hard-top';
		}

		if (this.defaultDisplay) {
			thisClass += ' bold';
		}

		return thisClass;
	};

	this.getSubGridID = function() {
		for (var i=0; i < this.subgridArray.length; i++) {
			if (Array.isArray(this.subgridArray[i]) && this.subgridArray[i].indexOf(this.cellCount) != -1) {
				return i;
			}
		}

		return 0;
	};

	this.init();
}