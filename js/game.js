let game = new Object();

game.board = [];
game.selected = [0,0];

game.setOpenPositions = (grid, game) => {
  let count = 1;
  let openPositions = helper.getNumberOfRandoms(30,1,81);

  for (var i=0; i<9; i++) {
    for (var j=0; j<9; j++) {
      if (openPositions.includes(count)) {
        game[i][j].isOpen = true;
        game[i][j].num = grid[i][j];
      }
      count++;
    }
  }
}

game.setupGame = (game) => {
  for (var i=0; i<9; i++) {
    for (var j=0; j<9; j++) {
      if (game[i][j].num != 0) {
        document.getElementById("r" + i + "c" + j).classList.add("openPosition");
        document.getElementById("r" + i + "c" + j).innerHTML = game[i][j].num;
      }
    }
  }
}

game.resetGame = () => {
  for (var i=0; i<9; i++) {
    for (var j=0; j<9; j++) {
      document.getElementById("r" + i + "c" + j).innerHTML = "";
    }
  }
}

game.resetCell = () => {
  for (var i=0; i<9; i++) {
    for (var j=0; j<9; j++) {
      game.board[i][j].bgcolor = "";

      document.getElementById("r" + i + "c" + j).classList.remove("selected-cell");
      document.getElementById("r" + i + "c" + j).classList.remove("selected-background");
      document.getElementById("r" + i + "c" + j).classList.remove("same-number-background");
    }
  }
}

game.startGame = () => {
  sudoku.setupAnswerBoard();
  
  let grid = [];

  for (var i=0; i<9; i++) {
    grid[i] = [];
    for (var j=0; j<9; j++) {
      grid[i][j] = new Cell(i,j,0,"");
    }
  }

  game.board = grid;

  game.resetGame();
  game.setOpenPositions(sudoku.answerBoard, game.board);
  game.setupGame(game.board);
}

game.cellSelect = (r,c) => {
  let rowStart = helper.getHighlightStart(r);
  let colStart = helper.getHighlightStart(c);

  game.resetCell();
  game.selected = [r,c];

  // set row and col background color
  for (var i=0; i<9; i++) {
    game.board[r][i].bgcolor = "selected-background";
    game.board[i][c].bgcolor = "selected-background";

    document.getElementById("r" + r + "c" + i).classList.add("selected-background");
    document.getElementById("r" + i + "c" + c).classList.add("selected-background");
  }

  // set sub grid background color
  for (var i=rowStart; i<rowStart+3; i++) {
    for (var j=colStart; j<colStart+3; j++) {
      game.board[i][j].bgcolor = "selected-background";
      document.getElementById("r" + i + "c" + j).classList.add("selected-background");
    }
  }

  // set all cell with the same number a new background color
  let selectedNumber = game.board[r][c];

  if (selectedNumber != 0) {
    for (var i=0; i<9; i++) {
      for (var j=0; j<9; j++) {
        if (game.board[i][j] == selectedNumber && (i != r && j != c)) {
          game.board[i][j].bgcolor = "same-number-background";
          document.getElementById("r" + i + "c" + j).classList.add("same-number-background");
        }
      }
    }
  }

  // set selected cell color
  game.board[r][c].bgcolor = "selected-cell";
  document.getElementById("r" + r + "c" + c).classList.add("selected-cell");
}

game.playNumber = (num) => {
  let r = game.selected[0];
  let c = game.selected[1];

  if (!game.board[r][c].isOpen) {
    let rowStart = helper.getHighlightStart(r);
    let colStart = helper.getHighlightStart(c);

    game.board[r][c].num = num;
    document.getElementById("r" + r + "c" + c).innerHTML = num;

    for (var i=0; i<9; i++) {
      if (game.board[r][i].num == num) {
        game.board[r][i].bgcolor = "warning";
    
        document.getElementById("r" + r + "c" + i).classList.remove("selected-background");
        document.getElementById("r" + r + "c" + i).classList.add("warning");
      }

      if (game.board[i][c].num == num) {
        game.board[i][c].bgcolor = "warning";

        document.getElementById("r" + i + "c" + c).classList.remove("selected-background");
        document.getElementById("r" + i + "c" + c).classList.add("warning");
      }
    }

    for (var i=rowStart; i<rowStart+3; i++) {
      for (var j=colStart; j<colStart+3; j++) {
        game.board[i][j].bgcolor = "warning";
        document.getElementById("r" + i + "c" + j).classList.add("warning");
      }
    }
  }
}
