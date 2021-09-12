class Game extends Helpers {
  constructor(answerBoard) {
    super();

    // PROPERTIES
    this.selectedCell = [0,0];
    this.answerBoard = answerBoard;
    this.gameBoard = this.setupGameBoard(answerBoard);
  }

  // METHODS
  setupGameBoard(answer) {
    let game = [];
    let count = 1;
    let openPositions = super.getNumberOfRandoms(30,1,81);
  
    for (var i=0; i<9; i++) {
      game[i] = [];
      for (var j=0; j<9; j++) {
        game[i][j] = new Cell(i,j,0,"");

        if (openPositions.includes(count)) {
          game[i][j].isOpen = true;
          game[i][j].num = answer[i][j];
          game[i][j].classList = "open-position";
        }
        count++;
      }
    }
    
    return game;
  }

  setupGame() {
    for (var i=0; i<9; i++) {
      for (var j=0; j<9; j++) {
        if (this.gameBoard[i][j].num != 0) {
          document.getElementById("r" + i + "c" + j).innerHTML = this.gameBoard[i][j].num;
          document.getElementById("r" + i + "c" + j).classList.add(this.gameBoard[i][j].classList);
        }
      }
    }
  }

  resetGame() {
    for (var i=0; i<9; i++)
      for (var j=0; j<9; j++)
        document.getElementById("r" + i + "c" + j).innerHTML = "";
  }

  resetCell() {
    for (var i=0; i<9; i++) {
      for (var j=0; j<9; j++) {
        if (sudoku.gameBoard[i][j].classList != "") {
          document.getElementById("r" + i + "c" + j).classList.remove(sudoku.gameBoard[i][j].classList);
          sudoku.gameBoard[i][j].classList = "";
        }
      }
    }
  }

  cellSelect(r,c) {
    let rowStart = helper.getHighlightStart(r);
    let colStart = helper.getHighlightStart(c);
  
    game.resetCell();
    game.selectedCell = [r,c];
  
    // set row and col background color
    for (var i=0; i<9; i++) {
      sudoku.gameBoard[r][i].className = "selected-background";
      sudoku.gameBoard[i][c].className = "selected-background";
  
      document.getElementById("r" + r + "c" + i).classList.add("selected-background");
      document.getElementById("r" + i + "c" + c).classList.add("selected-background");
    }
  
    // set sub grid background color
    for (var i=rowStart; i<rowStart+3; i++) {
      for (var j=colStart; j<colStart+3; j++) {
        sudoku.gameBoard[i][j].className = "selected-background";
        document.getElementById("r" + i + "c" + j).classList.add("selected-background");
      }
    }
  
    // set all cell with the same number a new background color
    let selectedNumber = sudoku.gameBoard[r][c];
  
    if (selectedNumber != 0) {
      for (var i=0; i<9; i++) {
        for (var j=0; j<9; j++) {
          if (sudoku.gameBoard[i][j] == selectedNumber && (i != r && j != c)) {
            sudoku.gameBoard[i][j].className = "same-number-background";
            document.getElementById("r" + i + "c" + j).classList.add("same-number-background");
          }
        }
      }
    }
  
    // set selected cell color
    sudoku.gameBoard[r][c].className = "selected-cell";
    document.getElementById("r" + r + "c" + c).classList.add("selected-cell");
  }

  playNumber(num) {
    let r = game.selectedCell[0];
    let c = game.selectedCell[1];
  
    if (!sudoku.gameBoard[r][c].isOpen) {
      let rowStart = helper.getHighlightStart(r);
      let colStart = helper.getHighlightStart(c);
  
      sudoku.gameBoard[r][c].num = num;
      document.getElementById("r" + r + "c" + c).innerHTML = num;
  
      for (var i=0; i<9; i++) {
        if (sudoku.gameBoard[r][i].num == num) {
          sudoku.gameBoard[r][i].className = "warning";
      
          document.getElementById("r" + r + "c" + i).classList.remove("selected-background");
          document.getElementById("r" + r + "c" + i).classList.add("warning");
        }
  
        if (sudoku.gameBoard[i][c].num == num) {
          sudoku.gameBoard[i][c].className = "warning";
  
          document.getElementById("r" + i + "c" + c).classList.remove("selected-background");
          document.getElementById("r" + i + "c" + c).classList.add("warning");
        }
      }
  
      for (var i=rowStart; i<rowStart+3; i++) {
        for (var j=colStart; j<colStart+3; j++) {
          sudoku.gameBoard[i][j].className = "warning";
          document.getElementById("r" + i + "c" + j).classList.add("warning");
        }
      }
    }
  }

  render() {
    let game = sudoku.gameBoard;
  
    for (let i=0; i<9; i++) {
      for (let j=0; j<9; j++) {
        document.getElementById("r" + i + "c" + j).innerHTML = game[i][j].num;
        document.getElementById("r" + i + "c" + j).classList.add(game[i][j].classList);
      }
    }
  }
}
