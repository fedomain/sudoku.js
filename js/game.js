let game = new Object();

game.board = [];

game.setOpenPositions = (grid, game) => {
  let count = 1;
  let openPositions = helper.getNumberOfRandoms(30,1,81);

  for (var i=0; i<9; i++) {
    for (var j=0; j<9; j++) {
      if (openPositions.includes(count))
        game[i][j] = grid[i][j];
      count++;
    }
  }
}

game.setupGame = (grid) => {
  for (var i=0; i<9; i++) {
    for (var j=0; j<9; j++) {
      if (grid[i][j] != 0) {
        document.getElementById("r" + i + "c" + j).innerHTML = grid[i][j];
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
      document.getElementById("r" + i + "c" + j).classList.remove("selected-cell");
      document.getElementById("r" + i + "c" + j).classList.remove("selected-background");
      document.getElementById("r" + i + "c" + j).classList.remove("same-number-background");
    }
  }
}

game.startGame = () => {
  sudoku.setupAnswerBoard();
  game.board = helper.getGrid();

  game.resetGame();
  game.setOpenPositions(sudoku.answerBoard, game.board);
  game.setupGame(game.board);
}

game.cellSelect = (r,c) => {
  let rowStart = helper.getHighlightStart(r);
  let colStart = helper.getHighlightStart(c);

  game.resetCell();

  // set row and col background color
  for (var i=0; i<9; i++) {
    document.getElementById("r" + r + "c" + i).classList.add("selected-background");
    document.getElementById("r" + i + "c" + c).classList.add("selected-background");
  }

  // set sub grid background color
  for (var i=rowStart; i<rowStart+3; i++) {
    for (var j=colStart; j<colStart+3; j++) {
      document.getElementById("r" + i + "c" + j).classList.add("selected-background");
    }
  }

  // set all cell with the same number a new background color
  let selectedNumber = game.board[r][c];

  if (selectedNumber != 0) {
    for (var i=0; i<9; i++) {
      for (var j=0; j<9; j++) {
        if (game.board[i][j] == selectedNumber && (i != r && j != c))
          document.getElementById("r" + i + "c" + j).classList.add("same-number-background");
      }
    }      
  }

  // set selected cell color
  document.getElementById("r" + r + "c" + c).classList.add("selected-cell");
}
