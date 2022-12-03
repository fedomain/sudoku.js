class Sudoku{
  constructor(boardLength, difficultyLevel) {

    this.game = 0;
    this.selectedCell = [];
    this.boardLength = boardLength;
    this.difficultyLevel = difficultyLevel;
    this.sqrt = Math.sqrt(this.boardLength);
  }

  startGame = () => this.game = new Game(this.boardLength, this.difficultyLevel);

  clearSelection = (r,c) => {
    for (let i=0; i<this.boardLength; i++) {
      for (let j=0; j<this.boardLength; j++) {
        document.getElementById('r' + i + 'c' + j).classList.remove('selected-cell');
        document.getElementById('r' + i + 'c' + j).classList.remove('selected-background');
      }
    }
  }

  getHighlightStart = (num) => {
    if ([2, 5, 8].includes(num)) {
      return num - 2;
    } else if ([1, 4, 7].includes(num)) {
      return num - 1;
    } else {
      return num;
    }
  }

  cellSelect = (row, col) => {
    this.clearSelection(row,col);

    let rowStart = this.getHighlightStart(row);
    let colStart = this.getHighlightStart(col);

    for (let i=0; i<this.boardLength; i++) {
      if (i != col)
        document.getElementById('r' + row + 'c' + i).classList.add("selected-background");
      
      if (i != row)
        document.getElementById('r' + i + 'c' + col).classList.add("selected-background");
    }

    for (let i=rowStart; i<rowStart+this.sqrt; i++) {
      for (let j=colStart; j<colStart+this.sqrt; j++) {
        if (i != row && j != col)
          document.getElementById("r" + i + "c" + j).classList.add("selected-background");
      }
    }

    document.getElementById('r' + row + 'c' + col).classList.add("selected-cell");

    this.selectedCell = [row,col];
  }

  play = (num) => {
    if (this.game == 0) {
      alert("Please start a new game first.");
    } else {
      if (Array.isArray(this.selectedCell) && this.selectedCell.length) {
        this.game.playNumber(this.selectedCell[0], this.selectedCell[1], num);
      } else {
        alert("Please select a cell first.");
        console.log("cell not selected");
      }
    }
  }
}