let helper = new Object();

helper.getGrid = () => {
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

  return grid;
}

helper.getRndIntegerFromRange = (minimum, maximum) => {
  let max = maximum + 1;
  let result = Math.floor(Math.random() * (max - minimum)) + minimum;
  return result;
}

helper.getNumberOfRandoms = (number, min, max) => {
  let random = 0;
  let result = [];

  while (result.length < number) {
    random = helper.getRndIntegerFromRange(min, max);

    if (!result.includes(random)) {
      result.push(random);
    }
  }

  return result;
}

helper.checkGrid = (grid) => {
  for (var i=0; i<9; i++) {
    for (var j=0; j<9; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
    }
  }

  return true;
}

helper.getHighlightStart = (num) => {
  if ([2,5,8].includes(num)) {
    return num-2;
  } else if ([1,4,7].includes(num)) {
    return num-1;
  } else {
    return num;
  }
}