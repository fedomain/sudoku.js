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

Helpers
- getRndIntegerFromRange - get a random number from a range
- getNumberOfRandoms - get an array of random numbers
- getHighlightStart - get the start row or col based on the selected cell

Sudoku
- answerBoard
- gameBoard

- startGame - setup the answer grid and the game board
- setupAnswerBoard - setup the answer board
- checkGrid - check if the entire board is filled up
- printGrid - print the js 2 dimensional array grid
- setFirstNine - set the first 3x3 grid with random numbers
- solveGrid - algorithm to solve a 9x9 sudoku game

Game
- selectedCell
- answerBoard
- gameBoard

- setupGameBoard - populate the game board with the first 30 random open positions (front end)
- setupGame
- resetGame - remove all numbers from the game board (front end)
- resetCell - remove all highlight class from the game board cells (front end)
- cellSelect - apply all highlighting rules when a cell is selected (front end)
- playNumber - apply all highlighting rules when a number is played on a cell (front end)
- render

Cell
- row
- col
- num
- isOpen
- isSelected
- classList
- tempClassList

- addTempClass
- removeTempClass
- getTempClassList
- addClass
- removeClass
- getClassList

Front end changes

When a cell select
- Highlight selected cell (light blue)
- Highlight selected cell's row (light grey)
- Highlight selected cell's col (light grey)
- Highlight selected cell's 3x3 sub-grid (light grey)
 If selected cell have a number
 - Highlight all other cells with the same number (light dark blue)
 When a number is selected
 - Highlight all other cells with the same number (light dark blue)
 - Run the function to check the validity of the number
  If the number is not valid
  - Highlight the selected number red
  - Highlight the selected cell red (but leave it light blue when the cell is still selected)
  - Highlight the violated cell red
  - Leave the above state on as long as the selected cell continues to have the invalid number in it



Phase 2 - Playing the game




Phase 3 - Checking the result



Known bugs


