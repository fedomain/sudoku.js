function Cell(row, col, gridSize, cellCount) {
	this.row = row;
	this.col = col;
	this.name = 'R' + this.row + 'C' + this.col;
	this.id = 'r' + this.row + 'c' + this.col;
	this.styleClass = '';
	this.gridSize = gridSize;
	this.cellCount = cellCount;

	this.init = function() {
		this.styleClass = this.getStyleClass();
	}

	this.getStyleClass = function() {
		if (this.col == this.gridSize && this.row == this.gridSize) {
			return '';

		} else if (this.col == this.gridSize) {
			return'row-last';

		} else if (this.row == this.gridSize) {
			return 'col-last';
		}

		return 'normal';
	}

	this.init();
}