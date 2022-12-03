class Game{
  constructor(boardLength, difficultyLevel) {
    this.gridLength = boardLength;
    this.removeNumberCount = this.setDifficulty(difficultyLevel);

    this.SRN = Math.sqrt(this.gridLength);
    this.testGrid = this.setupGrid();
    this.baseGrid = this.setupGrid();

    this.startGame();
  }

  clearGrid = () => {
    for (let i=0; i<this.gridLength; i++) {
      for (let j=0; j<this.gridLength; j++) {
        document.getElementById('r' + i + 'c' + j).innerHTML = "";
      }
    }
  }

  setDifficulty = (level) => {
    let removeNumber = 0;
    
    switch(level) {
      case 0: removeNumber = 39; break; // Easy
      case 1: removeNumber = 46; break; // Medium
      case 2: removeNumber = 53; break; // Hard
      case 3: removeNumber = 55; break; // Expert
    }

    return removeNumber;
  }

  setupGrid = () => {
    let grid = new Array(this.gridLength);

    for (let i=0; i<this.gridLength; i++) {
      grid[i] = new Array(this.gridLength);
      for (let j=0; j<this.gridLength; j++) {
        grid[i][j] = 0;
      }
    }

    return grid;
  }

  startGame = () => {
    this.clearGrid();
    this.fillDiagonal();
    this.fillRemaining(0, this.SRN);

    // make a copy of the grid for final checking
    this.duplicateGrid();

    this.removeDigits();

    this.printGame();
  }

  duplicateGrid = () => {
    for (let i=0; i<this.gridLength; i++) {
      for (let j=0; j<this.gridLength; j++) {
        this.baseGrid[i][j] = this.testGrid[i][j];
      }
    }
  }

  fillDiagonal = () => {
    for (let i=0; i<this.gridLength; i+=this.SRN) {
      this.fillBox(i, i);
    }
  }

  fillBox = (row, col) => {
    let num;

    for (let i=0; i<this.SRN; i++) {
      for (let j=0; j<this.SRN; j++) {
        do {
          num = this.randomGenerator(this.gridLength);
        } while (!this.unUsedInBox(row, col, num));

        this.testGrid[row+i][col+j] = num;
        //console.log('row: ' + row+i + ' col: ' + col+j);
      }
    }
  }

  randomGenerator = (num) => parseInt(Math.floor(Math.random() * num + 1));

  fillRemaining = (row, col) => {
    //console.log(row + " " + col);

    // If we are at the end of the row then jump to the next row
    if (col >= this.gridLength && row < this.gridLength-1) {
      row = row + 1;
      col = 0;
    }

    // If we are over the grid then return true
    if (row >= this.gridLength && col >= this.gridLength) {
      return true;
    }

    if (row < this.SRN) {
      if (col < this.SRN) {
        col = this.SRN; // If both row and col is less than the square root of the grid length then set col to the square root
      }
    } else if (row < this.gridLength - this.SRN) {
      if (col == parseInt(row/this.SRN) * this.SRN) {
        col = col + this.SRN;
      }
    } else {
      if (col == this.gridLength - this.SRN) {
        row = row + 1;
        col = 0;

        if (row >= this.gridLength) {
          return true;
        }
      }
    }

    for (let num=1; num <= this.gridLength; num++) {
      if (this.isSafe(row, col, num)) {
        this.testGrid[row][col] = num;

        if (this.fillRemaining(row, col+1)) {
          return true;
        }

        this.testGrid[row][col] = 0;
        //console.log(row + " " + col + " " + num);
      }
    }

    return false;
  }

  isSafe = (row, col, num) => (this.unUsedInRow(row, num) && this.unUsedInCol(col, num) && this.unUsedInBox(row - row % this.SRN, col - col % this.SRN, num));

  unUsedInRow = (row, num) => {
    for (let col=0; col<this.gridLength; col++) {
      if (this.testGrid[row][col] == num) {
        return false;
      }
    }
  
    return true;
  }

  unUsedInCol = (col, num) => {
    for (let row=0; row<this.gridLength; row++) {
      if (this.testGrid[row][col] == num) {
        return false;
      }
    }
  
    return true;
  }

  unUsedInBox = (rowStart, colStart, num) => {
    for (let i=0; i<this.SRN; i++) {
      for (let j=0; j<this.SRN; j++) {
        if (this.testGrid[rowStart+i][colStart+j] == num) {
          return false;
        }
      }
    }
  
    return true;
  }

  removeDigits = () => {
    let row = 0;
    let col = 0;
    let count = this.removeNumberCount;
    let cellId = 0;

    while (count != 0) {
      cellId = this.randomGenerator(this.gridLength * this.gridLength) - 1;
      row = parseInt(cellId / this.gridLength);
      col = cellId % this.gridLength;

      if (col != 0) {
        col = col - 1;
      }

      if (this.testGrid[row][col] != 0) {
        count--;
        this.testGrid[row][col] = 0;
      }
    }
  }

  printGame = () => {
    for (let i=0; i<this.gridLength; i++) {
      for (let j=0; j<this.gridLength; j++) {
        if (this.testGrid[i][j] != 0)
          document.getElementById('r' + i + 'c' + j).innerHTML = this.testGrid[i][j];
      }
    }
  }

  playNumber = (row, col, num) => {
      document.getElementById("r" + row + "c" + col).classList.add("open-position");
      document.getElementById("r" + row + "c" + col).innerHTML = num;
      this.testGrid[row][col] = num;

      if (this.isGameSolved())
        alert("You have finished the game.");
  }

  isGameSolved = () => {
    let solved = true;

    upperloop:
    for (let i=0; i<this.gridLength; i++) {
      for (let j=0; j<this.gridLength; j++) {
        if (this.baseGrid[i][j] != this.testGrid[i][j]) {
          solved = false;
          break upperloop;
        }
      }
    }

    return solved;
  }
}