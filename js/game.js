function Game(variation, difficulty) {
	this.variation = variation;
	this.difficulty = difficulty;

	this.setValue = function(value) {
		this.value = value;
	};

	this.getValue = function() {
		return this.value;
	};

	this.toString = function() {
		return '(' + this.getValue() + ')';
	};
}