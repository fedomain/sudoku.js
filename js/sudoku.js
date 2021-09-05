let sudoku = new Object();

// PROPERTIES
sudoku.answerBoard = [];

// METHODS
sudoku.setFirstNine = (grid) => {
  let count = 0;
  let firstNine = helper.getNumberOfRandoms(9,1,9);

  for (var i=0; i<3; i++) {
    for (var j=0; j<3; j++) {
      grid[i][j] = firstNine[count];
      count++;
    }
  }
}

sudoku.solveGrid = (grid) => {
  let row = 0;
  let col = 0;
  let square = [];
  let total = 0;

  // Find next empty cell
  for (var i=0; i<81; i++) {
    row = Math.floor(i/9);
    col = i % 9;
    if (grid[row][col] == 0) {
      for (var j=1; j<10; j++) {
        // Check that this value has not already been used on this row
        if (!grid[row].includes(j)) {
          // Check that this value has not already been used on this column
          if (! [grid[0][col],grid[1][col],grid[2][col],grid[3][col],grid[4][col],grid[5][col],grid[6][col],grid[7][col],grid[8][col]].includes(j)) {
            // Identify which of the 9 squares we are working on
            square = [];
            if (row < 3) {
              if (col < 3) {
                square[0] = grid[0][0];
                square[1] = grid[1][1];
                square[2] = grid[2][2];
              } else if (col < 6) {
                square[0] = grid[0][3];
                square[1] = grid[1][4];
                square[2] = grid[2][5];
              } else {
                square[0] = grid[0][6];
                square[1] = grid[1][7];
                square[2] = grid[2][8];
              }
            } else if (row < 6) {
              if (col < 3) {
                square[0] = grid[3][0];
                square[1] = grid[4][1];
                square[2] = grid[5][2];
              } else if (col < 6) {
                square[0] = grid[3][3];
                square[1] = grid[4][4];
                square[2] = grid[5][5];
              } else {
                square[0] = grid[3][6];
                square[1] = grid[4][7];
                square[2] = grid[5][8];
              }
            } else {
              if (col < 3) {
                square[0] = grid[6][0];
                square[1] = grid[7][1];
                square[2] = grid[8][2];
              } else if (col < 6) {
                square[0] = grid[6][3];
                square[1] = grid[7][4];
                square[2] = grid[8][5];
              } else {
                square[0] = grid[6][6];
                square[1] = grid[7][7];
                square[2] = grid[8][8];
              }
            }
            
            // Check that this value has not already been used on this 3x3 square
            if (![square[0],square[1],square[2]].includes(j)) {
              grid[row][col] = j;

              if (helper.checkGrid(grid)) {
                return true;
              } else {
                if (sudoku.solveGrid(grid)) {
                  return true;
                }
              }
            }
          }
        }
      }
      break;
    }
  }

  grid[row][col] = 0;
}

sudoku.setupAnswerBoard = () => {
  sudoku.answerBoard = helper.getGrid();

  sudoku.setFirstNine(sudoku.answerBoard);
  sudoku.solveGrid(sudoku.answerBoard);
}