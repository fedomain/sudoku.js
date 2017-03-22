# Welcome to my Sudoku JS app


This app is a test and learn project for me to write this game in JS, HTML5 & CSS3. The structure and basis of this game is reengineered from the Android mobile app game Andoku3 from Markus Wiederkehr. This game is not for commerical use and I hold no copyright to any of the game play and IPs.

Game rules

- Number 1-9 appearing only once for each row; And
- Number 1-9 appearing only once for each column; And
- Number 1-9 appearing only once for each 3x3 sub-grid (box)

Game setup

- game variation (default: standard)
- game difficulty (default: very easy)

Application Components

- Setting up the game
	- Will need to store all the possible game boards in a permanent storage like database or file.
	- Along with the basic number of number display depending on the difficulty level. Might also require some other rules.
- Playing the game
	- A JS object for the game, this is a singleton.
	- A JS object for each cell containing all the information regarding the cell. Like current value, the answer, default display flag, etc.

Technology Used

- Javascript objects
- Plain HTML5
- CSS3
- This is just some dummy changes to test out git tagging

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

- Clicking on a cell while no number is selected will display a 0 [Fixed]
- Clicking on a permanent display number will make it disappear [Fixed]
