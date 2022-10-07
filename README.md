# Welcome to my Sudoku JS app

Game rules

- Number 1-9 appearing only once for each row; And
- Number 1-9 appearing only once for each column; And
- Number 1-9 appearing only once for each 3x3 sub-grid (box)

Game setup

- game variation (default: standard)
- game difficulty (default: very easy)

Game Components

- Setting up the game
	- Will need to store all the possible game boards in a permanent storage like database or file.
	- The basic number of numbers to display depends on the difficulty level. Might also require some other rules.
- Playing the game
	- A JS object for the game, this is a singleton.
	- A JS object for each cell containing all the information regarding the cell. Like current value, the answer, default display flag, etc.

Technology Used

- Javascript
- Plain HTML5
- CSS3

Phase 1

- Setup a standard 9x9 game
- Include 3 different difficulty levels (easy, moderate, high)
- Cell highlighting including completion highlighting for row, column and sub-grid
- Illegal move indicator
- Timer
- Pause (resume game)
- Write this in plain JS (maybe jQuery)

Phase 2

- Hints
- More game variations
- More game difficulties
- Tutorials
- Custom puzzles
- Change the front end to use AngularJS or React

Known bugs

- Selecting another number from the pad should not remove any previous errors [fixed]
- Red background should be applied to both cells that are part of the illegal move
- Error message that asks the user to select a number first should be removed automatically when they select a number from the pad [Fixed]
- When a user un-select an illegal number from the game board, the error messages and illegal indicator should also be removed [Fixed]
- Clicking on a cell while no number is selected will display a 0 [Fixed]
- Clicking on a permanent display number will make it disappear [Fixed]
