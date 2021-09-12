class Helpers {
  constructor() { }

  getRndIntegerFromRange(minimum, maximum) {
    let max = maximum + 1;
    let result = Math.floor(Math.random() * (max - minimum)) + minimum;
    return result;
  }

  getNumberOfRandoms(number, min, max) {
    let random = 0;
    let result = [];

    while (result.length < number) {
      random = this.getRndIntegerFromRange(min, max);

      if (!result.includes(random))
        result.push(random);
    }

    return result;
  }
  
  getHighlightStart(num) {
    if ([2, 5, 8].includes(num)) {
      return num - 2;
    } else if ([1, 4, 7].includes(num)) {
      return num - 1;
    } else {
      return num;
    }
  }
}


