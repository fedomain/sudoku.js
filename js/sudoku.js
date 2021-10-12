class Sudoku extends Helpers {
  constructor() {
    super();

    // PROPERTIES
    this.answerGrid = [];
    this.game = Object.create(null);
  }

  // METHODS
  startGame() {
    this.answerGrid = this.setupAnswerGrid();
    this.game = new Game(this.answerGrid);
  }

  setupAnswerGrid() {
    let grid = [];

    grid[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    grid[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    grid[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    grid[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    grid[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    grid[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    grid[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    grid[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    grid[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    grid = this.setFirstNine(grid);
    grid = this.solveGrid(grid);

    return grid;
  }

  checkGrid(grid) {
    for (var i=0; i<9; i++)
      for (var j=0; j<9; j++)
        if (grid[i][j] == 0)
          return false;
  
    return true;
  }

  printGrid() {
    let result = "";

    for (let i=0; i<9; i++) {
      for (let j=0; j<9; j++)
        result += this.answerGrid[i][j] + ",";

      result += "\n";
    }

    console.log(result);
  }

  setFirstNine(grid) {
    let count = 0;
    let firstNine = super.getNumberOfRandoms(9,1,9);

    for (var i=0; i<3; i++) {
      for (var j=0; j<3; j++) {
        grid[i][j] = firstNine[count];
        count++;
      }
    }

    return grid;
  }

  solveGrid(grid) {
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
                  square[0] = [grid[0][0],grid[0][1],grid[0][2]];
                  square[1] = [grid[1][0],grid[1][1],grid[1][2]];
                  square[2] = [grid[2][0],grid[2][1],grid[2][2]];
                } else if (col < 6) {
                  square[0] = [grid[0][3],grid[0][4],grid[0][5]];
                  square[1] = [grid[1][3],grid[1][4],grid[1][5]];
                  square[2] = [grid[2][3],grid[2][4],grid[2][5]];
                } else {
                  square[0] = [grid[0][6],grid[0][7],grid[0][8]];
                  square[1] = [grid[1][6],grid[1][7],grid[1][8]];
                  square[2] = [grid[2][6],grid[2][7],grid[2][8]];
                }
              } else if (row < 6) {
                if (col < 3) {
                  square[0] = [grid[3][0],grid[3][1],grid[3][2]];
                  square[1] = [grid[4][0],grid[4][1],grid[4][2]];
                  square[2] = [grid[5][0],grid[5][1],grid[5][2]];
                } else if (col < 6) {
                  square[0] = [grid[3][3],grid[3][4],grid[3][5]];
                  square[1] = [grid[4][3],grid[4][4],grid[4][5]];
                  square[2] = [grid[5][3],grid[5][4],grid[5][5]];
                } else {
                  square[0] = [grid[3][6],grid[3][7],grid[3][8]];
                  square[1] = [grid[4][6],grid[4][7],grid[4][8]];
                  square[2] = [grid[5][6],grid[5][7],grid[5][8]];
                }
              } else {
                if (col < 3) {
                  square[0] = [grid[6][0],grid[6][1],grid[6][2]];
                  square[1] = [grid[7][0],grid[7][1],grid[7][2]];
                  square[2] = [grid[8][0],grid[8][1],grid[8][2]];
                } else if (col < 6) {
                  square[0] = [grid[6][3],grid[6][4],grid[6][5]];
                  square[1] = [grid[7][3],grid[7][4],grid[7][5]];
                  square[2] = [grid[8][3],grid[8][4],grid[8][5]];
                } else {
                  square[0] = [grid[6][6],grid[6][7],grid[6][8]];
                  square[1] = [grid[7][6],grid[7][7],grid[7][8]];
                  square[2] = [grid[8][6],grid[8][7],grid[8][8]];
                }
              }
              
              // Check that this value has not already been used on this 3x3 square
              if (! (square[0].includes(j) || square[1].includes(j) || square[2].includes(j))) {
                grid[row][col] = j;
  
                if (this.checkGrid(grid)) {
                  return grid;
                } else {
                  if (this.solveGrid(grid))
                    return grid;
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

  cellSelect(row, col) {
    if (Object.getOwnPropertyNames(this.game).length === 0) {
      alert("Please start the game first.");
    } else {
      this.game.cellSelect(row,col);
    }
  }

  playNumber(num) {
    if (Object.getOwnPropertyNames(this.game).length === 0) {
      alert("Please start the game first.");
    } else if (this.game.selectedCell[0] == -1 && this.game.selectedCell[1] == -1) {
      alert("Please select a cell on the game board first.");
    } else {
      this.game.playNumber(num);
    }
  }
}