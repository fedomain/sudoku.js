# Welcome to my Sudoku app

Game rules

- Number 1-9 appearing only once for each row; And
- Number 1-9 appearing only once for each column; And
- Number 1-9 appearing only once for each 3x3 sub-grid (box)

Technology Used

- Javascript
- Plain HTML5
- CSS3

Phase 1 - Setting up the game

- Setup a standard 9x9 grid
- Create the game engine object
- Auto create new game boards

Objects:

Helper
  getGrid - gets a blank 2 dimensional array
  getRndInteger - get a random number from a range
  getNumberOfRandoms - get an array of random numbers
  checkGrid - check if the entire board is filled up

Sudoku
  setFirstNine - set the first 3x3 grid with random numbers
  solveGrid - algorithm to solve a 9x9 sudoku game
  startGame - kick off a new game

Game
  setOpenPositions - set 30 random positions open (visible) on the game board
  setupGame - populate the game board with the first 30 random open positions
  resetGrid - remove all numbers from the game board



Phase 2 - Playing the game




Phase 3 - Checking the result



Known bugs


