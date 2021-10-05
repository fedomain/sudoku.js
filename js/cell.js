class Cell {
  constructor(row, col, num, classList) {
    this.row = row;
    this.col = col;
    this.num = num;
    this.isOpen = false;
    this.isSelected = false;
    this.classList = classList;
    this.tempClassStack = [];
  }

  addTempClass(str) {
    let hasIt = false;

    for (let i=0; i<this.tempClassStack.length; i++) {
      if (this.tempClassStack[i] == str) {
        hasIt = true;
        break;
      }
    }

    if (!hasIt)
      this.tempClassStack.push(str);
  }

  removeTempClass(str) {
    this.tempClassStack.pop(str);
  }

  getTempClassList() {
    let str="";

    for (let i=0; i<this.tempClassStack.length; i++)
      str += this.tempClassStack[i] + ",";

    if (str.length > 0)
      return str.slice(0, str.length-1);
    
    return str;
  }

  addClass(str) {
    let hasIt = false;

    for (let i=0; i<this.classList.length; i++) {
      if (this.classList[i] == str) {
        hasIt = true;
        break;
      }
    }

    if (!hasIt)
      this.classList.push(str);
  }

  removeClass(str) {
    this.classList.pop(str);
  }

  getClassList() {
    let str="";

    for (let i=0; i<this.classList.length; i++)
      str += this.classList[i] + ",";

    if (str.length > 0)
      return str.slice(0, str.length-1);

    return str;
  }
}