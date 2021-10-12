class Game extends Helpers {
  constructor(answerGrid) {
    super();

    // PROPERTIES
    this.selectedCell = [-1,-1];
    this.answerGrid = answerGrid;
    this.gameBoard = this.setupGame(answerGrid);

    // Run these to clear the board
    this.resetGameBoard();
    this.setupGameBoard();
  }

  // METHODS
  setupGame(answerGrid) {
    let game = [];
    let count = 1;
    let openPositions = super.getNumberOfRandoms(30,1,81);
  
    for (var i=0; i<9; i++) {
      game[i] = [];
      for (var j=0; j<9; j++) {
        game[i][j] = new Cell(i,j,0,[]);

        if (openPositions.includes(count)) {
          game[i][j].isOpen = true;
          game[i][j].num = answerGrid[i][j];
          game[i][j].addClass("open-position");
        }
        count++;
      }
    }
    
    return game;
  }

  setupGameBoard() {
    for (var i=0; i<9; i++) {
      for (var j=0; j<9; j++) {
        if (this.gameBoard[i][j].num != 0) {
          document.getElementById("r" + i + "c" + j).innerHTML = this.gameBoard[i][j].num;
          document.getElementById("r" + i + "c" + j).classList.add(this.gameBoard[i][j].getClassList());
        }
      }
    }
  }

  resetGameBoard() {
    for (var i=0; i<9; i++) {
      for (var j=0; j<9; j++) {
        document.getElementById("r" + i + "c" + j).innerHTML = "";
      }
    }
  }

  cellSelect(row, col) {
    this.removeCellHighlight();
    this.selectedCell = [row,col];
    this.setCellHighlight();
  }

  setCellHighlight() {
    let r = this.selectedCell[0];
    let c = this.selectedCell[1];

    let rowStart = super.getHighlightStart(r);
    let colStart = super.getHighlightStart(c);

    // set selected cell color
    this.gameBoard[r][c].isSelected = true;
    document.getElementById("r" + r + "c" + c).classList.add("selected-cell");

    // set row and col background color
    for (var i=0; i<9; i++) {
      if (!this.gameBoard[r][i].isSelected) {
        document.getElementById("r" + r + "c" + i).classList.add("selected-background");
      }
      
      if (!this.gameBoard[i][c].isSelected) {
        document.getElementById("r" + i + "c" + c).classList.add("selected-background");
      }
    }
  
    // set 3x3 sub grid background color
    for (var i=rowStart; i<rowStart+3; i++) {
      for (var j=colStart; j<colStart+3; j++) {
        if (!this.gameBoard[i][j].isSelected) {
          document.getElementById("r" + i + "c" + j).classList.add("selected-background");
        }
      }
    }
  
    // set all cell with the same number a new background color
    if (this.gameBoard[r][c].num != 0) {
      for (var i=0; i<9; i++) {
        for (var j=0; j<9; j++) {
          if (this.gameBoard[i][j].num == this.gameBoard[r][c].num && i != r && j != c) {
            document.getElementById("r" + i + "c" + j).classList.add("same-number-background");
          }
        }
      }
    }
  }

  removeCellHighlight() {
    let r = this.selectedCell[0];
    let c = this.selectedCell[1];

    if (r != -1 && c != -1) {
      let rowStart = super.getHighlightStart(r);
      let colStart = super.getHighlightStart(c);

      this.gameBoard[r][c].isSelected = false;
      document.getElementById("r" + r + "c" + c).classList.remove("selected-cell");

      // reset row and col background color
      for (var i=0; i<9; i++) {
        document.getElementById("r" + r + "c" + i).classList.remove("selected-background");
        document.getElementById("r" + i + "c" + c).classList.remove("selected-background");
      }
    
      // reset 3x3 sub grid background color
      for (var i=rowStart; i<rowStart+3; i++) {
        for (var j=colStart; j<colStart+3; j++) {
          document.getElementById("r" + i + "c" + j).classList.remove("selected-background");
        }
      }

      this.setSameNumberHighlight(r,c);
    }
  }

  setSameNumberHighlight(r,c) {
    if (this.gameBoard[r][c].num != 0) {
      for (var i=0; i<9; i++) {
        for (var j=0; j<9; j++) {
          if (this.gameBoard[i][j].num == this.gameBoard[r][c].num && i != r && j != c) {
            document.getElementById("r" + i + "c" + j).classList.remove("same-number-background");
          }
        }
      }
    }
  }

  playNumber(num) {
    let r = this.selectedCell[0];
    let c = this.selectedCell[1];
  
    if (!this.gameBoard[r][c].isOpen) {
      let rowStart = super.getHighlightStart(r);
      let colStart = super.getHighlightStart(c);
  
      // remove previous number first
      this.removeNumber();

      // Check if the number exists in the selected row and col
      for (var i=0; i<9; i++) {
        if (this.gameBoard[r][i].num == num) {
          document.getElementById("r" + r + "c" + i).classList.add("warning");
        }
  
        if (this.gameBoard[i][c].num == num) {
          document.getElementById("r" + i + "c" + c).classList.add("warning");
        }
      }
  
      for (var i=rowStart; i<rowStart+3; i++) {
        for (var j=colStart; j<colStart+3; j++) {
          if (this.gameBoard[i][j].num == num) {
            document.getElementById("r" + i + "c" + j).classList.add("warning");
          }
        }
      }

      // Write the number in the selected cell
      this.gameBoard[r][c].num = num;
      document.getElementById("r" + r + "c" + c).innerHTML = num;

      this.setSameNumberHighlight(r,c);
    }
  }

  removeNumber() {
    let r = this.selectedCell[0];
    let c = this.selectedCell[1];
    let num = this.gameBoard[r][c].num;

    let rowStart = super.getHighlightStart(r);
    let colStart = super.getHighlightStart(c);
  
    if (!this.gameBoard[r][c].isOpen) {
      for (var i=0; i<9; i++) {
        if (this.gameBoard[r][i].num == num)
          document.getElementById("r" + r + "c" + i).classList.remove("warning");

        if (this.gameBoard[i][c].num == num)
          document.getElementById("r" + i + "c" + c).classList.remove("warning");
      }

      for (var i=rowStart; i<rowStart+3; i++) {
        for (var j=colStart; j<colStart+3; j++) {
          if (this.gameBoard[i][j].num == num) {
            document.getElementById("r" + i + "c" + j).classList.remove("warning");
          }
        }
      }

      // remove all other highlights
      this.removeCellHighlight();

      // remove number from current cell
      this.gameBoard[r][c].num = 0;
      document.getElementById("r" + r + "c" + c).innerHTML = "";
    }
  }
}
