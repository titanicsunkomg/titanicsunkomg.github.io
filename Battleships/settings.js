var gridNum = 8;
var gridSize = 50;
var boardSize = gridNum * gridSize;
var shipLengths = [4, 3, 3, 2];

document.documentElement.style.setProperty("--gridSize", gridSize.toString().concat("px"));
document.documentElement.style.setProperty("--boardSize", boardSize.toString().concat("px"));