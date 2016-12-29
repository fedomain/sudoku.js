function Cell(row, col) {
	this.row = row;
	this.col = col;
	this.name = 'R' + this.row + 'C' + this.col;
	this.id = 'r' + this.row + 'c' + this.col;

	this.getStyleClass = function() {
		if (this.row == ) {
			return 'highlighted';
		}

		return 'normal';
	}
}