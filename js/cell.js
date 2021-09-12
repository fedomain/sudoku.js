class Cell {
  constructor(row, col, num, classList) {
    this.row = row;
    this.col = col;
    this.num = num;
    this.isOpen = false;
    this.isSelected = false;
    this.classList = classList;
  }
}